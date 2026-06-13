<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Ro'yxatdan o'tish</h2>
      <form @submit.prevent="handleSignUp">
        <div class="form-group">
          <label>Ism Familiya:</label>
          <input v-model="fullName" type="text" placeholder="Ali Valiyev" required />
        </div>
        <div class="form-group">
          <label>Email (Login):</label>
          <input v-model="email" type="email" placeholder="example@gmail.com" required />
        </div>
        <div class="form-group">
          <label>Parol:</label>
          <input v-model="password" type="password" placeholder="******" required />
        </div>
        <button type="submit" class="btn-auth">Ro'yxatdan o'tish</button>
      </form>
      <p class="auth-footer">
        Akkountingiz bormi? <router-link to="/login">Kirish</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleSignUp() {
      // Kelajakda bu yerda Backend (Spring Boot) ga so'rov yuboriladi
      alert(`Muvaffaqiyatli ro'yxatdan o'tdingiz, ${this.fullName}!`);
      this.$router.push('/login'); // Login sahifasiga o'tkazish
    }
  }
}
</script>

<style scoped>
.auth-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f6f9; font-family: sans-serif; }
.auth-card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h2 { text-align: center; color: #333; margin-bottom: 20px; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
label { margin-bottom: 5px; color: #666; font-size: 14px; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
.btn-auth { width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 10px; }
.btn-auth:hover { background: #218838; }
.auth-footer { text-align: center; margin-top: 15px; font-size: 14px; color: #555; }
</style>