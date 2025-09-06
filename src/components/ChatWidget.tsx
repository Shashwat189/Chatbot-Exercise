import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, MessageCircle } from 'lucide-react';
import { ChatConfig, Message } from '../types/ChatConfig';

interface ChatWidgetProps {
  config: ChatConfig;
}

export function ChatWidget({ config }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: config.welcomeMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update welcome message when config changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && !newMessages[0].isUser) {
        newMessages[0] = {
          ...newMessages[0],
          text: config.welcomeMessage
        };
      }
      return newMessages;
    });
  }, [config.welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! This is a demo response.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const fontSizeClass = {
    12: 'text-xs',
    13: 'text-sm',
    14: 'text-sm',
    15: 'text-base',
    16: 'text-base',
    17: 'text-lg',
    18: 'text-lg'
  }[config.fontSize] || 'text-base';

  const widgetStyle = {
    width: `${config.widgetWidth}px`,
    borderRadius: `${config.cornerRadius}px`,
    fontFamily: config.fontFamily === 'system' ? 'system-ui, -apple-system, sans-serif' : 
               config.fontFamily === 'serif' ? 'Georgia, serif' : 
               config.fontFamily === 'mono' ? 'Monaco, monospace' : config.fontFamily
  };

  const headerColor = config.syncUserColorWithHeader ? config.userBubbleColor : config.headerBackgroundColor;

  // Dark mode color adjustments
  const getBackgroundColor = () => {
    if (config.isDarkMode) {
      return config.areaBackgroundColor === '#FFFFFF' ? '#1F2937' : config.areaBackgroundColor;
    }
    return config.areaBackgroundColor;
  };

  const getBotBubbleColor = () => {
    if (config.isDarkMode) {
      return config.botBubbleColor === '#F3F4F6' ? '#374151' : config.botBubbleColor;
    }
    return config.botBubbleColor;
  };

  const getBotTextColor = () => {
    if (config.isDarkMode) {
      return config.botTextColor === '#1F2937' ? '#F9FAFB' : config.botTextColor;
    }
    return config.botTextColor;
  };
  return (
    <div className="flex justify-center p-4">
      <div
        className={`flex flex-col h-96 border shadow-lg overflow-hidden ${fontSizeClass} ${
          config.isDarkMode ? 'border-gray-600' : 'border-gray-200'
        }`}
        style={widgetStyle}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 p-4 text-white"
          style={{ backgroundColor: headerColor }}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full">
            {config.chatIconUrl ? (
              <img
                src={config.chatIconUrl}
                alt="Chat"
                className="w-6 h-6 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <MessageCircle size={16} />
            )}
          </div>
          <h3 className="font-medium flex-1">{config.siteName}</h3>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full flex-shrink-0">
                  {config.profilePictureUrl ? (
                    <img
                      src={config.profilePictureUrl}
                      alt="Bot"
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Bot size={12} />
                  )}
                </div>
              )}
              <div
                className="max-w-xs px-3 py-2 break-words"
                style={{
                  backgroundColor: message.isUser ? config.userBubbleColor : getBotBubbleColor(),
                  color: message.isUser ? config.userTextColor : getBotTextColor(),
                  borderRadius: `${config.bubbleRadius}px`
                }}
              >
                {message.text}
              </div>
              {message.isUser && (
                <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full flex-shrink-0">
                  <User size={12} className="text-white" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Powered by */}
        {config.showPoweredBy && (
          <div className={`px-4 py-2 text-xs border-t ${
            config.isDarkMode 
              ? 'text-gray-400 border-gray-600' 
              : 'text-gray-500 border-gray-100'
          }`}>
            ⚡ Powered by Chatbase
          </div>
        )}

        {/* Input */}
        <div className={`p-4 border-t ${config.isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={config.placeholderText}
              className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                config.isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
              }`}
              aria-label="Type your message"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}