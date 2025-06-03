import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * Maintenance page component for the Arise My Manhwa application.
 *
 * This component displays a full-screen maintenance message when the app
 * needs to be taken offline for updates or fixes. Features:
 *
 * - Fixed positioning to cover entire viewport
 * - Custom Action Man font styling
 * - Maintenance emoji icons
 * - Link to announcement post on Hugging Face
 * - Custom emoji image
 * - Responsive text sizing
 *
 * The component uses:
 * - Tailwind CSS for styling and layout
 * - Custom font configuration from @/lib/fonts
 * - Utility function for class name merging
 * - Fixed z-index to display above other content
 *
 * @returns {JSX.Element} The maintenance page component
 */

export function Maintenance() {
  return (
    <div className="z-20 fixed inset-0 w-screen h-screen bg-white text-stone-800 flex flex-col items-center justify-center">
      <div className={cn(fonts.actionman.className, "text-center")}>
        <p className="text-4xl">🚧 Maintenance in progress 🚧</p>
        <p className="text-3xl mt-12 mb-8">
          See the{" "}
          <a
            href="https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory/discussions/339"
            className="underline text-yellow-500"
          >
            announcement here
          </a>{" "}
          <img
            src="/quick-and-dirty-emoji.png"
            alt="quick and dirty"
            className="inline w-10 h-10"
          ></img>
        </p>
        <p className="text-2xl">
          This shouldn&apos;t last long, so stay tuned!
        </p>
      </div>
    </div>
  );
}
