<script setup lang="ts">
const name: string = "hello";
interface Test {

}
const props = defineProps({
  label: String,
  type: 'text' | 'number' | 'email' | 'search',
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
  readonly: Boolean
});
</script>
<template>
<div>
  <label>{{ label }}</label>
  <input :type="type" :placeholder="placeholder" :disabled="disabled" :required="required" :readonly="readonly">
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
