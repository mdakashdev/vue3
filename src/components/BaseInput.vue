<script setup lang="ts">
interface Props {
  label: string,
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  readonly?: boolean,
  type: 'text' | 'number' | 'email' | 'search',
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  required: false,
  readonly: false,
});

</script>
<template>
<div>
  <label>{{ label }}</label>
  <input
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
  />
</div>
</template>
<style scoped>
label {
  display: block;
  margin-bottom: 6px;
}

input {
  padding: 8px;
  width: 300px;
}
</style>
