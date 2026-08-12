# setup store 

## using computed

```vue
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useStateStore = defineStore('my-state', () => {
  //state
  const count = ref(10);

  //Computed / Getter
  const doubleNumber = computed(() => {
      return count.value * 2;
  });

  return {
    count,
    doubleNumber
  }
});
```

## implement computed

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state.ts'

const store = useStateStore();

const {
  count,
  component,
  doubleNumber
} = storeToRefs(store);
</script>

<template>
<div>
  <h1>Home page11-23</h1>
  <p>count: {{ count }}</p>
  <p>component: {{ component }}</p>
  <div><p>Double Number: {{ doubleNumber }}</p></div>
</div>
</template>
```

## Rules

- যখন store থেকে property destructure করো:
- const { count, doubleNumber } = store ; তখন ref-এর reactive connection হারানোর সমস্যা হতে পারে।
- const store = useStateStore() ; → Store object-এর property সরাসরি ব্যবহার করলে: `storeToRefs() দরকার নেই।`
- actions/methods-এর জন্য storeToRefs() লাগে না



# Computed

### 1. Read-only computed — সবচেয়ে common

```ts
const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})
```

শুধু **value read** করবে:

```ts
console.log(fullName.value)
```

এখানে সরাসরি পরিবর্তন করা যাবে না।

---

### 2. Writable computed — `get` + `set`

```ts
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },

  set(value) {
    // value থেকে firstName / lastName update
  }
})
```

এখানে read এবং write দুটোই করা যায়:

```ts
fullName.value = 'Rahim Ahmed'
```
