
import React, { useState } from 'react';
import { Project } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import FileUpload from './FileUpload';

interface ProjectsManagerProps {
  projects: Project[];
  onCreate: (data: Partial<Project>) => void;
  onUpdate: (id: string, data: Partial<Project>) => void;
  onDelete: (id: string) => void;
}

const availableCategories = [
  'Full Stack',
  'Web Development', 
  'Backend',
  'Frontend',
  'Machine Learning',
  'AI',
  'Mobile Development',
  'DevOps',
  'Cloud',
  'Desktop',
  'API Development',
  'Database Design',
  'Automation'
];

const availableStatuses = [
  'Completed',
  'In Progress',
  'On Hold',
  'Planning',
  'Deployed',
  'Prototype'
];

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
        technologies: technologies.length > 0 ? technologies : [],
        categories: categories.length > 0 ? categories : undefined
      });
      onSave();
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
            <Input
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
              placeholder="Project Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Single Category (Legacy - Optional)</label>
            <Select value={data.category || ''} onValueChange={(value) => onChange({ ...data, category: value || undefined })}>
              <SelectTrigger className="bg-black/50 border-green-500/20 text-white">
                <SelectValue placeholder="Select category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Category</SelectItem>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status (Optional)</label>
            <Select value={data.status || ''} onValueChange={(value) => onChange({ ...data, status: value || undefined })}>
              <SelectTrigger className="bg-black/50 border-green-500/20 text-white">
                <SelectValue placeholder="Select status (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Status</SelectItem>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Award/Recognition (Optional)</label>
            <Input
              value={data.award || ''}
              onChange={(e) => onChange({ ...data, award: e.target.value || undefined })}
              placeholder="e.g., 1st Place, Finalist, Best Innovation Award (optional)"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL (Optional)</label>
            <Input
              value={data.github_url || ''}
              onChange={(e) => onChange({ ...data, github_url: e.target.value || undefined })}
              placeholder="https://github.com/username/repo (optional)"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL (Optional)</label>
            <Input
              value={data.demo_url || ''}
              onChange={(e) => onChange({ ...data, demo_url: e.target.value || undefined })}
              placeholder="https://demo.example.com (optional)"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
        </div>
        
        <FileUpload
          currentImageUrl={data.image_url || undefined}
          onImageChange={(imageUrl) => onChange({ ...data, image_url: imageUrl || undefined })}
          label="Project Image (Optional)"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
          <Textarea
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="bg-black/50 border-green-500/20 text-white"
            placeholder="Describe your project..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categories (one per line) - Optional
              <span className="text-xs text-gray-400 block">Select from available categories or type custom ones</span>
            </label>
            <Textarea
              value={categoriesText}
              onChange={(e) => setCategoriesText(e.target.value)}
              className="bg-black/50 border-green-500/20 text-white min-h-[120px]"
              placeholder="Full Stack&#10;Machine Learning&#10;Web Development&#10;Backend"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    const currentCategories = categoriesText.split('\n').filter(c => c.trim());
                    if (!currentCategories.includes(cat)) {
                      setCategoriesText(currentCategories.concat(cat).join('\n'));
                    }
                  }}
                  className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded hover:bg-green-500/30"
                >
                  + {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (one per line) - Optional</label>
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
                      {project.award && (
                        <p className="text-yellow-400 text-sm">🏆 {project.award}</p>
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
