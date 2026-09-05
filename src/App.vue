<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from "@/components/BaseInput.vue";
import { useCounterStore } from "@/stores/counter.ts";

const counter = useCounterStore();
const name = ref('');
const username = ref('');

const isDark = ref(false);

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val);
});

function handleMethod(data) {
  console.log('hello', data);
}
</script>

<template>
  <div class="flex items-center gap-4 p-3 border-b">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/tan">Tan</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/comp">Component</router-link>

    <button
      class="ml-auto px-3 py-1 rounded border text-sm font-medium transition-colors"
      :class="isDark ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
      @click="isDark = !isDark"
    >
      {{ isDark ? '☀️ Light' : '🌙 Dark' }}
    </button>
  </div>

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
