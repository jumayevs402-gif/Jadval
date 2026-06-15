<template>
  <div class="student-premium-root">
    <div class="glass-blur-bg"></div>

    <div class="main-universe">
      <header class="student-header">
        <div class="student-profile-core">
          <div class="avatar-neon">👨‍🎓</div>
          <div>
            <h2>O'quvchi Shaxsiy Kabineti</h2>
            <p class="sub-glowing-text">Mening Davomatim va Baholarim (Kundalik)</p>
          </div>
        </div>
        <div class="status-zone">
          <span class="pulse-dot"></span>
          <span class="status-text">Tizim: Onlayn</span>
        </div>
      </header>

      <section class="cyber-card section-animate">
        <div class="card-intel-header">
          <div class="glowing-dot"></div>
          <div>
            <h3>📊 Haftalik Dars Jadvali va Natijalar</h3>
            <p>Admin kiritgan dars kunlari, vaqtlar hamda ustoz tomonidan qo'yilgan jonli baholar</p>
          </div>
        </div>

        <div class="cyber-table-container">
          <table class="cyber-table">
            <thead>
              <tr>
                <th style="width: 70px;">T/R</th>
                <th>DARS KUNI / SANASI</th>
                <th>DARS VAQTI</th>
                <th style="text-align: center;">DAVOMAT STATUSI</th>
                <th style="text-align: right; padding-right: 25px;">USTOZ RAG'BATI / BAHO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lesson, index) in studentLessons" :key="index" class="table-row-premium">
                <td><span class="index-badge">#0{{ index + 1 }}</span></td>
                <td>
                  <div class="day-pill-box">
                    <span v-if="lesson && lesson.date" class="date-text">{{ lesson.date }}</span>
                    <span class="day-name-badge">{{ lesson ? lesson.dayOfWeek : '' }}</span>
                  </div>
                </td>
                <td>
                  <div class="combined-time-pill">
                    <span class="clock-icon">⏰</span>
                    <span class="time-text-neon">{{ lesson ? (lesson.lessonTime || '09:00') : '09:00' }}</span>
                  </div>
                </td>
                
                <td style="text-align: center;">
                  <span v-if="lesson && lesson.attendanceStatus === 'Keldi'" class="status-badge status-present">✅ Keldi</span>
                  <span v-else-if="lesson && lesson.attendanceStatus === 'Kechikdi'" class="status-badge status-late">⏰ Kechikdi</span>
                  <span v-else-if="lesson && lesson.attendanceStatus === 'Kelmadi'" class="status-badge status-absent">❌ Kelmadi</span>
                  <span v-else class="status-badge status-waiting">⏳ Belgilanmadi</span>
                </td>

                <td style="text-align: right; padding-right: 25px;">
                  <div v-if="lesson && lesson.score" class="star-rating-display">
                    <span v-for="star in 5" :key="star" :class="['star', star <= lesson.score ? 'filled-star' : '']">★</span>
                    <span class="numeric-score">({{ lesson.score }})</span>
                  </div>
                  <div v-else class="no-score-badge">
                    🔒 Hali baho qo'yilmadi
                  </div>
                </td>
              </tr>

              <tr v-if="!studentLessons || studentLessons.length === 0">
                <td colspan="5" class="cyber-empty-state">
                  <span class="empty-icon">🛰️</span> Hozircha haftalik dars jadvali va baholar mavjud emas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="schedule-footer-banner">
          <span class="info-bulb">💡</span>
          <p>Ushbu sahifadagi davomat va baholar sinf ustozingiz tomonidan kiritiladi va ularni o'zgartirib bo'lmaydi.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentView',
  data() {
    return {
      studentLessons: []
    }
  },
  created() {
    this.loadStudentData();
    // Ustoz yoki admin ma'lumotlarni o'zgartirsa, sahifa yangilanmasdan o'quvchida ham srazu ko'rinadi
    window.addEventListener('storage', this.loadStudentData);
  },
  methods: {
   loadStudentData() {
  try {
    // 1. Admin kiritgan dars kunlarini o'qish
    const savedLessons = JSON.parse(localStorage.getItem('lesson_dates')) || [];
    
    // 2. Ustoz panelidagi o'quvchilar ro'yxatini o'qish
    const allStudents = JSON.parse(localStorage.getItem('students')) || [];
    
    // Tizimdagi birinchi o'quvchini aniqlab olamiz
    const currentStudent = allStudents.length > 0 ? allStudents[0] : { attendance: {}, scores: {} };

    if (savedLessons.length > 0) {
      this.studentLessons = savedLessons.map(lesson => {
        // Kun nomini tozalab, katta harfga o'giramiz (Masalan: "DUSHANBA")
        const currentDay = (lesson.dayOfWeek || '').trim().toUpperCase();
        
        let status = undefined;
        let currentScore = undefined;

        // Ustoz panelidagi davomat kalitlarini faqat kun bo'yicha qidiramiz (vaqtidan qat'iy nazar)
        if (currentStudent.attendance) {
          const foundKey = Object.keys(currentStudent.attendance).find(
            k => k.trim().toUpperCase().includes(currentDay)
          );
          if (foundKey) status = currentStudent.attendance[foundKey];
        }

        // Ustoz panelidagi baho kalitlarini faqat kun bo'yicha qidiramiz
        if (currentStudent.scores) {
          const foundKey = Object.keys(currentStudent.scores).find(
            k => k.trim().toUpperCase().includes(currentDay)
          );
          if (foundKey) currentScore = parseInt(currentStudent.scores[foundKey]);
        }

        // Agar dars vaqti admin jadvalida berilmagan bo'lsa, ustoz panelidagi vaqtni ko'rsatadi
        return {
          date: lesson.date || '',
          dayOfWeek: lesson.dayOfWeek || 'DARS KUNI',
          lessonTime: lesson.lessonTime || '14:00', // Ustoz kiritgan 14:00 ni defolt qilamiz
          attendanceStatus: status,
          score: currentScore
        };
      });
    } else {
      // Agar bazada darslar kiritilmagan bo'lsa, vizual test holati
      this.studentLessons = [
        { date: '15.06.2026', dayOfWeek: 'Dushanba', lessonTime: '14:00', attendanceStatus: 'Keldi', score: 5 },
        { date: '17.06.2026', dayOfWeek: 'Chorshanba', lessonTime: '14:00', attendanceStatus: undefined, score: undefined }
      ];
    }
  } catch (error) {
    console.error("Ma'lumotlarni o'qishda xatolik:", error);
    this.studentLessons = [];
  }
   }
},
  beforeDestroy() {
    window.removeEventListener('storage', this.loadStudentData);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.student-premium-root {
  min-height: 100vh;
  background: #030712;
  color: #f3f4f6;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

.glass-blur-bg {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  pointer-events: none;
}

.main-universe {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* NAVBAR STYLE */
.student-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.student-profile-core {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-neon {
  font-size: 24px;
  background: rgba(99, 102, 241, 0.15);
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.student-header h2 { font-size: 20px; font-weight: 800; margin: 0; }
.sub-glowing-text { margin: 4px 0 0 0; font-size: 12px; color: #818cf8; font-weight: 700; text-transform: uppercase; }

.status-zone { display: flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.2); padding: 6px 14px; border-radius: 20px; }
.pulse-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 1.5s infinite; }
.status-text { font-size: 12px; font-weight: 700; color: #34d399; }

/* PREMIUM BLOK CARD */
.cyber-card {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-intel-header { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
.glowing-dot { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 12px #6366f1; }
.card-intel-header h3 { font-size: 18px; font-weight: 800; margin: 0; }
.card-intel-header p { margin: 4px 0 0 0; font-size: 13px; color: #9ca3af; }

/* JADVAL STRUKTURASI */
.cyber-table-container { overflow-x: auto; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.06); }
.cyber-table { width: 100%; border-collapse: collapse; text-align: left; background: #0b0f19; }
.cyber-table th { background: rgba(255, 255, 255, 0.02); padding: 16px; font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }
.cyber-table td { padding: 18px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); vertical-align: middle; }

.index-badge { font-family: monospace; color: #4b5563; font-weight: 700; }
.day-pill-box { display: flex; align-items: center; gap: 10px; }
.date-text { font-weight: 700; font-size: 14px; color: #f3f4f6; }
.day-name-badge { background: rgba(245, 158, 11, 0.1); color: #fbbf24; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; }

.combined-time-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 6px 12px; border-radius: 10px; }
.time-text-neon { color: #f3f4f6; font-family: monospace; font-size: 14px; font-weight: 700; }

/* 🟢 DAVOMAT BADGELARI */
.status-badge { padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; display: inline-block; }
.status-present { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
.status-late { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); }
.status-absent { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
.status-waiting { background: rgba(156, 163, 175, 0.08); color: #9ca3af; border: 1px solid rgba(156, 163, 175, 0.15); font-style: italic; }

/* 🌟 STAR RATING */
.star-rating-display { display: flex; align-items: center; justify-content: flex-end; gap: 3px; }
.star { font-size: 16px; color: #374151; }
.filled-star { color: #fbbf24; text-shadow: 0 0 8px #fbbf24; }
.numeric-score { font-size: 12px; color: #9ca3af; margin-left: 6px; font-weight: 700; }

/* 🔒 HALI BAHO QOYILMADI BADGE */
.no-score-badge {
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.02);
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  letter-spacing: 0.3px;
}

.cyber-empty-state { text-align: center; padding: 40px !important; color: #6b7280; }
.schedule-footer-banner { display: flex; align-items: center; gap: 10px; margin-top: 20px; background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.15); padding: 12px 18px; border-radius: 12px; }
.schedule-footer-banner p { margin: 0; font-size: 12px; color: #a5b4fc; font-weight: 600; }

.section-animate { animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0% { transform: scale(0.95); } 70% { transform: scale(1); } 100% { transform: scale(0.95); } }
</style>