
import React, { useEffect, useState } from "react";
import { ExternalLink, Github, Code, Database, BarChart3, Award, Globe, Cpu, Monitor, Server } from "lucide-react";
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

  // Get all unique categories from both categories array and category field
  const getAllCategories = () => {
    const categoriesSet = new Set<string>();
    projects.forEach(project => {
      // Add from categories array
      if (project.categories) {
        project.categories.forEach(cat => categoriesSet.add(cat));
      }
      // Add from single category field (for backward compatibility)
      if (project.category) {
        categoriesSet.add(project.category);
      }
    });
    return Array.from(categoriesSet);
  };

  const categories = ["All", ...getAllCategories()];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => {
        // Check in categories array or single category field
        return (project.categories && project.categories.includes(selectedCategory)) ||
               project.category === selectedCategory;
      });

  // Separate award-winning projects from regular projects
  const awardProjects = filteredProjects.filter(project => project.award);
  const regularProjects = filteredProjects.filter(project => !project.award);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
      case "Web Development":
        return "bg-blue-500 text-white";
      case "Backend":
      case "API Development":
        return "bg-purple-500 text-white";
      case "Full Stack":
        return "bg-green-500 text-white";
      case "Machine Learning":
      case "AI":
        return "bg-orange-500 text-white";
      case "Mobile Development":
        return "bg-pink-500 text-white";
      case "DevOps":
      case "Cloud":
        return "bg-cyan-500 text-white";
      case "Desktop":
        return "bg-gray-500 text-white";
      default:
        return "bg-slate-500 text-white";
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
      case "Web Development":
        return <Monitor size={20} />;
      case "Backend":
      case "API Development":
        return <Server size={20} />;
      case "Full Stack":
        return <Globe size={20} />;
      case "Machine Learning":
      case "AI":
        return <Cpu size={20} />;
      case "Mobile Development":
        return <Monitor size={20} />;
      case "DevOps":
      case "Cloud":
        return <Database size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  // Get primary category for display (first in categories array or fallback to category field)
  const getPrimaryCategory = (project: Project) => {
    if (project.categories && project.categories.length > 0) {
      return project.categories[0];
    }
    return project.category || "General";
  };

  // Get all categories for a project
  const getProjectCategories = (project: Project) => {
    if (project.categories && project.categories.length > 0) {
      return project.categories;
    }
    return project.category ? [project.category] : [];
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
              A showcase of my work in modern web development, scalable backend systems, and innovative technology solutions. 
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

      {/* Projects Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Award-Winning Projects - Featured Section */}
          {awardProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
                <Award size={32} className="text-yellow-400" />
                Award-Winning Projects
              </h2>
              <div className="space-y-12">
                {awardProjects.map((project, index) => {
                  const primaryCategory = getPrimaryCategory(project);
                  const allCategories = getProjectCategories(project);
                  
                  return (
                    <div 
                      key={project.id}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-psyco-black-light to-psyco-black border-2 border-yellow-400/30 animate-fade-in hover:scale-[1.01] transition-all duration-500 shadow-2xl"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Award Badge - Floating */}
                      <div className="absolute top-6 left-6 z-30">
                        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-full text-lg flex items-center gap-3 shadow-2xl animate-pulse-glow">
                          <Award size={24} />
                          <span>Award Winner</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
                        {/* Image Section */}
                        <div className="relative h-80 lg:h-full overflow-hidden">
                          <img
                            src={project.image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"}
                            alt={project.title}
                            className="object-cover h-full w-full transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

                          {/* Categories Section - Bottom Left */}
                          <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2">
                            {allCategories.map((cat, idx) => (
                              <div 
                                key={idx}
                                className={`backdrop-blur-md px-3 py-2 rounded-full text-sm font-medium flex items-center shadow-lg ${getCategoryColor(cat)}`}
                              >
                                {getIconComponent(cat)}
                                <span className="ml-2">{cat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="mb-6">
                            <h3 className="text-4xl font-bold text-white leading-tight mb-4">{project.title}</h3>
                            
                            {/* Award Details */}
                            <div className="mb-6">
                              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 text-yellow-400 font-bold px-6 py-3 rounded-xl text-lg flex items-center gap-3 backdrop-blur-sm">
                                <Award size={20} />
                                {project.award}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-8 text-lg leading-relaxed">{project.description}</p>
                          
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold text-white mb-4">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-3">
                              {project.technologies?.map((tech, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/30 backdrop-blur-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-6">
                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-green-400 hover:text-green-300 transition-all duration-300 font-medium text-lg group"
                              >
                                <Github className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                                Source Code
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            )}
                            {project.demo_url && (
                              <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium text-lg group"
                              >
                                <ExternalLink className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Projects Grid */}
          {regularProjects.length > 0 && (
            <div>
              {awardProjects.length > 0 && (
                <h2 className="text-2xl font-bold text-white mb-8">Other Projects</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, index) => {
                  const primaryCategory = getPrimaryCategory(project);
                  const allCategories = getProjectCategories(project);
                  
                  return (
                    <div 
                      key={project.id}
                      className="glassmorphism overflow-hidden animate-fade-in hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: `${(index + awardProjects.length) * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image_url || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80"}
                          alt={project.title}
                          className="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        {/* Categories */}
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1">
                          {allCategories.slice(0, 2).map((cat, idx) => (
                            <div 
                              key={idx}
                              className={`backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg ${getCategoryColor(cat)}`}
                            >
                              {getIconComponent(cat)}
                              <span className="ml-1">{cat}</span>
                            </div>
                          ))}
                          {allCategories.length > 2 && (
                            <div className="backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white shadow-lg">
                              +{allCategories.length - 2}
                            </div>
                          )}
                        </div>
                        
                        {/* Status - only show if exists */}
                        {project.status && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg ${getStatusColor(project.status)}`}>
                              {project.status}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                        
                        {project.technologies && project.technologies.length > 0 && (
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
                        )}
                        
                        <div className="flex gap-4">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors font-medium text-sm"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Source
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          )}
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
