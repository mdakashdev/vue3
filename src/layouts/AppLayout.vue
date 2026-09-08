<script setup lang="ts">
import Sidebar from "@/components/layout/Sidebar.vue";
import Header from "@/components/layout/Header.vue"
</script>

<template>
  <div class="min-h-screen flex">
    <Sidebar />

    <main class="flex-1">
      <Header />

      <RouterView />
    </main>
  </div>
</template>
