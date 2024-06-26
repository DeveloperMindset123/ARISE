import { LLMEngine } from "@/types"
import { predict as predictWithHuggingFace } from "./predictWithHuggingface"
import { predict as predictWithOpenAI } from "./predictWithOpenAI"
import { predict as predictWithGroq } from "./predictWithGroq"
import { predict as predictWithAnthropic } from "./predictWithAnthropic"
import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const defaultLLMEngineName = `${process.env.LLM_ENGINE || ""}` as LLMEngine

export function getLLMEngineFunction(llmEngineName: LLMEngine = defaultLLMEngineName) {
  const llmEngineFunction = 
    llmEngineName === "GROQ" ? predictWithGroq :
    llmEngineName === "ANTHROPIC" ? predictWithAnthropic :
    llmEngineName === "OPENAI" ? predictWithOpenAI :
    predictWithHuggingFace
  
  return llmEngineFunction
}

export const defaultLLMEngineFunction = getLLMEngineFunction()