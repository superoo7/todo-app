/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import * as All from "quasar";
import Vuex from "vuex";
import Todos from "~/src/components/Todos.vue";
const { Quasar } = All;

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key];
  if (val && val.component && val.component.name != null) {
    object[key] = val;
  }
  return object;
}, {});

describe("Todos", () => {
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
      serverDeleteTodo: jest.fn(),
      serverGetAllTodos: jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        todo: {
          namespaced: true,
          state: {
            todos: []
          },
          mutations,
          actions
        }
      }
    });
    wrapper = mount(Todos, {
      store,
      localVue,
      propsData: todo
    });
  });

  it("snapshot testing", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
