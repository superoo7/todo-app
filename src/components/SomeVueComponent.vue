<template>
  <div>Some Vue Component</div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {};
  }
};
</script>

<style></style>

<test lang="jest">
  import SomeVueComponent from "../SomeVueComponent.vue";
  import { mount } from "@vue/test-utils";
  describe("Some Vue Component", () => {
    it("snapshot vue component", () => {
      const vueEl = mount(SomeVueComponent);
      expect(vueEl.html()).toMatchSnapshot();
    })
  })
</test>
