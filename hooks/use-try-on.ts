"use client";

import { useState, useCallback } from "react";
import { TryOnState, TryOnStep, StyleOption, TryOnResponse } from "@/types/try-on";
import { ServiceType } from "@/types";

const initialState: TryOnState = {
  step: "capture",
  capturedImage: null,
  selectedService: "makeup",
  selectedStyle: null,
  generatedImage: null,
  isLoading: false,
  error: null,
  progress: 0,
};

export function useTryOn() {
  const [state, setState] = useState<TryOnState>(initialState);

  const setStep = useCallback((step: TryOnStep) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  const setService = useCallback((service: ServiceType) => {
    setState((prev) => ({
      ...prev,
      selectedService: service,
      selectedStyle: null, // Reset style when service changes
    }));
  }, []);

  const setStyle = useCallback((style: StyleOption | null) => {
    setState((prev) => ({ ...prev, selectedStyle: style }));
  }, []);

  const setCapturedImage = useCallback((image: string | null) => {
    setState((prev) => ({
      ...prev,
      capturedImage: image,
      step: image ? "select-style" : "capture",
      generatedImage: null, // Reset generated image when new photo is captured
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const generate = useCallback(async () => {
    const { capturedImage, selectedService, selectedStyle } = state;

    if (!capturedImage || !selectedStyle) {
      setError("Please capture a photo and select a style");
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      progress: 0,
      step: "generating",
    }));

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setState((prev) => {
        if (prev.progress >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 1000);

    try {
      const response = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: capturedImage,
          service: selectedService,
          styleId: selectedStyle.id,
        }),
      });

      const data: TryOnResponse = await response.json();

      clearInterval(progressInterval);

      if (!data.success || !data.resultUrl) {
        throw new Error(data.error || "Generation failed");
      }

      setState((prev) => ({
        ...prev,
        generatedImage: data.resultUrl!,
        isLoading: false,
        progress: 100,
        step: "result",
      }));
    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        progress: 0,
        step: "select-style",
      }));
    }
  }, [state, setError]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const tryAnother = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedStyle: null,
      generatedImage: null,
      step: "select-style",
      error: null,
      progress: 0,
    }));
  }, []);

  const retakePhoto = useCallback(() => {
    setState((prev) => ({
      ...prev,
      capturedImage: null,
      selectedStyle: null,
      generatedImage: null,
      step: "capture",
      error: null,
      progress: 0,
    }));
  }, []);

  return {
    state,
    setStep,
    setService,
    setStyle,
    setCapturedImage,
    setError,
    generate,
    reset,
    tryAnother,
    retakePhoto,
  };
}
