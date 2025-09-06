import React, { useState } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { StylePanel } from './components/StylePanel';
import { ChatConfig } from './types/ChatConfig';

function App() {
  const [config, setConfig] = useState<ChatConfig>({
    // Appearance
    isDarkMode: false,
    
    // Branding
    profilePictureUrl: '',
    chatIconUrl: '',
    siteName: 'goodreads.com',
    
    // Content
    welcomeMessage: 'Hi! What can I help you with?',
    placeholderText: 'Message...',
    botName: 'Assistant',
    
    // Colors
    userBubbleColor: '#3B82F6',
    botBubbleColor: '#F3F4F6',
    userTextColor: '#FFFFFF',
    botTextColor: '#1F2937',
    headerBackgroundColor: '#3B82F6',
    areaBackgroundColor: '#FFFFFF',
    
    // Typography
    fontSize: 14,
    fontFamily: 'system',
    
    // Layout
    widgetWidth: 350,
    cornerRadius: 12,
    bubbleRadius: 12,
    
    // Behavior
    syncUserColorWithHeader: true,
    showPoweredBy: true
  });

  const updateConfig = (updates: Partial<ChatConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      
      // Auto-adjust colors when switching to dark mode
      if (updates.isDarkMode !== undefined) {
        if (updates.isDarkMode) {
          // Switch to dark mode defaults if using light mode defaults
          if (prev.areaBackgroundColor === '#FFFFFF') {
            newConfig.areaBackgroundColor = '#1F2937';
          }
          if (prev.botBubbleColor === '#F3F4F6') {
            newConfig.botBubbleColor = '#374151';
          }
          if (prev.botTextColor === '#1F2937') {
            newConfig.botTextColor = '#F9FAFB';
          }
        } else {
          // Switch to light mode defaults if using dark mode defaults
          if (prev.areaBackgroundColor === '#1F2937') {
            newConfig.areaBackgroundColor = '#FFFFFF';
          }
          if (prev.botBubbleColor === '#374151') {
            newConfig.botBubbleColor = '#F3F4F6';
          }
          if (prev.botTextColor === '#F9FAFB') {
            newConfig.botTextColor = '#1F2937';
          }
        }
      }
      
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Style Panel */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <StylePanel config={config} updateConfig={updateConfig} />
          </div>
          
          {/* Chat Widget Preview */}
          <div className="flex-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <ChatWidget config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;