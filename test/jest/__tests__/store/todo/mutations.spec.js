/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import * as mutations from "~/src/store/todo/mutations";

describe("Todo Mutation", () => {
  let state;
  const val = { uid: 1, descrpition: "Two", done: true };

  beforeEach(() => {
    state = {
      todos: [
        {
          uid: 0,
          descrpition: "One",
          done: false
        }
      ]
    };
  });

  it("addTodo", () => {
    const expected = { todos: [...state.todos, val] };
    mutations.addTodo(state, val);
    expect(state).toEqual(expected);
  });

  it("deleteTodo", () => {
    const expected = { todos: [val] };
    state = { todos: [...state.todos, val] };
    mutations.deleteTodo(state, 0);
    expect(state).toEqual(expected);
  });

  it("editTodo", () => {
    const val1 = { uid: 0, descrpition: "Two", done: true };
    const expected = { todos: [val1] };
    mutations.editTodo(state, val1);
    expect(state).toEqual(expected);
  });

  it("setAllTodo", () => {
    const s = { todos: [] };
    const expected = { todos: [val] };
    mutations.setAllTodo(s, [val]);
    expect(s).toEqual(expected);
  });
});
