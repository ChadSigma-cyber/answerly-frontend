"use client";

import { useRouter } from "next/navigation";
import { useState,useRef } from "react";
import PageTransition from "../components/PageTransition";
import Link from "next/link";
import Script from "next/script";
import ReactCrop, { Crop } from "react-image-crop";
import { getCroppedImg } from "../utils/cropImage";



export default function AskPage() {
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("https://answerly-backend-nbk9.onrender.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      router.push(
        `/answer?question=${encodeURIComponent(data.question)}&answer=${encodeURIComponent(data.answer)}`
      );
    } catch (err) {
      console.error("API error:", err);
      alert("Something went wrong");
    }
  };


  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  }); 
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  
  const [text, setText] = useState("");
  const handleImageSend = async () => {
    if (loading) return;
    if (!image) {
      alert("Please crop the image first");
      return;
    }

    try {
      setLoading(true);
      const base64Only = image.split(",")[1];

      const res = await fetch("https://answerly-backend-nbk9.onrender.com/api/ask-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Only }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Server error:", errText);
        alert("Image processing failed");
        return;
      }

      const data = await res.json();

      // ✅ NOW navigation will happen
      router.push(
        `/answer?answer=${encodeURIComponent(data.answer)}&extracted=${encodeURIComponent(data.extractedText)}`
      );
    } catch (err) {
      console.error(err);
      alert("Image processing failed");
    } finally {
      setLoading(false);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleSaveCrop = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    const croppedImage = canvas.toDataURL("image/jpeg");
    setImage(croppedImage);   // final image
    setCropOpen(false);       // close modal
  };
  const [listening, setListening] = useState(false);
  
  const handleMicClick = () => {
    if (!window.startListening) {
      alert("Speech recognition not supported");
      return;
    }

    if (!listening) {
      const ok = window.startListening(
        (spokenText) => {
          setText(spokenText); // LIVE text update
        },
        (status) => {
          setListening(status === "listening");
        },
        (err) => {
          console.warn("Speech error:", err);

          // Safari & Chrome often throw "network" on mic stop
          if (err === "network" || err?.includes?.("network")) {
            return; // ignore harmless error
          }

          alert("Mic error. Please allow microphone access.");
          setListening(false);
        }
      );

      if (!ok) alert("Could not start speech recognition");
    } else {
      window.stopListening?.();
      setListening(false);
    }
  };


  return (
    <>
    <Script src="/speech.js" strategy="afterInteractive"/>
    <PageTransition>
    <div className="page-transition relative min-h-screen modern-texture-bg text-gray-200 flex flex-col overflow-hidden">

      {/* Header */}
      <header className="relative flex items-center justify-center pt-4 pb-8 md:py-8">
        <Link href="/">
          <button
            className="
              absolute left-4 top-6 md:left-6 md:top-auto
              flex items-center gap-0
              px-3 py-2
              rounded-full
              bg-white/10 hover:bg-white/20
              transition
              text-sm
              font-semibold
            "
          >
            <svg
              className="w-4 h-4 stroke-white"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Back</span>
          </button>
        </Link>

        <div className="flex items-center gap-2 text-emerald-500 font-semibold text-lg mt-2">
          <span className="text-2xl md:text-5xl">∞</span>
          <span className="text-base md:text-xl">Answerly</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-6 md:justify-center -mt-2 md:-mt-40">

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-10 md:mb-20 text-center">
          What&apos;s Your Question?
        </h1>

        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-16 items-center justify-center">

          {/* Upload Box */}
          <label className="w-full h-[260px] md:w-[520px] md:h-[320px] rounded-[2rem] border border-white/40 bg-black/30 flex items-center justify-center cursor-pointer hover:bg-white/5 transition overflow-hidden mt-2 md:mt-0">

            {image ? (
              <div className="relative w-full h-full pointer-events-none">
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />

                {/* Clear Image Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center hover:bg-black/90 transition pointer-events-auto"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6l12 12M18 6l-12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-white/50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15V9m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                </div>

                <p className="text-lg font-medium">Tap To Upload An Image</p>
                <p className="text-sm text-gray-400">(Please upload a clear image)</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  setRawImage(reader.result as string); // 👈 STEP 4
                  setCropOpen(true);                   // 👈 OPEN CROPPER
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>

          {/* Text Input */}
          <div className="relative w-full md:w-[640px] -mt-8 md:mt-0">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Or type your question here..."
              className="w-full h-[54px] md:h-[72px] rounded-full bg-black/40 border border-white/30 pl-8 pr-20 text-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition"
              
            />
            
            <button
              onClick={() => {
                if (listening) {
                  // 🔴 STOP MIC (highest priority)
                  window.stopListening?.();
                  setListening(false);
                  return;
                }

                if (!text.trim()) {
                  // 🎤 START MIC (only if no text & not listening)
                  handleMicClick();
                  return;
                }

                // ➡️ SEND (text present & mic stopped)
                router.push(`/answer?question=${encodeURIComponent(text)}`);
              }}
              className={`absolute right-2 md:right-3 top-1/2 -translate-y-11.5 md:-translate-y-17
                w-11 h-11 md:w-12 md:h-12 -mt-7 md:mt-0
                rounded-full flex items-center justify-center transition
                ${listening ? "bg-red-500 animate-pulse" : "bg-emerald-500 hover:bg-emerald-400"}
              `}
            >
              {(listening || text.length === 0) ? (
                /* MIC ICON */
                <svg
                  className="w-7 h-7 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a1 1 0 10-2 0 3 3 0 01-6 0 1 1 0 10-2 0 5 5 0 004 4.9V19h-2a1 1 0 100 2h6a1 1 0 100-2h-2v-3.1A5 5 0 0017 11z" />
                </svg>
              ) : (
                /* SEND ICON */
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l16-8-6 16-2-6-6-2z" />
                </svg>
              )}
            </button>
           <button
              onClick={handleImageSend}
              disabled={!image || loading}
              className={`relative top-2 mt-10 w-80 md:w-100 max-w-none mx-auto translate-x-0
                md:mt-4 md:ml-auto left-3 md:left-25 md:w-[400px] 
                h-[64px] md:h-[70px] rounded-full 
                bg-emerald-500 text-black text-2xl font-semibold font-sans
                shadow-[0_10px_10px_rgba(16,185,129,0.3)] 
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)]
                active:translate-y-0 active:scale-[0.9]
                ${image ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
                ${loading ? "cursor-not-allowed opacity-80" : ""}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                "Get Your Answer"
              )}
            </button>
            
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] md:text-[12px] text-gray-400 mb-10 md:mb-0">
        Powered by <span className="text-emerald-500 font-medium">AI</span>
      </footer>

    </div>
    {cropOpen && rawImage && (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <div className="relative w-[90vw] h-[80vh] bg-black rounded-2xl overflow-hidden">

          {/* Cropper */}
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              ref={imgRef}
              src={rawImage}
              alt="Crop"
              className="max-h-[70vh] max-w-full"
            />
          </ReactCrop>

          {/* Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={() => setCropOpen(false)}
              className="px-6 py-2 rounded-full bg-white/10 text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveCrop}
              disabled={!completedCrop?.width}
              className="px-6 py-2 rounded-full bg-emerald-500 text-black font-semibold disabled:opacity-50"
            >
              Crop
            </button>
          </div>

        </div>
      </div>
    )}
    </PageTransition>
    </>
  );
}

