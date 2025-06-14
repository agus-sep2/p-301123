
import React, { useState } from 'react';
import { PersonalInfo } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';

interface PersonalInfoManagerProps {
  personalInfo: PersonalInfo | null;
  onUpdate: (data: Partial<PersonalInfo>) => void;
}

const PersonalInfoManager: React.FC<PersonalInfoManagerProps> = ({ personalInfo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo | null>(personalInfo);

  React.useEffect(() => {
    setFormData(personalInfo);
  }, [personalInfo]);

  const handleSave = () => {
    if (formData) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setIsEditing(false);
  };

  if (!personalInfo) return null;

  return (
    <div className="glassmorphism p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Personal Information</h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <Input
                value={formData?.name || ''}
                onChange={(e) => setFormData(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <Input
                value={formData?.title || ''}
                onChange={(e) => setFormData(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <Input
                value={formData?.email || ''}
                onChange={(e) => setFormData(prev => prev ? { ...prev, email: e.target.value } : null)}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <Input
                value={formData?.github_url || ''}
                onChange={(e) => setFormData(prev => prev ? { ...prev, github_url: e.target.value } : null)}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
              <Input
                value={formData?.linkedin_url || ''}
                onChange={(e) => setFormData(prev => prev ? { ...prev, linkedin_url: e.target.value } : null)}
                className="bg-black/50 border-green-500/20 text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={formData?.description || ''}
              onChange={(e) => setFormData(prev => prev ? { ...prev, description: e.target.value } : null)}
              className="bg-black/50 border-green-500/20 text-white min-h-[100px]"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p><strong className="text-white">Name:</strong> {personalInfo.name}</p>
              <p><strong className="text-white">Title:</strong> {personalInfo.title}</p>
              <p><strong className="text-white">Email:</strong> {personalInfo.email}</p>
            </div>
            <div>
              <p><strong className="text-white">GitHub:</strong> {personalInfo.github_url || 'Not set'}</p>
              <p><strong className="text-white">LinkedIn:</strong> {personalInfo.linkedin_url || 'Not set'}</p>
            </div>
          </div>
          <div>
            <p><strong className="text-white">Description:</strong></p>
            <p className="text-gray-300 mt-1">{personalInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoManager;
