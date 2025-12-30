"use client";

import { useEffect, useRef } from "react";
import { Camera, ImagePlus, SwitchCamera, X } from "lucide-react";
import { useCamera } from "@/hooks/use-camera";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  onClose?: () => void;
  className?: string;
}

export function CameraCapture({ onCapture, onClose, className }: CameraCaptureProps) {
  const { videoRef, startCamera, stopCamera, capture, switchCamera, error, isLoading, stream } =
    useCamera();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    const image = capture();
    if (image) {
      stopCamera();
      onCapture(image);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        stopCamera();
        onCapture(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("relative aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden", className)}>
      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          "scale-x-[-1]" // Mirror front camera
        )}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-3 text-white/70 text-sm">Starting camera...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 p-6">
          <div className="text-center">
            <Camera className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-white font-medium mb-2">Camera Access Needed</p>
            <p className="text-white/60 text-sm mb-4">{error.message}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm font-medium"
            >
              Upload a Photo Instead
            </button>
          </div>
        </div>
      )}

      {/* Face Guide Overlay */}
      {stream && !error && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-12 md:inset-16 border-2 border-white/30 rounded-full" />
          <p className="absolute bottom-24 inset-x-0 text-center text-white/70 text-sm">
            Position your face in the circle
          </p>
        </div>
      )}

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-center gap-4">
        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ImagePlus className="h-6 w-6 text-white" />
        </button>

        {/* Capture Button */}
        <button
          onClick={handleCapture}
          disabled={!stream || isLoading}
          className={cn(
            "p-1 rounded-full bg-white shadow-lg",
            (!stream || isLoading) && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="p-4 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </button>

        {/* Switch Camera Button */}
        <button
          onClick={switchCamera}
          disabled={!stream || isLoading}
          className={cn(
            "p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors",
            (!stream || isLoading) && "opacity-50 cursor-not-allowed"
          )}
        >
          <SwitchCamera className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}
