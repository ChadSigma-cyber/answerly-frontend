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
          <div className="flex items-center space-x-2">
            <span className="text-3xl md:text-3xl text-emerald-500">∞</span>
            <span className="text-xl md:text-2xl font-bold text-emerald-500">Answerly</span>
          </div>

         
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center text-center px-4">
        <div className="space-y-8 max-w-4xl">
          <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Unlock Your Academic Potential With AI
          </h1>

          <p className="text-base md:text-xl text-gray-400 max-w-xl md:max-w-2xl mx-auto">
            Instant answers, personalized learning for Gen Z. Study smarter, not harder.
          </p>

          <div className="pt-6">
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
              <span className="flex items-center space-x-3">
                <span>Type or Snap Your Question</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
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
