import { ref, readonly } from 'vue';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {};

const _state = ref(cloneDeep(initialState));

const state = readonly(_state);

export { state };
