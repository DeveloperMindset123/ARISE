"use strict";
// Bun/Node.js-compatible parallel panel rendering utility
import { newRender } from "@/app/engine/render";
import { Settings, RenderedScene } from "@/types";

/**
 * Render all panels sequentially (no multithreading or workerpool).
 * @param panels Array of panel prompts and options
 * @param settings Rendering settings
 * @returns Array of RenderedScene results
 */
export async function parallelRenderPanels(
  panels: {
    prompt: string;
    width: number;
    height: number;
    nbFrames: number;
    withCache: boolean;
  }[],
  settings: Settings
): Promise<RenderedScene[]> {
  return Promise.all(panels.map((panel) => newRender({ ...panel, settings })));
}
