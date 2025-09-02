import mongoose, { Document } from 'mongoose';

export interface IMeeting extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  meetingCode: string;
  date: Date;
}
