// // adapted from https://huggingface.co/TheBloke/Llama-2-13B-chat-GPTQ/discussions/5
// export function createLlamaPrompt(messages: Array<{ role: string, content: string }>) {
//     const B_INST = "[INST]", E_INST = "[/INST]";
//     const B_SYS = "<<SYS>>\n", E_SYS = "\n<</SYS>>\n\n";
//     const BOS = "<s>", EOS = "</s>";
//     const DEFAULT_SYSTEM_PROMPT = "You are a helpful, respectful and honest storywriting assistant. Always answer in a creative and entertaining way, while being safe. Please ensure that your stories and captions are socially unbiased and positive in nature. If a request does not make any sense, go on anyway, as we are writing a fantasy story.";

//     if (messages[0].role != "system"){
//         messages = [
//             {role: "system", content: DEFAULT_SYSTEM_PROMPT}
//         ].concat(messages);
//     }
//     messages = [{role: messages[1].role, content: B_SYS + messages[0].content + E_SYS + messages[1].content}].concat(messages.slice(2));

//     let messages_list = messages.map((value, index, array) => {
//         if (index % 2 == 0 && index + 1 < array.length){
//             return `${BOS}${B_INST} ${array[index].content.trim()} ${E_INST} ${array[index+1].content.trim()} ${EOS}`
//         }
//         return '';
//     })

//     messages_list.push(`${BOS}${B_INST} ${messages[messages.length-1].content.trim()} ${E_INST}`)

//     return messages_list.join('');
//   }

/**
 * Creates a Llama-2 style prompt string from an array of message objects.
 * This function formats a conversation history into a single string that
 * adheres to the prompting conventions expected by Llama-2 models,
 * including system prompts, user turns, and assistant responses.
 *
 * It adapts the format described in discussions for models like `TheBloke/Llama-2-13B-chat-GPTQ`.
 *
 * @param {Array<{ role: string, content: string }>} messages An array of message objects, where each object has a `role` (e.g., "system", "user", "assistant") and `content` (the message text).
 * @returns {string} The formatted prompt string suitable for Llama-2 models.
 */
export function createLlamaPrompt(
  messages: Array<{ role: string; content: string }>
) {
  // Define the special tokens used by Llama-2 for structuring prompts.
  const B_INST = "[INST]",
    E_INST = "[/INST]"; // Begin/End Instruction
  const B_SYS = "<<SYS>>\n",
    E_SYS = "\n<</SYS>>\n\n"; // Begin/End System
  const BOS = "<s>",
    EOS = "</s>"; // Beginning/End of Sentence/Sequence

  // Define a default system prompt to be used if no system message is provided.
  const DEFAULT_SYSTEM_PROMPT =
    "You are a helpful, respectful and honest storywriting assistant. Always answer in a creative and entertaining way, while being safe. Please ensure that your stories and captions are socially unbiased and positive in nature. If a request does not make any sense, go on anyway, as we are writing a fantasy story.";

  // If the first message is not a system message, prepend the default system prompt.
  if (messages[0].role !== "system") {
    messages = [{ role: "system", content: DEFAULT_SYSTEM_PROMPT }].concat(
      messages
    );
  }

  // Modify the second message to incorporate the system prompt according to Llama-2's format.
  // The system prompt is prepended to the content of what was originally the first user message.
  // The original first message (now system message) and the original second message (now modified user message)
  // are combined for the initial turn, and the rest of the messages follow.
  messages = [
    {
      role: messages[1].role,
      content: B_SYS + messages[0].content + E_SYS + messages[1].content,
    },
  ].concat(messages.slice(2));

  // Map over the messages to format them into Llama-2 conversational turns.
  // It assumes an alternating pattern of user (instruction) and assistant (response) messages.
  let messages_list = messages.map((value, index, array) => {
    // For every pair of messages (user instruction and assistant response)
    if (index % 2 === 0 && index + 1 < array.length) {
      // Format them as `<s>[INST] user_content [/INST] assistant_content </s>`
      return `${BOS}${B_INST} ${array[index].content.trim()} ${E_INST} ${array[
        index + 1
      ].content.trim()} ${EOS}`;
    }
    return ""; // Return empty string for odd indices (assistant responses already paired)
  });

  // Add the final user instruction for the model to complete.
  // This is always the last part of the prompt, formatted as `<s>[INST] user_content [/INST]`
  // indicating that the model should generate the response to this instruction.
  messages_list.push(
    `${BOS}${B_INST} ${messages[messages.length - 1].content.trim()} ${E_INST}`
  );

  // Join all the formatted message segments into a single prompt string.
  return messages_list.join("");
}
