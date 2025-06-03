"use client";

import { allLayoutAspectRatios, allLayouts } from "@/app/layouts";
import { useStore } from "@/app/store";
import { cn } from "@/lib/utils";

/**
 * Page component for rendering individual comic pages.
 *
 * This component handles:
 * - Layout selection and rendering for comic panels
 * - Page aspect ratio and dimensions
 * - Zoom level scaling
 * - Page numbering
 * - Print styling
 *
 * Props:
 * @param {Object} props - Component props
 * @param {number} props.page - Current page number (0-based index)
 *
 * The component uses:
 * - Global store for state management (zoom, layouts, panel counts)
 * - Dynamic layout components loaded from layouts config
 * - Responsive sizing based on zoom level
 * - Print-specific styling for PDF export
 * - Conditional page numbering for multi-page comics
 *
 * Layout handling:
 * - Loads layout component dynamically based on selected layout
 * - Applies correct aspect ratio from layout config
 * - Calculates panels per page based on layout type
 * - Maintains consistent panel distribution
 */

export function Page({ page }: { page: number }) {
  const zoomLevel = useStore((state) => state.zoomLevel);
  const layouts = useStore((state) => state.layouts);

  const layout = layouts[page] || layouts[0];

  const LayoutElement = (allLayouts as any)[layout];
  const aspectRatio =
    ((allLayoutAspectRatios as any)[layout] as string) || "aspect-[250/297]";

  const currentNbPages = useStore((s) => s.currentNbPages);
  const maxNbPages = useStore((s) => s.maxNbPages);
  const currentNbPanelsPerPage = useStore((s) => s.currentNbPanelsPerPage);

  const allLayoutsNbPanels = {
    Layout0: currentNbPanelsPerPage,
    Layout1: currentNbPanelsPerPage,
    Layout2: currentNbPanelsPerPage,
    Layout3: currentNbPanelsPerPage,
  };

  const panelsPerPage =
    ((allLayoutsNbPanels as any)[layout] as number) || currentNbPanelsPerPage;

  return (
    <div
      className={cn(`w-full`, `print:w-screen`, `print:break-after-all`)}
      style={{
        padding: `${Math.round((zoomLevel / 100) * 16)}px`,
      }}
    >
      <div
        className={cn(
          aspectRatio,
          `transition-all duration-100 ease-in-out`,
          `border border-stone-200`,
          `shadow-2xl`,
          `print:shadow-none`,
          `print:border-0`
        )}
        style={{
          padding: `${Math.round((zoomLevel / 100) * 16)}px`,
        }}
      >
        <LayoutElement page={page} nbPanels={panelsPerPage} />
      </div>
      {currentNbPages > 1 && (
        <p className="w-full text-center pt-4 font-sans text-2xs font-semibold text-stone-600">
          {page + 1}/{maxNbPages}
        </p>
      )}
    </div>
  );
}
