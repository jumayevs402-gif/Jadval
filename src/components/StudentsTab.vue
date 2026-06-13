<template>
  <div class="tab-box">
    <div class="stats-dashboard">
      <div class="stat-card">
        <span class="icon">📊</span>
        <div>
          <h4>Jami o‘quvchi</h4>
          <p>{{ students.length }} ta</p>
        </div>
      </div>
      <div class="stat-card">
        <span class="icon">📈</span>
        <div>
          <h4>O‘rtacha davomat</h4>
          <p>{{ attendanceAverage }}%</p>
        </div>
      </div>
      <div class="stat-card gold">
        <span class="icon">🏆</span>
        <div>
          <h4>Eng yaxshi o‘quvchi</h4>
          <p>{{ bestStudent }}</p>
        </div>
      </div>
    </div>

    <div class="search-box">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 Qidiruv: Ism yoki familiyani yozing..." 
        class="search-input"
      />
    </div>

    <table class="students-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ism Familiya</th>
          <th>Kelgan</th>
          <th>Kelmagan</th>
          <th>Kechikkan</th>
          <th>O‘rtacha Reyting</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td class="student-name">{{ student.name }}</td>
          <td class="text-green">{{ student.present }}</td>
          <td class="text-red">{{ student.absent }}</td>
          <td class="text-orange">{{ student.delayed }}</td>
          <td class="rating-cell">⭐ {{ student.avgRating.toFixed(1) }}</td>
        </tr>
        <tr v-if="filteredStudents.length === 0">
          <td colspan="6" class="no-result">Hech qanday o'quvchi topilmadi 😕</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      // Haqiqiy hayotiy statistika ma'lumotlari
      students: [
        { id: 1, name: 'Ali Valiyev', present: 20, absent: 1, delayed: 0, avgRating: 4.9 },
        { id: 2, name: 'Hasan Karimov', present: 18, absent: 2, delayed: 1, avgRating: 4.5 },
        { id: 3, name: 'Dilshod Rahimov', present: 21, absent: 0, delayed: 0, avgRating: 5.0 },
        { id: 4, name: 'Bekzod Aliyev', present: 17, absent: 3, delayed: 1, avgRating: 4.2 }
      ]
    }
  },
  computed: {
    // Siz tavsiya qilgan aqlli qidiruv funksiyasi
    filteredStudents() {
      return this.students.filter(student => 
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // O'rtacha davomatni hisoblash (% da)
    attendanceAverage() {
      let totalPresent = this.students.reduce((sum, s) => sum + s.present, 0);
      let totalDays = this.students.reduce((sum, s) => sum + s.present + s.absent, 0);
      return totalDays ? Math.round((totalPresent / totalDays) * 100) : 0;
    },
    // Eng yuqori reytingli o'quvchini aniqlash
    bestStudent() {
      if (this.students.length === 0) return '-';
      let best = this.students.reduce((prev, current) => (prev.avgRating > current.avgRating) ? prev : current);
      return best.name;
    }
  }
}
</script>

<style scoped>
.stats-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; }
.stat-card { background: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 6px; display: flex; align-items: center; gap: 15px; }
.stat-card h4 { margin: 0; font-size: 14px; color: #6c757d; }
.stat-card p { margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #212529; }
.stat-card .icon { font-size: 24px; }
.stat-card.gold { background: #fffde7; border-color: #fff59d; }
.stat-card.gold h4 { color: #f57f17; }

.search-box { margin-bottom: 20px; }
.search-input { width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 4px; font-size: 16px; box-sizing: border-box; }
.search-input:focus { border-color: #007bff; outline: none; }

.students-table { width: 100%; border-collapse: collapse; }
.students-table th, .students-table td { border: 1px solid #dee2e6; padding: 12px; text-align: left; }
.students-table th { background-color: #f1f3f5; }
.student-name { font-weight: bold; }
.text-green { color: #28a745; font-weight: bold; }
.text-red { color: #dc3545; font-weight: bold; }
.text-orange { color: #fd7e14; font-weight: bold; }
.rating-cell { font-weight: bold; color: #f57c00; }
.no-result { text-align: center; color: #888; padding: 20px; }
</style>