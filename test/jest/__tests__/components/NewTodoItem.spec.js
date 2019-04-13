/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import * as All from "quasar";
import Vuex from "vuex";
import NewTodoItem from "~/src/components/NewTodoItem.vue";
const { Quasar, date } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe("NewTodoItem", () => {
  const localVue = createLocalVue();
  localVue.use(Quasar, { components });
  localVue.use(Vuex);

  let store;
  let mutations;
  let wrapper;
  let actions;

  beforeAll(() => {
    mutations = {
      MUTATION: jest.fn()
    };
    actions = {
      serverAddTodo: jest.fn()
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
    wrapper = mount(NewTodoItem, {
      store,
      localVue
    });
  });

  it("snapshot testing", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("submit method should fail if value is empty", () => {
    const { vm } = wrapper;
    vm.value = "";
    vm.submit();
    expect(vm.errorMessage).toEqual("No data entered");
  });

  it("submit successfully when there is value", async () => {
    const { vm } = wrapper;
    const description = "asdqwe";
    vm.value = description;
    await vm.submit();
    expect(actions.serverAddTodo.mock.calls).toHaveLength(1);
    expect(actions.serverAddTodo.mock.calls[0][1]).toEqual({
      description,
      done: false
    });
    expect(vm.value).toEqual("");
  });
});
