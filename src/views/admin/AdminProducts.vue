<script>
import { ref, onMounted } from 'vue';
// eslint-disable-next-line no-unused-vars
import Modal from 'bootstrap/js/dist/modal';
import { apiMethod } from '@/methods/api.js';
import ProductDetail from '@/components/ProductDetail.vue';
export default {
  components: {
    ProductDetail,
  },
  setup() {
    const products = ref([]);
    let productModal = ref(null);
    // var myModal = new Modal(document.getElementById('exampleModal'));
    // const modal = new Modal(productModal.value);
    let selectItem = ref({
      id: '',
    });
    let newProductData = {
      title: '[賣]動物園造型衣服2',
      category: '衣服2',
      origin_price: 100,
      price: 300,
      unit: '個',
      description: 'Sit down please 名設計師設計',
      content: '這是內容',
      is_enabled: 1,
      imageUrl: '主圖網址',
      imagesUrl: [
        '圖片網址一',
        '圖片網址二',
        '圖片網址三',
        '圖片網址四',
        '圖片網址五',
      ],
    };
    function clearItem(data) {
      console.log(data);
      selectItem.value = data;
    }
    function openProductDetail(itemId) {
      const tempObj = products.value.find((item) => {
        return item.id === itemId;
      });
      console.log(tempObj);
      selectItem.value = JSON.parse(JSON.stringify(tempObj));
      console.log(selectItem);
    }
    async function newProduct() {
      await apiMethod.adminPostProduct(newProductData);
      getProduct();
    }
    async function deleteProduct(itemId) {
      await apiMethod.adminDeleteProduct(itemId);
      getProduct();
      selectItem.value = {
        id: '',
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
    function openModal() {
      // console.log(myModal);
      // productModal.value.show();
    }
    apiMethod.checkLogin().then(() => {
      getProduct();
    });
    onMounted(() => {
      // console.log(productModal.value, myModal);
    });
    return {
      products,
      selectItem,
      productModal,
      openProductDetail,
      newProduct,
      deleteProduct,
      updateProduct,
      changeProductState,
      clearItem,
      openModal,
    };
  },
};
</script>
<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="openModal"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      ref="productModal"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-lg-2 row-cols-1">
      <div class="col">
        <table class="table mt-4">
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
              <tr @click="openProductDetail(product.id)">
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
        <button type="button" class="btn btn-primary" @click="newProduct">
          新增產品
        </button>
      </div>
      <div class="col">
        <ProductDetail :select-item="selectItem" @clear-item="clearItem" />
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
