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

<style scoped>

</style>
