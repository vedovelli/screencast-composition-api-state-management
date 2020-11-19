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

  it.todo('should return state.products equals empty array');

  it.todo('should NOT allow mutate state');

  it.todo('should toggle state.open');

  it.todo('should add products and open the cart');

  it.todo('should throw an error if no product is provided to actions.add()');

  it.todo('should NOT add same product twice');

  it.todo('should remove products');

  it.todo('should throw an error if no product is provided to actions.remove()');

  it.todo('should keep products if provided product is not found');

  it.todo('should remove all products');
});
