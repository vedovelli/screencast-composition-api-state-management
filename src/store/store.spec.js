import { makeServer } from '../miragejs/server';
import * as store from './';

window.console.warn = jest.fn();

describe('Store', () => {
  let server;

  const { add, toggle, remove, removeAll } = store.actions;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
    store.actions.reset();
  });

  it('should return state.open equals false', () => {
    expect(store.state.open).toBe(false);
  });

  it('should return state.products equals empty array', () => {
    expect(Array.isArray(store.state.products)).toBe(true);
    expect(store.state.products).toHaveLength(0);
  });

  it('should NOT allow mutate state', () => {
    store.state.open = true;

    expect(store.state.open).toBe(false);
    expect(window.console.warn).toHaveBeenCalledTimes(1);
    expect(window.console.warn.mock.calls[0][0]).toEqual(
      'Set operation on key "open" failed: target is readonly.',
    );
  });

  it('should toggle state.open', () => {
    expect(store.state.open).toBe(false);

    toggle();
    expect(store.state.open).toBe(true);

    toggle();
    expect(store.state.open).toBe(false);
  });

  it('should add products and open the cart', () => {
    const products = server.createList('product', 2);

    expect(store.state.open).toBe(false);
    expect(store.state.products).toHaveLength(0);

    for (const product of products) {
      add(product);
    }

    expect(store.state.products).toHaveLength(products.length);
    expect(store.state.open).toBe(true);
  });

  it('should throw an error if no product is provided to actions.add()', () => {
    expect(() => {
      add();
    }).toThrowError('Please provide a product');
  });

  it('should NOT add same product twice', () => {
    const product = server.create('product');

    add(product);
    add(product);

    expect(store.state.products).toHaveLength(1);
  });

  it('should remove products', () => {
    const [product1, product2] = server.createList('product', 2);

    add(product1);
    add(product2);
    remove(product1);

    expect(store.state.products).toHaveLength(1);
    expect(store.state.products[0]).toEqual(product2);
  });

  it('should throw an error if no product is provided to actions.remove()', () => {
    expect(() => {
      remove();
    }).toThrowError('Please provide a product');
  });

  it('should keep products if provided product is not found', () => {
    const [product1, product2, product3] = server.createList('product', 3);

    add(product1);
    add(product2);
    remove(product3);

    expect(store.state.products).toHaveLength(2);
  });

  it('should remove all products', () => {
    const [product1, product2] = server.createList('product', 2);

    add(product1);
    add(product2);

    expect(store.state.products).toHaveLength(2);

    removeAll();

    expect(store.state.products).toHaveLength(0);
  });
});
