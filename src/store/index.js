import { readonly, ref } from 'vue';
import axios from 'axios';

const products = ref([]);

async function removeProduct(product) {
  const exists = !!products.value.find(({ id }) => id === product.id);
  if (exists) {
    products.value = products.value.filter(({ id }) => id !== product.id);
  }
}

async function fetchProducts() {
  products.value = (await axios.get('/api/products')).data.products;
}

const state = readonly(products);

export { fetchProducts, removeProduct, state as products };
