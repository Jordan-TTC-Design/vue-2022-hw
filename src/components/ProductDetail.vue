<script>
import { computed } from 'vue';
export default {
  props: ['selectItem'],
  emits: ['clearItem'],
  setup(props, { emit }) {
    const productItem = computed(() => props.selectItem);
    const clearItem = () => {
      emit('clearItem', { id: '' });
    };
    return { productItem, clearItem };
  },
};
</script>
<template>
  <h2>單一產品細節</h2>
  <template v-if="productItem.id !== ''">
    <button
      type="button"
      class="btn btn-outline-secondary mb-2"
      @click.capture="clearItem"
    >
      關閉
    </button>
    <div class="card mb-3">
      <img
        :src="productItem.imageUrl"
        class="card-img-top primary-image"
        alt="主圖"
      />
      <div class="card-body">
        <h5 class="card-title">
          {{ productItem.title }}
          <span class="badge bg-primary ms-2">{{ productItem.category }}</span>
        </h5>
        <p class="card-text">商品描述：{{ productItem.description }}</p>
        <p class="card-text">商品內容：{{ productItem.content }}</p>
        <div class="d-flex">
          <p class="card-text me-2">{{ productItem.origin_price }}</p>
          <p class="card-text text-secondary me-1">
            <del>{{ productItem.price }} </del>
          </p>
          / 元
        </div>
      </div>
    </div>
    <template v-for="imgData in productItem.imagesUrl" :key="imgData">
      <img :src="imgData" alt="imgData" class="images m-2" />
    </template>
  </template>
  <p v-if="productItem.id === ''" class="text-secondary">請選擇一個商品查看</p>
</template>
<style lang="scss"></style>
