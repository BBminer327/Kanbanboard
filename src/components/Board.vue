<template>
  <nav style="position: sticky; top: 0; z-index: 1;">
    <div class="d-flex justify-content-between align-items-center p-3 bg-primary">
      <h2 class="text-light">Kanban Board</h2>
      <button v-if="currentUser" @click="logoutHandler" class="btn btn-danger"><img src="../assets/logout.png"> Logout</button>
    </div>
  </nav>

  <div class="container mt-4">
    <div class="mb-3 d-flex">
      <input v-model="newBoardName" placeholder="Enter board name" class="form-control me-2" />
      <button @click="addNewBoard" class="btn btn-primary" style="width: 200px;"><img src="../assets/add.png"> Add Board</button>
    </div>  

    <div class="row ">
      <div v-for="board in userBoards" :key="board.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span v-if="!editingBoards[board.id]" class="fw-bold">{{ board.name }}</span>
              <input 
                v-else 
                v-model="editingBoards[board.id]" 
                class="form-control"
              />
            </div>
            <div>
              <button v-if="!editingBoards[board.id]" @click="editBoardName(board)" class="btn btn-warning btn-sm mx-1">
                <img src="../assets/note.png"> Edit
              </button>
              <button v-if="editingBoards[board.id]" @click="saveBoardName(board)" class="btn btn-success btn-sm mx-1">
                <img src="../assets/diskette.png"> Save 
              </button>
              <button @click="deleteBoardHandler(board.id)" class="btn btn-danger btn-sm"><img src="../assets/bin.png"> Bin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return { 
      newBoardName: "", 
      editingBoards: {} 
    };
  },
  computed: {
    ...mapState(["currentUser", "boards"]),
    userBoards() {
      if (!this.currentUser || !this.boards[this.currentUser.username]) {
        return [];
      }
      return this.boards[this.currentUser.username];
    }
  },
  methods: {
    ...mapMutations(["addBoard", "deleteBoard", "editBoard", "logout"]),

    addNewBoard() {
      if (!this.newBoardName.trim() || !this.currentUser) return;
      this.addBoard(this.newBoardName);
      this.newBoardName = "";
    },

    deleteBoardHandler(boardId) {
      this.deleteBoard(boardId);
    },

    editBoardName(board) {
      this.editingBoards[board.id] = board.name;
    },

    saveBoardName(board) {
      const newName = this.editingBoards[board.id]?.trim();
      if (!newName) return;

      this.editBoard({ boardId: board.id, newName });

      delete this.editingBoards[board.id];
    },

    logoutHandler() {
      this.logout();
      location.reload();
    }
  }
};
</script>
