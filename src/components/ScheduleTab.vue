<template>
  <div class="cyber-card section-animate">
    <div class="card-intel-header">
      <div class="glowing-dot"></div>
      <div>
        <h3>📅 Haftalik Dars Jadvali (O'qituvchi ko'rinishi)</h3>
        <p>Admin tomonidan real-time yangilanadigan rasmiy grafik</p>
      </div>
    </div>

    <div class="cyber-table-container">
      <table class="cyber-table">
        <thead>
          <tr>
            <th style="width: 80px;">T/R</th>
            <th>DARS SANASI / KUNI</th>
            <th style="text-align: center;">DARS BOSHLANISH VAQTI</th>
            <th style="text-align: right;">HOLAT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lesson, index) in lessonDates" :key="index" class="table-row-premium">
            <td><span class="index-badge">#0{{ index + 1 }}</span></td>
            <td>
              <div class="day-pill-box">
                <span v-if="lesson.date" class="date-text">{{ lesson.date }}</span>
                <span class="day-name-badge">{{ lesson.dayOfWeek }}</span>
              </div>
            </td>
            <td style="text-align: center;">
              <div class="combined-time-pill">
                <span class="clock-icon">⏰</span>
                <span class="time-text-neon">{{ lesson.lessonTime || '09:00' }}</span>
              </div>
            </td>
            <td style="text-align: right;">
              <span class="status-shield-active">Tasdiqlangan</span>
            </td>
          </tr>

          <tr v-if="lessonDates.length === 0">
            <td colspan="4" class="cyber-empty-state">
              <span class="empty-icon">🛰️</span> Hozircha admin tomonidan dars jadvali yuklanmagan.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherScheduleTab',
  data() {
    return {
      lessonDates: []
    }
  },
  created() {
    // Sahifa yuklanganda admin darslarini bazadan o'qiydi
    this.getAdminLessons();
    
    // 🚀 ENGER MUHIM JOYI: Admin panelda vaqt o'zgarganda o'qituvchida ham sahifa yangilanmasdan o'zgaradi
    window.addEventListener('storage', this.getAdminLessons);
  },
  methods: {
    getAdminLessons() {
      // Admin panel kiritayotgan darslarni to'g'ridan-to'g'ri o'qiymiz
      const savedData = JSON.parse(localStorage.getItem('lesson_dates')) || [];
      
      if (savedData.length > 0) {
        this.lessonDates = savedData;
      } else {
        // Agar admin hali hech narsa kiritmagan bo'lsa, defolt ko'rinish
        this.lessonDates = [
          { date: '13.06.2026', dayOfWeek: 'SHANBA', lessonTime: '09:00' },
          { date: '12.06.2026', dayOfWeek: 'JUMA', lessonTime: '09:00' }
        ];
      }
    }
  },
  beforeDestroy() {
    // Xotirani tozalash (Memory leak bo'lmasligi uchun)
    window.removeEventListener('storage', this.getAdminLessons);
  }
}
</script>

<style scoped>
/* Sening "Student.vue" dagi eski jadvallaring stili bilan 100% bir xil qoladi */
.cyber-table {
  width: 100%;
  border-collapse: collapse;
  background: #0b0f19;
}
.cyber-table th {
  padding: 16px;
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  font-weight: 800;
}
.cyber-table td {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.day-pill-box { display: flex; align-items: center; gap: 12px; }
.day-name-badge { background: rgba(245, 158, 11, 0.1); color: #fbbf24; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; }
.combined-time-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 6px 14px; border-radius: 10px; }
.time-text-neon { color: #f3f4f6; font-family: monospace; font-size: 15px; font-weight: 700; }
.status-shield-active { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; }
</style>