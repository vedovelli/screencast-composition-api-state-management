import { reactive, readonly } from 'vue';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  open: false,
  products: [],
};

let _state = reactive(cloneDeep(initialState));

let state = readonly(_state);

const actions = {
  toggle() {
    _state.open = !_state.open;
  },
  add(product) {
    if (!product) {
      throw new Error('Please provide a product');
    }

    if (!_state.products.includes(product)) {
      _state.products.push(product);
      _state.open = true;
    }
  },
  remove(product) {
    if (!product) {
      throw new Error('Please provide a product');
    }

    const exists = !!_state.products.find(({ id }) => id === product.id);

    if (exists) {
      _state.products = _state.products.filter(({ id }) => id !== product.id);
    }
  },
  removeAll() {
    _state.products = [];
  },
  reset() {
    _state = reactive(cloneDeep(initialState));
    state = readonly(_state);
  },
};

export { state, actions };
