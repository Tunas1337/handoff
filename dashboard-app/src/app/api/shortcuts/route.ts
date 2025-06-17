import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Shortcut from '@/lib/models/Shortcut';

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Fetch all active shortcuts, ordered by the order field
    const shortcuts = await Shortcut.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    
    return NextResponse.json({ 
      success: true, 
      data: shortcuts 
    });
    
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch shortcuts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Connect to MongoDB
    await connectDB();
    
    // Create new shortcut
    const shortcut = new Shortcut(body);
    await shortcut.save();
    
    return NextResponse.json({ 
      success: true, 
      data: shortcut 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating shortcut:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create shortcut',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
