// component/Home.js

const Home = {
  template: `
    <div class="min-h-screen bg-white">

      <!-- Navbar -->
      <nav class="bg-blue-800 text-white px-6 py-4 flex items-center justify-between shadow">
        <div class="flex items-center gap-3">
          <svg class="w-7 h-7 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
              C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5
              16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18
              c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span class="text-xl font-bold">E-Library</span>
        </div>
        <router-link to="/login"
          class="bg-white text-blue-800 font-semibold px-5 py-2 rounded-lg text-sm hover:bg-blue-50 transition">
          Login Admin
        </router-link>
      </nav>

      <!-- Hero -->
      <section class="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-24 px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Perpustakaan Digital<br/>di Genggaman Anda
        </h1>
        <p class="text-blue-100 text-lg max-w-xl mx-auto mb-8">
          Sistem informasi rental buku dan komik digital yang modern, mudah, dan terpercaya.
        </p>
        <router-link to="/login"
          class="inline-block bg-white text-blue-800 font-bold px-8 py-3 rounded-xl shadow-lg
                 hover:scale-105 transition transform text-sm">
          Masuk ke Panel Admin →
        </router-link>
      </section>

      <!-- Statistik -->
      <section class="py-16 px-6 bg-gray-50">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-10">Statistik Koleksi Kami</h2>

        <div v-if="loading" class="text-center text-gray-400 py-8">Memuat data...</div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div v-for="s in stats" :key="s.label"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div :class="['text-4xl font-extrabold mb-1', s.color]">{{ s.value }}</div>
            <div class="text-gray-500 text-sm">{{ s.label }}</div>
          </div>
        </div>
      </section>

      <!-- Fitur -->
      <section class="py-16 px-6 bg-white">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-10">Fitur Unggulan</h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div class="text-center p-6">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
                  C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477
                  14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18
                  16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">Koleksi Lengkap</h3>
            <p class="text-gray-500 text-sm">Kelola ribuan buku dan komik dari berbagai genre dalam satu sistem.</p>
          </div>

          <div class="text-center p-6">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-teal-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">Manajemen Anggota</h3>
            <p class="text-gray-500 text-sm">Pantau data anggota dan histori peminjaman secara real-time.</p>
          </div>

          <div class="text-center p-6">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0
                  01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622
                  5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">Aman & Terproteksi</h3>
            <p class="text-gray-500 text-sm">Sistem login berbasis token memastikan data hanya bisa diakses admin.</p>
          </div>

        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-blue-900 text-blue-300 text-center py-6 text-sm">
        © 2025 E-Library — UAS Pemrograman Web 2
      </footer>

    </div>
  `,

  data() {
    return {
      loading: true,
      stats:   [],
    };
  },

  async created() {
    try {
      const res = await api.get('/dashboard/stats');
      const d   = res.data.data;
      this.stats = [
        { label: 'Total Buku',       value: d.total_buku,       color: 'text-blue-700'   },
        { label: 'Total Anggota',    value: d.total_anggota,    color: 'text-teal-600'   },
        { label: 'Total Peminjaman', value: d.total_peminjaman, color: 'text-purple-600' },
        { label: 'Sedang Dipinjam',  value: d.sedang_dipinjam,  color: 'text-orange-500' },
      ];
    } catch (_) {
      this.stats = [
        { label: 'Total Buku',       value: '-', color: 'text-gray-400' },
        { label: 'Total Anggota',    value: '-', color: 'text-gray-400' },
        { label: 'Total Peminjaman', value: '-', color: 'text-gray-400' },
        { label: 'Sedang Dipinjam',  value: '-', color: 'text-gray-400' },
      ];
    } finally {
      this.loading = false;
    }
  },
};