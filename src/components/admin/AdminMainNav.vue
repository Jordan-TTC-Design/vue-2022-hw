<script>
import { ref } from 'vue';
export default {
  setup() {
    const btnStyle = ref(
      'flex items-center w-full h-12 px-3 mt-3 rounded hover:bg-opacity-75 hover:bg-yellow-500'
    );
    return { btnStyle };
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center w-40 min-h-screen text-yellow-500 bg-gray-900 shadow-sm"
  >
    <a class="flex items-center w-full px-3 py-6" href="#">
      <span class="ml-2 text-md font-bold">Boaboly Shop</span>
    </a>
    <div class="w-full px-2">
      <div class="flex flex-col items-center w-full border-t border-yellow-500">
        <a :class="btnStyle" class="group" href="#">
          <i class="bi bi-bar-chart-fill text-xl group-hover:text-gray-900"></i>
          <span
            class="ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"
            >總覽</span
          >
        </a>
        <a :class="btnStyle" class="group" href="#">
          <i class="bi bi-brush-fill text-xl group-hover:text-gray-900"></i>
          <span
            class="ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"
            >文章</span
          >
        </a>
        <a :class="btnStyle" class="group" href="#">
          <i class="bi bi-folder-fill text-xl group-hover:text-gray-900"></i>
          <span
            class="ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"
            >商品</span
          >
        </a>
        <a :class="btnStyle" class="group" href="#">
          <i class="bi bi-bag-check-fill text-xl group-hover:text-gray-900"></i>
          <span
            class="ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"
            >訂單</span
          >
        </a>
      </div>
    </div>
    <a
      class="flex items-center justify-center w-full h-16 mt-auto text-gray-900 bg-yellow-500 hover:bg-opacity-75"
      href="#"
    >
      <i class="bi bi-person-badge-fill text-2xl"></i>
      <span class="ml-2 text-sm font-medium">Account</span>
    </a>
  </div>
</template>
<style lang="scss"></style>
