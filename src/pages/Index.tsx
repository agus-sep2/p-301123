
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background particles/dots effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-green-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Hi, I'm </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-pulse">
                Mahathir
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-8">
              <span className="typing-animation">Full Stack Developer</span>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating innovative web solutions with modern technologies. 
              Specializing in React, Node.js, and cloud platforms to build scalable applications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
              <span className="flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Get In Touch
            </button>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <span className="text-blue-400 font-bold text-xl">R</span>
              </div>
              <span className="text-gray-400 text-sm mt-2">React</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <span className="text-green-400 font-bold text-xl">N</span>
              </div>
              <span className="text-gray-400 text-sm mt-2">Node.js</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <span className="text-blue-500 font-bold text-xl">TS</span>
              </div>
              <span className="text-gray-400 text-sm mt-2">TypeScript</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <span className="text-cyan-400 font-bold text-xl">TW</span>
              </div>
              <span className="text-gray-400 text-sm mt-2">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Index;
