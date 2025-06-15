
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
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
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="glassmorphism p-8">
          <div className="flex items-center mb-4">
            <User className="text-green-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-white">About</h2>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            {personalInfo.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
