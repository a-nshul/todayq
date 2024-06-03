import dbConnect from '../../utils/dbConnect';
import Cart from '../../models/Cart';
import Transaction from '../../models/Transaction';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const cart = await Cart.findOne({}).populate('items.contentOffering');
        if (!cart) {
          return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        const transaction = new Transaction({
          items: cart.items,
          total: cart.items.reduce((total, item) => total + item.contentOffering.price * item.quantity, 0)
        });
        await transaction.save();
        await Cart.deleteOne({});
        res.status(200).json(transaction);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
