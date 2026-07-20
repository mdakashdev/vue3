<script setup lang="ts">
interface Props {
  modelValue: string,
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

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

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
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
