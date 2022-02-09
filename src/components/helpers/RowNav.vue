<script>
import { computed } from 'vue';
export default {
  props: ['listState', 'navArray'],
  emits: ['returnState'],
  setup(props, { emit }) {
    const propsData = computed(() => props.listState);
    return { propsData, emit };
  },
};
</script>
<template>
  <ul class="border-b border-gray-200 flex w-full">
    <li v-for="(item, index) in navArray" :key="item">
      <button
        type="button"
        class="rowNavItem"
        :class="{ active: propsData === index + 1 }"
        @click="$emit('returnState', index + 1)"
      >
        {{ item }}
      </button>
    </li>
  </ul>
</template>
<style lang="scss"></style>
