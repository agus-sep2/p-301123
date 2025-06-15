import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo, Service, Project, Experience, Education, SiteSetting } from "@/types/database";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PersonalInfoManager from "@/components/admin/PersonalInfoManager";
import ServicesManager from "@/components/admin/ServicesManager";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import EducationManager from "@/components/admin/EducationManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";

const AdminContent = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [personalResult, servicesResult, projectsResult, experiencesResult, educationResult, settingsResult] = await Promise.all([
        supabase.from('personal_info').select('*').single(),
        supabase.from('services').select('*').order('created_at'),
        supabase.from('projects').select('*').order('created_at'),
        supabase.from('experiences').select('*').order('start_date', { ascending: false }),
        supabase.from('education').select('*').order('start_date', { ascending: false }),
        supabase.from('site_settings').select('*')
      ]);

      if (personalResult.data) setPersonalInfo(personalResult.data);
      if (servicesResult.data) setServices(servicesResult.data);
      if (projectsResult.data) setProjects(projectsResult.data);
      if (experiencesResult.data) setExperiences(experiencesResult.data);
      if (educationResult.data) setEducation(educationResult.data);
      if (settingsResult.data) setSettings(settingsResult.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Success",
      description: "Successfully logged out"
    });
  };

  const updatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    if (!personalInfo) return;
    
    try {
      const { error } = await supabase
        .from('personal_info')
        .update(data)
        .eq('id', personalInfo.id);

      if (error) throw error;

      setPersonalInfo({ ...personalInfo, ...data });
      toast({
        title: "Success",
        description: "Personal information updated successfully"
      });
    } catch (error) {
      console.error('Error updating personal info:', error);
      toast({
        title: "Error",
        description: "Failed to update personal information",
        variant: "destructive"
      });
    }
  };

  const createService = async (data: Partial<Service>) => {
    try {
      const { data: newServiceData, error } = await supabase
        .from('services')
        .insert([{
          title: data.title || '',
          description: data.description || '',
          icon: data.icon || 'Code',
          category: data.category || '',
          image_url: data.image_url || '',
          features: data.features || []
        }])
        .select()
        .single();

      if (error) throw error;

      setServices([...services, newServiceData]);
      toast({
        title: "Success",
        description: "Service created successfully"
      });
    } catch (error) {
      console.error('Error creating service:', error);
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive"
      });
    }
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      setServices(services.map(s => s.id === id ? { ...s, ...data } : s));
      toast({
        title: "Success",
        description: "Service updated successfully"
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive"
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(services.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Service deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const createProject = async (data: Partial<Project>) => {
    try {
      const { data: newProjectData, error } = await supabase
        .from('projects')
        .insert([{
          title: data.title || '',
          description: data.description || '',
          image_url: data.image_url || '',
          category: data.category || '',
          status: data.status || 'Completed',
          technologies: data.technologies || [],
          github_url: data.github_url || '',
          demo_url: data.demo_url || ''
        }])
        .select()
        .single();

      if (error) throw error;

      setProjects([...projects, newProjectData]);
      toast({
        title: "Success",
        description: "Project created successfully"
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.map(p => p.id === id ? { ...p, ...data } : p));
      toast({
        title: "Success",
        description: "Project updated successfully"
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const createExperience = async (data: Partial<Experience>) => {
    try {
      const { data: newExperienceData, error } = await supabase
        .from('experiences')
        .insert([{
          title: data.title || '',
          company: data.company || '',
          location: data.location || '',
          employment_type: data.employment_type || 'Full-time',
          start_date: data.start_date || '',
          end_date: data.end_date || null,
          is_current: data.is_current || false,
          description: data.description || '',
          skills: data.skills || []
        }])
        .select()
        .single();

      if (error) throw error;

      setExperiences([...experiences, newExperienceData]);
      toast({
        title: "Success",
        description: "Experience created successfully"
      });
    } catch (error) {
      console.error('Error creating experience:', error);
      toast({
        title: "Error",
        description: "Failed to create experience",
        variant: "destructive"
      });
    }
  };

  const updateExperience = async (id: string, data: Partial<Experience>) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      setExperiences(experiences.map(e => e.id === id ? { ...e, ...data } : e));
      toast({
        title: "Success",
        description: "Experience updated successfully"
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: "Error",
        description: "Failed to update experience",
        variant: "destructive"
      });
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExperiences(experiences.filter(e => e.id !== id));
      toast({
        title: "Success",
        description: "Experience deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive"
      });
    }
  };

  const createEducation = async (data: Partial<Education>) => {
    try {
      const { data: newEducationData, error } = await supabase
        .from('education')
        .insert([{
          institution: data.institution || '',
          degree: data.degree || '',
          field_of_study: data.field_of_study || '',
          start_date: data.start_date || '',
          end_date: data.end_date || null,
          is_current: data.is_current || false,
          grade: data.grade || '',
          activities: data.activities || '',
          description: data.description || ''
        }])
        .select()
        .single();

      if (error) throw error;

      setEducation([...education, newEducationData]);
      toast({
        title: "Success",
        description: "Education created successfully"
      });
    } catch (error) {
      console.error('Error creating education:', error);
      toast({
        title: "Error",
        description: "Failed to create education",
        variant: "destructive"
      });
    }
  };

  const updateEducation = async (id: string, data: Partial<Education>) => {
    try {
      const { error } = await supabase
        .from('education')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      setEducation(education.map(e => e.id === id ? { ...e, ...data } : e));
      toast({
        title: "Success",
        description: "Education updated successfully"
      });
    } catch (error) {
      console.error('Error updating education:', error);
      toast({
        title: "Error",
        description: "Failed to update education",
        variant: "destructive"
      });
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEducation(education.filter(e => e.id !== id));
      toast({
        title: "Success",
        description: "Education deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting education:', error);
      toast({
        title: "Error",
        description: "Failed to delete education",
        variant: "destructive"
      });
    }
  };

  const updateSiteSetting = async (settingKey: string, value: boolean) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: settingKey,
          setting_value: value
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSettings(prev => {
        const existing = prev.find(s => s.setting_key === settingKey);
        if (existing) {
          return prev.map(s => s.setting_key === settingKey ? { ...s, setting_value: value } : s);
        } else {
          return [...prev, {
            id: '', // Will be populated by database
            setting_key: settingKey,
            setting_value: value,
            description: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }];
        }
      });

      toast({
        title: "Success",
        description: "Setting updated successfully"
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Portfolio Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {user?.email}</span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          <SiteSettingsManager
            settings={settings}
            onUpdate={updateSiteSetting}
          />

          <PersonalInfoManager 
            personalInfo={personalInfo}
            onUpdate={updatePersonalInfo}
          />

          <ServicesManager
            services={services}
            onCreate={createService}
            onUpdate={updateService}
            onDelete={deleteService}
          />

          <ProjectsManager
            projects={projects}
            onCreate={createProject}
            onUpdate={updateProject}
            onDelete={deleteProject}
          />

          <ExperienceManager
            experiences={experiences}
            onCreate={createExperience}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
          />

          <EducationManager
            education={education}
            onCreate={createEducation}
            onUpdate={updateEducation}
            onDelete={deleteEducation}
          />
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default Admin;
