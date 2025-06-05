import { create } from "zustand";
// the NSFW has to contain bad words, but doing so might get the code flagged
// or attract unwanted attention, so we hash them
// Logic to handle NSFW content goes here

import crypto from "crypto";

// Function to hash words using SHA-256
function hashWord(word: string): string {
  return crypto.createHash("sha256").update(word).digest("hex");
}

// List of raw words that needs to be forbidden
// TODO: when running the project, replace this with the list of words that you deem appropriate
// prior to listing a lot of them, I did not know what they were, my friend peer reviewed and gave me suggestions
// stay away from such content cuz it's bad for brain, mental health and social life
// I do not want people to misuse my application
const rawForbiddenWords = [
  "sex",
  "boobs",
  "ass",
  "fuck",
  "bitch",
  "gooner",
  "futanari", // yikes
  "hentai",
  "incest",
  "underage",
  "naked",
  "nudity",
  "orgy",
  "anal",
  "dick",
  "BDSM",
  "aheago",
  "creampie",
  "threesome",
  "foursome",
  "gangbang",
  "BBC", // no, not british broadcasting channel
];

// Hashed forbidden words
export const forbidden = rawForbiddenWords.map(hashWord);

// Function used to check if a word is forbidden or not
export function isWordForbidden(word: string): boolean {
  const hashedWord = hashWord(word);
  return forbidden.includes(hashedWord);
}
