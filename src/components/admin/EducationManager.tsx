
import React, { useState } from 'react';
import { Education } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface EducationManagerProps {
  education: Education[];
  onCreate: (data: Partial<Education>) => void;
  onUpdate: (id: string, data: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({
  education,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    is_current: false,
    grade: '',
    activities: '',
    description: ''
  });

  const handleCreate = () => {
    onCreate(formData);
    setFormData({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      is_current: false,
      grade: '',
      activities: '',
      description: ''
    });
    setIsCreating(false);
  };

  const handleUpdate = (id: string) => {
    onUpdate(id, formData);
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      is_current: false,
      grade: '',
      activities: '',
      description: ''
    });
  };

  const startEdit = (edu: Education) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study || '',
      start_date: edu.start_date,
      end_date: edu.end_date || '',
      is_current: edu.is_current || false,
      grade: edu.grade || '',
      activities: edu.activities || '',
      description: edu.description || ''
    });
    setEditingId(edu.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="glassmorphism p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Education Management</h3>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="mb-8 p-6 bg-black/30 rounded-lg border border-green-500/20">
          <h4 className="text-lg font-medium text-white mb-4">Add New Education</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
              <Input
                value={formData.institution || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Universitas Indonesia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
              <Input
                value={formData.degree || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Bachelor of Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study</label>
              <Input
                value={formData.field_of_study || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, field_of_study: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Grade</label>
              <Input
                value={formData.grade || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className="bg-black/50 border-green-500/20 text-white"
                placeholder="e.g., 3.75/4.00 or 92/100"
              />
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
              Currently studying here
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Activities</label>
            <Input
              value={formData.activities || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
              className="bg-black/50 border-green-500/20 text-white"
              placeholder="e.g., Programming club, Robotics team"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-black/50 border-green-500/20 text-white min-h-[100px]"
              placeholder="Describe your educational achievements and activities..."
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save Education
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
              <TableHead className="text-gray-300">Institution</TableHead>
              <TableHead className="text-gray-300">Degree</TableHead>
              <TableHead className="text-gray-300">Field</TableHead>
              <TableHead className="text-gray-300">Period</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {education.map((edu) => (
              <TableRow key={edu.id} className="border-green-500/10 hover:bg-green-500/5">
                {editingId === edu.id ? (
                  <TableCell colSpan={5} className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          value={formData.institution || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Institution"
                        />
                        <Input
                          value={formData.degree || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Degree"
                        />
                        <Input
                          value={formData.field_of_study || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, field_of_study: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Field of Study"
                        />
                        <Input
                          value={formData.grade || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                          className="bg-black/50 border-green-500/20 text-white"
                          placeholder="Grade"
                        />
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
                        Currently studying here
                      </label>
                      <Input
                        value={formData.activities || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
                        className="bg-black/50 border-green-500/20 text-white"
                        placeholder="Activities"
                      />
                      <Textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-black/50 border-green-500/20 text-white"
                        placeholder="Description"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => handleUpdate(edu.id)} size="sm" className="bg-green-600 hover:bg-green-700">
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
                    <TableCell className="text-white font-medium">{edu.institution}</TableCell>
                    <TableCell className="text-gray-300">{edu.degree}</TableCell>
                    <TableCell className="text-gray-300">{edu.field_of_study || '-'}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(edu.start_date)} - {
                        edu.is_current 
                          ? 'Present' 
                          : edu.end_date 
                            ? formatDate(edu.end_date)
                            : 'Present'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(edu)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => onDelete(edu.id)}
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

export default EducationManager;
