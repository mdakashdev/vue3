import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStateStore = defineStore('my-state', () => {

  //state
  const count = ref(10);
  const component = ref("checkbox");

  //Action / Method
  function customName(name: string) {
    component.value = name;
  }

  function increment(num: number) {
    count.value += num;
  }

  function decrement(num: number) {
    count.value -= num;
  }

  //Computed / Getter
  const doubleNumber = computed(() => {
      return count.value * 2;
  });

  return {
    count,
    component,
    customName,
    increment,
    decrement,
    doubleNumber
  }
});

