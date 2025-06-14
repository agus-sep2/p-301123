
import React, { useState } from 'react';
import { Service } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ServicesManagerProps {
  services: Service[];
  onCreate: (data: Partial<Service>) => void;
  onUpdate: (id: string, data: Partial<Service>) => void;
  onDelete: (id: string) => void;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ services, onCreate, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({});

  const ServiceForm: React.FC<{
    data: Partial<Service>;
    onChange: (data: Partial<Service>) => void;
    onSave: () => void;
    onCancel: () => void;
  }> = ({ data, onChange, onSave, onCancel }) => {
    const [featuresText, setFeaturesText] = useState(data.features?.join('\n') || '');

    const handleSave = () => {
      const features = featuresText.split('\n').filter(f => f.trim());
      onChange({ ...data, features });
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <Input
              value={data.category || ''}
              onChange={(e) => onChange({ ...data, category: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
            <Input
              value={data.icon || ''}
              onChange={(e) => onChange({ ...data, icon: e.target.value })}
              placeholder="Code, Database, BarChart3"
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <Input
              value={data.image_url || ''}
              onChange={(e) => onChange({ ...data, image_url: e.target.value })}
              className="bg-black/50 border-green-500/20 text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <Textarea
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="bg-black/50 border-green-500/20 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
          <Textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className="bg-black/50 border-green-500/20 text-white min-h-[100px]"
          />
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
        <h3 className="text-xl font-semibold text-white">Services Management</h3>
        <Button onClick={() => setShowNewForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {showNewForm && (
        <div className="glassmorphism p-6">
          <h4 className="text-lg font-medium text-white mb-4">New Service</h4>
          <ServiceForm
            data={newService}
            onChange={setNewService}
            onSave={() => {
              onCreate(newService);
              setNewService({});
              setShowNewForm(false);
            }}
            onCancel={() => {
              setNewService({});
              setShowNewForm(false);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="glassmorphism p-6">
            {editingId === service.id ? (
              <ServiceForm
                data={service}
                onChange={(data) => onUpdate(service.id, data)}
                onSave={() => setEditingId(null)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{service.title}</h4>
                    <p className="text-green-400">{service.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setEditingId(service.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(service.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
