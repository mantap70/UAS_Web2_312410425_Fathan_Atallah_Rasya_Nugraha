// component/Dashboard.js

const Dashboard = {
  template: `
    <Layout>
      <div class="space-y-6">

        <!-- Greeting -->
        <div class="bg-gradient-to-r from-blue-700 to-teal-600 rounded-2xl p-6 text-white">
          <h2 class="text-2xl font-bold">Selamat datang, {{ userName }}! 👋</h2>
          <p class="text-blue-100 mt-1 text-sm">Berikut ringkasan sistem E-Library hari ini.</p>
        </div>

        <!-- Stat Cards -->
        <div v-if="loading" class="text-center text-gray-400 py-12">Memuat statistik...</div>
        <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="s in statCards" :key="s.label"
            :class="['rounded-2xl p-5 border shadow-sm', s.bg]">
            <p class="text-sm text-gray-500 mb-1">{{ s.label }}</p>
            <p :class="['text-3xl font-extrabold', s.color]">{{ s.value }}</p>
          </div>
        </div>

        <!-- Tabel peminjaman terbaru -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-bold text-gray-800">Peminjaman Terbaru</h3>
            <router-link to="/peminjaman" class="text-blue-600 text-sm hover:underline">
              Lihat semua →
            </router-link>
          </div>

          <div v-if="loadingPinjam" class="py-8 text-center text-gray-400">Memuat...</div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-6 py-3 text-left">Anggota</th>
                  <th class="px-6 py-3 text-left">Buku</th>
                  <th class="px-6 py-3 text-left">Tgl Pinjam</th>
                  <th class="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="p in recentPinjam" :key="p.id" class="hover:bg-gray-50">
                  <td class="px-6 py-3 font-medium text-gray-800">{{ p.nama_anggota }}</td>
                  <td class="px-6 py-3 text-gray-600">{{ p.judul_buku }}</td>
                  <td class="px-6 py-3 text-gray-500">{{ p.tgl_pinjam }}</td>
                  <td class="px-6 py-3">
                    <span :class="badgeClass(p.status)">{{ p.status }}</span>
                  </td>
                </tr>
                <tr v-if="recentPinjam.length === 0">
                  <td colspan="4" class="px-6 py-8 text-center text-gray-400">
                    Belum ada data peminjaman.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  `,

  data() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      userName:     user.nama || 'Admin',
      loading:      true,
      loadingPinjam:true,
      statCards:    [],
      recentPinjam: [],
    };
  },

  async created() {
    await Promise.all([this.loadStats(), this.loadPinjam()]);
  },

  methods: {
    async loadStats() {
      try {
        const res = await api.get('/dashboard/stats');
        const d   = res.data.data;
        this.statCards = [
          { label: 'Total Buku',       value: d.total_buku,       color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-100'   },
          { label: 'Total Anggota',    value: d.total_anggota,    color: 'text-teal-600',   bg: 'bg-teal-50 border-teal-100'   },
          { label: 'Total Peminjaman', value: d.total_peminjaman, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100'},
          { label: 'Sedang Dipinjam',  value: d.sedang_dipinjam,  color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100'},
        ];
      } finally {
        this.loading = false;
      }
    },

    async loadPinjam() {
      try {
        const res = await api.get('/peminjaman');
        this.recentPinjam = res.data.data.slice(0, 5);
      } finally {
        this.loadingPinjam = false;
      }
    },

    badgeClass(status) {
      const map = {
        dipinjam:     'bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium',
        dikembalikan: 'bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium',
        terlambat:    'bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium',
      };
      return map[status] || 'bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs';
    },
  },
};