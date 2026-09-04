<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleSubmit">

      <div>
        <label for="email">Email</label>

        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label for="password">Password</label>

        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
        />
      </div>

      <button type="submit">
        Login
      </button>

    </form>
  </div>
</template>
