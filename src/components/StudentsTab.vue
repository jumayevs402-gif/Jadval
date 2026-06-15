<template>
  <div class="tab-content">
    <table class="premium-table">
      <thead>
        <tr>
          <th style="width: 70px;">ID</th>
          <th>Ism Familiya</th>
          <th>Guruh Nomi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td><span class="id-badge">#{{ index + 1 }}</span></td>
          <td class="name-cell-blue">{{ student.name }} {{ student.surname }}</td>
          <td><span class="tag-capsule">{{ student.group || 'A' }} Guruhi</span></td>
        </tr>
        <tr v-if="students.length === 0">
          <td colspan="3" class="empty-trigger">Ushbu filter bo'yicha hech kim topilmadi.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StudentsTab',
  props: {
    students: { type: Array, required: true }
  }
}
</script>

<style scoped>
.premium-table { width: 100%; border-collapse: collapse; text-align: left; }
.premium-table th { padding: 12px 16px; font-size: 11px; font-weight: 700; color: #475569; background: #f8fafc; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; }
.premium-table td { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
.id-badge { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; color: #64748b; }
.name-cell-blue { font-weight: 600; color: #2563eb; }
.tag-capsule { background: #eff6ff; color: #2563eb; padding: 3px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; }
.empty-trigger { text-align: center; color: #94a3b8; padding: 20px !important; font-style: italic; }
</style>