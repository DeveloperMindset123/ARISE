"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useLocalStorage } from "usehooks-ts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FontName, defaultFont, fonts } from "@/lib/fonts";
import { Input } from "@/components/ui/input";
import {
  PresetName,
  defaultPreset,
  nonRandomPresets,
  presets,
} from "@/app/engine/presets";
import { useStore } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  LayoutName,
  allLayoutLabels,
  defaultLayout,
  nonRandomLayouts,
} from "@/app/layouts";
import { Switch } from "@/components/ui/switch";
import { useOAuth } from "@/lib/useOAuth";

import layoutPreview0 from "../../../../public/layouts/layout0.jpg";
import layoutPreview1 from "../../../../public/layouts/layout1.jpg";
import layoutPreview2 from "../../../../public/layouts/layout2.jpg";
import layoutPreview3 from "../../../../public/layouts/layout3.jpg";
import { localStorageKeys } from "../settings-dialog/localStorageKeys";
import { defaultSettings } from "../settings-dialog/defaultSettings";
import { AuthWall } from "../auth-wall";

const layoutIcons: Partial<Record<LayoutName, StaticImageData>> = {
  Layout0: layoutPreview0,
  Layout1: layoutPreview1,
  Layout2: layoutPreview2,
  Layout3: layoutPreview3,
  Layout4: undefined,
};

export function TopMenu() {
  const searchParams = useSearchParams();

  const requestedPreset =
    (searchParams?.get("preset") as PresetName) || defaultPreset;
  const requestedFont = (searchParams?.get("font") as FontName) || defaultFont;
  const requestedStylePrompt =
    (searchParams?.get("stylePrompt") as string) || "";
  const requestedStoryPrompt =
    (searchParams?.get("storyPrompt") as string) || "";
  const requestedLayout =
    (searchParams?.get("layout") as LayoutName) || defaultLayout;

  const preset = useStore((state) => state.preset);
  const prompt = useStore((state) => state.prompt);
  const layout = useStore((state) => state.layout);
  const setLayout = useStore((state) => state.setLayout);

  const setShowCaptions = useStore((state) => state.setShowCaptions);
  const showCaptions = useStore((state) => state.showCaptions);

  const currentNbPages = useStore((state) => state.currentNbPages);
  const setCurrentNbPages = useStore((state) => state.setCurrentNbPages);

  const generate = useStore((state) => state.generate);

  const isGeneratingStory = useStore((state) => state.isGeneratingStory);
  const atLeastOnePanelIsBusy = useStore(
    (state) => state.atLeastOnePanelIsBusy
  );
  const isBusy = isGeneratingStory || atLeastOnePanelIsBusy;

  const [lastDraftPromptA, setLastDraftPromptA] = useLocalStorage<string>(
    "AI_COMIC_FACTORY_LAST_DRAFT_PROMPT_A",
    requestedStylePrompt
  );

  const [lastDraftPromptB, setLastDraftPromptB] = useLocalStorage<string>(
    "AI_COMIC_FACTORY_LAST_DRAFT_PROMPT_B",
    requestedStoryPrompt
  );

  const [draftPromptA, setDraftPromptA] = useState(lastDraftPromptA);
  const [draftPromptB, setDraftPromptB] = useState(lastDraftPromptB);
  const draftPrompt = `${draftPromptA}||${draftPromptB}`;

  const [draftPreset, setDraftPreset] = useState<PresetName>(requestedPreset);
  const [draftLayout, setDraftLayout] = useState<LayoutName>(requestedLayout);

  const { isLoggedIn, enableOAuthWall } = useOAuth({ debug: false });

  const [hasGeneratedAtLeastOnce, setHasGeneratedAtLeastOnce] =
    useLocalStorage<boolean>(
      localStorageKeys.hasGeneratedAtLeastOnce,
      defaultSettings.hasGeneratedAtLeastOnce
    );

  const [showAuthWall, setShowAuthWall] = useState(false);

  const font = useStore((state) => state.font);
  const setFont = useStore((state) => state.setFont);

  // we synchronize the draft prompt with the local storage
  useEffect(() => {
    if (lastDraftPromptA !== draftPromptA) {
      setLastDraftPromptA(draftPromptA);
    }
  }, [draftPromptA]);
  useEffect(() => {
    if (lastDraftPromptA !== draftPromptA) {
      setDraftPromptA(lastDraftPromptA);
    }
  }, [lastDraftPromptA]);
  useEffect(() => {
    if (lastDraftPromptB !== draftPromptB) {
      setLastDraftPromptB(draftPromptB);
    }
  }, [draftPromptB]);
  useEffect(() => {
    if (lastDraftPromptB !== draftPromptB) {
      setDraftPromptB(lastDraftPromptB);
    }
  }, [lastDraftPromptB]);

  const handleSubmit = () => {
    if (enableOAuthWall && hasGeneratedAtLeastOnce && !isLoggedIn) {
      setShowAuthWall(true);
      return;
    }

    const promptChanged = draftPrompt.trim() !== prompt.trim();
    const presetChanged = draftPreset !== preset.id;
    const layoutChanged = draftLayout !== layout;
    if (!isBusy && (promptChanged || presetChanged || layoutChanged)) {
      generate(draftPrompt, draftPreset, draftLayout);
    }
  };

  useEffect(() => {
    const layoutChanged = draftLayout !== layout;
    if (layoutChanged && !isBusy) {
      setLayout(draftLayout);
    }
  }, [layout, draftLayout, isBusy]);

  return (
    <div
      className={cn(
        `print:hidden`,
        `z-10 fixed top-0 left-0 right-0`,
        `flex flex-col md:flex-row w-full justify-between items-center`,
        `mx-auto w-[90%] px-4 sm:px-6 lg:px-8`,
        `rounded-2xl border border-purple-400/40 shadow-lg`,
        `bg-gradient-to-r from-purple-800/80 via-purple-700/80 to-purple-900/80`,
        `backdrop-blur-xl`,
        `transition-all duration-200 ease-in-out`,
        `px-2 py-2`,
        `space-y-2 md:space-y-0 md:space-x-3 lg:space-x-6`,
        `overflow-x-none justify-center`
      )}
      style={{ marginTop: 0 }}
    >
      <div className="flex flex-row space-x-2 md:space-x-3 w-full md:w-auto items-center">
        <div
          className={cn(
            `transition-all duration-200 ease-in-out`,
            `flex flex-row items-center justify-start space-x-3`,
            `flex-grow`
          )}
        >
          <Select
            defaultValue={defaultPreset}
            onValueChange={(value) => {
              setDraftPreset(value as PresetName);
            }}
            disabled={isBusy}
          >
            <SelectTrigger className="flex-grow bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700 min-w-[90px] max-w-[120px]">
              <SelectValue
                className="text-2xs md:text-sm"
                placeholder="Style"
              />
            </SelectTrigger>
            <SelectContent>
              {nonRandomPresets.map((key) => (
                <SelectItem key={key} value={key}>
                  {presets[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue={defaultLayout}
            onValueChange={(value) => {
              setDraftLayout(value as LayoutName);
            }}
            disabled={isBusy}
          >
            <SelectTrigger className="flex-grow bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700 min-w-[90px] max-w-[120px]">
              <SelectValue
                className="text-2xs md:text-sm"
                placeholder="Layout"
              />
            </SelectTrigger>
            <SelectContent>
              {nonRandomLayouts.map((key) => (
                <SelectItem key={key} value={key} className="w-full">
                  <div className="space-x-6 flex flex-row items-center justify-between">
                    <div className="flex">{(allLayoutLabels as any)[key]}</div>
                    {(layoutIcons as any)[key] ? (
                      <Image
                        className="rounded-sm opacity-75"
                        src={(layoutIcons as any)[key]}
                        width={20}
                        height={18}
                        alt={key}
                      />
                    ) : null}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={font}
            onValueChange={(value) => {
              setFont(value as FontName);
              localStorage.setItem("font", value);
            }}
            disabled={isBusy}
          >
            <SelectTrigger className="flex-grow bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700 min-w-[90px] max-w-[120px]">
              <SelectValue className="text-2xs md:text-sm" placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(fonts).map((fontKey) => (
                // TODO : fix font logic here
                <SelectItem
                  key={fontKey}
                  value={fontKey}
                  className={fonts[fontKey as FontName].className}
                >
                  <span className={fonts[fontKey as FontName].className}>
                    {fontKey}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <Switch checked={showCaptions} onCheckedChange={setShowCaptions} />
          <Label className="text-gray-200 dark:text-gray-200">
            <span className="hidden md:inline">Caption</span>
            <span className="inline md:hidden">Cap.</span>
          </Label>
        </div>
      </div>
      <div
        className={cn(
          `transition-all duration-200 ease-in-out`,
          `flex flex-grow flex-col space-y-2 md:space-y-0 md:flex-row items-center md:space-x-3 w-full md:w-auto`
        )}
      >
        <div className="flex flex-row flex-grow w-full items-center space-x-2">
          <div className="flex flex-row flex-grow min-w-0 space-x-0">
            <Input
              placeholder="1. Story (eg. detective dog)"
              className={cn(
                `flex-1 min-w-0 rounded-r-none`,
                `bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700`,
                `border-r-stone-100`,
                `whitespace-normal break-words overflow-wrap-normal`
              )}
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              onChange={(e) => {
                setDraftPromptB(e.target.value);
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleSubmit();
                }
              }}
              value={draftPromptB}
            />
            <Input
              placeholder="2. Style (eg 'rain, shiba')"
              className={cn(
                `flex-1 min-w-0`,
                `bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700`,
                `border-l-gray-300 rounded-l-none rounded-r-none`,
                `whitespace-normal break-words overflow-wrap-normal`
              )}
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
              onChange={(e) => {
                setDraftPromptA(e.target.value);
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleSubmit();
                }
              }}
              value={draftPromptA}
            />
          </div>
          <Button
            className={cn(
              `rounded-l-none cursor-pointer rounded-md`,
              `transition-all duration-200 ease-in-out`,
              `text-xl`,
              `bg-[rgb(59,134,247)] hover:bg-[rgb(69,144,255)] disabled:bg-[rgb(59,134,247)]`,
              `min-w-[48px] max-w-[64px]`
            )}
            onClick={() => {
              handleSubmit();
            }}
            disabled={!draftPrompt?.trim().length || isBusy}
          >
            Go
          </Button>
          <AuthWall show={showAuthWall} />
        </div>
      </div>
    </div>
  );
}
