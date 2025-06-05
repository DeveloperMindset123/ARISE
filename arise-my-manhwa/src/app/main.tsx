"use client";

import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { fonts } from "@/lib/fonts";
import { GeneratedPanel } from "@/types";
import { joinWords } from "@/lib/joinWords";
import { useDynamicConfig } from "@/lib/useDynamicConfig";
import { Button } from "@/components/ui/button";
import { parallelRenderPanels } from "@/lib/parallelRenderPanels";
import { getSettings } from "./interface/settings-dialog/getSettings";

import { TopMenu } from "./interface/top-menu";
import { useStore } from "./store";
import { Zoom } from "./interface/zoom";
import { BottomBar } from "./interface/bottom-bar";
import { Page } from "./interface/page";
import { getStoryContinuation } from "./queries/getStoryContinuation";
import { localStorageKeys } from "./interface/settings-dialog/localStorageKeys";
import { defaultSettings } from "./interface/settings-dialog/defaultSettings";
import { useLLMVendorConfig } from "@/lib/useLLMVendorConfig";
/**
 * Main component for the comic generation app.
 *
 * This file handles:
 * - Comic page layout and rendering
 * - Story generation using LLM
 * - Panel generation and management
 * - Page navigation and controls
 * - Zoom functionality
 * - Loading states and transitions
 *
 * The component maintains state for:
 * - Current/max number of pages and panels
 * - Generated panel content and captions
 * - Story generation status
 * - User settings like zoom level
 *
 * It coordinates between the LLM for story generation and
 * the UI components to display the comic pages and controls.
 */

export default function Main() {
  const [_isPending, startTransition] = useTransition();

  const llmVendorConfig = useLLMVendorConfig();
  const { config, isConfigReady } = useDynamicConfig();
  const isGeneratingStory = useStore((s) => s.isGeneratingStory);
  const setGeneratingStory = useStore((s) => s.setGeneratingStory);

  const font = useStore((s) => s.font);
  const preset = useStore((s) => s.preset);
  const prompt = useStore((s) => s.prompt);

  const currentNbPages = useStore((s) => s.currentNbPages);
  const maxNbPages = useStore((s) => s.maxNbPages);
  const previousNbPanels = useStore((s) => s.previousNbPanels);
  const currentNbPanels = useStore((s) => s.currentNbPanels);
  const maxNbPanels = useStore((s) => s.maxNbPanels);

  const setCurrentNbPanelsPerPage = useStore(
    (s) => s.setCurrentNbPanelsPerPage
  );
  const setMaxNbPanelsPerPage = useStore((s) => s.setMaxNbPanelsPerPage);
  const setCurrentNbPages = useStore((s) => s.setCurrentNbPages);
  const setMaxNbPages = useStore((s) => s.setMaxNbPages);

  const panels = useStore((s) => s.panels);
  const setPanels = useStore((s) => s.setPanels);

  // do we need those?
  const renderedScenes = useStore((s) => s.renderedScenes);
  const captions = useStore((s) => s.captions);

  const setCaptions = useStore((s) => s.setCaptions);

  const zoomLevel = useStore((s) => s.zoomLevel);

  const [waitABitMore, setWaitABitMore] = useState(false);

  const [userDefinedMaxNumberOfPages, setUserDefinedMaxNumberOfPages] =
    useLocalStorage<number>(
      localStorageKeys.userDefinedMaxNumberOfPages,
      defaultSettings.userDefinedMaxNumberOfPages
    );

  const numberOfPanels = Object.keys(panels).length;
  const panelGenerationStatus = useStore(
    (state) => state.panelGenerationStatus
  );
  const allStatus = Object.values(panelGenerationStatus);
  const numberOfPendingGenerations = allStatus.reduce(
    (acc, s) => acc + (s ? 1 : 0),
    0
  );

  const hasAtLeastOnePage = numberOfPanels > 0;

  const hasNoPendingGeneration = numberOfPendingGenerations === 0;

  const hasStillMorePagesToGenerate = currentNbPages < maxNbPages;

  const showNextPageButton =
    hasAtLeastOnePage && hasNoPendingGeneration && hasStillMorePagesToGenerate;

  useEffect(() => {
    if (maxNbPages !== userDefinedMaxNumberOfPages) {
      setMaxNbPages(userDefinedMaxNumberOfPages);
    }
  }, [maxNbPages, userDefinedMaxNumberOfPages]);

  const ref = useRef({
    existingPanels: [] as GeneratedPanel[],
    newPanelsPrompts: [] as string[],
    newCaptions: [] as string[],
    prompt: "",
    preset: "",
  });

  useEffect(() => {
    if (isConfigReady) {
      // note: this has very low impact at the moment as we are always using the value 4
      // however I would like to progressively evolve the code to make it dynamic
      setCurrentNbPanelsPerPage(config.nbPanelsPerPage);
      setMaxNbPanelsPerPage(config.nbPanelsPerPage);
    }
  }, [JSON.stringify(config), isConfigReady]);

  // react to prompt changes
  useEffect(() => {
    // console.log(`main.tsx: asked to re-generate!!`)
    if (!prompt) {
      return;
    }

    // if the prompt or preset changed, we clear the cache
    // this part is important, otherwise when trying to change the prompt
    // we wouldn't still have remnants of the previous comic
    // in the data sent to the LLM (also the page cursor would be wrong)
    if (prompt !== ref.current.prompt || preset?.label !== ref.current.preset) {
      // console.log("overwriting ref.current!")
      ref.current = {
        existingPanels: [],
        newPanelsPrompts: [],
        newCaptions: [],
        prompt,
        preset: preset?.label || "",
      };
    }

    startTransition(async () => {
      setWaitABitMore(false);
      setGeneratingStory(true);

      const [stylePrompt, userStoryPrompt] = prompt
        .split("||")
        .map((x) => x.trim());

      let limitedStylePrompt = stylePrompt.trim().slice(0, 77).trim();
      if (limitedStylePrompt.length !== stylePrompt.length) {
        console.log(
          "Sorry folks, the style prompt was cut to:",
          limitedStylePrompt
        );
      }

      const lightPanelPromptPrefix: string = joinWords(
        preset.imagePrompt(limitedStylePrompt)
      );

      const degradedPanelPromptPrefix: string = joinWords([
        ...preset.imagePrompt(limitedStylePrompt),
        userStoryPrompt,
      ]);

      // Instead of generating panels 2 by 2, generate all at once in parallel
      const nbPanelsToGenerate = currentNbPanels - previousNbPanels;
      if (nbPanelsToGenerate <= 0) {
        setGeneratingStory(false);
        return;
      }

      try {
        // Get all panel instructions/captions in one go
        const candidatePanels = await getStoryContinuation({
          preset,
          stylePrompt,
          userStoryPrompt,
          nbPanelsToGenerate,
          maxNbPanels,
          existingPanels: ref.current.existingPanels,
          llmVendorConfig,
        });

        ref.current.existingPanels.push(...candidatePanels);

        // Prepare all prompts for rendering
        const panelRenderInputs = candidatePanels.map((panel, idx) => {
          const instructions = panel.instructions || "";
          const prompt = instructions
            ? joinWords([lightPanelPromptPrefix, instructions])
            : degradedPanelPromptPrefix;
          return {
            prompt,
            width: 1024, // or dynamic per panel
            height: 1024, // or dynamic per panel
            nbFrames: preset.id.startsWith("video") ? 16 : 1,
            withCache: true,
          };
        });

        // Parallel render all panels
        const settings = { ...defaultSettings, ...getSettings() };
        const renderedScenes = await parallelRenderPanels(
          panelRenderInputs,
          settings
        );

        // Update captions and prompts
        const newCaptions = candidatePanels.map(
          (panel) => panel.caption.trim() || "..."
        );
        const newPrompts = panelRenderInputs.map((input) => input.prompt);

        setCaptions(newCaptions);
        setPanels(newPrompts);
        // Optionally, update renderedScenes in store if needed
        // setRenderedScenes(renderedScenes)

        setGeneratingStory(false);
      } catch (err) {
        console.log("main.tsx: LLM or rendering failed:", err);
        setGeneratingStory(false);
      }
    });
  }, [prompt, preset?.label, previousNbPanels, currentNbPanels, maxNbPanels]);

  return (
    <Suspense>
      <div className={fonts[font]?.className || ""}>
        <TopMenu />
      </div>
      {/* Left Character Image (desktop only) */}
      <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none animate-float-slow"></div>
      {/* Right Character Image (desktop only) */}
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none animate-float-slow-reverse"></div>
      <div className={fonts[font]?.className || ""}>
        <div className="flex items-center justify-center min-h-[80vh] w-full px-2 md:px-8">
          <div className="w-full max-w-5xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-lg p-6 md:p-12 flex flex-col items-center space-y-8">
            <div className="w-full flex flex-col items-center">
              <div
                className={cn(
                  `comic-page`,
                  `grid grid-cols-1`,
                  currentNbPages > 1 ? `md:grid-cols-2` : ``,
                  `gap-x-3 gap-y-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16`,
                  `print:gap-x-3 print:gap-y-4 print:grid-cols-1`
                )}
                style={{ width: `${zoomLevel}%` }}
              >
                {Array(currentNbPages)
                  .fill(0)
                  .map((_, i) => (
                    <Page key={i} page={i} />
                  ))}
              </div>
              {showNextPageButton && (
                <div className="flex flex-col space-y-2 pt-2 pb-6 text-gray-300 print:hidden">
                  <div>Happy with your story?</div>
                  <div>
                    <Button
                      onClick={() => {
                        setCurrentNbPages(currentNbPages + 1);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold shadow-lg"
                    >
                      Add page {currentNbPages + 1} 👀
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Zoom />
        <BottomBar />
      </div>
      <div
        className={cn(
          `print:hidden`,
          `z-20 fixed inset-0`,
          `flex flex-row items-center justify-center`,
          `transition-all duration-300 ease-in-out`,
          isGeneratingStory
            ? `bg-zinc-50/30 backdrop-blur-md`
            : `bg-zinc-50/0 backdrop-blur-none pointer-events-none`,
          fonts.actionman.className
        )}
      >
        <div
          className={cn(
            `text-center text-xl text-stone-700 w-[70%]`,
            isGeneratingStory ? `` : `scale-0 opacity-0`,
            `transition-all duration-300 ease-in-out`
          )}
        >
          {waitABitMore
            ? `Story is ready, but server is a bit busy!`
            : "Generating a new story.."}
          <br />
          {waitABitMore ? `Please hold tight..` : ""}
        </div>
      </div>
    </Suspense>
  );
}
