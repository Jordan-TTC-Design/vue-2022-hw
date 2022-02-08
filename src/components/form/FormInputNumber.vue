<script>
import { ref } from 'vue';
export default {
  props: ['modelValue', 'input-id'],
  setup(props, { slots }) {
    console.log(slots);
    const data = ref(slots);
    return { data };
  },
};
</script>
<template>
  <div class="w-full px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
      :for="inputId"
    >
      <slot></slot>
    </label>
    <div class="flex items-center border-b border-gray-200 py-2">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="number"
        :id="inputId"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
