<script setup lang="ts">
import { useCounterStore } from "@/stores/counter.ts";

const counter = useCounterStore();
</script>

<template>
<div>
  <h1>{{ counter.count }}</h1>
  <h1>About page</h1>
</div>
</template>

<style scoped>

</style>
