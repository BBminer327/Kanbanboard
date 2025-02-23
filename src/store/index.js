import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    boards: JSON.parse(localStorage.getItem("kanbanBoards")) || {} 
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (!state.boards[user.username]) {
        state.boards[user.username] = [];
      }

      localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
    },

    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    addBoard(state, boardName) {
      if (!state.currentUser) return;

      const userBoards = state.boards[state.currentUser.username];
      const newBoard = { id: Date.now(), name: boardName};
      userBoards.push(newBoard);

      localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
    },

    editBoard(state, { boardId, newName }) {
      if (!state.currentUser) return;

      const userBoards = state.boards[state.currentUser.username];
      const board = userBoards.find(board => board.id === boardId);
      if (board) {
        board.name = newName;
        localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
      }
    },

    deleteBoard(state, boardId) {
      if (!state.currentUser) return;

      state.boards[state.currentUser.username] = state.boards[state.currentUser.username].filter(board => board.id !== boardId);

      localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
    }
  }
});
