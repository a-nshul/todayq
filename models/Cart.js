import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  items: [
    {
      contentOffering: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentOffering',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
