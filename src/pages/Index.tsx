
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { Code, Database, BarChart3, MoveRight } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [services, setServices] = useState([]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .limit(3);
      
      if (servicesData) setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={24} />;
      case 'Database': return <Database size={24} />;
      case 'BarChart3': return <BarChart3 size={24} />;
      default: return <Code size={24} />;
    }
  };

  const featuredServices = services.length > 0 ? services.map(service => ({
    title: service.title,
    description: service.description,
    icon: getIconComponent(service.icon),
    imageSrc: service.image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    link: `/services#${service.title.toLowerCase().replace(/\s+/g, '')}`
  })) : [
    {
      title: "Frontend Development",
      description: "Modern web applications with responsive design and optimal user experience using cutting-edge frameworks.",
      icon: <Code size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      link: "/services#frontend"
    },
    {
      title: "Backend Development",
      description: "Robust and scalable server-side applications with efficient APIs and high-performance architecture.",
      icon: <Database size={24} />,
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      link: "/services#backend"
    },
    {
      title: "Data Science",
      description: "Data analysis, machine learning, and insights extraction to drive informed business decisions.",
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
              className="mt-4 sm:mt-0 flex items-center text-green-400 hover:text-green-300 transition-colors"
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
              { name: "Frontend", icon: <Code size={32} /> },
              { name: "Backend", icon: <Database size={32} /> },
              { name: "Data Science", icon: <BarChart3 size={32} /> }
            ].map((specialty, index) => (
              <div 
                key={index}
                className="glassmorphism flex flex-col items-center justify-center py-8 px-4 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-green-400 mb-4">
                  {specialty.icon}
                </div>
                <h3 className="text-lg font-medium text-white">{specialty.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/booking"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              Get In Touch
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
