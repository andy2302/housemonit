const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

router.get('/settings', (req, res) => {
    Settings.find()
        .then(settings => res.json(settings))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/settings', (req, res) => {
  const newSettings = new Settings({...req.body, isSelected: true });

  Settings.updateMany({ isSelected: true }, { isSelected: false })
    .then(() => newSettings.save())
    .then((settings) => res.json(settings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/settings/:id', async (req, res) => {
  try {
    await Settings.updateMany({ isSelected: true }, { isSelected: false });
    const settings = await Settings.findByIdAndUpdate(req.params.id, { isSelected: true }, { new: true });
    res.json(settings);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
