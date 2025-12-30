"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { CameraFacing, CameraError } from "@/types/try-on";

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  error: CameraError | null;
  isLoading: boolean;
  facingMode: CameraFacing;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => void;
  capture: () => string | null;
}

function mapCameraError(err: unknown): CameraError {
  if (err instanceof DOMException) {
    switch (err.name) {
      case "NotAllowedError":
        return {
          code: "PERMISSION_DENIED",
          message: "Camera permission was denied. Please allow camera access.",
        };
      case "NotFoundError":
        return {
          code: "NOT_FOUND",
          message: "No camera found on this device.",
        };
      case "NotSupportedError":
        return {
          code: "NOT_SUPPORTED",
          message: "Camera is not supported in this browser.",
        };
      default:
        return {
          code: "UNKNOWN",
          message: err.message || "An unknown error occurred.",
        };
    }
  }
  return {
    code: "UNKNOWN",
    message: "An unknown error occurred while accessing the camera.",
  };
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<CameraError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<CameraFacing>("user");

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new DOMException("getUserMedia not supported", "NotSupportedError");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err) {
      const cameraError = mapCameraError(err);
      setError(cameraError);
      console.error("Camera error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, stream]);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (stream) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const capture = useCallback((): string | null => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Mirror the image if using front camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);

    // Return as base64 JPEG
    return canvas.toDataURL("image/jpeg", 0.9);
  }, [facingMode]);

  return {
    videoRef,
    stream,
    error,
    isLoading,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    capture,
  };
}
