const express = require('express');
const router = express.Router()
const { createValidator } = require('express-joi-validation')
const validator = createValidator({});
const { userQuerySchema, userDefaultBodySchema } = require('../middleware/validators/userValidator');
const controller = require('../controllers/userController');

router.get('/users', validator.query(userQuerySchema), controller.getUser);
router.post('/users', validator.body(userDefaultBodySchema), controller.createUser);
router.put('/users', validator.body(userDefaultBodySchema), controller.updateUser);
router.delete('/users', validator.query(userQuerySchema), controller.deleteUser);


module.exports = router;