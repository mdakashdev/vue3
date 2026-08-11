<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStateStore } from '../stores/state.ts'

const store = useStateStore();

const {
  count,
  component
} = storeToRefs(store);

const { customName, increment, decrement } = store;
</script>

<template>
<div>
  <h1>Home page11</h1>
  <p>count: {{ count }}</p>
  <p>component: {{ component }}</p>
  <button @click="customName('checkbox component')">click</button>
  <div>
    <button @click="increment(1)">+</button>
    <button @click="decrement(1)">-</button>
  </div>
</div>
</template>

<style scoped>

</style>
