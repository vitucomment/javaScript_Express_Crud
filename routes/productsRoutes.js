const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { tshirtBySizeQuerySchema, tshirtQuerySchema, tshirtBodySchema } = require('../middleware/validators/tshirtValidator');
const controller = require('../controllers/tshirtController');


router.get('/tshirt', validator.query(tshirtQuerySchema), controller.getTshirt);
router.get('/tshirt/by-size', validator.query(tshirtBySizeQuerySchema), controller.getTshirtBySize);
router.post('/tshirt', validator.body(tshirtBodySchema), controller.createTshirt)
router.put('/tshirt', validator.body(tshirtBodySchema), controller.updateTshirt)
router.delete('/tshirt', validator.query(tshirtQuerySchema), controller.deleteTshirt)

module.exports = router