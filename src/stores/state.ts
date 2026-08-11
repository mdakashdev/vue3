import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore('my-state', () => {
  const count = ref(10);
  const component = ref("checkbox");

  return {
    count,
    component
  }
});

