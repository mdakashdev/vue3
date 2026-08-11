## Create State

```javascript
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

```
- Create Global Store
- Create state with initial value
- Export store in any component or pages 
- Use store / read state in multiple component

## using store in component 

```vue
<script setup lang="ts">
  import { useStateStore } from '../stores/state.ts'
  const { count, component } = useStateStore();
</script>

<template>
  <div>
    <h1>Home page11</h1>
    <p>count: {{ count }}</p>
    <p>component: {{ component }}</p>
  </div>
</template>
```