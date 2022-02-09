<script>
import { ref, computed } from 'vue';
import { apiMethod } from '@/methods/api.js';
import AdminProductEdit from '@/components/admin/AdminProductEdit.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminProductListItem from '@/components/admin/AdminProductListItem.vue';

export default {
  components: {
    AdminProductEdit,
    RowNav,
    AdminProductListItem,
  },
  setup() {
    const products = ref([]);
    let listState = ref(1);
    const productList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = products.value.filter((product) => product.is_enabled);
      } else if (listState.value === 3) {
        array = products.value.filter((product) => !product.is_enabled);
      } else {
        array = products.value;
      }
      return array;
    });
    let selectItem = ref({
      imagesUrl: [],
    });
    let modalState = ref(null);
    let modalOpen = ref(false);
    function clearItem() {
      modalOpen.value = false;
      modalState.value = null;
      selectItem.value = {
        imagesUrl: [],
      };
    }
    function openProductDetail(state, item) {
      modalOpen.value = true;
      modalState.value = state;
      if (state === 'isNew') {
        selectItem.value = {
          imagesUrl: [],
        };
      } else if (state === 'edit') {
        selectItem.value = JSON.parse(JSON.stringify(item));
      }
    }
    async function deleteProduct(itemId) {
      await apiMethod.adminDeleteProduct(itemId);
      getProduct();
      selectItem.value = {
        imagesUrl: [],
      };
    }
    function changeProductState(productData) {
      productData.is_enabled = !productData.is_enabled;
      updateProduct(productData.id, productData);
    }
    async function updateProduct(itemId, productData) {
      await apiMethod.adminUpdateProduct(itemId, productData);
      getProduct();
    }
    function getProduct() {
      apiMethod.adminGetProductsAll().then((res) => {
        products.value = Object.values(res);
        console.log(products.value);
      });
    }
    apiMethod.checkLogin().then(() => {
      getProduct();
    });
    return {
      productList,
      listState,
      modalState,
      modalOpen,
      selectItem,
      openProductDetail,
      deleteProduct,
      changeProductState,
      clearItem,
      getProduct,
    };
  },
};
</script>
<template>
  <div class="relative px-4">
    <div class="sticky top-0 bg-white z-40 px-5 pt-6 pb-4">
      <div class="grid grid-cols-3 mb-8">
        <div class="col-span-1">
          <h3 class="text-3xl font-medium">商品列表</h3>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
            type="button"
            class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="openProductDetail('isNew')"
          >
            新增產品
          </button>
        </div>
      </div>
      <RowNav
        :list-state="listState"
        :nav-array="['全部商品', '刊登中', '已下架']"
        @return-state="listState = $event"
      />
    </div>
    <div class="grid grid-cols-3 p-5 gap-4">
      <div class="col-span-1 min-h-screen">
        <h5 class="mb-4">分類</h5>
        <div class="bg-gray-100 rounded p-4 h-full"></div>
      </div>
      <div class="col-start-2 col-span-2">
        <h5 class="mb-4">商品</h5>
        <template v-for="(product, index) in productList" :key="product.id">
          <AdminProductListItem
            :product="product"
            :list-index="index"
            @change-product-state="changeProductState"
            @open-product-detail="openProductDetail"
            @delete-product="deleteProduct"
          />
        </template>
      </div>
    </div>
  </div>
  <div
    class="siderBg"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox" :class="{ active: modalOpen }">
    <AdminProductEdit
      :select-item="selectItem"
      :modal-state="modalState"
      @get-product="getProduct"
      @clear-item="clearItem"
    />
  </div>
</template>
<style lang="scss"></style>
