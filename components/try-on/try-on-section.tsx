"use client";

import { ServiceFilter } from "@/components/service-filter";
import { CameraCapture } from "./camera-capture";
import { StyleGallery } from "./style-gallery";
import { LoadingAnimation } from "./loading-animation";
import { ResultViewer } from "./result-viewer";
import { useTryOn } from "@/hooks/use-try-on";
import { cn } from "@/lib/utils";
import { Camera, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export function TryOnSection() {
  const {
    state,
    setService,
    setStyle,
    setCapturedImage,
    generate,
    tryAnother,
    retakePhoto,
  } = useTryOn();

  const { step, capturedImage, selectedService, selectedStyle, generatedImage, isLoading, error, progress } = state;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Service Filter */}
      <div className="mb-6 flex justify-center">
        <ServiceFilter selected={selectedService} onChange={(s) => s && setService(s)} />
      </div>

      {/* Error Message - Always at top */}
      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={() => tryAnother()}
            className="text-red-600 font-medium hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        {/* Step 1: Camera Capture */}
        {step === "capture" && (
          <div className="animate-fade-in">
            <CameraCapture onCapture={setCapturedImage} />
          </div>
        )}

        {/* Step 2: Style Selection */}
        {step === "select-style" && capturedImage && (
          <div className="space-y-4 animate-fade-in">
            {/* Captured Image Preview */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100">
              <Image
                src={capturedImage}
                alt="Your photo"
                fill
                className="object-cover"
              />
              {/* Retake Button */}
              <button
                onClick={retakePhoto}
                className="absolute top-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center gap-1.5 hover:bg-black/70 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Retake
              </button>
            </div>

            {/* Style Gallery */}
            <StyleGallery
              service={selectedService}
              selectedStyle={selectedStyle}
              onSelect={setStyle}
            />

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={!selectedStyle || isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium transition-all",
                selectedStyle
                  ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:from-pink-700 hover:to-rose-600 hover:shadow-lg hover:shadow-pink-500/25"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              )}
            >
              <Sparkles className="w-5 h-5" />
              {selectedStyle ? "Generate My Look" : "Select a Style First"}
              {selectedStyle && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        )}

        {/* Step 3: Generating */}
        {step === "generating" && capturedImage && (
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100">
            <Image
              src={capturedImage}
              alt="Processing"
              fill
              className="object-cover blur-sm"
            />
            <LoadingAnimation progress={progress} />
          </div>
        )}

        {/* Step 4: Result */}
        {step === "result" && capturedImage && generatedImage && (
          <div className="animate-fade-in">
            <ResultViewer
              originalImage={capturedImage}
              generatedImage={generatedImage}
              service={selectedService}
              onTryAnother={tryAnother}
              onRetake={retakePhoto}
            />
          </div>
        )}
      </div>
    </div>
  );
}
