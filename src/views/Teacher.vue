<template>
  <div :class="['dashboard-root', isDarkMode ? 'dark-theme' : 'light-theme']">
    <div class="main-container">
      
      <header class="top-navbar">
        <div class="brand-info">
          <div class="avatar-icon">🎓</div>
          <div>
            <h1>Sinf Rahbari va O'qituvchi Hub</h1>
            <p>Mini Kundalik boshqaruv markazi</p>
          </div>
        </div>
        
        <div class="nav-actions">
          <button @click="toggleTheme" class="theme-toggle-btn">
            {{ isDarkMode ? '☀️ Kunduzgi Rejim' : '🌙 Tungi Rejim' }}
          </button>
          
          <button @click="logout" class="logout-btn">🚪 Tizimdan chiqish</button>
        </div>
      </header>

      <nav class="saas-tabs">
        <button :class="['tab-btn', currentTab === 'HomeTab' ? 'active-tab' : '']" @click="currentTab = 'HomeTab'">
          🚀 Yo'qlama va Baholash
        </button>
        <button :class="['tab-btn', currentTab === 'ScheduleTab' ? 'active-tab' : '']" @click="currentTab = 'ScheduleTab'">
          📅 Dars Jadvali
        </button>
        <button :class="['tab-btn', currentTab === 'StudentsTab' ? 'active-tab' : '']" @click="currentTab = 'StudentsTab'">
          👥 O'quvchilar Ro'yxati
        </button>
      </nav>

      <div class="filter-wrapper">
        <span class="filter-label">Guruh filteri:</span>
        <div class="filter-pills">
          <button :class="['pill-btn', selectedGroup === 'ALL' ? 'pill-active' : '']" @click="changeGroup('ALL')">
            🌐 Hamma Guruhlar
          </button>
          <button 
            v-for="g in groups" 
            :key="g" 
            :class="['pill-btn', selectedGroup === g ? 'pill-active' : '']" 
            @click="changeGroup(g)"
          >
            Sinf: {{ g }}
          </button>
        </div>
      </div>

      <main class="workspace-card">
        <component 
          :is="currentTab" 
          :students="filteredStudents" 
          @refresh-data="loadData" 
        />
      </main>

    </div>
  </div>
</template>

<script>
import HomeTab from '../components/HomeTab.vue'
import ScheduleTab from '../components/ScheduleTab.vue'
import StudentsTab from '../components/StudentsTab.vue'

export default {
  name: 'TeacherDashboard',
  components: {
    HomeTab,
    ScheduleTab,
    StudentsTab
  },
  data() {
    return {
      currentTab: 'HomeTab',
      selectedGroup: 'ALL',
      studentsList: [],
      groups: [],
      // Default holatda qora rejim yoqilgan bo'ladi
      isDarkMode: true 
    }
  },
  computed: {
    filteredStudents() {
      if (this.selectedGroup === 'ALL') return this.studentsList;
      return this.studentsList.filter(s => String(s.group).toUpperCase() === this.selectedGroup.toUpperCase());
    }
  },
  created() {
    this.loadData();
    // Foydalanuvchi oxirgi marta qaysi rejimni tanlaganini eslab qolish
    const savedTheme = localStorage.getItem('teacher-theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
  },
  methods: {
    loadData() {
      try {
        const localData = localStorage.getItem('students');
        if (localData) {
          this.studentsList = JSON.parse(localData);
        } else {
          this.studentsList = [
            { id: 1, name: 'Ali', surname: 'Valiyev', group: '9-A' },
            { id: 2, name: 'Hasan', surname: 'Karimov', group: '9-A' },
            { id: 3, name: 'Dilshod', surname: 'Rahimov', group: '9-B' }
          ];
          localStorage.setItem('students', JSON.stringify(this.studentsList));
        }
        
        const uniqueGroups = new Set(
          this.studentsList
            .map(s => s.group ? String(s.group).toUpperCase().trim() : null)
            .filter(Boolean)
        );
        this.groups = Array.from(uniqueGroups).sort();
      } catch (error) {
        console.error("Ma'lumotlarni sinxronizatsiya qilishda xato:", error);
      }
    },
    changeGroup(groupName) {
      this.selectedGroup = groupName;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('teacher-theme', this.isDarkMode ? 'dark' : 'light');
    },
    logout() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* ==========================================================================
   1. GLOBAL DIZAYN VA O'ZGARUVCHILAR (CSS Variables for Themes)
   ========================================================================== */
.dashboard-root { 
  min-height: 100vh; 
  padding: 40px 20px; 
  font-family: 'Inter', system-ui, sans-serif; 
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

/* 🌙 QORA REJIM RANGI */
.dark-theme {
  background: #0b0f19;
  color: #f8fafc;
  --bg-navbar: rgba(255, 255, 255, 0.08);
  --bg-card: #111827;
  --bg-inner-card: #1e293b;
  --bg-table-th: #374151;
  --bg-table-td: #1f2937;
  --border-color: rgba(255, 255, 255, 0.08);
  --text-muted: #94a3b8;
  --text-main: #f1f5f9;
  --input-bg: #111827;
}

/* ☀️ OQ REJIM RANGI */
.light-theme {
  background: #f1f5f9;
  color: #0f172a;
  --bg-navbar: #e2e8f0;
  --bg-card: #ffffff;
  --bg-inner-card: #f8fafc;
  --bg-table-th: #f1f5f9;
  --bg-table-td: #ffffff;
  --border-color: #e2e8f0;
  --text-muted: #64748b;
  --text-main: #0f172a;
  --input-bg: #ffffff;
}

/* Fon orqasidagi chiroyli neon nur (Faqat qora rejimda porlaydi) */
.dark-theme::before {
  content: ""; position: absolute; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 75%);
  top: -150px; left: -100px; pointer-events: none;
}

.main-container { width: 100%; max-width: 1140px; margin: 0 auto; position: relative; z-index: 2; }

/* ==========================================================================
   2. TOP NAVBAR & ACTION BUTTONS
   ========================================================================== */
.top-navbar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 30px; }
.brand-info { display: flex; align-items: center; gap: 14px; }
.avatar-icon { font-size: 28px; background: var(--bg-card); padding: 10px; border-radius: 14px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

.brand-info h1 { font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.5px; color: var(--text-main); }
.brand-info p { margin: 4px 0 0 0; font-size: 13px; color: var(--text-muted); }

.nav-actions { display: flex; align-items: center; gap: 12px; }

/* 🌗 Rejim almashtirish tugmasi dizayni */
.theme-toggle-btn {
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}
.theme-toggle-btn:hover {
  transform: translateY(-1px);
  background: var(--bg-table-th);
}

.logout-btn { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); padding: 10px 18px; border-radius: 12px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.logout-btn:hover { background: #ef4444; color: white; }

/* ==========================================================================
   3. NAVIGATION TABS & FILTERS
   ========================================================================== */
.saas-tabs { display: flex; background: var(--bg-card); padding: 6px; border-radius: 14px; gap: 6px; margin-bottom: 24px; border: 1px solid var(--border-color); }
.tab-btn { flex: 1; padding: 12px; border: none; background: transparent; font-size: 14px; font-weight: 600; color: var(--text-muted); border-radius: 10px; cursor: pointer; transition: all 0.2s ease; }
.tab-btn:hover { color: var(--text-main); background: rgba(0,0,0,0.02); }
.active-tab { background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: white !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }

.filter-wrapper { display: flex; align-items: center; gap: 16px; background: var(--bg-card); border: 1px solid var(--border-color); padding: 14px 20px; border-radius: 16px; margin-bottom: 24px; }
.filter-label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }

.pill-btn { padding: 8px 16px; border: 1px solid var(--border-color); background: var(--bg-inner-card); border-radius: 20px; font-size: 13px; font-weight: 600; color: var(--text-main); cursor: pointer; transition: all 0.2s ease; }
.pill-btn:hover { background: var(--bg-table-th); }
.pill-active { background: #6366f1 !important; color: white !important; border-color: #6366f1 !important; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }

/* ==========================================================================
   4. WORKSPACE CARD & CHILD INHERITANCE (Deep Styles)
   ========================================================================== */
.workspace-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }

/* Ichki jadvallarni dinamik o'zgartirish (Oq/Qora rejimga qarab) */
:deep(.workspace-card) table, :deep(table) { width: 100% !important; background: var(--bg-table-td) !important; border-collapse: collapse !important; border-radius: 12px !important; overflow: hidden !important; color: var(--text-main) !important; border: 1px solid var(--border-color) !important; }
:deep(td), :deep(th) { padding: 14px 16px !important; color: var(--text-main) !important; border-bottom: 1px solid var(--border-color) !important; }
:deep(th) { background: var(--bg-table-th) !important; color: var(--text-muted) !important; font-weight: 700 !important; font-size: 12px !important; text-transform: uppercase !important; }

/* Select oynalari (Keldi/Ketdi) */
:deep(select) { background: var(--input-bg) !important; color: var(--text-main) !important; border: 1px solid var(--border-color) !important; padding: 6px 12px !important; border-radius: 8px !important; outline: none !important; }

/* Saqlash tugmalari */
:deep(.save-btn), :deep(button[type="submit"]) { background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important; color: white !important; border: none !important; }
</style>