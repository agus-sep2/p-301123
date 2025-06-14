
import React, { useEffect } from "react";
import { Code, Database, BarChart3, Server, Globe, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainServices = [
    {
      id: "frontend",
      icon: <Code size={32} />,
      title: "Frontend Development",
      description: "Building modern, responsive web applications using Vue.js. Creating interactive user interfaces with clean, maintainable code and optimal performance.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      features: [
        "Vue.js 3 & Composition API",
        "Responsive Design",
        "Modern CSS & SCSS",
        "Component-Based Architecture",
        "State Management (Vuex/Pinia)",
        "Performance Optimization"
      ]
    },
    {
      id: "backend",
      icon: <Database size={32} />,
      title: "Backend Development",
      description: "Developing robust and scalable backend systems using Golang. Building efficient APIs, microservices, and server-side applications with high performance.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      features: [
        "Golang (Go)",
        "RESTful APIs",
        "Microservices Architecture",
        "Database Design & Optimization",
        "Concurrent Programming",
        "Performance & Scalability"
      ]
    },
    {
      id: "datascience",
      icon: <BarChart3 size={32} />,
      title: "Data Science",
      description: "Extracting insights from data through analysis, machine learning, and statistical modeling. Helping businesses make data-driven decisions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      features: [
        "Python & R",
        "Machine Learning",
        "Data Analysis & Visualization",
        "Statistical Modeling",
        "Data Pipeline Development",
        "Business Intelligence"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: <Server size={24} />,
      title: "API Development",
      description: "RESTful APIs and microservices using Golang."
    },
    {
      icon: <Globe size={24} />,
      title: "Web Optimization",
      description: "Performance optimization and SEO improvements."
    },
    {
      icon: <Database size={24} />,
      title: "Database Design",
      description: "Efficient database architecture and optimization."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">My Skills & Expertise</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Specialized in Vue.js frontend development, Golang backend systems, and data science. 
              I create efficient, scalable solutions that drive business value.
            </p>
            <a
              href="https://github.com/Mahathirrr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow animate-fade-in animation-delay-200"
            >
              View Projects
              <MoveRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">What I Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive development solutions using modern technologies
            </p>
          </div>
          
          {mainServices.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-20 last:mb-0 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-full lg:w-1/2">
                <div className="glassmorphism p-1 rounded-2xl h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="object-cover w-full h-full aspect-video lg:aspect-auto transition-transform duration-10000 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="text-psyco-green-DEFAULT mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <div className="bg-psyco-black-light rounded-xl p-6">
                  <h4 className="text-lg font-medium text-white mb-4">Technologies & Skills:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="text-psyco-green-DEFAULT mt-1 mr-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66675 10.1148L12.7947 3.98608L13.7381 4.92875L6.66675 12.0001L2.42675 7.76008L3.36941 6.81741L6.66675 10.1148Z" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Additional Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Supporting services to enhance your digital projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glassmorphism p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Let's collaborate to bring your ideas to life using Vue.js, Golang, and data science expertise.
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
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
