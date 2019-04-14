/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import * as actions from "~/src/store/todo/actions";

jest.mock("quasar", () => {
  // Works and lets you check for constructor calls:
  return {
    Notify: {
      create: jest.fn()
    },
    LocalStorage: {
      set: jest.fn(),
      getItem: jest.fn()
    }
  };
});

describe("Todo Actions", () => {
  const todo = { uid: 0, description: "one", done: true };

  it("serverAddTodo Success", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true, uid: 1 }));
    const commit = jest.fn((name, data) => {});
    await actions.serverAddTodo({ commit }, todo);
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls[0][0]).toEqual("addTodo");
    expect(commit.mock.calls[0][1]).toEqual({ ...todo, uid: 1 });
  });

  // it("serverAddTodo Fail", async () => {
  //   fetch.mockRejectOnce(JSON.stringify({ success: false }));
  //   const commit = jest.fn();
  //   await actions.serverAddTodo({ commit }, todo);
  //   expect(commit.mock.calls.length).toBe(0);
  // });

  it("serverEditTodo", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));
    const commit = jest.fn((name, data) => {});
    await actions.serverEditTodo({ commit }, todo);
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls[0][0]).toEqual("editTodo");
    expect(commit.mock.calls[0][1]).toEqual({ ...todo });
  });

  // it("serverEditTodo Fail", async () => {
  //   fetch.mockRejectOnce(JSON.stringify({ success: false }));
  //   const commit = jest.fn();
  //   await actions.serverEditTodo({ commit }, todo);
  //   expect(commit.mock.calls.length).toBe(0);
  // });

  it("serverDeleteTodo", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true }));
    const commit = jest.fn((name, data) => {});
    await actions.serverDeleteTodo({ commit }, todo.uid);
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls[0][0]).toEqual("deleteTodo");
    expect(commit.mock.calls[0][1]).toEqual(todo.uid);
  });

  // it("serverDeleteTodo fail", async () => {
  //   fetch.mockRejectOnce(JSON.stringify({ success: false }));
  //   const commit = jest.fn();
  //   await actions.serverDeleteTodo({ commit }, todo);
  //   expect(commit.mock.calls.length).toBe(0);
  // });

  it("serverGetAllTodos", async () => {
    fetch.mockResponseOnce(JSON.stringify({ todos: [] }));
    const commit = jest.fn((name, data) => {});
    await actions.serverGetAllTodos({ commit });
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls[0][0]).toEqual("setAllTodo");
    expect(commit.mock.calls[0][1]).toEqual([]);
  });

  // it("serverGetAllTodos fail", async () => {
  //   fetch.mockRejectOnce(JSON.stringify({ success: false }));
  //   const commit = jest.fn();
  //   await actions.serverGetAllTodos({ commit }, todo);
  //   expect(commit.mock.calls.length).toBe(0);
  // });
});
