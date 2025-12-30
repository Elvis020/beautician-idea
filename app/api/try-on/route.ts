import { NextRequest, NextResponse } from "next/server";
import { replicate, MODELS, toDataUri } from "@/lib/replicate";
import { getStyleById } from "@/lib/try-on-styles";
import { TryOnRequest, TryOnResponse } from "@/types/try-on";

export async function POST(request: NextRequest): Promise<NextResponse<TryOnResponse>> {
  try {
    const body: TryOnRequest = await request.json();
    const { image, service, styleId } = body;

    // Validate inputs
    if (!image || !service || !styleId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: image, service, styleId" },
        { status: 400 }
      );
    }

    // Get style configuration
    const style = getStyleById(styleId);
    if (!style) {
      return NextResponse.json(
        { success: false, error: "Invalid style ID" },
        { status: 400 }
      );
    }

    // Verify API token is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: "AI service not configured. Please set up REPLICATE_API_TOKEN." },
        { status: 500 }
      );
    }

    // Prepare the image (ensure it's a data URI)
    const imageUri = toDataUri(image);

    // Run the AI model
    // Using img2img with SDXL for style transfer
    const output = await replicate.run(MODELS.imageToImage, {
      input: {
        image: imageUri,
        prompt: style.prompt,
        negative_prompt: style.negativePrompt || "blurry, low quality, distorted, ugly",
        strength: 0.65, // How much to transform (0.5-0.8 for good balance)
        guidance_scale: 7.5,
        num_inference_steps: 30,
        scheduler: "K_EULER",
      },
    });

    // Replicate returns an array of URLs
    const resultUrl = Array.isArray(output) ? output[0] : output;

    if (!resultUrl || typeof resultUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "AI generation failed - no output received" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      resultUrl,
    });
  } catch (error) {
    console.error("Try-on API error:", error);

    // Parse user-friendly error messages
    const errorMessage = parseApiError(error);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

function parseApiError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();

  // Payment/credits issue
  if (message.includes("402") || message.includes("payment") || message.includes("credit") || message.includes("insufficient")) {
    return "Our AI service is temporarily unavailable. Please try again later.";
  }

  // Rate limiting
  if (message.includes("429") || message.includes("rate limit") || message.includes("too many")) {
    return "Too many requests. Please wait a moment and try again.";
  }

  // Authentication
  if (message.includes("401") || message.includes("unauthorized") || message.includes("authentication")) {
    return "AI service configuration error. Please contact support.";
  }

  // Timeout
  if (message.includes("timeout") || message.includes("timed out")) {
    return "The request took too long. Please try with a simpler photo.";
  }

  // Model not found
  if (message.includes("404") || message.includes("not found")) {
    return "AI model is currently unavailable. Please try again later.";
  }

  // Network errors
  if (message.includes("network") || message.includes("fetch") || message.includes("econnrefused")) {
    return "Connection error. Please check your internet and try again.";
  }

  // Generic fallback
  return "Something went wrong. Please try again.";
}
