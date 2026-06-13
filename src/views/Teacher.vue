<template>
  <div class="teacher-container">
    <div class="header-area">
      <button class="btn-back" @click="$router.push('/dashboard')">← Dashboardga qaytish</button>
      <h2>Sinf Rahbari va O'qituvchi Ish Stoli</h2>
    </div>

    <div class="tabs-nav">
      <button :class="{ active: currentTab === 'home' }" @click="currentTab = 'home'">
        📌 1-Oyna: Home (Yo‘qlama va Baholash)
      </button>
      <button :class="{ active: currentTab === 'schedule' }" @click="currentTab = 'schedule'">
        📅 2-Oyna: Dars Jadvali
      </button>
      <button :class="{ active: currentTab === 'students' }" @click="currentTab = 'students'">
        👥 3-Oyna: O‘quvchilar Ro'yxati
      </button>
    </div>

    <div class="tab-panel">
      <HomeTab v-if="currentTab === 'home'" />
      <ScheduleTab v-if="currentTab === 'schedule'" />
      <StudentsTab v-if="currentTab === 'students'" />
    </div>
  </div>
</template>

<script>
// Komponentlarni import qilamiz
import HomeTab from '../components/HomeTab.vue'
import ScheduleTab from '../components/ScheduleTab.vue'
import StudentsTab from '../components/StudentsTab.vue'

export default {
  components: {
    HomeTab,
    ScheduleTab,
    StudentsTab
  },
  data() {
    return {
      currentTab: 'home' // Dastlab 1-oyna ochiq bo'ladi
    }
  }
}
</script>

<style scoped>
.teacher-container { padding: 30px; font-family: sans-serif; background: #f4f6f9; min-height: 100vh; }
.header-area { display: flex; align-items: center; margin-bottom: 25px; gap: 20px; }
.btn-back { padding: 8px 15px; background: #fff; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; }
.btn-back:hover { background: #e2e6ea; }
.tabs-nav { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
.tabs-nav button { padding: 12px 20px; font-size: 15px; border: none; background: #e9ecef; cursor: pointer; border-radius: 5px; transition: 0.2s; color: #495057; }
.tabs-nav button:hover { background: #dee2e6; }
.tabs-nav button.active { background: #007bff; color: white; font-weight: bold; }
.tab-panel { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.05); min-height: 300px; }
</style>