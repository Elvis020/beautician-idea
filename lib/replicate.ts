import Replicate from "replicate";

// Initialize Replicate client (server-side only)
export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Model identifiers for different service types
export const MODELS = {
  // Using SDXL for image-to-image transformation
  imageToImage: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
  // Face enhancement for better results
  faceEnhance: "tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
} as const;

// Helper to convert base64 to data URI for Replicate
export function toDataUri(base64: string, mimeType = "image/jpeg"): string {
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
}

// Helper to extract base64 from data URI
export function fromDataUri(dataUri: string): string {
  const match = dataUri.match(/^data:[^;]+;base64,(.+)$/);
  return match ? match[1] : dataUri;
}
