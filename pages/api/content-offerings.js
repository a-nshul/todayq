import dbConnect from '../../utils/dbConnect';
import ContentOffering from '../../models/ContentOffering';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const contentOfferings = await ContentOffering.find({});
        res.status(200).json(contentOfferings);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const contentOffering = await ContentOffering.create(req.body);
        res.status(201).json(contentOffering);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
