<script>
import { ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import ProductDetail from '@/components/ProductDetail.vue';
export default {
  components: {
    ProductDetail,
  },
  setup() {
    const products = ref([]);
    let selectItem = ref({
      id: '',
    });
    let newProductData = {
      data: {
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
      },
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
      selectItem,
      openProductDetail,
      newProduct,
      deleteProduct,
      clearItem,
    };
  },
};
</script>
<template>
  <div class="container">
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
            <template v-for="product in products" :key="product.id">
              <tr @click="openProductDetail(product.id)">
                <td>{{ product.title }}</td>
                <td width="120">{{ product.origin_price }}</td>
                <td width="120">{{ product.price }}</td>
                <td width="100">
                  <span :class="{ 'text-success': product.is_enabled }">{{
                    product.is_enabled ? '啟用' : '未啟用'
                  }}</span>
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
