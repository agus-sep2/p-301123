import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo, Service, Project } from "@/types/database";
import { Plus, Edit, Trash2, Save, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminContent = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({});
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [showNewService, setShowNewService] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [personalResult, servicesResult, projectsResult] = await Promise.all([
        supabase.from('personal_info').select('*').single(),
        supabase.from('services').select('*').order('created_at'),
        supabase.from('projects').select('*').order('created_at')
      ]);

      if (personalResult.data) setPersonalInfo(personalResult.data);
      if (servicesResult.data) setServices(servicesResult.data);
      if (projectsResult.data) setProjects(projectsResult.data);
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
      setEditingPersonal(false);
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
      setNewService({});
      setShowNewService(false);
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
      setEditingService(null);
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
      setNewProject({});
      setShowNewProject(false);
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
      setEditingProject(null);
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-400">Portfolio Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {user?.email}</span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Personal Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          {personalInfo && (
            <div className="glassmorphism p-6">
              {editingPersonal ? (
                <PersonalInfoForm 
                  data={personalInfo}
                  onSave={updatePersonalInfo}
                  onCancel={() => setEditingPersonal(false)}
                />
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p><strong>Name:</strong> {personalInfo.name}</p>
                      <p><strong>Title:</strong> {personalInfo.title}</p>
                      <p><strong>Email:</strong> {personalInfo.email}</p>
                    </div>
                    <div>
                      <p><strong>GitHub:</strong> {personalInfo.github_url}</p>
                      <p><strong>LinkedIn:</strong> {personalInfo.linkedin_url}</p>
                    </div>
                  </div>
                  <p><strong>Description:</strong> {personalInfo.description}</p>
                  <Button 
                    onClick={() => setEditingPersonal(true)}
                    className="mt-4"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Services</h2>
            <Button onClick={() => setShowNewService(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
          
          {showNewService && (
            <div className="glassmorphism p-6 mb-4">
              <ServiceForm 
                data={newService}
                onChange={setNewService}
                onSave={createService}
                onCancel={() => setShowNewService(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <div key={service.id} className="glassmorphism p-6">
                {editingService === service.id ? (
                  <ServiceForm 
                    data={service}
                    onChange={(data) => updateService(service.id, data)}
                    onSave={(data) => updateService(service.id, data)}
                    onCancel={() => setEditingService(null)}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <p className="text-green-400">{service.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => setEditingService(service.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="mb-2">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <Button onClick={() => setShowNewProject(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>

          {showNewProject && (
            <div className="glassmorphism p-6 mb-4">
              <ProjectForm 
                data={newProject}
                onChange={setNewProject}
                onSave={createProject}
                onCancel={() => setShowNewProject(false)}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="glassmorphism p-6">
                {editingProject === project.id ? (
                  <ProjectForm 
                    data={project}
                    onChange={(data) => updateProject(project.id, data)}
                    onSave={(data) => updateProject(project.id, data)}
                    onCancel={() => setEditingProject(null)}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-green-400">{project.category} - {project.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => setEditingProject(project.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.github_url && (
                      <p><strong>GitHub:</strong> {project.github_url}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Personal Info Form Component
const PersonalInfoForm: React.FC<{
  data: PersonalInfo;
  onSave: (data: Partial<PersonalInfo>) => void;
  onCancel: () => void;
}> = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = useState(data);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
        />
        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <Input
          value={formData.github_url || ''}
          onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          placeholder="GitHub URL"
        />
        <Input
          value={formData.linkedin_url || ''}
          onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
          placeholder="LinkedIn URL"
        />
      </div>
      <Textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Service Form Component
const ServiceForm: React.FC<{
  data: Partial<Service>;
  onChange: (data: Partial<Service>) => void;
  onSave: (data: Partial<Service>) => void;
  onCancel: () => void;
}> = ({ data, onChange, onSave, onCancel }) => {
  const [featuresText, setFeaturesText] = useState(data.features?.join('\n') || '');

  const handleSave = () => {
    const features = featuresText.split('\n').filter(f => f.trim());
    onSave({ ...data, features });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Title"
        />
        <Input
          value={data.category || ''}
          onChange={(e) => onChange({ ...data, category: e.target.value })}
          placeholder="Category"
        />
        <Input
          value={data.icon || ''}
          onChange={(e) => onChange({ ...data, icon: e.target.value })}
          placeholder="Icon (Lucide icon name)"
        />
        <Input
          value={data.image_url || ''}
          onChange={(e) => onChange({ ...data, image_url: e.target.value })}
          placeholder="Image URL"
        />
      </div>
      <Textarea
        value={data.description || ''}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
        placeholder="Description"
        className="mb-4"
      />
      <Textarea
        value={featuresText}
        onChange={(e) => setFeaturesText(e.target.value)}
        placeholder="Features (one per line)"
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Project Form Component
const ProjectForm: React.FC<{
  data: Partial<Project>;
  onChange: (data: Partial<Project>) => void;
  onSave: (data: Partial<Project>) => void;
  onCancel: () => void;
}> = ({ data, onChange, onSave, onCancel }) => {
  const [technologiesText, setTechnologiesText] = useState(data.technologies?.join('\n') || '');

  const handleSave = () => {
    const technologies = technologiesText.split('\n').filter(t => t.trim());
    onSave({ ...data, technologies });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder="Title"
        />
        <Input
          value={data.category || ''}
          onChange={(e) => onChange({ ...data, category: e.target.value })}
          placeholder="Category"
        />
        <Input
          value={data.status || ''}
          onChange={(e) => onChange({ ...data, status: e.target.value })}
          placeholder="Status"
        />
        <Input
          value={data.image_url || ''}
          onChange={(e) => onChange({ ...data, image_url: e.target.value })}
          placeholder="Image URL"
        />
        <Input
          value={data.github_url || ''}
          onChange={(e) => onChange({ ...data, github_url: e.target.value })}
          placeholder="GitHub URL"
        />
        <Input
          value={data.demo_url || ''}
          onChange={(e) => onChange({ ...data, demo_url: e.target.value })}
          placeholder="Demo URL"
        />
      </div>
      <Textarea
        value={data.description || ''}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
        placeholder="Description"
        className="mb-4"
      />
      <Textarea
        value={technologiesText}
        onChange={(e) => setTechnologiesText(e.target.value)}
        placeholder="Technologies (one per line)"
        className="mb-4"
      />
      <div className="flex gap-2">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
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
