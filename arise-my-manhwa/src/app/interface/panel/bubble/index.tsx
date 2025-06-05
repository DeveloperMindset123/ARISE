"use client";

import { ReactNode, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useStore } from "@/app/store";
import { cn } from "@/lib/utils";

export function Bubble({
  children,
  onChange,
  position = "bottom-center",
}: {
  children: React.ReactNode;
  onChange: (newCaption: string) => void;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const zoomLevel = useStore((state) => state.zoomLevel);
  const showCaptions = useStore((state) => state.showCaptions);
  const text = useRef(`${children || ""}`);

  // State for position and size
  const [bubbleState, setBubbleState] = useState({
    x: 0,
    y: 0,
    width: 240,
    height: 64,
  });

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = `${ref.current?.innerText || ""}`;
  };

  const handleBlur = () => {
    onChange(text.current);
  };

  // Default position logic (bottom-center)
  const defaultPosition = {
    x: window.innerWidth / 2 - bubbleState.width / 2,
    y: window.innerHeight - bubbleState.height - 80,
  };

  return showCaptions ? (
    <Rnd
      className="inset-x-0 bottom-0"
      size={{ width: bubbleState.width, height: bubbleState.height }}
      position={{ x: bubbleState.x, y: bubbleState.y }}
      minWidth={120}
      minHeight={40}
      maxWidth={window.innerWidth * 0.8}
      maxHeight={window.innerHeight * 0.5}
      bounds="parent"
      onDragStop={(_e, d) => {
        setBubbleState((prev) => ({ ...prev, x: d.x, y: d.y }));
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setBubbleState({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      default={{
        ...defaultPosition,
        width: bubbleState.width,
        height: bubbleState.height,
      }}
      style={{ zIndex: 20 }}
      enableResizing={true}
      dragHandleClassName="bubble-drag-handle"
    >
      <div
        ref={ref}
        className={cn(
          `bg-white text-black border-stone-800 rounded-lg shadow-lg text-center text-sm  flex items-center justify-center w-full h-full px-4 py-2 bubble-drag-handle`
        )}
        style={{ width: "100%", height: "100%" }}
      >
        <ContentEditable
          html={text.current}
          className="text-sm text-black outline-none w-full min-h-[1.5em] bottom-0"
          onBlur={handleBlur}
          onChange={handleChange}
          tagName="div"
          spellCheck={true}
        />
      </div>
    </Rnd>
  ) : null;
}
