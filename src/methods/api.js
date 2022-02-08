import axios from 'axios';

const api = {
  url: 'https://vue3-course-api.hexschool.io/v2',
  path: 'boaboly-shop',
};
const apiPath = {
  signin: `${api.url}/admin/signin`,
  checkLogin: `${api.url}/api/user/check`,
  adminGetProductsAll: `${api.url}/api/${api.path}/admin/products/all`,
  adminGetProducts: `${api.url}/api/${api.path}/admin/products`,
  adminPostProduct: `${api.url}/api/${api.path}/admin/product`,
  adminDeleteProduct: `${api.url}/api/${api.path}/admin/product`,
  adminUpdateProduct: `${api.url}/api/${api.path}/admin/product`,
  imgUpload: `${api.url}/api/${api.path}/admin/upload`,
};

const token = document.cookie.replace(
  // eslint-disable-next-line no-useless-escape
  /(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
// 把Authorization加到HEADER
axios.defaults.headers.common['Authorization'] = token;

const apiMethod = {
  login(user) {
    axios
      .post(apiPath.signin, user)
      .then((res) => {
        console.log(res);
        //把 token 和 expired 儲存在 cookie
        const { token, expired } = res.data;
        document.cookie = `ttcDesignToken=${token}; expires=${new Date(
          expired
        )};`;
        console.log('success');
        window.location = '/admin';
      })
      .catch((err) => {
        console.log(err);
      });
  },
  checkLogin() {
    return axios
      .post(apiPath.checkLogin)
      .then((res) => {
        console.log(res);
        return res.data.success;
      })
      .catch((err) => {
        console.log(err);
        this.turnBackLogin(err.response.status);
      });
  },
  adminGetProductsAll() {
    return axios
      .get(apiPath.adminGetProductsAll)
      .then((res) => {
        console.log('取得成功');
        console.log(res);
        return res.data.products;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminPostProduct(productData) {
    console.log(productData);
    const product = {
      data: {
        ...productData,
      },
    };
    return axios
      .post(apiPath.adminPostProduct, product)
      .then((res) => {
        console.log('新增成功');
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminDeleteProduct(itemId) {
    return axios
      .delete(`${apiPath.adminDeleteProduct}/${itemId}`)
      .then((res) => {
        console.log(res);
        console.log('刪除成功');
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminUpdateProduct(itemId, productData) {
    const product = {
      data: {
        ...productData,
      },
    };
    return axios
      .put(`${apiPath.adminUpdateProduct}/${itemId}`, product)
      .then((res) => {
        console.log(res);
        console.log('更新成功');
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adminImageUpload(file) {
    const formData = new FormData(); // 產生表單格式
    formData.append('file-to-upload', file);
    return axios
      .post(`${apiPath.imgUpload}`, formData)
      .then((res) => {
        console.log(res);
        return res.data.imageUrl;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  turnBackLogin(status) {
    if (status === 401) {
      window.location = '/admin-login';
    }
  },
};
export { apiMethod };
