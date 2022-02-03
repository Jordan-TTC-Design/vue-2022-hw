<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import imgUploader from '@/components/imgUploader.vue';
export default {
  components: {
    imgUploader,
  },
  props: ['selectItem', 'modal-state'],
  emits: ['get-product', 'clear-item'],
  setup(props, { emit }) {
    const productItem = computed(() => props.selectItem);
    const state = computed(() => props.modalState);
    const newProductItem = ref({
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      content: '',
      is_enabled: 1,
      imageUrl: '',
      imagesUrl: [''],
    });
    const imgCoverUploader = ref(null);
    const imgsData = ref([{ useUrl: true, url: '' }]);
    function upload() {
      console.dir(imgCoverUploader);
      const [file] = imgCoverUploader.value.files;
      apiMethod.adminImageUpload(file);
    }
    function getUrl(url, name) {
      console.log(url, name);
      if (name === '主要圖片') {
        productItem.value.imageUrl = url;
      } else {
        productItem.value.imagesUrl[name] = url;
      }
      console.log(productItem.value);
    }
    function newProduct() {
      console.log(productItem.value);
      console.log(state.value);
      if (state.value === 'isNew') {
        apiMethod.adminPostProduct(productItem.value).then(() => {
          emit('get-product');
          emit('clear-item');
        });
      } else if (state.value === 'edit') {
        apiMethod
          .adminUpdateProduct(productItem.value.id, productItem.value)
          .then(() => {
            emit('get-product');
            emit('clear-item');
          });
      }
    }
    return {
      imgsData,
      productItem,
      state,
      newProductItem,
      imgCoverUploader,
      upload,
      getUrl,
      newProduct,
    };
  },
};
</script>
<template>
  <form @submit.prevent="newProduct">
    <div class="mb-3">
      <label for="productTitle" class="form-label">標題</label>
      <input
        type="text"
        class="form-control"
        id="productTitle"
        v-model="productItem.title"
      />
    </div>
    <div class="mb-3">
      <label for="productCategory" class="form-label">分類</label>
      <input
        type="text"
        class="form-control"
        id="productCategory"
        v-model="productItem.category"
      />
    </div>
    <div class="mb-3">
      <label for="productUnit" class="form-label">單位</label>
      <input
        type="text"
        class="form-control"
        id="productUnit"
        v-model="productItem.unit"
      />
    </div>
    <div class="mb-3">
      <label for="productOriginPrice" class="form-label">原價</label>
      <input
        type="number"
        class="form-control"
        id="productOriginPrice"
        v-model="productItem.origin_price"
      />
    </div>
    <div class="mb-3">
      <label for="productPrice" class="form-label">價格</label>
      <input
        type="number"
        class="form-control"
        id="productPrice"
        v-model="productItem.price"
      />
    </div>
    <div class="mb-3">
      <label for="productDescription" class="form-label">產品描述</label>
      <textarea
        class="form-control"
        id="productDescription"
        rows="3"
        v-model="productItem.description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="productImgCover" class="form-label">圖片</label>
      <imgUploader @send-img-url="getUrl" :img-name="'主要圖片'" />
    </div>
    <div class="mb-3">
      <p>多圖</p>
      <div
        class="mb-4"
        v-for="(img, index) in productItem.imagesUrl"
        :key="`img${index}`"
      >
        <imgUploader @send-img-url="getUrl" :img-name="index" />
      </div>
      <button
        v-if="
          !productItem.imagesUrl.length ||
          productItem.imagesUrl[productItem.imagesUrl.length - 1] !== ''
        "
        type="button"
        class="btn btn-primary w-100 mb-2"
        @click="productItem.imagesUrl.push('')"
      >
        新增圖片欄位
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary w-100"
        @click="productItem.imagesUrl.pop()"
      >
        刪除圖片欄位
      </button>
    </div>
    <button type="submit" class="btn btn-primary me-2">
      {{ state === 'isNew' ? '新增產品' : '更新產品' }}
    </button>
    <button
      type="button"
      class="btn btn-outline-secondary"
      @click="$emit('clear-item')"
    >
      取消
    </button>
  </form>
</template>
<style lang="scss"></style>
