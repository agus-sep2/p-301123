
import React, { useEffect } from "react";
import { Mail, Github, Linkedin, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Booking = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life with modern web technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glassmorphism border-green-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send me a message</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        className="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      className="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      className="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="glassmorphism border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Get in touch</CardTitle>
                  <CardDescription className="text-gray-300">
                    I'm always open to discussing new opportunities and interesting projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <a 
                        href="mailto:muhammad.mahathir.id@gmail.com"
                        className="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        muhammad.mahathir.id@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Github className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">GitHub</h3>
                      <a 
                        href="https://github.com/Mahathirrr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        github.com/Mahathirrr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Linkedin className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">LinkedIn</h3>
                      <a 
                        href="https://www.linkedin.com/in/muhammad-mahathir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        Muhammad Mahathir
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Response Time</h3>
                      <p className="text-gray-300">Usually within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">What I can help with</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Vue.js Frontend Development</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Golang Backend Development</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Data Science & Analytics</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>API Development & Integration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Database Design & Optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
