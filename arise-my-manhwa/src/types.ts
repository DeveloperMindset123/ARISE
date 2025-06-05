/**
 * @Topic Understanding the difference between type and interface
 * @interface @detail primarily used to define the structure of objects
 * @interface @detail support declaration merging, meaning multiple declarations of the same interface name within the same scope are automatically merged.
 * @interface @detail extendable using "extends" keyword, facilitating the creation of new interfaces based on existing ones.
 * @interface @detail offers slightly better performance in typescript compiler because they only need to maintain references to their name
 *
 * @type @detail more flexible and can define a wider range of data types, including primitive types, unions and intersections.
 * @type @detail do not support declaration merging.
 * @type @detail extendable using intersections (&), but this does not have the same semantic clarity or automatic merging capabillities as interfaces.
 * @type @detail can be used for objects, arrays, primitives and more.
 * @type @detail used for unions ( | ) and intersections (&) of multiple types.
 * @type @detail create new object types each time they're used, which can be less efficient than interfaces.
 */

export type ProjectionMode = "cartesian" | "spherical";
export type CacheMode = "use" | "renew" | "ignore";

export interface RenderRequest {
  prompt: string;

  // whether to use video segmentation
  // allframes (default)
  // firstframe: we only analyze the first frame
  // allframes: we analyze all the frames
  segmentation: "allframes" | "firstframe" | "disabled";

  // segmentation will only be executed if we have a non-empty list of actionnables
  // actionnables are names of things like "chest", "key", "tree", "chair" etc
  actionnables: string[];

  // note: this is the number of frames for Zeroscope,
  // which is currently configured to only output 3 seconds, so:
  // nbFrames=8 -> 1 sec
  // nbFrames=16 -> 2 sec
  // nbFrames=24 -> 3 sec
  nbFrames: number; // min: 1, max: 24

  nbSteps: number; // min: 1, max: 50

  seed: number;

  width: number; // fixed at 1024 for now
  height: number; // fixed at 512 for now

  // upscaling factor
  // 0: no upscaling
  // 1: no upscaling
  // 2: 2x larger
  // 3: 3x larger
  // 4x: 4x larger, up to 4096x4096 (warning: a PNG of this size can be 50 Mb!)
  upscalingFactor: number;

  projection: ProjectionMode;

  /**
   * Use turbo mode
   *
   * At the time of writing this will use SSD-1B + LCM
   * https://huggingface.co/spaces/jbilcke-hf/fast-image-server
   */
  turbo: boolean;

  cache: CacheMode;

  wait: boolean; // wait until the job is completed

  analyze: boolean; // analyze the image to generate a caption (optional)
}

export interface ImageSegment {
  id: number;
  box: number[];
  color: number[];
  label: string;
  score: number;
}

/**Scene has 3 states : pending, completed, error */
export type RenderedSceneStatus = "pending" | "completed" | "error";

export interface RenderedScene {
  renderId: string;
  status: RenderedSceneStatus;
  assetUrl: string;
  alt: string;
  error: string;
  maskUrl: string;
  segments: ImageSegment[];
}

export interface ImageAnalysisRequest {
  // in base64 --> image
  image: string;
  prompt: string;
}

export interface ImageAnalysisResponse {
  result: string;
  error?: string;
}

export type GeneratedPanel = {
  panel: number;
  instructions: string;
  caption: string;
};

export type GeneratedPanels = GeneratedPanel[];

// LLMVendor = what the user configure in the UI (eg. a dropdown item called default server)
// LLMEngine = the actual engine to use (eg. hugging face)
export type LLMEngine =
  //  Speific Engine depending on which LLMs you want to work with
  | "INFERENCE_API"
  | "INFERENCE_ENDPOINT"
  | "OPENAI"
  | "REPLICATE"
  | "GROQ"
  | "ANTHROPIC";

export type RenderingEngine =
  // Specific Rendering engine depending on which rendering models you want to work with
  | "VIDEOCHAIN"
  | "OPENAI"
  | "REPLICATE"
  | "INFERENCE_API"
  | "INFERENCE_ENDPOINT";

export type RenderingModelVendor =
  // TODO : fix server logic not working
  //  Specific Rendering model Vendor/Company depending on which corresponding model you want to work with
  "SERVER" | "OPENAI" | "REPLICATE" | "HUGGINGFACE";

// LLMVendor = what the user configure in the UI (eg. a dropdown item called default server)
// LLMEngine = the actual engine to use (eg. hugging face, OpenAI, Groq, etc.)
export type LLMVendor = "SERVER" | "OPENAI" | "GROQ" | "ANTHROPIC";

export type LLMVendorConfig = {
  vendor: LLMVendor;
  apiKey: string;
  modelId: string;
};

export type LLMPredictionFunctionParams = {
  systemPrompt: string;
  userPrompt: string;
  nbMaxNewTokens: number;
  llmVendorConfig: LLMVendorConfig;
};

export type PostVisibility =
  | "featured" // featured by admins
  | "trending" // top trending / received more than 10 upvotes
  | "normal"; // default visibility

export type Post = {
  postId: string;
  appId: string;
  prompt: string;
  previewUrl: string;
  assetUrl: string;
  createdAt: string;
  visibility: PostVisibility;
  upvotes: number;
  downvotes: number;
};

export type CreatePostResponse = {
  success?: boolean;
  error?: string;
  post: Post;
};

export type GetAppPostsResponse = {
  success?: boolean;
  error?: string;
  posts: Post[];
};

export type GetAppPostResponse = {
  success?: boolean;
  error?: string;
  post: Post;
};

export type LayoutProps = {
  page: number;
  nbPanels: number;
};

// TODO: rename the *Model fields to better indicate if this is a LLM or RENDER mdoel
/**
 * Difference between RENDER and LLM models:
 * @name RENDER : Produces Images, Videos or Animations. (i.e. Midjourney, Dall-E, ChatGPT, Leonardo AI, etc.)
 * @name LLM : Produces text in either conversational or narrative format (i.e. Gemini, ChatGPT, Claude, etc.)
 * @description A lot of them are capable of both functioning as RENDER and LLM models.
 */
export type Settings = {
  renderingModelVendor: RenderingModelVendor;
  renderingUseTurbo: boolean;
  llmVendor: LLMVendor;
  huggingFaceOAuth: string;
  huggingfaceApiKey: string;
  huggingfaceInferenceApiModel: string;
  huggingfaceInferenceApiModelTrigger: string;
  huggingfaceInferenceApiFileType: string;
  replicateApiKey: string;
  replicateApiModel: string;
  replicateApiModelVersion: string;
  replicateApiModelTrigger: string;
  openaiApiKey: string;
  openaiApiModel: string;
  openaiApiLanguageModel: string;
  groqApiKey: string;
  groqApiLanguageModel: string;
  anthropicApiKey: string;
  anthropicApiLanguageModel: string;
  hasGeneratedAtLeastOnce: boolean;
  userDefinedMaxNumberOfPages: number;
};

export type DynamicConfig = {
  maxNbPages: number;
  nbPanelsPerPage: number;
  nbTotalPanelsToGenerate: number;
  oauthClientId: string;
  oauthRedirectUrl: string;
  oauthScopes: string;
  enableHuggingFaceOAuth: boolean;
  enableHuggingFaceOAuthWall: boolean;
};
