<script>
import { ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import AdminProductEdit from '@/components/admin/AdminProductEdit.vue';

export default {
  components: {
    AdminProductEdit,
  },
  setup() {
    const products = ref([]);
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
    function changeProductState(itemKey) {
      products.value[itemKey].is_enabled = !products.value[itemKey].is_enabled;
      updateProduct(products.value[itemKey].id, products.value[itemKey]);
    }
    async function updateProduct(itemId, productData) {
      await apiMethod.adminUpdateProduct(itemId, productData);
      getProduct();
    }
    function getProduct() {
      apiMethod.adminGetProductsAll().then((res) => {
        products.value = Object.values(res);
      });
    }
    apiMethod.checkLogin().then(() => {
      getProduct();
    });
    return {
      products,
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
  <div class="grid grid-cols-12">
    <div class="col-start-2 col-span-10">
      <div class="flex justify-content-between">
        <h3>產品列表</h3>
        <button
          type="button"
          class="btn btn-primary"
          @click="openProductDetail('isNew')"
        >
          新增產品
        </button>
      </div>
      <table class="table mt-4 w-full">
        <thead>
          <tr>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="120">刪除</th>
          </tr>
        </thead>
        <tbody id="productList" v-if="products.length > 0">
          <template v-for="(product, index) in products" :key="product.id">
            <tr
              class="adminList__item"
              @click="openProductDetail('edit', product)"
            >
              <td>{{ product.title }}</td>
              <td width="120">{{ product.origin_price }}</td>
              <td width="120">{{ product.price }}</td>
              <td width="100">
                <div
                  class="switch"
                  @click.stop="changeProductState(index)"
                  :class="{ active: product.is_enabled }"
                >
                  <div class="switch__control"></div>
                  <p class="switch__txt">
                    {{ product.is_enabled ? '啟用' : '未啟用' }}
                  </p>
                </div>
              </td>
              <td width="120">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger move deleteBtn"
                  data-action="remove"
                  data-id="product.id"
                  @click.stop="deleteProduct(product.id)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <p>
        目前有 <span id="productCount">{{ products.length }}</span> 項產品
      </p>
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
