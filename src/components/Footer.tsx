
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Github, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PersonalInfo } from '@/types/database';

const Footer = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      const { data } = await supabase
        .from('personal_info')
        .select('*')
        .single();
      
      if (data) setPersonalInfo(data);
    } catch (error) {
      console.error('Error fetching personal info:', error);
    }
  };

  if (!personalInfo) return null;

  return (
    <footer className="bg-black border-t border-green-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
              {personalInfo.name}
            </h2>
            <p className="text-gray-300 max-w-md">
              {personalInfo.description}
            </p>
            <div className="flex space-x-4 pt-2">
              {personalInfo.github_url && (
                <a 
                  href={personalInfo.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {personalInfo.linkedin_url && (
                <a 
                  href={personalInfo.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Skills
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/references" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/booking" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-green-500" />
                <span>{personalInfo.email}</span>
              </li>
              {personalInfo.github_url && (
                <li className="flex items-center space-x-3 text-gray-300">
                  <Github size={16} className="text-green-500" />
                  <a 
                    href={personalInfo.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    GitHub Profile
                  </a>
                </li>
              )}
              {personalInfo.linkedin_url && (
                <li className="flex items-center space-x-3 text-gray-300">
                  <Linkedin size={16} className="text-green-500" />
                  <a 
                    href={personalInfo.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/10 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
