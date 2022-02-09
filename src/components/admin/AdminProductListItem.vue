<script>
export default {
  props: ['product', 'listIndex'],
  emits: ['changeProductState', 'openProductDetail', 'deleteProduct'],
  setup(props, { emit }) {
    return { emit };
  },
};
</script>
<template>
  <div
    class="group border-b border-gray-200 p-5 flex items-center space-x-6 hover:bg-gray-50 hover:bg-opacity-50"
  >
    <div class="w-10 h-10 flex items-center justify-center">
      <p>{{ listIndex }}</p>
    </div>
    <div class="w-24 h-24 bg-gray-300 rounded-md"></div>
    <div class="flex-1 space-y-2">
      <p class="group-hover:text-yellow-600">{{ product.title }}</p>
      <div class="flex">
        <p class="bg-gray-100 rounded py-1 px-2 text-xs">標籤</p>
      </div>
    </div>
    <div class="flex space-x-3 flex-1 justify-end">
      <button
        type="button"
        class="w-24 border border-gray-200 bg-white rounded py-3 px-3 flex flex-row items-center justify-between space-x-1"
        @click="$emit('changeProductState', product)"
        :class="{
          'active flex-row-reverse border-yellow-400 hover:bg-yellow-100':
            product.is_enabled,
          'hover:bg-gray-100': !product.is_enabled,
        }"
      >
        <div
          :class="{ 'bg-yellow-400': product.is_enabled }"
          class="w-4 h-4 rounded-full bg-gray-200"
        ></div>
        <p class="" :class="{ 'text-yellow-500': product.is_enabled }">
          {{ product.is_enabled ? '啟用' : '未啟用' }}
        </p>
      </button>
      <button
        type="button"
        class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
        data-action="remove"
        data-id="product.id"
        @click="$emit('openProductDetail', 'edit', product)"
      >
        <i class="bi bi-pencil-square text-xl"></i>
      </button>
      <button
        type="button"
        class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
        data-action="remove"
        data-id="product.id"
        @click="$emit('deleteProduct', product.id)"
      >
        <i class="bi bi-trash2-fill text-xl"></i>
      </button>
    </div>
  </div>
</template>
<style lang="scss"></style>
