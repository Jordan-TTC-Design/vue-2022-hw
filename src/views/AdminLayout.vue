<script>
import { RouterView } from 'vue-router';
import AdminMainNav from '@/components/admin/AdminMainNav.vue';
export default {
  components: {
    AdminMainNav,
  },
  setup() {
    return {
      RouterView,
    };
  },
};
</script>

<template>
  <div class="flex min-h-screen">
    <AdminMainNav />
    <div class="px-4 flex-">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss"></style>
