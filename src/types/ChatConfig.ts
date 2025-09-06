export interface ChatConfig {
  // Appearance
  isDarkMode: boolean;
  
  // Branding
  profilePictureUrl: string;
  chatIconUrl: string;
  siteName: string;
  
  // Content
  welcomeMessage: string;
  placeholderText: string;
  botName: string;
  
  // Colors
  userBubbleColor: string;
  botBubbleColor: string;
  userTextColor: string;
  botTextColor: string;
  headerBackgroundColor: string;
  areaBackgroundColor: string;
  
  // Typography
  fontSize: number;
  fontFamily: string;
  
  // Layout
  widgetWidth: number;
  cornerRadius: number;
  bubbleRadius: number;
  
  // Behavior
  syncUserColorWithHeader: boolean;
  showPoweredBy: boolean;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}