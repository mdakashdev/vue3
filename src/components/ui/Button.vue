<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  variant?: ButtonVariant,
  size?: ButtonSize,
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});

</script>

<template>
  <button
    :disabled="disabled"
    class="text-white rounded-md mr-5 mt-10"
    :class="{
     'bg-primary': variant === 'primary',
     'bg-secondary': variant === 'secondary',
     'bg-danger': variant === 'danger',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-5 py-2.5 text-lg': size === 'lg',
    }"
  >
    <slot/>
  </button>
</template>

<style scoped>
</style>
