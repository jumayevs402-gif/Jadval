<template>
  <div class="home-tab fade-in">
    <div class="status-banner premium-glass">
      <div class="banner-content">
        <span class="pulse-icon">⚡</span>
        <span>A guruhi holati: <strong class="glow-text">{{ activeStudentsCount }} ta o'quvchi faol</strong></span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="modern-table">
        <thead>
          <tr>
            <th>O'QUVCHI F.I.O</th>
            <th>YO'QLAMA (BUGUN)</th>
            <th>RAG'BAT / BAHO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in localStudents" :key="student.id" class="student-row">
            
            <td class="student-info">
              <div class="avatar-circle">{{ student.name.charAt(0) }}</div>
              <span class="student-name">{{ student.name }} {{ student.surname }}</span>
            </td>
            
            <td>
              <select 
                v-model="student.attendance" 
                :class="['modern-select', statusColor(student.attendance)]"
                @change="handleAttendanceChange(student)"
              >
                <option value="Keldi">✅ Keldi</option>
                <option value="Kelmadi">❌ Kelmadi</option>
                <option value="Kechikdi">⏰ Kechikdi</option>
              </select>
            </td>
            
            <td>
              <div class="stars-container">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  @click="student.attendance !== 'Kelmadi' ? setRating(student, star) : null"
                  :class="[
                    'star-icon', 
                    { 'filled': star <= student.rating },
                    { 'disabled-star': student.attendance === 'Kelmadi' }
                  ]"
                >★</span>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <div class="action-footer">
      <button class="save-btn legendary-btn" @click="saveDailyData">
        <span class="icon">💾</span> Kunlik Davomatni Saqlash
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTab',
  props: {
    students: { type: Array, required: true }
  },
  data() {
    return {
      localStudents: []
    }
  },
  watch: {
    students: {
      immediate: true,
      handler(newStudents) {
        // MUHIM O'ZGARISH: Obyektni nusxalamaymiz, asl obyektning o'ziga yozamiz!
        // Shunda A guruhdan B guruhga o'tganda ma'lumot yo'qolmaydi.
        newStudents.forEach(student => {
          const validStatuses = ['Keldi', 'Kelmadi', 'Kechikdi'];
          if (!validStatuses.includes(student.attendance)) {
            student.attendance = 'Keldi'; // Default qiymat
          }
          if (student.rating === undefined) {
            student.rating = 0; // Default baho
          }
        });
        
        // To'g'ridan-to'g'ri bog'laymiz
        this.localStudents = newStudents;
      }
    }
  },
  computed: {
    activeStudentsCount() {
      return this.localStudents.filter(s => s.attendance === 'Keldi' || s.attendance === 'Kechikdi').length;
    }
  },
  methods: {
    handleAttendanceChange(student) {
      if (student.attendance === 'Kelmadi') {
        student.rating = 0;
      }
    },
    setRating(student, selectedStar) {
      if (student.attendance === 'Kelmadi') return;
      student.rating = selectedStar;
    },
    statusColor(status) {
      if (status === 'Keldi') return 'status-green';
      if (status === 'Kelmadi') return 'status-red';
      if (status === 'Kechikdi') return 'status-orange';
      return '';
    },
    saveDailyData() {
      // SAQLASH TUGMASI ENDI ROSTDAN HAM ISHLAYDI 💾
      try {
        // LocalStorage-dagi barcha o'quvchilarni olamiz
        const allStudents = JSON.parse(localStorage.getItem('students')) || [];
        
        // Hozirgi guruhdagi o'zgarishlarni umumiy bazaga yangilab yozamiz
        this.localStudents.forEach(localStu => {
          const index = allStudents.findIndex(s => s.id === localStu.id);
          if (index !== -1) {
            allStudents[index].attendance = localStu.attendance;
            allStudents[index].rating = localStu.rating;
          }
        });

        // Va qayta saqlaymiz
        localStorage.setItem('students', JSON.stringify(allStudents));
        alert("🔥 Ma'lumotlar muvaffaqiyatli saqlandi! Sahifani yangilasangiz ham o'chib ketmaydi.");
      } catch (e) {
        console.error("Saqlashda xato:", e);
      }
    }
  }
}
</script>

<style scoped>
/* ASOSIY ANIMATSIYA */
.fade-in { animation: fadeIn 0.5s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* =========================================
   1. NEON BANNER (Guruh holati)
   ========================================= */
.status-banner {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.05);
  backdrop-filter: blur(10px);
}
.banner-content { display: flex; align-items: center; gap: 10px; color: #a7f3d0; font-size: 15px; letter-spacing: 0.5px; }
.pulse-icon { font-size: 18px; animation: pulseGlow 2s infinite; }
.glow-text { color: #34d399; text-shadow: 0 0 10px rgba(52, 211, 153, 0.4); font-weight: 700; }

@keyframes pulseGlow { 0% { text-shadow: 0 0 5px rgba(251, 191, 36, 0.5); } 50% { text-shadow: 0 0 15px rgba(251, 191, 36, 1); } 100% { text-shadow: 0 0 5px rgba(251, 191, 36, 0.5); } }

/* =========================================
   2. MODERN JADVAL (Ochiq qatorlar bilan)
   ========================================= */
.table-wrapper { overflow-x: auto; padding-bottom: 10px; }
.modern-table { width: 100%; border-collapse: separate; border-spacing: 0 12px; text-align: left; }

.modern-table th {
  padding: 0 20px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Qatorlar dizayni (Floating effect) */
.student-row {
  background: rgba(31, 41, 55, 0.6);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.student-row td { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.02); }
.student-row td:first-child { border-left: 1px solid rgba(255,255,255,0.02); border-radius: 12px 0 0 12px; }
.student-row td:last-child { border-right: 1px solid rgba(255,255,255,0.02); border-radius: 0 12px 12px 0; }

.student-row:hover {
  transform: translateY(-2px);
  background: rgba(31, 41, 55, 0.9);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

/* Ism va Avatar */
.student-info { display: flex; align-items: center; gap: 15px; }
.avatar-circle {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white; display: flex; justify-content: center; align-items: center;
  font-weight: bold; font-size: 16px; box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
}
.student-name { color: #f3f4f6; font-weight: 600; font-size: 15px; letter-spacing: 0.3px; }

/* =========================================
   3. ZAMONAVIY SELECT (Dropdown)
   ========================================= */
.modern-select {
  appearance: none;
  background-color: #111827;
  color: #e5e7eb;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 36px 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 10px auto;
}
.modern-select:hover { border-color: rgba(255, 255, 255, 0.3); }

.status-green { color: #34d399; }
.status-red { color: #f87171; }
.status-orange { color: #fbbf24; }

/* =========================================
   4. GLOWING YULDUZCHALAR
   ========================================= */
.stars-container { display: flex; gap: 6px; }
.star-icon {
  font-size: 24px;
  color: #374151; 
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  user-select: none;
}
.star-icon:hover { transform: scale(1.3); color: #9ca3af; }

.star-icon.filled {
  color: #fbbf24;
  text-shadow: 0 0 12px rgba(251, 191, 36, 0.8); 
  animation: pop 0.3s ease-out;
}
@keyframes pop { 50% { transform: scale(1.4); } 100% { transform: scale(1); } }

/* KELMAGAN O'QUVCHI UCHUN YULDUZCHA DIZAYNI */
.star-icon.disabled-star {
  opacity: 0.2;
  cursor: not-allowed;
}
.star-icon.disabled-star:hover {
  transform: none; /* Animatsiyani o'chirib qo'yamiz */
  color: #374151;
}

/* =========================================
   5. LEGENDARY TUGMA (Save Button)
   ========================================= */
.action-footer { margin-top: 30px; display: flex; justify-content: flex-start; }
.legendary-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}
.legendary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
}
.legendary-btn:active { transform: translateY(1px); }
</style>