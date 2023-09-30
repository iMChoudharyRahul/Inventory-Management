const router = require("express").Router();
const ProductModel = require("../../connection/model/ProductModel");

/**
 * {POST} Add New Product
 * @param {*} req 
 * @param {*} resp 
 */
const addProduct = async (req, resp) => {
  try {
    let newProduct = new ProductModel(req.body);
    let result = await newProduct.save();
    resp.status(201).json(result);
  } catch (err) {
    resp.status(400).json({ message: err.message });
  }
};

/**
 * {GET} Get All Product Store in Db
 * @param {*} req 
 * @param {*} resp 
 */
const getProduct = async (req, resp)=>  {
    try {
      const productData = await ProductModel.find();
      if(productData.length > 0){
        resp.status(200).json({data: productData, success: true});
      }else {
        resp.status(404).json({ data: "No Product found" })
      }
    }catch(err){
        resp.status(400).json({ message: err.message })
    }
}

/**
 * {DELETE} Delete Product using product id
 * @param {*} req 
 * @param {*} resp 
 */
const deleteProduct = async (req, resp)=> {
    try{
      let deleteMsg = await ProductModel.deleteOne({ _id: req.params.id });
      resp.status(200).json(deleteMsg);
    }catch(err){
        resp.status(400).json({ message: err.message })
    }
};

/**
 * {GET} Get Product By Product id
 * @param {*} req 
 * @param {*} resp 
 */
const getProductById = async (req, resp) => {
    try {
     let product = await ProductModel.findOne({ _id:  req.params.id });
     if(product){
        resp.status(200).json(product);
     } else {
        resp.status(404).json({result: 'No Record Found'});
     }
    }catch(err){
        resp.status(400).json({ message: err.message })
    }
}

/**
 * {PUT} Update the Product details
 * @param {*} req 
 * @param {*} resp 
 */
const updateProduct = async (req, resp)=> {
  try{
    let result = await ProductModel.updateOne(
		{ _id: req.params.id },
		{ $set: req.body }
	);
    resp.status(201).json(result);
  }catch(err){
        resp.status(400).json({ message: err.message })
    }
};

/**
 * {GET} Search Product 
 * @param {*} req 
 * @param {*} resp 
 */
const searchProduct = async (req, resp) => {
  try {
    let result = await ProductModel.find({
		$or: [
			{
				name: { $regex: req.params.key }
			},
			{
				company: { $regex: req.params.key }
			}
		]
	});
    resp.status(200).json(result);
  }catch(err){
        resp.status(400).json({ message: err.message })
    }
}

//POST
router.post('/add-product', addProduct);

//GET
router.get('/', addProduct);
router.get('/get-product/:id', getProductById);
router.get('/search/:key', searchProduct);

//PUT
router.put('/update/:id', updateProduct);

//DELETE
router.delete('/delete/:id', deleteProduct);

module.exports = router;