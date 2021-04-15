const express = require('express')
const router = express.Router()
const product = require('../models/prod_data')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+'.'+'png')
  }
});
const upload = multer({ storage: storage, limits:{
  filesize: 1024*1024*10
} });


// Adding product API
router.post('/',upload.single('imagedata'), async (req, res) => {
  
  const check = await product.find( {'name' : req.body.name})
  
  const pro = new product({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price
   })
  try {

    if (Object.keys(check).length === 0 ) {
      
    const newproduct = await pro.save()
    res.status(201).json(newproduct)
    }
    
    else {

      res.send('Already added' )
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})





// For Getting all the product
router.get('/', async (req, res) => {
  try {
    const products = await product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




// Add to cart by changing value of cart from 0 to 1 and update it
router.patch('/:name', async (req, res) => {
  
  const pro = await product.find( {'name' : req.params.name})
  try {
  if (Object.keys(pro).length === 0 ) {
      return res.status(404).json({ message: 'Cannot find Product' })
    }
    if(pro[0].cart == 1)
    {
      res.send("Already added to cart")
    }
    
    else {

    product.findOneAndUpdate({name: req.params.name }, 
      { cart:1}, null, function (err, docs) {
      if (err){
          res.send(err)
      }
      else{
          
  res.send("Added to the cart")
      }
  })


    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

}
)


//Getting all cart product
router.get('/cart', async (req, res) => {
  try {
    const products = await product.find( {'cart':'1'} )
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




module.exports = router