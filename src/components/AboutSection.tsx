
import React from 'react';
import { User } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
      <div className="w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side - Title */}
            <div className="lg:col-span-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                  <User className="text-green-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">About Me</h2>
              </div>
              <div className="w-20 h-1 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Right side - Content */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a passionate full-stack developer and data scientist with a unique blend of technical expertise spanning frontend development, backend architecture, and machine learning. My journey in technology has been driven by a curiosity to solve complex problems and create meaningful digital experiences that make a real impact on users and businesses alike.
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  What sets me apart is my ability to bridge the gap between data insights and user-friendly applications. Whether I'm building responsive web interfaces with modern frameworks, designing scalable backend systems, or extracting actionable insights from complex datasets, I approach every project with attention to detail and a commitment to delivering high-quality solutions that drive business value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
