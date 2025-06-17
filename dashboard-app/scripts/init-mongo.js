// MongoDB initialization script for Docker container
// This script runs when the MongoDB container starts for the first time

db = db.getSiblingDB('dashboard-app');

// Create the shortcuts collection
db.createCollection('shortcuts');

// Insert default shortcuts
const defaultShortcuts = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Launch Windows Calculator',
    icon: '🧮',
    uri: 'andrejlauncher://calculator',
    color: 'bg-blue-500 hover:bg-blue-600',
    order: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Open LinkedIn in browser',
    icon: '💼',
    uri: 'https://www.linkedin.com/',
    color: 'bg-blue-600 hover:bg-blue-700',
    order: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'explorer',
    name: 'Windows Explorer',
    description: 'Open File Explorer',
    icon: '📁',
    uri: 'andrejlauncher://explorer',
    color: 'bg-green-500 hover:bg-green-600',
    order: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'terminal',
    name: 'Windows Terminal',
    description: 'Launch Windows Terminal',
    icon: '💻',
    uri: 'andrejlauncher://terminal',
    color: 'bg-gray-700 hover:bg-gray-800',
    order: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Insert the default shortcuts
db.shortcuts.insertMany(defaultShortcuts);

// Create indexes for better performance
db.shortcuts.createIndex({ isActive: 1, order: 1 });
db.shortcuts.createIndex({ id: 1 }, { unique: true });

print('✅ MongoDB initialized with default shortcuts');
print('Database: dashboard-app');
print('Collection: shortcuts');
print('Default shortcuts inserted: ' + defaultShortcuts.length);
