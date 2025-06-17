export interface Shortcut {
  id: string;
  name: string;
  description: string;
  icon: string;
  uri: string;
  color: string;
  order?: number;
  isActive?: boolean;
}

// Fallback shortcuts in case MongoDB is not available
export const fallbackShortcuts: Shortcut[] = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Launch Windows Calculator',
    icon: '🧮',
    uri: 'andrejlauncher://calculator',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Open LinkedIn in browser',
    icon: '💼',
    uri: 'https://www.linkedin.com/',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'explorer',
    name: 'Windows Explorer',
    description: 'Open File Explorer',
    icon: '📁',
    uri: 'andrejlauncher://explorer',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'terminal',
    name: 'Windows Terminal',
    description: 'Launch Windows Terminal',
    icon: '💻',
    uri: 'andrejlauncher://terminal',
    color: 'bg-gray-700 hover:bg-gray-800'
  }
];

export async function fetchShortcuts(): Promise<Shortcut[]> {
  try {
    const response = await fetch('/api/shortcuts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache: 'no-store' to ensure fresh data
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      console.log('Successfully fetched shortcuts from MongoDB');
      return result.data;
    } else {
      throw new Error('Invalid response format');
    }
    
  } catch (error) {
    console.warn('Failed to fetch shortcuts from MongoDB, using fallback:', error);
    return fallbackShortcuts;
  }
}
