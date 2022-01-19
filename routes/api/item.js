const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
var fs = require('fs');

const upload = require('../../middleware/upload');

const Item = require('../../models/Item');

//@route  GET
//@ desc   View a list of item
//@ access Public

router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ name: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//@route  POST
//@ desc   Add a new item
//@ access Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty().isString(),
    check('category', 'Category is required').not().isEmpty().isString(),
    check('width', 'Width is required').not().isEmpty().isNumeric(),
    check('length', 'Length is required').not().isEmpty().isNumeric(),
    check('height', 'Height is required').not().isEmpty().isNumeric(),
    check('price', 'Price is required').not().isEmpty().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, width, length, height, price } = req.body;

    try {
      let item = new Item({ name, category, width, length, height, price });
      await item.save();
      return res.send(item);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE
//@ desc   Delete an item by ID
//@ access Public

router.delete(
  '/delete/:id',

  async (req, res) => {
    try {
      const item = await Item.findOne({ id: req.params.id });
      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      await item.remove();

      res.json({ msg: 'Item deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  POST
//@ desc   Edit an item by ID
//@ access Public

router.post(
  '/update',
  [check('id', 'ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id, name, category, width, height, length, price } = req.body;
      const itemFields = {};
      itemFields.id = id;
      if (name) itemFields.name = name;
      if (category) itemFields.category = category;
      if (width) itemFields.width = width;
      if (height) itemFields.height = height;
      if (length) itemFields.length = length;
      if (price) itemFields.price = price;

      let item = await Item.findById(req.body.id);

      if (!item) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      if (item) {
        item = await Item.findOneAndUpdate(
          { id: req.body.id },
          { $set: itemFields },
          { new: true }
        );
        return res.json(item);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   POST
//@ desc   Add an image to the item
//@ access Public

router.post('/image/:id', upload.single('image'), async (req, res) => {
  try {
    let imageFields = {};
    const { url, thumbnail } = req.body;
    imageFields.image.url.data = fs.readFileSync(
      path.join(__dirname, '/uploads/' + req.file.filename)
    );
    imageFields.image.url.contentType = 'image.png';
    imageFields.image.thumbnail = thumbnail;

    if (req.file == undefined) {
      return res.status(500).send({ msg: 'You must select an image' });
    }
    let item = await Item.findOneAndUpdate(
      { id: req.params.id },
      { $set: imageFields },
      { new: true }
    );

    return res.send({ msg: 'File has been uploaded' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   GET
//@ desc   get image of database from ID
//@ access Public

router.get(
  '/image',
  [check('id', 'ID is required').not().isEmpty()],
  async (req, res) => {
    try {
      const item = await Item.findById(req.body.id);

      res.status(200).send(item.image);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
