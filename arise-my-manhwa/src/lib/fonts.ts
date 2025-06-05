import { Indie_Flower, The_Girl_Next_Door } from "next/font/google";
import localFont from "next/font/local";

/**
 * Configures and loads the 'Indie Flower' font from Google Fonts.
 * This font is a handwritten-style font suitable for informal designs.
 * It's loaded with a subset for 'latin' characters, a weight of '400' (normal),
 * and assigned a CSS variable `--font-indieflower` for easy styling in CSS.
 */
export const indieflower = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-indieflower",
});

/**
 * Configures and loads 'The Girl Next Door' font from Google Fonts.
 * This font is also a handwritten-style font, similar to a casual script.
 * It's loaded with a subset for 'latin' characters, a weight of '400' (normal),
 * and assigned a CSS variable `--font-the-girl-next-door` for CSS integration.
 */
export const thegirlnextdoor = The_Girl_Next_Door({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-the-girl-next-door",
});

// load all the local fonts that has been downloaded

/**
 * Configures and loads the 'Komika Hand' font from a local file.
 * This font is typically a comic book style font.
 * It's sourced from `../fonts/Komika-Hand/Komika-Hand.woff2`
 * and assigned a CSS variable `--font-komika` for use in CSS.
 */

// TODO : commented out due to build error
// export const komika = localFont({
//   // src: "../fonts/Komika-Hand/Komika-Hand.woff2",
//   src: "../fonts/Komika-Hand/Komika-Hand.woff2",
//   variable: "--font-komika",
// });

/**
 * Configures and loads the 'Action Man' font from a local file.
 * This font often has a bold, action-oriented or military-stencil style.
 * It's sourced from `../fonts/Action-Man/Action-Man.woff2`
 * and assigned a CSS variable `--font-action-man` for use in CSS.
 */

// TODO : commented out due to build error
// export const actionman = localFont({
//   src: "../fonts/Action-Man/Action-Man.woff2",
//   variable: "--font-action-man",
// });

/**
 * Configures and loads the 'Karantula' font from a local file.
 * This font might have a unique, possibly decorative or distressed style.
 * It's sourced from `../fonts/Karantula/Karantula.woff2`
 * and assigned a CSS variable `--font-karantula` for use in CSS.
 */

// TODO : commented out due to build error
// export const karantula = localFont({
//   src: "../fonts/Karantula/Karantula.woff2",
//   variable: "--font-karantula",
// });

/**
 * Configures and loads the 'Manoskope Bold' font from a local file.
 * This font is likely a bold, possibly monospace or technical-looking font.
 * It's sourced from `../fonts/Manoskope/MANOSKOPE-Bold.woff2`
 * and assigned a CSS variable `--font-manoskope` for use in CSS.
 */

// TODO : commented out due to build error
// export const manoskope = localFont({
//   src: "../fonts/Manoskope/MANOSKOPE-Bold.woff2",
//   variable: "--font-manoskope",
// });

/**
 * Configures and loads the 'Paete Round' font from a local file.
 * This font likely features rounded edges or a soft, friendly appearance.
 * It's sourced from `../fonts/Paete-Round/Paete-Round.woff2`
 * and assigned a CSS variable `--font-paete-round` for use in CSS.
 */
// TODO : commented out due to build error
// export const paeteround = localFont({
//   src: "../fonts/Paete-Round/Paete-Round.woff2",
//   variable: "--font-paete-round",
// });

/**
 * Configures and loads the 'Qarmic Sans Abridged' font from a local file.
 * This font might be a condensed or stylized sans-serif font.
 * It's sourced from `../fonts/Qarmic-Sans/Qarmic-Sans-Abridged.woff2`
 * and assigned a CSS variable `--font-qarmic-sans` for use in CSS.
 */
// TODO : commented out due to build error
// export const qarmic = localFont({
//   src: "../fonts/Qarmic-Sans/Qarmic-Sans-Abridged.woff2",
//   variable: "--font-qarmic-sans",
// });

/**
 * Configures and loads the 'SF Arch Rival' font from a local file.
 * This font likely has a bold, possibly distressed or competitive design.
 * It's sourced from `../fonts/SF-Arch-Rival/SF-Arch-Rival.woff2`
 * and assigned a CSS variable `--font-sf-arch-rival` for use in CSS.
 */
// TODO : commented out due to build error
// export const archrival = localFont({
//   src: "../fonts/SF-Arch-Rival/SF-Arch-Rival.woff2",
//   variable: "--font-sf-arch-rival",
// });

/**
 * Configures and loads the 'SF Cartoonist Hand' font from a local file.
 * This font is designed to mimic a cartoonist's handwriting.
 * It's sourced from `../fonts/SF-Cartoonist-Hand/SF-Cartoonist-Hand.woff2`
 * and assigned a CSS variable `--font-sf-cartoonist-hand` for use in CSS.
 */
// TODO : commented out due to build error
// export const cartoonist = localFont({
//   src: "../fonts/SF-Cartoonist-Hand/SF-Cartoonist-Hand.woff2",
//   variable: "--font-sf-cartoonist-hand",
// });

/**
 * Configures and loads the 'SF Toontime' font from a local file.
 * This font is likely a playful, cartoon-like display font.
 * It's sourced from `../fonts/SF-Toontime/SF-Toontime.woff2`
 * and assigned a CSS variable `--font-sf-toontime` for use in CSS.
 */
// TODO : commented out due to build error
// export const toontime = localFont({
//   src: "../fonts/SF-Toontime/SF-Toontime.woff2",
//   variable: "--font-sf-toontime",
// });

/**
 * Configures and loads the 'VTC Letterer Pro' font from a local file.
 * This font might be a stylized or artistic lettering font.
 * It's sourced from `../fonts/VTC-Letterer-Pro/VTC-Letterer-Pro.woff2`
 * and assigned a CSS variable `--font-vtc-letterer-pro` for use in CSS.
 */
// TODO : commented out due to build error
// export const vtc = localFont({
//   src: "../fonts/VTC-Letterer-Pro/VTC-Letterer-Pro.woff2",
//   variable: "--font-vtc-letterer-pro",
// });

/**
 * Configures and loads the 'Digital Strip BB' font from a local file.
 * This font likely has a blocky, digital, or comic strip aesthetic.
 * It's sourced from `../fonts/DigitalStripBB/DigitalStripBB_Reg.woff2`
 * and assigned a CSS variable `--font-digital-strip-bb` for use in CSS.
 */
// TODO : commented out due to build error
// export const digitalstrip = localFont({
//   src: "../fonts/DigitalStripBB/DigitalStripBB_Reg.woff2",
//   variable: "--font-digital-strip-bb",
// });

/**
 * An object consolidating all configured font objects.
 * This allows for easy access and iteration over all available fonts
 * within the application. Each key corresponds to a font name, and its
 * value is the font object returned by `next/font/google` or `next/font/local`.
 *
 * @see https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
 */
export const fonts = {
  indieflower,
  thegirlnextdoor,
  // komika,
  // actionman,
  // karantula,
  // manoskope,
  // paeteround,
  // qarmic,
  // archrival,
  // cartoonist,
  // toontime,
  // vtc,
  // digitalstrip,
};

/**
 * An array containing the string names (keys) of all available fonts.
 * This list can be used for displaying font options in a UI, or for
 * dynamically selecting fonts by their string identifier.
 *
 * @example
 * // Iterate through font names
 * fontList.forEach(fontName => console.log(fontName));
 */
export const fontList = Object.keys(fonts);

/**
 * A TypeScript type alias representing the valid string names of the fonts
 * available in the `fonts` object. This provides type safety when referring
 * to font names programmatically.
 */
export type FontName = keyof typeof fonts;

/**
 * The default font name to be used across the application.
 * It is set to "cartoonist" and cast as `FontName` for type safety.
 */
// export const defaultFont = "cartoonist" as FontName;
export const defaultFont = "indieflower" as FontName;

/**
 * An array containing the CSS class names generated by Next.js for each loaded font.
 * These class names can be applied directly to HTML elements to use the corresponding font.
 *
 * @example
 * // In a React component:
 * // <p className={classNames[0]}>This text uses the first font.</p>
 */
export const classNames = Object.values(fonts).map((font) => font.className);

/**
 * A single string containing all the CSS class names, joined by a space.
 * This allows for easily applying all font classes to a root element (e.g., `<body>` or `<html>`)
 * so that the CSS variables for all fonts are globally available.
 *
 * @example
 * // In your `_app.tsx` or `layout.tsx` for Next.js:
 * // <body className={className}>...</body>
 */
export const className = classNames.join(" ");

/**
 * A TypeScript union type defining all possible CSS class names that can be used
 * to apply the configured fonts. This provides strong type checking when
 * assigning font classes to elements.
 */
export type FontClass =
  | "font-indieflower"
  | "font-thegirlnextdoor"
  | "font-komika"
  | "font-actionman"
  | "font-karantula"
  | "font-manoskope"
  | "font-paeteround"
  | "font-qarmic"
  | "font-archrival"
  | "font-cartoonist"
  | "font-toontime"
  | "font-vtc"
  | "font-digitalstrip";
