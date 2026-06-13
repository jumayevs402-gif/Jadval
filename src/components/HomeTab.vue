<template>
  <div class="tab-box">
    <h3>📌 Dars Boshida: Yo‘qlama qilish</h3>
    <table class="custom-table">
      <thead>
        <tr>
          <th>O‘quvchi</th>
          <th>Holat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>
            <div class="radio-group">
              <label class="radio-label status-present">
                <input type="radio" :name="'attendance-' + student.id" value="Keldi" v-model="student.todayStatus"> ✅ Keldi
              </label>
              <label class="radio-label status-absent">
                <input type="radio" :name="'attendance-' + student.id" value="Kelmadi" v-model="student.todayStatus"> ❌ Kelmadi
              </label>
              <label class="radio-label status-delay">
                <input type="radio" :name="'attendance-' + student.id" value="Kechikdi" v-model="student.todayStatus"> ⏰ Kechikdi
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn-save" @click="saveAttendance">💾 Yo'qlamani saqlash</button>

    <hr class="separator" />

    <h3>⭐ Dars Oxirida: Baholash (Reyting)</h3>
    <table class="custom-table">
      <thead>
        <tr>
          <th>O‘quvchi</th>
          <th>Reyting (1-5)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="'rating-' + student.id">
          <td>{{ student.name }}</td>
          <td>
            <div class="rating-stars">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star" 
                :class="{ filled: star <= student.todayRating }"
                @click="student.todayRating = star"
              >
                ★
              </span>
              <span class="rating-value">({{ student.todayRating }} / 5)</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <button class="btn-save btn-blue" @click="saveRatings">🏆 Baholarni saqlash</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Test uchun o'quvchilar ro'yxati
      students: [
        { id: 1, name: 'Ali Valiyev', todayStatus: 'Keldi', todayRating: 5 },
        { id: 2, name: 'Hasan Karimov', todayStatus: 'Keldi', todayRating: 4 },
        { id: 3, name: 'Dilshod Rahimov', todayStatus: 'Keldi', todayRating: 5 },
        { id: 4, name: 'Bekzod Aliyev', todayStatus: 'Keldi', todayRating: 3 }
      ]
    }
  },
  methods: {
    saveAttendance() {
      alert("Bugungi yo'qlama ma'lumotlar bazasiga muvaffaqiyatli saqlandi!");
    },
    saveRatings() {
      alert("O'quvchilarning bugungi dars uchun olgan ballari saqlandi!");
    }
  }
}
</script>

<style scoped>
.custom-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
.custom-table th, .custom-table td { border: 1px solid #dee2e6; padding: 12px; text-align: left; }
.custom-table th { background-color: #f8f9fa; }
.radio-group { display: flex; gap: 15px; }
.radio-label { cursor: pointer; font-weight: 500; padding: 4px 8px; border-radius: 4px; }
.status-present { color: #28a745; }
.status-absent { color: #dc3545; }
.status-delay { color: #ffc107; }
.btn-save { padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 15px; font-weight: bold; }
.btn-save:hover { background: #218838; }
.btn-blue { background: #007bff; }
.btn-blue:hover { background: #0069d9; }
.separator { margin: 30px 0; border: 0; border-top: 1px solid #ddd; }
.rating-stars { display: flex; align-items: center; gap: 5px; }
.star { font-size: 24px; cursor: pointer; color: #ccc; transition: 0.1s; }
.star.filled { color: #ffc107; }
.star:hover { transform: scale(1.2); }
.rating-value { margin-left: 10px; font-size: 14px; color: #666; }
</style>