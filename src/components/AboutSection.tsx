
import React, { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { PersonalInfo } from '@/types/database';

const AboutSection = () => {
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
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphism p-8 md:p-12">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <User className="text-green-400 mr-3" size={28} />
              <h2 className="text-3xl font-bold text-white">About Me</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  {personalInfo.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {personalInfo.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-green-500/10">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <Award className="text-green-400 mr-2" size={20} />
                    Expertise Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Frontend Development', 'Backend Development', 'Data Science', 'Machine Learning'].map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white flex items-center">
                    <Calendar className="text-green-400 mr-2" size={20} />
                    Professional Focus
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Passionate about creating innovative digital solutions that bridge the gap between complex technical challenges and user-friendly experiences.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-green-500/10">
                <p className="text-gray-400 text-sm">
                  Ready to collaborate on your next project? Let's build something amazing together.
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
