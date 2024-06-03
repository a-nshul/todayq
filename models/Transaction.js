import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
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
  total: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
