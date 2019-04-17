<template>
  <q-page padding>
    <!-- content -->
    <some-vue-component />
  </q-page>
</template>

<script>
import SomeVueComponentVue from "../components/SomeVueComponent.vue";

export default {
  // name: 'PageName',
  components: {
    "some-vue-component": SomeVueComponentVue
  }
};
</script>

<style></style>
