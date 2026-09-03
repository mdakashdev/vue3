<script setup lang="ts">
// import { ref, onMounted } from "vue";

// import { getUsers } from '../api/userApi.ts'

// const users = ref([]);
// const loading = ref(true);
// const error = ref(null);
//
// const fetchUsers = async () => {
//   try {
//     const response = await getUsers()
//     users.value = response.data
//   } catch (err) {
//     error.value = err.message
//   } finally {
//     loading.value = false
//   }
// }
//
// onMounted(() => {
//   fetchUsers()
// })


import { useUsers } from "@/composables/useUsers.ts";

const {
  data,
  isLoading,
  isError,
  error,
} = useUsers();

</script>

<template>
  <div>
    <div>
      <h2 class="font-bold">Users</h2>

      <p v-if="isLoading">Loading...</p>

      <p v-else-if="isError">
        Error: {{ error?.message }}
      </p>

      <div v-else>
        <div v-for="user in data?.data" :key="user.id">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
