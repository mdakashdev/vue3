<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { Button as SButton } from '@/components/ui/button'
</script>

<template>
  <div class="ml-10 mt-10">
    <div class="flex flex-wrap gap-3 mb-8">
      <SButton variant="default">Default</SButton>
      <SButton variant="secondary">Secondary</SButton>
      <SButton variant="destructive">Destructive</SButton>
      <SButton variant="outline">Outline</SButton>
      <SButton variant="ghost">Ghost</SButton>
      <SButton variant="link">Link</SButton>
    </div>

    <h2 class="text-xl font-semibold mb-6">Button</h2>
    <div class="flex flex-wrap items-center gap-3">
    <hr>
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
  </div>
</template>

<style scoped>

</style>
