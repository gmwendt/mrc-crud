const foodList = require('../data/tacoFoodList.json');
const categories = require('../data/tacoCategoryList.json');

class Food {
  static getFoodList() {
    return foodList;
    //TODO: add measurements
  }

  static getFoodById(foodId) {
    return foodList.filter(food => food.id.toString() === foodId.toString());
    //TODO: add measurements
  }

  static getFoodByCategoryId(categoryId) {
    const response = foodList.filter(
      food => food.category_id.toString() === categoryId.toString()
    );
    //TODO: add measurements
    return response;
  }

  static filterFoods(filter) {
    const result = foodList.filter(food => food.description.toString().toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0);
    result.map(obj => { 
      obj.measurements = [{ 
        id: 0,
        description: 'grama',
        converter: '0.01' }];
      obj.selectedMeasurement = 0;

      return obj;
    });
    return result;
  }

  static getCategoriesList() {
    return categories;
  }

  static getCategoryById(categoryId) {
    return categories.filter(
      category => category.id.toString() === categoryId.toString()
    );
  }
}

module.exports = Food;