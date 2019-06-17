const foodList = require('../data/tacoFoodList.json');
const categories = require('../data/tacoCategoryList.json');

class Food {
  static getFoodList() {
    return foodList;
  }

  static getFoodById(foodId) {
    return foodList.filter(food => food.id.toString() === foodId.toString());
  }

  static getFoodByCategoryId(categoryId) {
    const response = foodList.filter(
      food => food.category_id.toString() === categoryId.toString()
    );

    return response;
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