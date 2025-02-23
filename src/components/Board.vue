<template>
  <div class="kanban-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="position: sticky; top: 0; z-index: 1;">
      <div class="container-fluid">
        <h2 class="text-light">Kanban Board</h2>
        <div>
          <a href="#" class="px-2"><img src="../assets/bell.png"></a>
          <a href="#" class="px-2"><img src="../assets/user.png"></a>
        </div>
      </div>
    </nav>

    <div class="sidebar d-flex align-items-center">
      <div>
        <button class="btn-home" style="background-color: #0D6EFD;"><img src="../assets/home.png" style="padding-right: 10px;"> Home</button>
      </div>
      <div>
        <button class="btn-logout" @click="logoutHandler"><img src="../assets/logout.png" style="padding-right: 10px;"> Logout</button>
      </div>
    </div>

    <div class="main-content">
      <div class="mb-3 d-flex">
        <input v-model="newBoardName" placeholder="Enter board name" class="form-control me-2" />
        <button @click="addNewBoard" class="btn btn-primary" style="width: 200px;"><img src="../assets/add.png" > Add Board</button>
      </div>  

      <div class="row">
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
                <button @click="deleteBoardHandler(board.id)" class="btn btn-danger btn-sm">
                  <img src="../assets/bin.png" alt="Delete">
                </button>
              </div>
            </div>
            <div class="card-body">
              <p v-for="task in board.tasks" :key="task.id" class="d-flex justify-content-between">
                <span>{{ task.name }}</span>
                <div>
                  <button class="btn btn-warning btn-sm me-1"><img src="../assets/note.png" alt=""> Edit</button>
                  <button class="btn btn-danger btn-sm"><img src="../assets/bin.png" alt=""> Bin</button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"; 

export default {
  data() {
    return { 
      newBoardName: "",
      userBoards: this.$store.state.boards[this.$store.state.currentUser?.username] || [],
      editingBoards: {}  
    };
  },
  methods: {
    ...mapMutations(["addBoard", "deleteBoard", "editBoard", "logout"]), 

    addNewBoard() {
      if (!this.newBoardName.trim()) return;
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
  },
  watch: {
    '$store.state.currentUser': function() {
      this.userBoards = this.$store.state.boards[this.$store.state.currentUser?.username] || [];
    }
  }
};
</script>

<style>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #4a90e2;
  flex-direction: column;
  padding: 10px 0;
  position: fixed;
  left: 0;
}

.btn-home, .btn-logout {
  display: flex;
  align-items: center;
  width: 230px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  color: white;
  margin-top: 10px;
}

.btn-logout {
  background-color: #d9534f;
  margin-bottom: 10px;
  bottom: 0 !important;
}

.main-content {
  margin-left: 350px;
  margin-right: 50px;
  margin-top: 60px;
  padding: 20px;
}
</style>
