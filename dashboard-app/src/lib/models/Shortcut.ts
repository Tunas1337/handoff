import mongoose from 'mongoose';

export interface IShortcut {
  id: string;
  name: string;
  description: string;
  icon: string;
  uri: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShortcutSchema = new mongoose.Schema<IShortcut>({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  uri: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for better query performance
ShortcutSchema.index({ isActive: 1, order: 1 });

export default mongoose.models.Shortcut || mongoose.model<IShortcut>('Shortcut', ShortcutSchema);
