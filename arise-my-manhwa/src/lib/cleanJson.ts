import { dirtyLLMResponseCleaner } from "./dirtyLLMResponseCleaner";

/**
 * Cleans a string that is expected to contain a JSON array, typically from an LLM response.
 *
 * This function attempts to extract and clean a JSON array from a potentially messy
 * LLM (Large Language Model) response. It addresses common issues like:
 * - Removing markdown code blocks (` ``` `).
 * - Trimming content to only include what's inside the first `[` and last `]`.
 * - Applying a series of string replacements to fix common JSON formatting errors
 * often found in LLM outputs.
 *
 * @param {string} input The raw string response from an LLM that is expected to contain a JSON array.
 * @returns {string} A cleaner string that should be a valid JSON array.
 */
export function cleanJson(input: string): string {
  // TODO : remove later
  console.log(`Original dirty JSON input string : ${input}`);
  if (input.includes("```")) {
    // If the input contains markdown code blocks, take only the content before the first one.
    input = input.split("```")[0];
  }
  let tmp = dirtyLLMResponseCleaner(input);

  // We only keep what's after the first '[' to ensure we start with an array.
  tmp = `[${tmp.split("[").pop() || ""}`;

  // And before the first ']' to ensure we end with an array.
  tmp = `${tmp.split("]").shift() || ""}]`;

  // Apply the cleaner again after structural trimming.
  tmp = dirtyLLMResponseCleaner(tmp);

  // TODO : remove later
  console.log(`Cleaned json response : ${tmp}`);

  return tmp;
}
