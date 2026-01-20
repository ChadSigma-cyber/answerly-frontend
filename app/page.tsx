"use client";
import Link from "next/link";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
    <div className="relative min-h-screen flex flex-col justify-between modern-texture-bg text-gray-200 overflow-hidden">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-8">
        <div className="container mx-auto flex justify-center md:justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-500 font-semibold text-lg mt-2">
            <span className="text-2xl md:text-5xl">∞</span>
            <span className="text-base md:text-xl">Answerly</span>
          </div>

         
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center text-center px-4 mt-8 md:mt-0">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight mt-[-60px] md:mt-0">
            Unlock Your Academic Potential With AI
          </h1>

          <p className="text-base md:text-xl text-gray-400 max-w-xl md:max-w-2xl mx-auto mt-15 md:mt-0">
            Instant answers, personalized learning for Gen Z. Study smarter, not harder.
          </p>

          <div className="pt-16 md:pt-6 px-6 md:px-12 mt-15 md:mt-0">
            <Link href="/ask">
            <button className="
              group relative
              flex w-full md:inline-flex md:w-auto
              items-center justify-center
              bg-emerald-500 text-black font-bold
              py-4 md:py-5
              px-6 md:px-12
              rounded-full
              text-lg md:text-xl
              shadow-[0_4px_10px_rgba(16,185,129,0.2),0_0_0_1px_rgba(16,185,129,0.5)]
              hover:shadow-[0_6px_15px_rgba(16,185,129,0.3)]
              transition-all duration-300
              transform hover:-translate-y-1
            ">
              <span className="flex items-center space-x-1">
                <span>Type or Snap Your Question</span>
                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 md:p-8">
        <div className="container mx-auto flex justify-center md:justify-between items-center text-sm text-gray-400">
          <div className="flex space-x-6">
            <a className="hover:text-white transition" href="#">About</a>
            <a className="hover:text-white transition" href="#">Privacy</a>
            <a className="hover:text-white transition" href="#">Terms</a>
          </div>

         
        </div>
      </footer>

    </div>
    </PageTransition>
  );
}
