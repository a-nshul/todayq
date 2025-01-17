import mongoose from 'mongoose';

const ContentOfferingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.ContentOffering || mongoose.model('ContentOffering', ContentOfferingSchema);
