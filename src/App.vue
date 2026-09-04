<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from "@/components/BaseInput.vue";
import { useCounterStore } from "@/stores/counter.ts";

const counter = useCounterStore(); //method alada vabe destrucute korte hoi.

const name = ref('');
const username = ref('');

function handleMethod(data) {
  console.log('hello', data);
}

</script>

<template>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-link to="/tan">Tan</router-link>
  <router-link to="/login">Login</router-link>
  <router-link to="/comp">Component</router-link>

  <div>
<!--    <h1>{{ counter.count }}</h1>-->
<!--    <button @click="counter.increment()">Increment</button>-->
<!--    using v-model-->
<!--    <input type="text" v-model="name" placeholder="enter name" />-->

    <!-- manual - without v-model-->
<!--    <input type="text" :value="name" @input="name = $event.target.value" />-->

<!--    check event fire and log event-->
<!--    <input type="text" :value="name" @input="console.log($event.target.value)" />-->
<!--    which element theke asche: like - input, $event.target  after that pick the value-->
<!--    <input type="text" :value="name" @input="console.log($event.target)" />-->

<!--using v-model in custom component-->
<!--    <BaseInput-->
<!--      v-model="username"-->
<!--      label="Name"-->
<!--      type="text"-->
<!--      placeholder="Enter your name"-->
<!--      >-->
<!--      <h1>This is inside base-input</h1>-->
<!--      <template #header><h1>name</h1></template>-->
<!--    </BaseInput>-->

<!--    <h1>val: {{username}}</h1>-->
  </div>
  <router-view />
</template>

<style scoped></style>
