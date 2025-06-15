
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/database';
import { Calendar, MapPin, Building, Users, ExternalLink } from 'lucide-react';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
  };

  const getEmploymentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return <Users className="h-4 w-4" />;
      case 'part-time':
        return <Users className="h-4 w-4" />;
      case 'internship':
        return <ExternalLink className="h-4 w-4" />;
      case 'freelance':
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading experiences...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-green-400">Experience</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A journey through my professional career and the experiences that shaped my expertise
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="glassmorphism p-8 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center text-green-400 text-lg font-semibold mb-4">
                    <Building className="h-5 w-5 mr-2" />
                    {experience.company}
                  </div>
                </div>
                <div className="flex flex-col md:items-end space-y-2">
                  <div className="flex items-center text-gray-300">
                    {getEmploymentTypeIcon(experience.employment_type)}
                    <span className="ml-2 text-sm font-medium">
                      {experience.employment_type}
                    </span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{experience.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center text-gray-400 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {formatDate(experience.start_date)} - {
                    experience.is_current 
                      ? 'Present' 
                      : experience.end_date 
                        ? formatDate(experience.end_date)
                        : 'Present'
                  }
                </span>
              </div>

              {experience.description && (
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {experience.description}
                </p>
              )}

              {experience.skills && experience.skills.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-3">Skills & Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
