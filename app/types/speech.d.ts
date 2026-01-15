export {};

declare global {
  interface Window {
    startListening?: (
      onResult: (text: string) => void,
      onStatus: (status: "listening" | "notListening") => void,
      onError: (error: string) => void
    ) => boolean;

    stopListening?: () => void;
  }
}
