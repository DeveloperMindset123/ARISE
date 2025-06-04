import { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Legacy speech bubble component for comic panels.
 *
 * @description
 * This file contains the legacy implementation of speech bubbles used in comic panels.
 * It provides a simple, non-editable speech bubble with a tail pointer.
 *
 * Key features:
 * - Fixed width speech bubble with rounded corners
 * - Tail pointer indicating speaker
 * - White background with drop shadow
 * - Centered text content
 *
 * @deprecated Consider using the newer Bubble component from './index.tsx' which supports:
 * - Content editing
 * - Draggable positioning
 * - Responsive sizing
 *
 * @example
 * ```tsx
 * <BubbleLegacy>
 *   Hello world!
 * </BubbleLegacy>
 * ```
 */

export function BubbleLegacy({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  if (!children) {
    return null;
  }

  return (
    <div>
      <div
        className={cn(
          `relative w-[300px] p-6 rounded-[40px]`,
          `bg-white`,
          `text-lg leading-6 text-center text-zinc-800`,

          // BEFORE ELEMENT
          `before:content-[""] before:w-0 before:h-0 before:absolute`,
          `before:border-l-[24px] before:border-l-white`,
          `before:border-r-[12px] before:border-r-transparent`,
          `before:border-t-[12px] before:border-t-white`,
          `before:border-b-[20px] before:border-b-transparent`,
          `before:border-solid before:left-8 before:-bottom-6`,
          `shadow-lg`,
          className
        )}
      >
        <div className={cn(``)}>{children}</div>
      </div>
    </div>
  );
}
