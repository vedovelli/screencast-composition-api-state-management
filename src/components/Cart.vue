<template>
  <div
    :class="{ hidden: !open }"
    class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300"
    data-testid="shopping-cart"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
      <button v-if="hasProducts" @click="removeAll()">Clear cart</button>
      <button @click="toggle()" data-testid="close-button" class="text-gray-600 focus:outline-none">
        <svg
          class="h-5 w-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <hr class="my-3" />
    <cart-item
      v-for="product in products"
      :product="product"
      :key="product.id"
      data-testid="cart-item"
    />
    <h3 v-if="!hasProducts" class="text-xl text-red-600 text-center font-bold">
      Your cart is empty
    </h3>
    <a
      v-else
      class="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      <span>Checkout</span>
      <svg
        class="h-5 w-5 mx-2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</template>

<script>
import CartItem from './CartItem';
import { state, actions } from '@/store';
import { computed } from 'vue';
export default {
  name: 'Cart',
  components: { CartItem },
  setup() {
    return {
      open: computed(() => state.open),
      products: computed(() => state.products),
      hasProducts: computed(() => state.products.length > 0),
      toggle: actions.toggle,
      removeAll: actions.removeAll,
    };
  },
};
</script>
