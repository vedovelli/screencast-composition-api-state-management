import { fetchProducts, removeProduct, products } from './';
import { makeServer } from '../miragejs/server';

describe('Store', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should load and return products', async () => {
    server.createList('product', 10);

    await fetchProducts();

    expect(products.value).toHaveLength(10);
  });

  it('should remove second product', async () => {
    const [_, secondProduct] = server.createList('product', 10);

    await fetchProducts();
    await removeProduct(secondProduct);

    expect(products.value).toHaveLength(9);
    expect(
      products.value.find(({ id }) => id === secondProduct.id)
    ).toBeUndefined();
  });
});
