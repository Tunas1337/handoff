import connectDB from '../src/lib/mongodb';
import Shortcut from '../src/lib/models/Shortcut';

const defaultShortcuts = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Launch Windows Calculator',
    icon: '🧮',
    uri: 'andrejlauncher://calculator',
    color: 'bg-blue-500 hover:bg-blue-600',
    order: 1,
    isActive: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Open LinkedIn in browser',
    icon: '💼',
    uri: 'https://www.linkedin.com/',
    color: 'bg-blue-600 hover:bg-blue-700',
    order: 2,
    isActive: true
  },
  {
    id: 'explorer',
    name: 'Windows Explorer',
    description: 'Open File Explorer',
    icon: '📁',
    uri: 'andrejlauncher://explorer',
    color: 'bg-green-500 hover:bg-green-600',
    order: 3,
    isActive: true
  },
  {
    id: 'terminal',
    name: 'Windows Terminal',
    description: 'Launch Windows Terminal',
    icon: '💻',
    uri: 'andrejlauncher://terminal',
    color: 'bg-gray-700 hover:bg-gray-800',
    order: 4,
    isActive: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    
    console.log('Clearing existing shortcuts...');
    await Shortcut.deleteMany({});
    
    console.log('Inserting default shortcuts...');
    const result = await Shortcut.insertMany(defaultShortcuts);
    
    console.log(`Successfully seeded ${result.length} shortcuts:`);
    result.forEach(shortcut => {
      console.log(`- ${shortcut.name} (${shortcut.id})`);
    });
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
