import dbConnect from '../../utils/dbConnect';
import Cart from '../../models/Cart';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.findOne({}).populate('items.contentOffering');
        res.status(200).json(cart);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const { contentOfferingId, quantity } = req.body;
        let cart = await Cart.findOne({});
        if (!cart) {
          cart = new Cart({ items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.contentOffering.toString() === contentOfferingId);
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ contentOffering: contentOfferingId, quantity });
        }
        await cart.save();
        res.status(200).json(cart);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
