import express from 'express';
import ServiceRequest from '../models/ServiceRequest.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/book-service', auth, async (req, res) => {
  try {
    const { brand, model, issue } = req.body;
    const trackingId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const service = await ServiceRequest.create({
      userId: req.user.id,
      brand,
      model,
      issue,
      trackingId,
    });
    res.json({ trackingId: service.trackingId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/status/:trackingId', async (req, res) => {
  try {
    const service = await ServiceRequest.findOne({ trackingId: req.params.trackingId });
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json({ status: service.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/status/all', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  const all = await ServiceRequest.find();
  res.json(all);
});

router.post('/update-status', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  try {
    const { trackingId, status } = req.body;
    const service = await ServiceRequest.findOneAndUpdate({ trackingId }, { status }, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
