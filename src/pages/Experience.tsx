import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Experience, Education, SiteSetting } from '@/types/database';
import { Calendar, MapPin, Building, Users, ExternalLink, GraduationCap, Award } from 'lucide-react';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [experiencesResult, educationResult, settingsResult] = await Promise.all([
        supabase
          .from('experiences')
          .select('*')
          .order('start_date', { ascending: false }),
        supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false }),
        supabase
          .from('site_settings')
          .select('*')
      ]);

      if (experiencesResult.error) throw experiencesResult.error;
      if (educationResult.error) throw educationResult.error;
      if (settingsResult.error) throw settingsResult.error;

      setExperiences(experiencesResult.data || []);
      setEducation(educationResult.data || []);
      setSettings(settingsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const getSetting = (key: string) => {
    return settings.find(s => s.setting_key === key)?.setting_value ?? true;
  };

  const showExperience = getSetting('show_experience_section');
  const showEducation = getSetting('show_education_section');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black flex items-center justify-center pt-24">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black pt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-green-400">Journey</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive look at my professional experience and educational background
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Experience Section */}
          {showExperience && experiences.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <Building className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
              </div>
              <div className="space-y-8">
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
            </section>
          )}

          {/* Education Section */}
          {showEducation && education.length > 0 && (
            <section>
              <div className="flex items-center mb-8">
                <GraduationCap className="h-6 w-6 text-green-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Education</h2>
              </div>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={edu.id} className="glassmorphism p-8 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center text-green-400 text-lg font-semibold mb-2">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          {edu.institution}
                        </div>
                        {edu.field_of_study && (
                          <p className="text-gray-300 mb-4">{edu.field_of_study}</p>
                        )}
                      </div>
                      <div className="flex flex-col md:items-end space-y-2">
                        {edu.grade && (
                          <div className="flex items-center text-gray-300">
                            <Award className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{edu.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {formatDate(edu.start_date)} - {
                          edu.is_current 
                            ? 'Present' 
                            : edu.end_date 
                              ? formatDate(edu.end_date)
                              : 'Present'
                        }
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    {edu.activities && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Activities:</h4>
                        <p className="text-gray-300">{edu.activities}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Show message if both sections are hidden */}
          {!showExperience && !showEducation && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-400 mb-4">No Content Available</h2>
              <p className="text-gray-500">
                Experience and education sections are currently disabled.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
