import { ServiceType } from "./index";

export type TryOnStep = "capture" | "select-style" | "generating" | "result";

export interface TryOnState {
  step: TryOnStep;
  capturedImage: string | null;
  selectedService: ServiceType;
  selectedStyle: StyleOption | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  progress: number;
}

export interface StyleOption {
  id: string;
  name: string;
  previewImage: string;
  prompt: string;
  negativePrompt?: string;
  service: ServiceType;
}

export interface TryOnRequest {
  image: string;
  service: ServiceType;
  styleId: string;
}

export interface TryOnResponse {
  success: boolean;
  resultUrl?: string;
  error?: string;
}

export type CameraFacing = "user" | "environment";

export interface CameraError {
  code: "PERMISSION_DENIED" | "NOT_FOUND" | "NOT_SUPPORTED" | "UNKNOWN";
  message: string;
}
