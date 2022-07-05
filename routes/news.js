var express = require('express');
var router = express.Router();
const { param } = require('express-validator');
const {validateFields} = require('../helpers/validator');
const {isAdmin} = require('../middleware/checkRole');
const {getById} =require('../controllers/newsController');

router.get('/:id',[
    isAdmin,
    param('id').isNumeric(),
    validateFields
],getById);

module.exports = router;