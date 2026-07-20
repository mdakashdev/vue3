<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from "@/components/BaseInput.vue";

const name = ref('');
</script>

<template>
  <div>
<!--    using v-model-->
    <input type="text" v-model="name" placeholder="enter name" />

    <!-- manual - without v-model-->
    <input type="text" :value="name" @input="name = $event.target.value" />
    <BaseInput
      label="Name"
      type="text"
      placeholder="Enter your name"
      />
  </div>
</template>

<style scoped></style>
