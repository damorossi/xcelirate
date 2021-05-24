const shoppingCartModule = require('../js/shopping-cart');
const storeModule = require('../js/store');

describe('Given a list of products a user wants to buy in a shopping cart', () => {
  const scenario = {
    products: [
      // product id | quantity | expectedTotalPrice
      [1, 1, 5],
      [1, 2, 5],
      [1, 3, 10],
      [2, 1, 20],
      [2, 2, 40],
      [2, 3, 57]
    ]
  };

  scenario.products.forEach((scenarioItemCart) => {
    describe(`Given this scenario where the screen is rendering with ${scenario.products}`, () => {
      test(`Then total price of shoppingCartModule.each item should return ${scenarioItemCart[2]}`, () => {
        const itemToAddToCart = storeModule.store.products.find(
          (product) => product.id === scenarioItemCart[0]
        );
        const price = shoppingCartModule.getPriceOrDiscount(itemToAddToCart, scenarioItemCart[1]);
        expect(price).toEqual(scenarioItemCart[2]);
      });
    });
  });
});

describe('Given some products in a shopping cart', () => {
  function getStoreWithProducts() {
    const productMocks = [
      {
        product: storeModule.store.products[1],
        quantity: 3,
        totalPrice: 57
      },
      {
        product: storeModule.store.products[0],
        quantity: 2,
        totalPrice: 5
      }
    ];
    storeModule.store.cart = {
      products: productMocks
    };

    storeModule.store.cart.products = productMocks;
  }
  test('a products quantity should be downgraded when the user substract 1', () => {
    const productMocks = [
      {
        product: storeModule.store.products[1],
        quantity: 3,
        totalPrice: 57
      },
      {
        product: storeModule.store.products[0],
        quantity: 2,
        totalPrice: 5
      }
    ];
    storeModule.store.cart = {
      products: productMocks
    };

    storeModule.store.cart.products = productMocks;
    shoppingCartModule.removeFromShoppingCart(productMocks[0].product.id, 2);
    expect(storeModule.store.cart.products[0].quantity).toEqual(2);
  });

  test('a products quantity should be +1 when the user adds it', () => {
    getStoreWithProducts();
    shoppingCartModule.addToShoppingCart(storeModule.store.cart.products[1].product.id, 3);
    expect(storeModule.store.cart.products[1].quantity).toEqual(3);
  });

  test('Should return the correct cost of all products with discounts applied', () => {
    getStoreWithProducts();
    // total cost of products: 57 for 3 eurs of saving due Naruto
    // and 5 euros for GOKU single price or 2 x 1 with 2 units;

    expect(shoppingCartModule.getOverallCost()).toBe(62);
  });

  test('should return the total ammount of products without discounts', () => {
    getStoreWithProducts();
    // total cost of products: 60 for 3 products of Naruto
    // and 10 euros for GOKU with 2 units;
    expect(shoppingCartModule.getCostWithNoDiscount()).toBe(70);
  });
});
