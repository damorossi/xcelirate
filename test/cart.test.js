const { drawProductsTable, createDomElment } = require('../js/cart');

describe('Given two functions which creates elements and renders them', () => {
  describe('when the creator is invoked', () => {
    test('the return of the html element should be a li', () => {
      const domElement = createDomElment('li', 'jest-test', 'cart__products-item', '', '');
      const element = document.createElement('li');
      element.innerText = 'jest-test';
      element.classList.add('cart__products-item');
      expect(domElement).toEqual(element);
    });
  });

  describe('when renderer is called', () => {
    test('The function must append to the container', () => {
      const baseElement = document.createElement('ul');
      baseElement.setAttribute('id', 'container');
      drawProductsTable('container', baseElement);
      expect(baseElement.childElementCount).toBe(3);
    });
  });
});
