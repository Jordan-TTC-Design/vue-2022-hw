<script>
import { ref } from 'vue';
export default {
  setup() {
    const btnStyle = ref(
      'flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300'
    );
    return { btnStyle };
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center w-40 min-h-screen overflow-hiddentext-gray-700 bg-gray-100 rounded shadow-sm"
  >
    <a class="flex items-center w-full px-3 mt-3" href="#">
      <span class="ml-2 text-sm font-bold">Boaboly Shop</span>
    </a>
    <div class="w-full px-2">
      <div
        class="flex flex-col items-center w-full mt-2 border-t border-gray-300"
      >
        <a :class="btnStyle" href="#">
          <i class="bi bi-bar-chart-fill text-xl"></i>
          <span class="ml-2 text-sm font-medium">總覽</span>
        </a>
        <a :class="btnStyle" href="#">
          <i class="bi bi-brush-fill text-xl"></i>
          <span class="ml-2 text-sm font-medium">文章</span>
        </a>
        <a :class="btnStyle" href="#">
          <i class="bi bi-folder-fill text-xl"></i>
          <span class="ml-2 text-sm font-medium">產品</span>
        </a>
        <a :class="btnStyle" href="#">
          <i class="bi bi-bag-check-fill text-xl"></i>
          <span class="ml-2 text-sm font-medium">訂單</span>
        </a>
      </div>
    </div>
    <a
      class="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
      href="#"
    >
      <i class="bi bi-person-badge-fill text-2xl"></i>
      <span class="ml-2 text-sm font-medium">Account</span>
    </a>
  </div>
</template>
<style lang="scss"></style>
