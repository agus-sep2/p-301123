
import React, { useState } from 'react';
import { Experience } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ExperienceManagerProps {
  experiences: Experience[];
  onCreate: (data: Partial<Experience>) => void;
  onUpdate: (id: string, data: Partial<Experience>) => void;
  onDelete: (id: string) => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({
  experiences,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '',
    employment_type: 'Full-time',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    skills: []
  });

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

  const handleCreate = () => {
    onCreate(formData);
    setFormData({
      title: '',
      company: '',
      location: '',
      employment_type: 'Full-time',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      skills: []
    });
    setIsCreating(false);
  };

  const handleUpdate = (id: string) => {
    onUpdate(id, formData);
    setEditingId(null);
    setFormData({
      title: '',
      company: '',
      location: '',
      employment_type: 'Full-time',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      skills: []
    });
  };

  const startEdit = (experience: Experience) => {
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location || '',
      employment_type: experience.employment_type,
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      is_current: experience.is_current || false,
      description: experience.description || '',
      skills: experience.skills || []
    });
    setEditingId(experience.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="glassmorphism p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Experience Management</h3>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="mb-8 p-6 bg-black/30 rounded-lg border border-green-500/20">
          <h4 className="text-lg font-medium text-white mb-4">Add New Experience</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <Input
                value={formData.company || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Tech Company Inc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <Input
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Jakarta, Indonesia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type</label>
              <Select
                value={formData.employment_type || 'Full-time'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, employment_type: value }))}
              >
                <SelectTrigger className="bg-black/50 border-green-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <Input
                type="date"
                value={formData.start_date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <Input
                type="date"
                value={formData.end_date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                disabled={formData.is_current}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={formData.is_current || false}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  is_current: e.target.checked,
                  end_date: e.target.checked ? '' : prev.end_date
                }))}
                className="mr-2"
              />
              Currently working here
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-black/50 border-green-500/20 text-white min-h-[100px]"
              placeholder="Describe your role and responsibilities..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma separated)</label>
            <Input
              value={(formData.skills || []).join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="bg-black/50 border-green-500/20 text-white"
              placeholder="e.g., React, Node.js, PostgreSQL"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save Experience
            </Button>
            <Button onClick={() => setIsCreating(false)} variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-green-500/20">
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Period</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience.id} className="border-green-500/10 hover:bg-green-500/5">
                {editingId === experience.id ? (
                  <TableCell colSpan={5} className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          value={formData.title || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Job Title"
                        />
                        <Input
                          value={formData.company || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Company"
                        />
                        <Input
                          value={formData.location || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Location"
                        />
                        <Select
                          value={formData.employment_type || 'Full-time'}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, employment_type: value }))}
                        >
                          <SelectTrigger className="bg-black/50 border-green-500/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {employmentTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="date"
                          value={formData.start_date || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                        />
                        <Input
                          type="date"
                          value={formData.end_date || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          disabled={formData.is_current}
                        />
                      </div>
                      <label className="flex items-center text-gray-300">
                        <input
                          type="checkbox"
                          checked={formData.is_current || false}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            is_current: e.target.checked,
                            end_date: e.target.checked ? '' : prev.end_date
                          }))}
                          className="mr-2"
                        />
                        Currently working here
                      </label>
                      <Textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-black/50 border-green-500/20 text-white"
                        placeholder="Description"
                      />
                      <Input
                        value={(formData.skills || []).join(', ')}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        className="bg-black/50 border-green-500/20 text-white"
                        placeholder="Skills (comma separated)"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => handleUpdate(experience.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                ) : (
                  <>
                    <TableCell className="text-white font-medium">{experience.title}</TableCell>
                    <TableCell className="text-gray-300">{experience.company}</TableCell>
                    <TableCell className="text-gray-300">{experience.employment_type}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(experience.start_date)} - {
                        experience.is_current 
                          ? 'Present' 
                          : experience.end_date 
                            ? formatDate(experience.end_date)
                            : 'Present'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(experience)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => onDelete(experience.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExperienceManager;
