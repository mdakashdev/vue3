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
// const emit = defineEmits();

// emit('sayHello', 'Akash'); ei vabe call na kore, sorasori defineEmits() er vitor eirokom method and value pass korte pari?

//emit holo akta function tai amra eivabe call korte pari
//1st param - event/method name, 2nd one value
// console.log(typeof emit);

// function test(event: Event) {
//   const value = (event.target as HTMLInputElement).value;
//   console.log(value)
//   emit('sayHello', 'Akash');
//   //emit('update:modelValue', value);
// }
//@input="test($event)"

/**
 * Native HTML = attribute and event
 * Event: @input
 * attribute: value, type, placeholder, disabled, required, readonly
 */
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
  <slot name="header"></slot>
  <slot></slot>
<!--  @input="console.log('test')"-->
<!--  emit('update:modelValue', 'A')-->
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
