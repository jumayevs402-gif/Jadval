<template>
  <div class="tab-box">
    <h3>📅 Haftalik Dars Jadvali</h3>
    <table class="schedule-table">
      <thead>
        <tr>
          <th>Kun</th>
          <th>Vaqt</th>
          <th>Fan / Xona</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in schedule" :key="index">
          <td class="day-name">{{ item.day }}</td>
          <td class="time-slot">⏰ {{ item.time }}</td>
          <td><span class="subject-tag">{{ item.subject }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedule: [
        { day: 'Dushanba', time: '09:00', subject: 'Full-Stack Web Dev (3-xona)' },
        { day: 'Chorshanba', time: '09:00', subject: 'Full-Stack Web Dev (3-xona)' },
        { day: 'Juma', time: '09:00', subject: 'Full-Stack Web Dev (3-xona)' }
      ]
    }
  }
}
</script>

<style scoped>
.schedule-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
.schedule-table th, .schedule-table td { border: 1px solid #dee2e6; padding: 15px; text-align: left; }
.schedule-table th { background-color: #343a40; color: white; }
.day-name { font-weight: bold; color: #333; }
.time-slot { color: #555; }
.subject-tag { background: #e3f2fd; color: #0d47a1; padding: 5px 10px; border-radius: 4px; font-size: 14px; font-weight: 500; }
</style>