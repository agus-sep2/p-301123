
import React from 'react';
import { SiteSetting } from '@/types/database';
import { Switch } from '@/components/ui/switch';

interface SiteSettingsManagerProps {
  settings: SiteSetting[];
  onUpdate: (settingKey: string, value: boolean) => void;
}

const SiteSettingsManager: React.FC<SiteSettingsManagerProps> = ({
  settings,
  onUpdate,
}) => {
  const getSetting = (key: string) => {
    return settings.find(s => s.setting_key === key)?.setting_value ?? true;
  };

  return (
    <div className="glassmorphism p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Site Settings</h3>
        <p className="text-gray-400">Control the visibility of sections on your portfolio</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-500/20">
          <div>
            <h4 className="text-white font-medium">Experience Menu</h4>
            <p className="text-gray-400 text-sm">Show or hide the Experience menu item in navigation</p>
          </div>
          <Switch
            checked={getSetting('show_experience_menu')}
            onCheckedChange={(checked) => onUpdate('show_experience_menu', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-500/20">
          <div>
            <h4 className="text-white font-medium">Experience Section</h4>
            <p className="text-gray-400 text-sm">Show or hide the experience section on your portfolio</p>
          </div>
          <Switch
            checked={getSetting('show_experience_section')}
            onCheckedChange={(checked) => onUpdate('show_experience_section', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-500/20">
          <div>
            <h4 className="text-white font-medium">Education Section</h4>
            <p className="text-gray-400 text-sm">Show or hide the education section on your portfolio</p>
          </div>
          <Switch
            checked={getSetting('show_education_section')}
            onCheckedChange={(checked) => onUpdate('show_education_section', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;
