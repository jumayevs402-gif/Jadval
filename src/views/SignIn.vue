<template>
  <div class="auth-wrapper">
    <div class="glow-orb"></div>
    
    <div class="auth-blur-card">
      <div class="brand-badge-zone">
        <div class="bolt-avatar">⚡</div>
        <h2>Tizimga Kirish</h2>
        <p>Mini Kundalik intellektual boshqaruv platformasi</p>
      </div>

      <div v-if="!selectedRole" class="step-role-selection">
        <label class="section-title">AVVAL KIMLIGINGIZNI TANLANG:</label>
        
        <div class="role-grid">
          <button @click="selectRole('admin')" class="role-btn admin-theme">
            <span class="role-icon">🛡️</span>
            <div class="role-meta">
              <h3>Tizim Administratori</h3>
              <p>Global boshqaruv va tizim kodlari</p>
            </div>
          </button>

          <button @click="selectRole('teacher')" class="role-btn teacher-theme">
            <span class="role-icon">🎓</span>
            <div class="role-meta">
              <h3>Sinf Rahbari / O'qituvchi</h3>
              <p>Ism va familiya orqali ish stoliga kirish</p>
            </div>
          </button>

          <button @click="selectRole('student')" class="role-btn student-theme">
            <span class="role-icon">👦</span>
            <div class="role-meta">
              <h3>O'quvchi / Talaba</h3>
              <p>Ism va familiya orqali kundalikni ko'rish</p>
            </div>
          </button>
        </div>
      </div>

      <div v-else class="step-identity-auth">
        <div class="selected-role-pill">
          <span class="pill-badge">
            {{ selectedRole === 'admin' ? '🛡️ Administrator' : selectedRole === 'teacher' ? '🎓 O\'qituvchi' : '👦 O\'quvchi' }}
          </span>
          <button @click="resetSelection" class="change-role-link">O'zgartirish</button>
        </div>

        <form @submit.prevent="handleLoginVerification" class="auth-form">
          
          <div v-if="selectedRole === 'admin'" class="input-field-wrapper">
            <label>Admin Maxfiy Kodi</label>
            <div class="secure-input-box">
              <span class="input-icon">🔒</span>
              <input 
                v-model="adminCode" 
                type="password" 
                placeholder="••••••••" 
                required 
                autofocus
              />
            </div>
          </div>

          <div v-else>
            <div class="input-field-wrapper">
              <label>Ismingiz</label>
              <div class="secure-input-box">
                <span class="input-icon">👤</span>
                <input 
                  v-model="firstName" 
                  type="text" 
                  placeholder="Ismingizni kiriting" 
                  required 
                  autofocus
                />
              </div>
            </div>

            <div class="input-field-wrapper">
              <label>Familiyangiz</label>
              <div class="secure-input-box">
                <span class="input-icon">✍️</span>
                <input 
                  v-model="lastName" 
                  type="text" 
                  placeholder="Familiyangizni kiriting" 
                  required 
                />
              </div>
            </div>
          </div>

          <p v-if="errorMessage" class="error-toast">
            ⚠️ {{ selectedRole === 'admin' ? 'Admin kodi noto\'g\'ri!' : 'Kiritilgan ism-familiya tizimda ro\'yxatda yo\'q!' }}
          </p>

          <button type="submit" class="auth-submit-glow-btn">
            <span>Tizimga Kirish</span>
            <span class="arrow-vector">→</span>
          </button>
        </form>
      </div>

      <div class="auth-footer-bar">
    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      selectedRole: null,
      adminCode: '',
      firstName: '',
      lastName: '',
      errorMessage: false
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      this.errorMessage = false;
      this.clearInputs();
    },
    resetSelection() {
      this.selectedRole = null;
      this.errorMessage = false;
      this.clearInputs();
    },
    clearInputs() {
      this.adminCode = '';
      this.firstName = '';
      this.lastName = '';
    },
    handleLoginVerification() {
      // 1. ADMIN TEKSHIRUVI
      if (this.selectedRole === 'admin') {
        if (this.adminCode === 'admin123') {
          this.errorMessage = false;
          this.$router.push('/dashboard').catch(err => console.error(err));
        } else {
          this.errorMessage = true;
        }
        return;
      }

      // Kiritilgan ism-familiyalarni tozalab olish
      const fName = this.firstName.trim().toLowerCase();
      const lName = this.lastName.trim().toLowerCase();

      // 2. O'QITUVCHI TEKSHIRUVI (Mana shu joy o'zgardi - endi to'g'ridan-to'g'ri admin kiritgan bazadan o'qiydi!)
      if (this.selectedRole === 'teacher') {
        const localTeachers = localStorage.getItem('teachers');
        // Agar admin paneldan hali hech kim qo'shilmagan bo'lsa, jamoangiz default holatda turadi
        const dbTeachers = localTeachers ? JSON.parse(localTeachers) : [
          { name: 'Zuhriddin', surname: 'Ustoz' },
          { name: 'Botir', surname: 'Ustoz' },
          { name: 'Madina', surname: 'Ustoz' },
          { name: 'Mastura', surname: 'Ustoz' }
        ];

        const hasAccess = dbTeachers.some(
          t => t.name.trim().toLowerCase() === fName && t.surname.trim().toLowerCase() === lName
        );

        if (hasAccess) {
          this.errorMessage = false;
          this.$router.push('/teacher').catch(err => console.error(err));
        } else {
          this.errorMessage = true;
        }
      } 
      
      // 3. O'QUVCHI TEKSHIRUVI (Bu ham admin kiritgan 'students' bazasidan o'qiydi)
      else if (this.selectedRole === 'student') {
        const localStudents = localStorage.getItem('students');
        const dbStudents = localStudents ? JSON.parse(localStudents) : [
          { name: 'Ali', surname: 'Valiyev' },
          { name: 'Hasan', surname: 'Karimov' },
          { name: 'Dilshod', surname: 'Rahimov' }
        ];

        const hasAccess = dbStudents.some(
          s => s.name.trim().toLowerCase() === fName && s.surname.trim().toLowerCase() === lName
        );

        if (hasAccess) {
          this.errorMessage = false;
          this.$router.push('/student').catch(err => console.error(err));
        } else {
          this.errorMessage = true;
        }
      }
    }
  }
}
</script>

<style scoped>
/* Dizayn kodlari o'zgarishsiz chiroyli holatda qoldi */
.auth-wrapper { min-height: 100vh; background: #0b0f19; display: flex; justify-content: center; align-items: center; font-family: 'Inter', system-ui, sans-serif; position: relative; overflow: hidden; padding: 20px; }
.glow-orb { position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 75%); top: -150px; right: -100px; pointer-events: none; }
.auth-blur-card { width: 100%; max-width: 460px; background: rgba(17, 24, 39, 0.75); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 24px; padding: 40px; box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7); z-index: 10; }
.brand-badge-zone { text-align: center; margin-bottom: 32px; }
.bolt-avatar { font-size: 26px; background: rgba(255, 255, 255, 0.04); padding: 12px; border-radius: 16px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 14px; color: #f59e0b; }
.brand-badge-zone h2 { color: #f8fafc; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
.brand-badge-zone p { color: #94a3b8; font-size: 13px; margin: 6px 0 0 0; }
.section-title { display: block; color: #94a3b8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
.role-grid { display: flex; flex-direction: column; gap: 14px; }
.role-btn { display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(31, 41, 55, 0.4); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 14px; cursor: pointer; text-align: left; transition: all 0.2s ease; }
.role-icon { font-size: 22px; background: rgba(255, 255, 255, 0.03); padding: 8px; border-radius: 10px; }
.role-meta h3 { margin: 0; font-size: 15px; font-weight: 700; color: #f1f5f9; }
.role-meta p { margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; line-height: 1.4; }
.role-btn:hover { transform: translateY(-2px); background: rgba(31, 41, 55, 0.8); }
.admin-theme:hover { border-color: #3b82f6; box-shadow: 0 10px 20px -10px rgba(59, 130, 246, 0.25); }
.teacher-theme:hover { border-color: #10b981; box-shadow: 0 10px 20px -10px rgba(16, 185, 129, 0.25); }
.student-theme:hover { border-color: #6366f1; box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.25); }
.selected-role-pill { display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 24px; }
.pill-badge { font-size: 13px; font-weight: 700; color: #f1f5f9; }
.change-role-link { background: none; border: none; color: #ef4444; font-size: 12px; font-weight: 600; cursor: pointer; }
.input-field-wrapper { margin-bottom: 20px; }
.input-field-wrapper label { display: block; color: #cbd5e1; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.secure-input-box { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 14px; color: #4b5563; }
.secure-input-box input { width: 100%; padding: 12px 14px 12px 42px; background: rgba(15, 23, 42, 0.8); border: 1px solid #374151; border-radius: 12px; color: white; font-size: 14px; outline: none; box-sizing: border-box; }
.secure-input-box input:focus { border-color: #3b82f6; }
.error-toast { margin: 8px 0 0 0; font-size: 12px; color: #f87171; font-weight: 600; }
.auth-submit-glow-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border: none; border-radius: 12px; color: white; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 24px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); }
.auth-submit-glow-btn:hover { filter: brightness(1.1); }
.auth-footer-bar { text-align: center; margin-top: 28px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px; font-size: 13px; color: #6b7280; }
.auth-footer-bar a { color: #10b981; text-decoration: none; font-weight: 600; }
</style>