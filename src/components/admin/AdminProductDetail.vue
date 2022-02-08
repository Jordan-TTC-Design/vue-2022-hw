<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import ImgUploader from '@/components/admin/ImgUploader.vue';
export default {
  components: {
    ImgUploader,
  },
  props: ['selectItem'],
  emits: ['clearItem', 'newProduct'],
  setup(props, { emit }) {
    const productItem = computed(() => props.selectItem);
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
    function clearItem() {
      emit('clearItem', { id: '' });
    }
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
      emit('newProduct', productItem.value);
    }
    return {
      imgsData,
      productItem,
      newProductItem,
      imgCoverUploader,
      clearItem,
      upload,
      getUrl,
      newProduct,
    };
  },
};
</script>
<template>
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
  <form @submit.prevent="newProduct">
    <div class="mb-3">
      <label for="productImgCover" class="form-label">圖片</label>
      <!-- <div class="input-group">
        <input
          ref="imgCoverUploader"
          type="file"
          class="form-control"
          id="productImgCover"
          placeholder="上傳"
        />
        <button class="btn btn-outline-secondary" type="button" @click="upload">
          上傳
        </button>
        <button class="btn btn-outline-secondary" type="button">切換</button>
      </div> -->
      <ImgUploader @send-img-url="getUrl" :img-name="'主要圖片'" />
    </div>
    <div class="mb-3">
      <p>多圖</p>
      <template
        v-for="(img, index) in productItem.imagesUrl"
        :key="`img${index}`"
      >
        <ImgUploader @send-img-url="getUrl" :img-name="index" />
      </template>
      <button
        v-if="
          !productItem.imagesUrl.length ||
          productItem.imagesUrl[productItem.imagesUrl.length - 1] !== ''
        "
        type="button"
        class="btn btn-primary w-100"
        @click="productItem.imagesUrl.push('')"
      >
        新增圖片欄位
      </button>
      <button
        type="button"
        class="btn btn-outline-gray w-100"
        @click="productItem.imagesUrl.pop()"
      >
        刪除圖片欄位
      </button>
    </div>
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
    <button type="submit" class="btn btn-primary">新增產品</button>
  </form>
</template>
<style lang="scss"></style>
