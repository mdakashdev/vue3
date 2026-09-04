<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <div class="ml-10">
    <Button
      variant="primary"
      size="lg"
    >
      Primary
    </Button>

    <Button
      variant="secondary"
      size="md"
    >
      Secondary
    </Button>

    <Button
      variant="danger"
      size="sm"
    >
      Danger
    </Button>

    <Button disabled>Disabled</Button>
  </div>
</template>

<style scoped>

</style>
