<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Tizimga Kirish</h2>
      <form @submit.prevent="handleSignIn">
        <div class="form-group">
          <label>Email:</label>
          <input v-model="email" type="email" placeholder="example@gmail.com" required />
        </div>
        <div class="form-group">
          <label>Parol:</label>
          <input v-model="password" type="password" placeholder="******" required />
        </div>
        <button type="submit" class="btn-auth">Kirish</button>
      </form>
      <p class="auth-footer">
        Yangi foydalanuvchimisiz? <router-link to="/">Ro'yxatdan o'tish</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSignIn() {
      // Kirish logikasi (Hozircha test rejimi)
      if (this.email && this.password) {
        this.$router.push('/dashboard');
      }
    }
  }
}
</script>

<style scoped>
/* SignUp bilan bir xil dizayn, faqat tugma rangi ko'k */
.auth-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f4f6f9; font-family: sans-serif; }
.auth-card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
h2 { text-align: center; color: #333; margin-bottom: 20px; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
label { margin-bottom: 5px; color: #666; font-size: 14px; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
.btn-auth { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 10px; }
.btn-auth:hover { background: #0069d9; }
.auth-footer { text-align: center; margin-top: 15px; font-size: 14px; color: #555; }
</style>