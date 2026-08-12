<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state.ts'

const store = useStateStore();

const {
  count,
  component,
  doubleNumber
} = storeToRefs(store);

const {
  customName,
  increment,
  decrement
} = store;
</script>

<template>
<div>
  <h1>Home page11-23</h1>
  <p>count: {{ count }}</p>
  <p>component: {{ component }}</p>
  <button @click="customName('checkbox component')">click</button>
  <div>
    <button @click="increment(2)">+</button>
    <button @click="decrement(2)">-</button>
  </div>
  <div><p>Double Number: {{ doubleNumber }}</p></div>
</div>
</template>

<style scoped>

</style>
