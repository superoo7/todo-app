/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import * as All from "quasar";
import Vuex from "vuex";
import TodoItem from "~/src/components/TodoItem.vue";
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe("TodoItem", () => {
  const localVue = createLocalVue();
  localVue.use(Quasar, { components });
  localVue.use(Vuex);

  let store;
  let mutations;
  let wrapper;
  let actions;
  const todo = {
    uid: 0,
    description: "zero",
    done: false
  };

  beforeAll(() => {
    mutations = {
      MUTATION: jest.fn()
    };
    actions = {
      serverEditTodo: jest.fn(),
      serverDeleteTodo: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        todo: {
          namespaced: true,
          state: {},
          mutations,
          actions
        }
      }
    });
    wrapper = mount(TodoItem, {
      store,
      localVue,
      propsData: todo
    });
  });

  it("snapshot testing", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("setEdit change editMode properly", () => {
    const { vm } = wrapper;
    vm.setEditTrue();
    expect(vm.editMode).toEqual(true);
    vm.setEditFalse();
    expect(vm.editMode).toEqual(false);
  });
});
