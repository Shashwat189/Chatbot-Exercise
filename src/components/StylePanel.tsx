import React from 'react';
import { Upload, Moon, Sun } from 'lucide-react';
import { ChatConfig } from '../types/ChatConfig';
import { ColorPicker } from './ColorPicker';
import { ContrastWarning } from './ContrastWarning';
import { useContrastCheck } from '../hooks/useContrastCheck';

interface StylePanelProps {
  config: ChatConfig;
  updateConfig: (updates: Partial<ChatConfig>) => void;
}

interface TabProps {
  activeTab: 'content' | 'style';
  setActiveTab: (tab: 'content' | 'style') => void;
}

const FONT_FAMILIES = [
  { value: 'system', label: 'System UI' },
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'serif', label: 'Serif' },
  { value: 'mono', label: 'Monospace' }
];

export function StylePanel({ config, updateConfig }: StylePanelProps) {
  const [activeTab, setActiveTab] = React.useState<'content' | 'style'>('content');
  const userTextContrast = useContrastCheck(config.userTextColor, config.userBubbleColor);
  const botTextContrast = useContrastCheck(config.botTextColor, config.botBubbleColor);

  const handleImageUpload = (field: 'profilePictureUrl' | 'chatIconUrl') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        updateConfig({ [field]: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContentPanel = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
        <textarea
          value={config.welcomeMessage}
          onChange={(e) => updateConfig({ welcomeMessage: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          rows={3}
          placeholder="Enter the bot's welcome message..."
        />
      </div>

      {/* Bot Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
        <input
          type="text"
          value={config.botName}
          onChange={(e) => updateConfig({ botName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Assistant"
        />
      </div>

      {/* Placeholder Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Input Placeholder</label>
        <input
          type="text"
          value={config.placeholderText}
          onChange={(e) => updateConfig({ placeholderText: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Type your message..."
        />
      </div>

      {/* Behavior Settings */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Behavior</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-powered-by-content"
              checked={config.showPoweredBy}
              onChange={(e) => updateConfig({ showPoweredBy: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="show-powered-by-content" className="text-sm text-gray-700">
              Show "Powered by" line
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sync-header-content"
              checked={config.syncUserColorWithHeader}
              onChange={(e) => updateConfig({ syncUserColorWithHeader: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="sync-header-content" className="text-sm text-gray-700">
              Sync user message color with header
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStylePanel = () => (
    <div className="space-y-6">
      {/* Appearance */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Appearance</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateConfig({ isDarkMode: false })}
            className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${
              !config.isDarkMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="w-12 h-8 bg-white border rounded mb-2 flex items-center justify-center">
              <Sun size={14} />
            </div>
            <span className="text-xs">Light</span>
          </button>
          <button
            onClick={() => updateConfig({ isDarkMode: true })}
            className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${
              config.isDarkMode ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="w-12 h-8 bg-gray-800 border rounded mb-2 flex items-center justify-center">
              <Moon size={14} className="text-white" />
            </div>
            <span className="text-xs">Dark</span>
          </button>
        </div>
      </div>

      {/* Site Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
        <input
          type="text"
          value={config.siteName}
          onChange={(e) => updateConfig({ siteName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Your site name"
        />
      </div>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile picture</label>
        <p className="text-xs text-gray-500 mb-2">Supports JPG, PNG, and SVG up to 1MB</p>
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={config.profilePictureUrl}
            onChange={(e) => updateConfig({ profilePictureUrl: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Image URL"
          />
          <label className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Upload size={14} />
            <span className="text-sm">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload('profilePictureUrl')}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Chat Icon */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Chat icon</label>
        <p className="text-xs text-gray-500 mb-2">Supports JPG, PNG, and SVG up to 1MB</p>
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={config.chatIconUrl}
            onChange={(e) => updateConfig({ chatIconUrl: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Icon URL"
          />
          <label className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Upload size={14} />
            <span className="text-sm">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload('chatIconUrl')}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <ColorPicker
          label="User message color"
          color={config.userBubbleColor}
          onChange={(color) => updateConfig({ userBubbleColor: color })}
        />
        <ContrastWarning warning={userTextContrast.warning} />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sync-header"
            checked={config.syncUserColorWithHeader}
            onChange={(e) => updateConfig({ syncUserColorWithHeader: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="sync-header" className="text-sm text-gray-700">
            Sync user message color with agent header
          </label>
        </div>

        <ColorPicker
          label="Bot message color"
          color={config.botBubbleColor}
          onChange={(color) => updateConfig({ botBubbleColor: color })}
        />
        <ContrastWarning warning={botTextContrast.warning} />

        <ColorPicker
          label="User text color"
          color={config.userTextColor}
          onChange={(color) => updateConfig({ userTextColor: color })}
        />

        <ColorPicker
          label="Bot text color"
          color={config.botTextColor}
          onChange={(color) => updateConfig({ botTextColor: color })}
        />

        <ColorPicker
          label="Header background"
          color={config.headerBackgroundColor}
          onChange={(color) => updateConfig({ headerBackgroundColor: color })}
        />

        <ColorPicker
          label="Area background"
          color={config.areaBackgroundColor}
          onChange={(color) => updateConfig({ areaBackgroundColor: color })}
        />
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Typography</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font size</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="12"
              max="18"
              value={config.fontSize}
              onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-8">{config.fontSize}px</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font family</label>
          <select
            value={config.fontFamily}
            onChange={(e) => updateConfig({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {FONT_FAMILIES.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Layout</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Widget width</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="280"
              max="420"
              value={config.widgetWidth}
              onChange={(e) => updateConfig({ widgetWidth: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-12">{config.widgetWidth}px</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Corner radius</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="24"
              value={config.cornerRadius}
              onChange={(e) => updateConfig({ cornerRadius: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-8">{config.cornerRadius}px</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bubble radius</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="24"
              value={config.bubbleRadius}
              onChange={(e) => updateConfig({ bubbleRadius: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-8">{config.bubbleRadius}px</span>
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Behavior</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-powered-by"
            checked={config.showPoweredBy}
            onChange={(e) => updateConfig({ showPoweredBy: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="show-powered-by" className="text-sm text-gray-700">
            Show "Powered by" line
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat Interface</h2>
        <div className="flex gap-4 mt-3">
          <button 
            onClick={() => setActiveTab('content')}
            className={`text-sm pb-1 transition-colors ${
              activeTab === 'content' 
                ? 'font-medium text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Content
          </button>
          <button 
            onClick={() => setActiveTab('style')}
            className={`text-sm pb-1 transition-colors ${
              activeTab === 'style' 
                ? 'font-medium text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Style
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'content' ? renderContentPanel() : renderStylePanel()}
      </div>
    </div>
  );
}