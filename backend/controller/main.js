const router = require('express').Router();
const ProductRouter = require('./ProductController/Product');
const AuthRouter = require('./AuthController/Auth');

router.use('/product', ProductRouter);
router.use('/auth', AuthRouter);

module.exports = router;