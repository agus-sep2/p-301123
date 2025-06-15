
import React, { useEffect, useState } from "react";
import { ExternalLink, Github, Code, Database, BarChart3, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Project, PersonalInfo } from "@/types/database";

const References = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsResult, personalResult] = await Promise.all([
        supabase.from('projects').select('*').order('created_at'),
        supabase.from('personal_info').select('*').single()
      ]);

      if (projectsResult.data) setProjects(projectsResult.data);
      if (personalResult.data) setPersonalInfo(personalResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "bg-blue-500/90 text-white";
      case "Backend":
        return "bg-purple-500/90 text-white";
      case "Data Science":
        return "bg-orange-500/90 text-white";
      default:
        return "bg-green-500/90 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Completed' 
      ? 'bg-green-500/90 text-white' 
      : 'bg-yellow-500/90 text-white';
  };

  const getIconComponent = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code size={20} />;
      case "Backend":
        return <Database size={20} />;
      case "Data Science":
        return <BarChart3 size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">My Projects</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100 max-w-3xl mx-auto">
              A showcase of my work in modern web development, scalable backend systems, and data science solutions. 
              Each project demonstrates expertise in creating efficient, maintainable software.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 md:px-12 border-b border-green-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white'
                    : 'bg-psyco-black-light text-gray-300 hover:text-white hover:bg-green-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="glassmorphism overflow-hidden animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"}
                    alt={project.title}
                    className="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg ${getCategoryColor(project.category)}`}>
                      {getIconComponent(project.category)}
                      <span className="ml-2">{project.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                    {(project as any).award && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                        <Award size={12} />
                        Outstanding
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {(project as any).award && (
                      <div className="ml-2">
                        <div className="text-yellow-400" title={(project as any).award}>
                          <Award size={16} />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {(project as any).award && (
                    <div className="mb-3">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400 text-xs">
                        🏆 {(project as any).award}
                      </Badge>
                    </div>
                  )}
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="bg-psyco-black-light text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors font-medium"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Single GitHub CTA - strategically placed */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore More Projects</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit my GitHub profile to see additional projects, code contributions, and open source work.
          </p>
          {personalInfo?.github_url && (
            <a
              href={personalInfo.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              <Github className="mr-2 h-5 w-5" />
              Visit GitHub Profile
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default References;
