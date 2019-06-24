var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { isNaN } = require('lodash');

const isValidId = id => !isNaN(parseInt(id, 10));

const FoodController = require('../controllers/Food');

//Return a list of all food available. 
router.get('/', (req, res) =>
  res.json(FoodController.getFoodList())
);

//Return a list of all available categories. 
router.get('/category', (req, res) =>
  res.json(FoodController.getCategoriesList())
);

//Reduce the list of all available foods and return it. 
router.get('/reduce/:properties', (req, res) => {
  const { properties } = req.params;
  var foodList = FoodController.getFoodList();
  var propList = properties.split(';');

  if (!Array.isArray(propList) || propList.length == 0)
    res.status(400).json({
      message: 'Faild to read properties.',
    });
  if (!Array.isArray(foodList))
    res.status(400).json({
      message: 'Faild to load Food List.',
    });

  var result = foodList.map((item) => {
    var obj = {};
    propList.forEach(p => obj[p] = item[p]);
    
    return obj;
  });
  
  res.json(result);
});

//Request a specific food
router.get('/id/:foodId', (req, res) => {
  const { foodId } = req.params;

  if (!isValidId(foodId)) {
    res.status(400).json({
      message: 'Invalid Food ID',
    });
  }

  res.json(FoodController.getFoodById(foodId));
});

//Filter foods
router.get('/filter/:filter/req/:properties', (req, res) => {
  const { filter } = req.params;  
  const { properties } = req.params;

  var foodList = FoodController.filterFoods(filter);
  var propList = properties.split(';');

  var response = foodList.map((item) => {
    var obj = {};
    propList.forEach(p => {
      if (p)
        obj[p] = item[p];
    });
    
    return obj;
  });

  res.json(response);
});

router.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;

  if (!isValidId(categoryId)) {
    res.status(400).json({
      message: 'Invalid Category ID',
    });
  }

  res.json(FoodController.getCategoryById(categoryId));
});

module.exports = router;
