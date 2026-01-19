"use client";


import { useRouter, useSearchParams } from "next/navigation";
import PageTransition from "../components/PageTransition";
import { useEffect, useState } from "react";
export default function AnswerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const extractedText = searchParams.get("extracted");
  const question = searchParams.get("question");
  const answer = searchParams.get("answer"); // future API
  const [loading, setLoading] = useState(true);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {

    if (answer) {
      setAnswerText(answer);
      setLoading(false);
      return;
    }
    if (!question) return;

    const fetchAnswer = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://answerly-backend-nbk9.onrender.com/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: question }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error("Server error");
        }

        setAnswerText(data.answer); // ✅ THIS WAS THE MISSING LINK
      } catch (err) {
        console.error(err);
        setAnswerText("");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [question]);

  return (
    <PageTransition>
    <div className="relative min-h-screen modern-texture-bg text-gray-200 flex flex-col overflow-hidden">

      {/* Header */}
      <header className="relative flex items-center justify-center pt-4 pb-8 md:py-8">
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 md:left-6 md:top-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm mt-2 md:mt-0"
        >
          ← Back
        </button>

        <div className="flex items-center gap-1 text-emerald-500 font-semibold text-lg mt-2">
          <span className="text-2xl md:text-5xl">∞</span>
          <span className="text-base md:text-xl">Answerly</span>
        </div>
      </header>
      <div className="md:hidden fixed bottom-20 left-0 right-0 px-4 z-50">
        <button
          onClick={() => router.push("/ask")}
          className="
            w-80 max-w-md mx-auto
            h-[56px]
            rounded-full
            bg-emerald-500 text-black
            text-lg font-semibold
            shadow-[0_6px_20px_rgba(16,185,129,0.45)]
            flex items-center justify-center
          "
        >
          Ask Another Question →
        </button>
      </div>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-3 -mt-46 md:-mt-2">

          {/* Answer */}
         <div className="relative w-full rounded-[28px] p-[2px]
            order-2 md:order-1
            bg-gradient-to-br from-black/25 via-black/25 to-black/25 backdrop-black-md left-3">

            <div
              className="
                relative
                rounded-[26px]
                backdrop-black-md
                border border-white/15
                p-8
                min-h-[320px] md:min-h-[520px]
                max-h-[320px] md:max-h-[520px]
                w-80 md:w-full
                overflow-y-auto
                scroll-smooth
                scrollbar-thin
                scrollbar-thumb-white/20
                scrollbar-track-transparent
              "
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Your Answer
              </h2>

              {/* Loading */}
              {loading ? (
                <p className="text-white/50 animate-pulse">Generating answer...</p>
              ) : (
                <div className="-mt-1 border-t border-white/40 pt-2">
                  <p className="text-white whitespace-pre-wrap leading-relaxed mt-2">
                    {answerText}
                  </p>
                </div>
              )}

              {!loading && !answerText && (
                <p className="text-white/40">
                  No answer received.
                </p>
              )}
              {/* Fixed Copy Button */}
              {!loading && answerText && (
                <div className="absolute bottom-62 right-17 md:bottom-112 md:right-25 flex flex-col items-center">
                  <button
                    onClick={() => navigator.clipboard.writeText(answerText)}
                    className="p-1 text-white hover:text-green-400 transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 md:h-5 w-4 md:w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <rect x="5" y="5" width="14" height="18" rx="1" ry="1" fill="currentColor" fillOpacity="0.2" />
                      <rect x="2" y="2" width="14" height="18" rx="1" ry="1" fill="none" />
                    </svg>
                  </button>
                  <span className="text-white/30 text-xs select-none">
                    Copy
                  </span>
                </div>
              )}
             
            </div>

            

          </div>


          {/* Question + CTA */}
          <div className="flex flex-col justify-center items-center gap-10 order-1 md:order-2">

            <div className="
              relative
              bg-gradient-to-br from-black/25 via-black/25 to-black/25
              w-70 md:w-100
              h-[180px] md:h-90
              rounded-[2rem]
              p-4 md:p-8
              border border-white/20
              overflow-y-auto
              
              
            ">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-white">
                Your Question
              </h2>
              <div className="-mt-1 border-t border-white/40 pt-2">
                <div className="
                  
                  p-1 md:p-2
                  text-sm md:text-base
                  text-white
                  whitespace-pre-wrap
                ">
                  {question?.trim() || ""}
                </div>
              </div>
              {extractedText && (
                <>
                  <div className="-mt-5 border-t border-white/40 pt-2">
                    

                    <div className="text-sm text-white/80 whitespace-pre-wrap max-h-40  mt-2">
                      {extractedText}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="order-3 md:order-none mt-6 md:mt-0 hidden md:block">
              <button
                onClick={() => router.push("/ask")}
                className="group relative inline-flex items-center justify-center
                  h-[64px] px-14 rounded-full
                  bg-emerald-500 text-black
                  text-xl font-bold
                  shadow-[0_4px_12px_rgba(16,185,129,0.35),0_0_0_1px_rgba(16,185,129,0.6)]
                  hover:shadow-[0_8px_20px_rgba(16,185,129,0.45)]
                  transition-all duration-300
                  transform hover:-translate-y-1"
              >
                Ask Another Question →
              </button>
            </div>

          </div>

        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        Powered by <span className="text-emerald-500 font-medium">AI</span>
      </footer>

    </div>
    </PageTransition>
  );
}
