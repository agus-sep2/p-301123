
import React, { useEffect } from "react";
import { ExternalLink, Github, Code, Database, BarChart3 } from "lucide-react";

const References = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Vue.js E-Commerce Platform",
      description: "Modern e-commerce application built with Vue.js 3, featuring product catalog, shopping cart, and user authentication.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      category: "Frontend",
      icon: <Code size={20} />,
      technologies: ["Vue.js 3", "Composition API", "Vuex", "SCSS", "Responsive Design"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "Completed"
    },
    {
      id: 2,
      title: "Golang REST API Server",
      description: "High-performance REST API server built with Golang, featuring JWT authentication, database integration, and comprehensive testing.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      category: "Backend",
      icon: <Database size={20} />,
      technologies: ["Golang", "Gin Framework", "PostgreSQL", "JWT", "Docker"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "Completed"
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      description: "Interactive data visualization dashboard for business intelligence, featuring real-time analytics and machine learning insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      category: "Data Science",
      icon: <BarChart3 size={20} />,
      technologies: ["Python", "Pandas", "Plotly", "Scikit-learn", "Streamlit"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "In Progress"
    },
    {
      id: 4,
      title: "Microservices Architecture",
      description: "Scalable microservices system using Golang, with service discovery, load balancing, and distributed tracing.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
      category: "Backend",
      icon: <Database size={20} />,
      technologies: ["Golang", "Docker", "Kubernetes", "gRPC", "Redis"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "Completed"
    },
    {
      id: 5,
      title: "Vue.js Task Management",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
      category: "Frontend",
      icon: <Code size={20} />,
      technologies: ["Vue.js", "Pinia", "Socket.io", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "Completed"
    },
    {
      id: 6,
      title: "Machine Learning Pipeline",
      description: "End-to-end machine learning pipeline for predictive analytics, including data preprocessing, model training, and deployment.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80",
      category: "Data Science",
      icon: <BarChart3 size={20} />,
      technologies: ["Python", "TensorFlow", "Apache Airflow", "MLflow", "AWS"],
      githubUrl: "https://github.com/Mahathirrr",
      status: "In Progress"
    }
  ];

  const categories = ["All", "Frontend", "Backend", "Data Science"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">My Projects</h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100 max-w-3xl mx-auto">
              A showcase of my work in Vue.js frontend development, Golang backend systems, and data science projects. 
              Each project demonstrates my expertise in creating efficient, scalable solutions.
            </p>
            <a
              href="https://github.com/Mahathirrr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow animate-fade-in animation-delay-200"
            >
              <Github className="mr-2 h-5 w-5" />
              View All on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
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
                    ? 'bg-psyco-green-DEFAULT text-white'
                    : 'bg-psyco-black-light text-gray-300 hover:text-white hover:bg-psyco-green-DEFAULT/20'
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
                className="glassmorphism overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-psyco-green-DEFAULT text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      {project.icon}
                      <span className="ml-2">{project.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="bg-psyco-black-light text-psyco-green-DEFAULT px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors font-medium"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to See More?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out my GitHub profile for more projects, contributions, and code samples. 
            I'm always working on something new!
          </p>
          <a
            href="https://github.com/Mahathirrr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 btn-glow"
          >
            <Github className="mr-2 h-5 w-5" />
            Visit My GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default References;
