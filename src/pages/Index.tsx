
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { Code, Database, BarChart3, MoveRight } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredServices = [
    {
      title: "Frontend Development",
      description: "Modern web applications using Vue.js with responsive design and optimal user experience.",
      icon: <Code size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      link: "/services#frontend"
    },
    {
      title: "Backend Development",
      description: "Robust and scalable backend systems using Golang for high-performance applications.",
      icon: <Database size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      link: "/services#backend"
    },
    {
      title: "Data Science",
      description: "Data analysis, machine learning, and insights extraction to drive business decisions.",
      icon: <BarChart3 size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      link: "/services#datascience"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Expertise</h2>
              <p className="text-gray-400 max-w-2xl">
                Specialized skills and technologies I use to create exceptional digital solutions
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
            >
              View all skills
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Specializations Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">What I Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I create innovative digital solutions using modern technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Vue.js", icon: <Code size={32} /> },
              { name: "Golang", icon: <Database size={32} /> },
              { name: "Data Science", icon: <BarChart3 size={32} /> }
            ].map((specialty, index) => (
              <div 
                key={index}
                className="glassmorphism flex flex-col items-center justify-center py-8 px-4 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {specialty.icon}
                </div>
                <h3 className="text-lg font-medium text-white">{specialty.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="https://github.com/Mahathirrr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow mr-4"
            >
              View Projects
              <MoveRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              to="/booking"
              className="inline-flex items-center bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start a Project?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's work together to bring your ideas to life. I'm passionate about creating innovative solutions using Vue.js, Golang, and data science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Contact Me
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://github.com/Mahathirrr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
