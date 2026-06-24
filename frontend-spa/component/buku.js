// component/Buku.js

const Buku = {
  template: `
    <Layout>
      <div class="space-y-5">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-lg font-bold text-gray-800">Data Buku</h3>
            <p class="text-gray-400 text-sm">{{ bukuList.length }} buku terdaftar</p>
          </div>
          <button @click="openModal()"
            class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Buku
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-72">
          <input v-model="search" placeholder="Cari judul buku..."
            class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div v-if="loading" class="py-10 text-center text-gray-400">Memuat...</div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-5 py-3 text-left">#</th>
                  <th class="px-5 py-3 text-left">Judul</th>
                  <th class="px-5 py-3 text-left">Genre</th>
                  <th class="px-5 py-3 text-left">Penulis</th>
                  <th class="px-5 py-3 text-left">Tahun</th>
                  <th class="px-5 py-3 text-left">Stok</th>
                  <th class="px-5 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(b, i) in filteredBuku" :key="b.id" class="hover:bg-gray-50">
                  <td class="px-5 py-3 text-gray-400">{{ i + 1 }}</td>
                  <td class="px-5 py-3 font-medium text-gray-800 max-w-xs truncate">{{ b.judul }}</td>
                  <td class="px-5 py-3">
                    <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      {{ b.nama_genre }}
                    </span>
                  </td>
                  <td class="px-5 py-3 text-gray-600">{{ b.nama_penulis }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ b.tahun_terbit || '-' }}</td>
                  <td class="px-5 py-3">
                    <span :class="b.stok > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'">
                      {{ b.stok }}
                    </span>
                  </td>
                  <td class="px-5 py-3">
                    <div class="flex gap-2">
                      <button @click="openModal(b)"
                        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-200">
                        Edit
                      </button>
                      <button @click="hapus(b.id)"
                        class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredBuku.length === 0">
                  <td colspan="7" class="px-5 py-10 text-center text-gray-400">Tidak ada data buku.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
            <h3 class="font-bold text-gray-800">{{ isEdit ? 'Edit Buku' : 'Tambah Buku' }}</h3>
            <button @click="showModal = false" class="text-gray-400 text-2xl leading-none">&times;</button>
          </div>
          <div class="p-6 space-y-4">
            <div v-if="formError" class="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {{ formError }}
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Judul Buku *</label>
              <input v-model="form.judul"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Masukkan judul buku"/>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Genre *</label>
                <select v-model="form.genre_id"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Pilih genre</option>
                  <option v-for="g in genreList" :key="g.id" :value="g.id">{{ g.nama_genre }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Penulis *</label>
                <select v-model="form.penulis_id"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Pilih penulis</option>
                  <option v-for="p in penulisList" :key="p.id" :value="p.id">{{ p.nama_penulis }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
                <input v-model="form.tahun_terbit" type="number" min="1900" max="2099"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="2024"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stok *</label>
                <input v-model.number="form.stok" type="number" min="0"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="0"/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sinopsis</label>
              <textarea v-model="form.sinopsis" rows="3"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Deskripsi singkat buku..."></textarea>
            </div>
            <div class="flex gap-3 pt-2">
              <button @click="showModal = false"
                class="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50">
                Batal
              </button>
              <button @click="simpan" :disabled="saving"
                class="flex-1 bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:bg-blue-300">
                {{ saving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  `,

  data() {
    return {
      loading:     true,
      saving:      false,
      showModal:   false,
      isEdit:      false,
      editId:      null,
      search:      '',
      formError:   '',
      bukuList:    [],
      genreList:   [],
      penulisList: [],
      form: { judul: '', genre_id: '', penulis_id: '', tahun_terbit: '', stok: 0, sinopsis: '' },
    };
  },

  computed: {
    filteredBuku() {
      if (!this.search) return this.bukuList;
      return this.bukuList.filter(b =>
        b.judul.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  async created() {
    await Promise.all([this.loadBuku(), this.loadGenre(), this.loadPenulis()]);
  },

  methods: {
    async loadBuku() {
      this.loading = true;
      try {
        const res    = await api.get('/buku');
        this.bukuList = res.data.data;
      } finally {
        this.loading = false;
      }
    },
    async loadGenre() {
      const res      = await api.get('/genre');
      this.genreList = res.data.data;
    },
    async loadPenulis() {
      const res        = await api.get('/penulis');
      this.penulisList = res.data.data;
    },

    openModal(b = null) {
      this.formError = '';
      if (b) {
        this.isEdit = true;
        this.editId = b.id;
        this.form   = {
          judul:        b.judul,
          genre_id:     b.genre_id,
          penulis_id:   b.penulis_id,
          tahun_terbit: b.tahun_terbit || '',
          stok:         b.stok,
          sinopsis:     b.sinopsis || '',
        };
      } else {
        this.isEdit = false;
        this.editId = null;
        this.form   = { judul: '', genre_id: '', penulis_id: '', tahun_terbit: '', stok: 0, sinopsis: '' };
      }
      this.showModal = true;
    },

    async simpan() {
      if (!this.form.judul || !this.form.genre_id || !this.form.penulis_id) {
        this.formError = 'Judul, genre, dan penulis wajib diisi.';
        return;
      }
      this.saving    = true;
      this.formError = '';
      try {
        if (this.isEdit) {
          await api.put(`/buku/${this.editId}`, this.form);
        } else {
          await api.post('/buku', this.form);
        }
        this.showModal = false;
        await this.loadBuku();
      } catch (err) {
        this.formError = err.response?.data?.message || 'Gagal menyimpan.';
      } finally {
        this.saving = false;
      }
    },

    async hapus(id) {
      if (!confirm('Yakin hapus buku ini?')) return;
      try {
        await api.delete(`/buku/${id}`);
        await this.loadBuku();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus.');
      }
    },
  },
};