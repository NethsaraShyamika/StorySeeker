import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-yellow-200 text-sm font-medium">
                Welcome to StorySeeker
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-center lg:text-left leading-tight">
              <span className="bg-linear-to-r from-yellow-100 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Discover Your
              </span>
              <br />
              <span className="bg-linear-to-r from-orange-200 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                Next Great Read
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-zinc-300 text-center lg:text-left max-w-xl leading-relaxed">
              Uncover a world of stories with <span className="text-yellow-200 font-semibold">StorySeeker</span> – Your ultimate destination for books that inspire, entertain, and enlighten.
            </p>

            <div className="flex gap-8 mt-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-yellow-100">10K+</div>
                <div className="text-sm text-zinc-400">Books</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-yellow-100">5K+</div>
                <div className="text-sm text-zinc-400">Readers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-yellow-100">50+</div>
                <div className="text-sm text-zinc-400">Genres</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <Link 
                to="/all-books" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-zinc-900 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover Books
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-yellow-100 border-2 border-yellow-100/30 rounded-full backdrop-blur-sm hover:bg-yellow-100/10 hover:border-yellow-100 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-yellow-400 to-orange-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="./Hero2.png" 
                  alt="Discover amazing books" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                <div className="absolute -bottom-6 -left-6 bg-zinc-900/90 backdrop-blur-md border border-yellow-500/30 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-yellow-100 font-bold text-lg">New Arrivals</div>
                      <div className="text-zinc-400 text-sm">Updated Daily</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;