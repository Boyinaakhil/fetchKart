const express = require("express");
const router = express.Router();

const {handleImageUpload} = require("../../controllers/admin/products-controller");
const {upload} = require("../../helpers/cloudinary");
const {addProduct, fetchAllProducts} = require("../../controllers/admin/products-controller");
const {editProduct, deleteProduct} = require("../../controllers/admin/products-controller");

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

router.post('/add', addProduct);
router.get('/get', fetchAllProducts);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;