import mongoose from 'mongoose';
import { IMeeting } from '../types/mettings.js';

const meetingSchema = new mongoose.Schema<IMeeting>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  meetingCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);

export { Meeting };
