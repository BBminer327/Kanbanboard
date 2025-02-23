<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="p-4" style="width: 350px; border-radius: 12px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
      <h3 class="d-flex justify-content-center align-items-center"><img src="../assets/padlock.png"> Login</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p v-if="error" class="text-danger mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { users } from "../data/users.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        this.setUser(user); 
        this.$router.push("/board");  
      } else {
        this.error = "❌ Invalid username or password!";
      }
    }
  }
};
</script>

