<template>
  <div :class="['admin-premium-root', isDarkMode ? 'dark-premium' : 'light-premium']">
    <div class="glass-blur-bg"></div>
    
    <div class="main-universe">
      
      <header class="premium-navbar">
        <div class="brand-core">
          <div class="neon-logo">⚡</div>
          <div>
            <h1>Global Nexus Control</h1>
            <p class="sub-glowing-text">Mini Kundalik Core System v3.0</p>
          </div>
        </div>
        <div class="nav-control-center">
          <button @click="isDarkMode = !isDarkMode" class="premium-theme-btn">
            <span v-if="isDarkMode">☀️ Light Mode</span>
            <span v-else>🌙 Cyber Dark</span>
          </button>
          <button @click="logout" class="premium-logout-btn">🚀 Chiqish</button>
        </div>
      </header>

      <nav class="premium-navigation">
        <button :class="['cyber-tab', activeTab === 'dates' ? 'cyber-active' : '']" @click="activeTab = 'dates'">
          <span class="icon">📅</span> Haftalik Reja & Vaqt
        </button>
        <button :class="['cyber-tab', activeTab === 'teachers' ? 'cyber-active' : '']" @click="activeTab = 'teachers'">
          <span class="icon">🎓</span> Akademik Ustozlar
        </button>
        <button :class="['cyber-tab', activeTab === 'students' ? 'cyber-active' : '']" @click="activeTab = 'students'">
          <span class="icon">👥</span> Talabalar Kontingenti
        </button>
      </nav>

      <div v-if="activeTab === 'dates'" class="cyber-card section-animate">
        <div class="card-intel-header">
          <div class="glowing-dot"></div>
          <div>
            <h2>Haftalik Dars Kunlari va Vaqt Matritsasi</h2>
            <p>Kiritilgan ma'lumotlar real-time formatda jurnallarga ta'sir qiladi.</p>
          </div>
        </div>

        <form @submit.prevent="addDay" class="cyber-form">
          <div class="cyber-grid">
            <div class="cyber-input-group">
              <label>Hafta kunini tanlang</label>
              <div class="input-wrapper">
                <select v-model="selectedDayInput" class="premium-select" required>
                  <option value="" disabled selected>Kutilmoqda...</option>
                  <option v-for="day in weekDaysOptions" :key="day" :value="day">{{ day }}</option>
                </select>
                <span class="focus-border"></span>
              </div>
            </div>
            
            <div class="cyber-input-group">
              <label>Dars boshlanish vaqti (Qo'lda kiritish)</label>
              <div class="input-wrapper">
                <input v-model="selectedTimeInput" type="time" class="premium-time-input" required />
                <span class="focus-border"></span>
              </div>
            </div>
          </div>
          
          <button type="submit" class="cyber-neon-btn date-neon">
            <span class="btn-gaze"></span>
            ⚡ HAFTALIK JADVALGA BIRIKTIRISH
          </button>
        </form>

        <div class="cyber-table-container">
          <table class="cyber-table">
            <thead>
              <tr>
                <th style="width: 80px;">T/R</th>
                <th>KUN VA ANIQ BELGILANGAN VAQTI</th>
                <th style="text-align: right;">STRUKTURALI AMAL</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(d, index) in datesList" :key="index" class="table-row-premium">
                <td><span class="index-badge">#0{{ index + 1 }}</span></td>
                <td>
                  <div class="combined-time-pill">
                    <span class="day-neon-pill">{{ d.dayOfWeek }}</span>
                    <span class="divider-neon"></span>
                    <span class="time-neon-pill">⚡ {{ d.lessonTime }}</span>
                  </div>
                </td>
                <td style="text-align: right;">
                  <button @click="deleteDay(index)" class="cyber-delete-btn">
                    <span class="trash-icon">🗑️</span> O'chirish
                  </button>
                </td>
              </tr>
              <tr v-if="datesList.length === 0">
                <td colspan="3" class="cyber-empty-state">
                  <span class="empty-icon">🛰️</span> Matritsa bo'sh. Ma'lumot kiriting.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'teachers'" class="cyber-card section-animate">
        <div class="card-intel-header">
          <div class="glowing-dot teacher-dot"></div>
          <h2>Tizim Ustozlari</h2>
        </div>
        <form @submit.prevent="addTeacher" class="cyber-form">
          <div class="cyber-grid">
            <input v-model="newTeacher.name" type="text" placeholder="Ism" class="premium-text-input" required />
            <input v-model="newTeacher.surname" type="text" placeholder="Familiya" class="premium-text-input" required />
          </div>
          <button type="submit" class="cyber-neon-btn teacher-neon">⚡ RO'YXATGA QO'SHISH</button>
        </form>
        <div class="cyber-table-container">
          <table class="cyber-table">
            <thead><tr><th>USTOZ</th><th>MAQOMI</th><th style="text-align: right;">AMAL</th></tr></thead>
            <tbody>
              <tr v-for="(t, idx) in teachersList" :key="idx" class="table-row-premium">
                <td><strong>{{ t.name }} {{ t.surname }}</strong></td>
                <td><span class="status-shield">VERIFIED TEACHER</span></td>
                <td style="text-align: right;"><button @click="deleteTeacher(idx)" class="cyber-delete-btn">O'chirish</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'students'" class="cyber-card section-animate">
        <div class="card-intel-header">
          <div class="glowing-dot student-dot"></div>
          <h2>Talabalar Boshqaruvi</h2>
        </div>
        <form @submit.prevent="addStudent" class="cyber-form">
          <div class="cyber-grid" style="grid-template-columns: 1fr 1fr 1fr;">
            <input v-model="newStudent.name" type="text" placeholder="Ism" class="premium-text-input" required />
            <input v-model="newStudent.surname" type="text" placeholder="Familiya" class="premium-text-input" required />
            <input v-model="newStudent.group" type="text" placeholder="Sinf / Guruh" class="premium-text-input" required />
          </div>
          <button type="submit" class="cyber-neon-btn student-neon">👥 BAZAGA INTEGRATSIYA QILISH</button>
        </form>
        <div class="cyber-table-container">
          <table class="cyber-table">
            <thead><tr><th>TALABA</th><th>GURUH</th><th style="text-align: right;">AMAL</th></tr></thead>
            <tbody>
              <tr v-for="(s, idx) in studentsList" :key="idx" class="table-row-premium">
                <td><strong>{{ s.name }} {{ s.surname }}</strong></td>
                <td><span class="group-cyber-tag">{{ s.group }}</span></td>
                <td style="text-align: right;"><button @click="deleteStudent(idx)" class="cyber-delete-btn">O'chirish</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPremium',
  data() {
    return {
      activeTab: 'dates',
      isDarkMode: true,
      weekDaysOptions: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
      selectedDayInput: '',
      selectedTimeInput: '',
      datesList: [],
      teachersList: [],
      studentsList: [],
      newTeacher: { name: '', surname: '' },
      newStudent: { name: '', surname: '', group: '' }
    }
  },
  created() {
    this.loadDatabase();
  },
  methods: {
    loadDatabase() {
      this.teachersList = JSON.parse(localStorage.getItem('teachers')) || [{ name: 'Sherzod', surname: 'Developer' }];
      this.studentsList = JSON.parse(localStorage.getItem('students')) || [{ name: 'Azizbek', surname: 'Valiyev', group: 'Frontend Boot' }];
      this.datesList = JSON.parse(localStorage.getItem('lesson_dates')) || [
        { dayOfWeek: 'Dushanba', lessonTime: '12:00' },
        { dayOfWeek: 'Chorshanba', lessonTime: '14:30' }
      ];
    },
    addDay() {
      if (!this.selectedDayInput || !this.selectedTimeInput) return;
      this.datesList.push({ dayOfWeek: this.selectedDayInput, lessonTime: this.selectedTimeInput });
      localStorage.setItem('lesson_dates', JSON.stringify(this.datesList));
      window.dispatchEvent(new Event('storage'));
      this.selectedDayInput = ''; this.selectedTimeInput = '';
    },
    deleteDay(index) {
      this.datesList.splice(index, 1);
      localStorage.setItem('lesson_dates', JSON.stringify(this.datesList));
      window.dispatchEvent(new Event('storage'));
    },
    addTeacher() {
      this.teachersList.push({...this.newTeacher});
      localStorage.setItem('teachers', JSON.stringify(this.teachersList));
      this.newTeacher = { name: '', surname: '' };
    },
    deleteTeacher(index) { this.teachersList.splice(index, 1); localStorage.setItem('teachers', JSON.stringify(this.teachersList)); },
    addStudent() {
      this.studentsList.push({...this.newStudent});
      localStorage.setItem('students', JSON.stringify(this.studentsList));
      this.newStudent = { name: '', surname: '', group: '' };
    },
    deleteStudent(index) { this.studentsList.splice(index, 1); localStorage.setItem('students', JSON.stringify(this.studentsList)); },
    
    // YANGLANGAN CHIQISH (LOGOUT) FUNKSIYASI
    logout() { 
        localStorage.removeItem('isAuthenticated');
      if (this.$router) {
        this.$router.push('/'); // Login yoki bosh sahifaga yo'naltirish
      } else {
        window.location.href = '/'; 
      }
    }
  }
}
</script>

<style scoped>
/* ==========================================================================
   🌌 PRESTIGE DESIGN ARCHITECTURE (DARK / LIGHT PREMIUM)
   ========================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.admin-premium-root {
  min-height: 100vh; font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative; overflow: hidden; padding: 40px 20px; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 🛸 Neon foni orqa qism uchun spektrlar */
.glass-blur-bg {
  position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 100%);
  top: -200px; right: -100px; z-index: 0; filter: blur(80px); pointer-events: none;
}

.dark-premium {
  background: #030712; color: #f3f4f6;
  --panel-bg: rgba(17, 24, 39, 0.7); --inner-bg: #0b0f19;
  --border: rgba(255, 255, 255, 0.06); --text-muted: #9ca3af;
  --input-bg: rgba(31, 41, 55, 0.5); --row-hover: rgba(255, 255, 255, 0.02);
}

.light-premium {
  background: #f4f6f9; color: #111827;
  --panel-bg: rgba(255, 255, 255, 0.8); --inner-bg: #f9fafb;
  --border: rgba(0, 0, 0, 0.06); --text-muted: #6b7280;
  --input-bg: #ffffff; --row-hover: rgba(0, 0, 0, 0.01);
}

.main-universe { width: 100%; max-width: 1050px; margin: 0 auto; position: relative; z-index: 1; }

/* ==========================================================================
   🛰️ HEAD CONTROLS & LOGO GLOW
   ========================================================================== */
.premium-navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 25px; margin-bottom: 35px; border-bottom: 1px solid var(--border);
}
.brand-core { display: flex; align-items: center; gap: 15px; }
.neon-logo {
  font-size: 24px; background: linear-gradient(135deg, #fbbf24, #d97706);
  padding: 10px 14px; border-radius: 14px; box-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
}
.brand-core h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin: 0; }
.sub-glowing-text { margin: 4px 0 0 0; font-size: 12px; color: #d97706; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }

.premium-theme-btn {
  background: var(--panel-bg); color: var(--text-muted); border: 1px solid var(--border);
  padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.3s;
}
.premium-theme-btn:hover { border-color: #6366f1; color: #818cf8; }
.premium-logout-btn { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }
.premium-logout-btn:hover { background: #ef4444; color: white; box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }

/* ==========================================================================
   🌌 PREMIUM TABS (NAVIGATION)
   ========================================================================== */
.premium-navigation { display: flex; gap: 12px; margin-bottom: 30px; }
.cyber-tab {
  padding: 14px 24px; background: var(--panel-bg); border: 1px solid var(--border);
  border-radius: 14px; color: var(--text-muted); font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; gap: 8px;
}
.cyber-tab:hover { border-color: rgba(99, 102, 241, 0.4); transform: translateY(-2px); }
.cyber-active {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%) !important;
  color: white !important; border-color: #4f46e5 !important;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
}

/* ==========================================================================
   ⚡ GLASSMORPHIC CARDS & INPUTS
   ========================================================================== */
.cyber-card {
  background: var(--panel-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border); border-radius: 24px; padding: 35px;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3);
}
.card-intel-header { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.glowing-dot { width: 10px; height: 10px; background: #d97706; border-radius: 50%; box-shadow: 0 0 12px #d97706; }
.teacher-dot { background: #10b981; box-shadow: 0 0 12px #10b981; }
.student-dot { background: #6366f1; box-shadow: 0 0 12px #6366f1; }
.card-intel-header h2 { font-size: 18px; font-weight: 800; margin: 0; }
.card-intel-header p { margin: 5px 0 0 0; font-size: 13px; color: var(--text-muted); }

.cyber-form { background: var(--inner-bg); padding: 25px; border-radius: 18px; border: 1px solid var(--border); margin-bottom: 35px; }
.cyber-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.cyber-input-group { display: flex; flex-direction: column; gap: 8px; }
.cyber-input-group label { font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }

.input-wrapper { position: relative; width: 100%; }

/* Input va selectlar uchun shohona dizayn */
.premium-select, .premium-time-input, .premium-text-input {
  width: 100%; background: var(--input-bg); color: inherit; border: 1px solid var(--border);
  padding: 14px 16px; border-radius: 12px; font-size: 14px; font-weight: 600; outline: none;
  transition: all 0.3s; box-sizing: border-box;
}
.premium-select:focus, .premium-time-input:focus, .premium-text-input:focus {
  border-color: #d97706; box-shadow: 0 0 15px rgba(217, 119, 6, 0.15);
}

/* Tugmalarning neon nurlanishi */
.cyber-neon-btn {
  width: 100%; padding: 15px; border: none; border-radius: 12px; color: white;
  font-size: 13px; font-weight: 800; letter-spacing: 1px; cursor: pointer; transition: all 0.3s;
}
.date-neon { background: linear-gradient(135deg, #d97706 0%, #b45309 100%); box-shadow: 0 6px 20px rgba(217, 119, 6, 0.25); }
.date-neon:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(217, 119, 6, 0.4); }
.teacher-neon { background: linear-gradient(135deg, #10b981 0%, #047857 100%); }
.student-neon { background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); }

/* ==========================================================================
   🪐 ULTRA COMBINED TIME PILL (Bitta ustunda birlashgan kun va vaqt)
   ========================================================================== */
.cyber-table-container { overflow-x: auto; border-radius: 16px; border: 1px solid var(--border); }
.cyber-table { width: 100%; border-collapse: collapse; text-align: left; background: var(--inner-bg); }
.cyber-table th { background: rgba(0,0,0,0.05); padding: 16px; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.cyber-table td { padding: 16px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.table-row-premium:hover { background: var(--row-hover); }

/* Aynan sen xohlagan Hafta Kuni va Soatni o'zida birlashtirgan shohona Kapsula */
.combined-time-pill {
  display: inline-flex; align-items: center; background: rgba(217, 119, 6, 0.06);
  border: 1px solid rgba(217, 119, 6, 0.2); padding: 6px 8px; border-radius: 12px;
}
.day-neon-pill {
  background: #d97706; color: white; padding: 6px 14px; border-radius: 8px;
  font-size: 12px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;
}
.divider-neon { width: 1px; height: 18px; background: rgba(217, 119, 6, 0.3); margin: 0 12px; }
.time-neon-pill {
  color: #fbbf24; font-family: 'Courier New', Courier, monospace;
  font-size: 15px; font-weight: 800; padding-right: 8px;
}

/* Boshqa detallar */
.index-badge { font-family: monospace; color: var(--text-muted); font-weight: 700; }
.status-shield { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 5px 12px; border-radius: 8px; font-size: 11px; font-weight: 800; }
.group-cyber-tag { background: rgba(99, 102, 241, 0.1); color: #818cf8; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; }

.cyber-delete-btn {
  background: transparent; border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171;
  padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s;
}
.cyber-delete-btn:hover { background: #ef4444; color: white; border-color: #ef4444; }

.cyber-empty-state { text-align: center; padding: 40px !important; color: var(--text-muted); font-size: 13px; }
.empty-icon { display: block; font-size: 24px; margin-bottom: 8px; }

/* Animatsiya effektlari */
.section-animate { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>