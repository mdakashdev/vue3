# Implement action

```code
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore('my-state', () => {
  const count = ref(10);
  const component = ref("checkbox");

  function customName(name: string) {
    component.value = name;
  }

  return {
    count,
    component,
    customName
  }
});


```


# use in any component

```code
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state.ts'

const store = useStateStore();

const { 
  count,
  component
} = storeToRefs(store);

const { customName } = store;
</script>

<template>
<div>
  <h1>Home page11</h1>
  <p>count: {{ count }}</p>
  <p>component: {{ component }}</p>
  <button @click="customName('checkbox component')">click</button>
</div>
</template>
```

- jehetu customName diye store a update korbo, so reactive rakte hobe state gulo
- se jonno `storeToRefs` use kore state gulo ke destruct kore nite hobe
- aar method ke storeToRefs korar dorkar nai.
- `Note` - getter/computed-এর জন্য reactive value pabar jonno - storeToRef use kora.
