<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
import { apiMethod } from '@/methods/api.js';
export default {
  props: ['imgName'],
  emits: ['sendImgUrl'],
  setup(props, { emit }) {
    const imgCoverUploader = ref(null);
    const imgsData = ref({
      useUrl: false,
      url: '',
    });
    watch(
      () => imgsData.value.url,
      _.debounce((url) => {
        if (imgsData.value.useUrl) {
          console.log(url);
          sendImgUrl(url);
        }
      }, 2000)
    );
    function sendImgUrl(url) {
      emit('sendImgUrl', url, props.imgName);
    }
    function upload() {
      console.dir(imgCoverUploader);
      const [file] = imgCoverUploader.value.files;
      apiMethod.adminImageUpload(file).then((url) => {
        console.log(url);
        sendImgUrl(url);
      });
    }
    return { imgsData, imgCoverUploader, sendImgUrl, upload };
  },
};
</script>
<template>
  <div class="input-group">
    <input
      v-show="imgsData.useUrl"
      type="text"
      class="form-control"
      placeholder="請輸入圖片網址"
      v-model="imgsData.url"
    />
    <input
      v-show="!imgsData.useUrl"
      ref="imgCoverUploader"
      type="file"
      class="form-control"
      id="productImgCover"
      placeholder="請選擇上傳檔案"
    />
    <button
      v-show="!imgsData.useUrl"
      class="btn btn-outline-secondary"
      type="button"
      @click="upload"
    >
      上傳
    </button>
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="imgsData.useUrl = !imgsData.useUrl"
    >
      切換
    </button>
  </div>
</template>
<style lang="scss"></style>
