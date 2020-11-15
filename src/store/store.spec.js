import { makeServer } from '../miragejs/server';
import * as store from './';

describe('Store', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it.todo('should return state.open equals false');
  it.todo('should toggle state.open');
  it.todo('should add products and open the cart');
  it.todo('should NOT add same product twice');
  it.todo('should remove products');
  it.todo('should keep products if provided product is not found');
  it.todo('should remove all products');
});
