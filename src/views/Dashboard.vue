<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <h3>Mini Kundalik</h3>
      <ul>
        <li class="active">📊 Bosh sahifa</li>
        <li @click="$router.push('/teacher')">👨‍🏫 O'qituvchi paneli</li>
        <li @click="$router.push('/login')">🚪 Chiqish</li>
      </ul>
    </aside>
    
    <main class="main-content">
      <header>
        <h2>Asosiy Boshqaruv Paneli (Dashboard)</h2>
      </header>
      
      <div class="cards-grid">
        <div class="card bg-blue">
          <h4>Jami Sinflar</h4>
          <p class="count">5 ta</p>
        </div>
        <div class="card bg-green">
          <h4>Jami O'qituvchilar</h4>
          <p class="count">12 ta</p>
        </div>
        <div class="card bg-orange">
          <h4>Bugungi Davomat</h4>
          <p class="count">94%</p>
        </div>
      </div>

      <div class="action-zone">
        <h3>Tezkor O'tish</h3>
        <button class="btn-navigate" @click="$router.push('/teacher')">
          O'quvchilarni yo'qlama qilish va baholash oynasiga o'tish →
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container { display: flex; height: 100vh; font-family: sans-serif; background: #f8f9fa; }
.sidebar { width: 250px; background: #343a40; color: white; padding: 20px; }
.sidebar h3 { text-align: center; margin-bottom: 30px; color: #007bff; }
.sidebar ul { list-style: none; padding: 0; }
.sidebar ul li { padding: 12px 15px; cursor: pointer; border-radius: 4px; margin-bottom: 5px; }
.sidebar ul li:hover, .sidebar ul li.active { background: #495057; color: #fff; }
.main-content { flex: 1; padding: 30px; overflow-y: auto; }
header { border-bottom: 1px solid #dee2e6; margin-bottom: 20px; padding-bottom: 10px; }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
.card { padding: 20px; border-radius: 8px; color: white; }
.bg-blue { background: #17a2b8; }
.bg-green { background: #28a745; }
.bg-orange { background: #ffc107; color: #333; }
.count { font-size: 28px; font-weight: bold; margin: 10px 0 0 0; }
.action-zone { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
.btn-navigate { padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
.btn-navigate:hover { background: #5a6268; }
</style>