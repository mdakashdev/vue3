<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from "@/components/BaseInput.vue";

const name = ref('');
const username = ref('');
</script>

<template>
  <div>
<!--    using v-model-->
    <input type="text" v-model="name" placeholder="enter name" />

    <!-- manual - without v-model-->
    <input type="text" :value="name" @input="name = $event.target.value" />

<!--    check event fire and log event-->
    <input type="text" :value="name" @input="console.log($event.target.value)" />
<!--    which element theke asche: like - input, $event.target  after that pick the value-->
    <input type="text" :value="name" @input="console.log($event.target)" />

<!--using v-model in custom component-->
    <BaseInput
      v-model="username"
      label="Name"
      type="text"
      placeholder="Enter your name"
      />
  </div>
</template>

<style scoped></style>
