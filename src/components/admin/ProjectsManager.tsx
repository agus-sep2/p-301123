
import React, { useState } from 'react';
import { Project } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import FileUpload from './FileUpload';

interface ProjectsManagerProps {
  projects: Project[];
  onCreate: (data: Partial<Project>) => void;
  onUpdate: (id: string, data: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ projects, onCreate, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  const ProjectForm: React.FC<{
    data: Partial<Project>;
    onChange: (data: Partial<Project>) => void;
    onSave: () => void;
    onCancel: () => void;
  }> = ({ data, onChange, onSave, onCancel }) => {
    const [technologiesText, setTechnologiesText] = useState(data.technologies?.join('\n') || '');
    const [categoriesText, setCategoriesText] = useState(data.categories?.join('\n') || '');

    const handleSave = () => {
      const technologies = technologiesText.split('\n').filter(t => t.trim());
      const categories = categoriesText.split('\n').filter(c => c.trim());
      onChange({ 
        ...data, 
        technologies,
        categories: categories.length > 0 ? categories : undefined
      });
      onSave();
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <Input
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Single Category (Legacy)</label>
            <Input
              value={data.category || ''}
              onChange={(e) => onChange({ ...data, category: e.target.value })}
              placeholder="Optional - for backward compatibility"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status (Optional)</label>
            <Input
              value={data.status || ''}
              onChange={(e) => onChange({ ...data, status: e.target.value })}
              placeholder="e.g., Completed, In Progress, or leave empty"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Award/Recognition</label>
            <Input
              value={(data as any).award || ''}
              onChange={(e) => onChange({ ...data, award: e.target.value })}
              placeholder="e.g., 1st Place Innovation Contest, Best Project Award"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
            <Input
              value={data.github_url || ''}
              onChange={(e) => onChange({ ...data, github_url: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
            <Input
              value={data.demo_url || ''}
              onChange={(e) => onChange({ ...data, demo_url: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
        </div>
        
        <FileUpload
          currentImageUrl={data.image_url || undefined}
          onImageChange={(imageUrl) => onChange({ ...data, image_url: imageUrl || undefined })}
          label="Project Image"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <Textarea
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="bg-black/50 border-green-500/20 text-white"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categories (one per line)
              <span className="text-xs text-gray-400 block">e.g., Full Stack, Machine Learning, Web Development</span>
            </label>
            <Textarea
              value={categoriesText}
              onChange={(e) => setCategoriesText(e.target.value)}
              className="bg-black/50 border-green-500/20 text-white min-h-[120px]"
              placeholder="Full Stack&#10;Web Development&#10;Backend&#10;Frontend"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (one per line)</label>
            <Textarea
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              className="bg-black/50 border-green-500/20 text-white min-h-[120px]"
              placeholder="React&#10;TypeScript&#10;Node.js&#10;PostgreSQL"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={onCancel} variant="outline">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Projects Management</h3>
        <Button onClick={() => setShowNewForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {showNewForm && (
        <div className="glassmorphism p-6">
          <h4 className="text-lg font-medium text-white mb-4">New Project</h4>
          <ProjectForm
            data={newProject}
            onChange={setNewProject}
            onSave={() => {
              onCreate(newProject);
              setNewProject({});
              setShowNewForm(false);
            }}
            onCancel={() => {
              setNewProject({});
              setShowNewForm(false);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="glassmorphism p-6">
            {editingId === project.id ? (
              <ProjectForm
                data={project}
                onChange={(data) => onUpdate(project.id, data)}
                onSave={() => setEditingId(null)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    {project.image_url && (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                      
                      {/* Display categories */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories && project.categories.length > 0 ? (
                          project.categories.map((cat, idx) => (
                            <span key={idx} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-sm">
                              {cat}
                            </span>
                          ))
                        ) : project.category ? (
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                            {project.category}
                          </span>
                        ) : (
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-sm">
                            No Category
                          </span>
                        )}
                        
                        {/* Status if exists */}
                        {project.status && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                            {project.status}
                          </span>
                        )}
                      </div>
                      
                      {/* Award if exists */}
                      {(project as any).award && (
                        <p className="text-yellow-400 text-sm">🏆 {(project as any).award}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setEditingId(project.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* URLs */}
                {(project.github_url || project.demo_url) && (
                  <div className="text-sm text-gray-400">
                    {project.github_url && <p><strong>GitHub:</strong> {project.github_url}</p>}
                    {project.demo_url && <p><strong>Demo:</strong> {project.demo_url}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;
