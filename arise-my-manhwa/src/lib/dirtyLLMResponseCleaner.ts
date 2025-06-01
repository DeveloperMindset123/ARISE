// export function dirtyLLMResponseCleaner(input: string): string {
//     let str = (
//       `${input || ""}`
//       // a summary of all the weird hallucinations I saw it make..
//       .replaceAll(`"\n`, `",\n`) // fix missing commas at the end of a line
//       .replaceAll(`"]`, `"}]`)
//       .replaceAll(/"\S*,?\S*\]/gi, `"}]`)
//       .replaceAll(/"\S*,?\S*\}\S*]/gi, `"}]`)

//       // this removes the trailing commas (which are valid in JS but not JSON)
//       .replace(/,(?=\s*?[\}\]])/g, '')

//       .replaceAll("}}", "}")
//       .replaceAll("]]", "]")
//       .replaceAll("[[", "[")
//       .replaceAll("{{", "{")
//       .replaceAll(",,", ",")
//       .replaceAll("[0]", "")
//       .replaceAll("[1]", "")
//       .replaceAll("[2]", "")
//       .replaceAll("[3]", "")
//       .replaceAll("[4]", "")
//       .replaceAll("[5]", "")
//       .replaceAll("[6]", "")
//       .replaceAll("[7]", "")
//       .replaceAll("[8]", "")
//       .replaceAll("[panel 0]", "")
//       .replaceAll("[panel 1]", "")
//       .replaceAll("[panel 2]", "")
//       .replaceAll("[panel 3]", "")
//       .replaceAll("[panel 4]", "")
//       .replaceAll("[panel 5]", "")
//       .replaceAll("[panel 6]", "")
//       .replaceAll("[panel 7]", "")
//       .replaceAll("[panel 8]", "")
//     )

//     // repair missing end of JSON array
//     if (str.at(-1) === '}') {
//       str = str + "]"
//     }

//     if (str.at(-1) === '"') {
//       str = str + "}]"
//     }

//     if (str[0] === '{') {
//       str = "[" + str
//     }

//     if (str[0] === '"') {
//       str = "[{" + str
//     }

//     return str
//   }

/**
 * Performs a series of string replacements to "clean" a potentially malformed
 * JSON-like string, typically from an LLM response.
 *
 * This function addresses various common formatting errors and hallucinations
 * observed in Large Language Model (LLM) outputs when they attempt to generate JSON.
 * It fixes issues such as missing commas, incorrect closing brackets/braces,
 * duplicate delimiters, and extraneous numerical/panel identifiers.
 *
 * @param {string} input The dirty or malformed JSON-like string.
 * @returns {string} A string with common LLM JSON hallucinations and formatting errors corrected.
 */
export function dirtyLLMResponseCleaner(input: string): string {
  let str = `${input || ""}`
    // a summary of all the weird hallucinations I saw it make..
    .replaceAll(`"\n`, `",\n`) // fix missing commas at the end of a line
    .replaceAll(`"]`, `"}]`) // Fix cases like `"key"]` to `""key"}]`
    .replaceAll(/"\S*,?\S*\]/gi, `"}]`) // More aggressive fix for malformed array endings
    .replaceAll(/"\S*,?\S*\}\S*]/gi, `"}]`) // Fix for malformed object and array endings

    // this removes the trailing commas (which are valid in JS but not JSON)
    .replace(/,(?=\s*?[\}\]])/g, "") // Remove trailing commas before `}` or `]`

    .replaceAll("}}", "}") // Reduce duplicate closing braces
    .replaceAll("]]", "]") // Reduce duplicate closing brackets
    .replaceAll("[[", "[") // Reduce duplicate opening brackets
    .replaceAll("{{", "{") // Reduce duplicate opening braces
    .replaceAll(",,", ",") // Reduce duplicate commas
    .replaceAll("[0]", "") // Remove common hallucinated array indices
    .replaceAll("[1]", "")
    .replaceAll("[2]", "")
    .replaceAll("[3]", "")
    .replaceAll("[4]", "")
    .replaceAll("[5]", "")
    .replaceAll("[6]", "")
    .replaceAll("[7]", "")
    .replaceAll("[8]", "")
    .replaceAll("[panel 0]", "") // Remove common hallucinated panel identifiers
    .replaceAll("[panel 1]", "")
    .replaceAll("[panel 2]", "")
    .replaceAll("[panel 3]", "")
    .replaceAll("[panel 4]", "")
    .replaceAll("[panel 5]", "")
    .replaceAll("[panel 6]", "")
    .replaceAll("[panel 7]", "")
    .replaceAll("[panel 8]", "");

  // repair missing end of JSON array
  if (str.at(-1) === "}") {
    str = str + "]"; // If it ends with '}', assume it's an object within an array that needs closing ']'
  }

  if (str.at(-1) === '"') {
    str = str + "}]"; // If it ends with '"', assume it's a string within an object within an array
  }

  if (str[0] === "{") {
    str = "[" + str; // If it starts with '{', assume it's an object that should be in an array
  }

  if (str[0] === '"') {
    str = "[{" + str; // If it starts with '"', assume it's a string that should be in an object in an array
  }

  return str;
}
