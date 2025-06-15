
import React from 'react';
import { User } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="w-full">
        <div className="glassmorphism p-8">
          <div className="flex items-center mb-6">
            <User className="text-green-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-white">About Me</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate full-stack developer and data scientist with a unique blend of technical expertise spanning frontend development, backend architecture, and machine learning. My journey in technology has been driven by a curiosity to solve complex problems and create meaningful digital experiences that make a real impact on users and businesses alike.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              What sets me apart is my ability to bridge the gap between data insights and user-friendly applications. Whether I'm building responsive web interfaces with modern frameworks, designing scalable backend systems, or extracting actionable insights from complex datasets, I approach every project with attention to detail and a commitment to delivering high-quality solutions that drive business value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
