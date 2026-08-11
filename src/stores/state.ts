import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore('my-state', () => {
  const count = ref(10);
  const component = ref("checkbox");

  function customName(name: string) {
    component.value = name;
  }

  function increment(num: number) {
    count.value++;
  }

  function decrement(num: number) {
    count.value--;
  }

  return {
    count,
    component,
    customName,
    increment,
    decrement
  }
});

