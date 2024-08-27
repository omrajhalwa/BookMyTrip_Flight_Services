const express = require('express');

const { InfoController } = require('../../controllers');

const airplaneRoutes=require('./airplane-routes');

const router = express.Router();
router.use('/airplane',airplaneRoutes);
router.get('/info', InfoController.info);

module.exports = router;