import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brand: String,
    model: String,
    issue: String,
    status: { type: String, default: 'Received' },
    trackingId: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('ServiceRequest', serviceRequestSchema);
