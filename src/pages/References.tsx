
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const References = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Featured Projects */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of my most impactful web and mobile development projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glassmorphism p-1 h-full animate-fade-in">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                  alt="E-Commerce Platform"
                  className="object-cover h-full w-full transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-psyco-black-DEFAULT to-transparent flex flex-col justify-end p-6">
                  <div className="bg-psyco-green-DEFAULT inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-2 self-start">
                    Web App
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">E-Commerce Platform</h3>
                  <p className="text-gray-300 mb-4">Full-stack e-commerce solution with React frontend, Node.js backend, and integrated payment system serving 10,000+ users.</p>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism p-1 h-full animate-fade-in animation-delay-100">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                  alt="Task Management App"
                  className="object-cover h-full w-full transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-psyco-black-DEFAULT to-transparent flex flex-col justify-end p-6">
                  <div className="bg-psyco-green-DEFAULT inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-2 self-start">
                    Mobile App
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Task Management App</h3>
                  <p className="text-gray-300 mb-4">Cross-platform mobile application built with React Native, featuring real-time collaboration and offline functionality.</p>
                </div>
              </div>
            </div>

            <div className="glassmorphism p-1 h-full animate-fade-in animation-delay-200">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
                  alt="Portfolio Website"
                  className="object-cover h-full w-full transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-psyco-black-DEFAULT to-transparent flex flex-col justify-end p-6">
                  <div className="bg-psyco-green-DEFAULT inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-2 self-start">
                    UI/UX Design
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Creative Portfolio Website</h3>
                  <p className="text-gray-300 mb-4">Modern portfolio website with stunning animations and interactive elements, showcasing creative work with exceptional user experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default References;
