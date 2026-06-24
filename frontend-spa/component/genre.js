// component/Genre.js

const Genre = {
  template: `
    <Layout>
      <div class="space-y-5">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800">Data Genre</h3>
          <button @click="openModal()"
            class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Genre
          </button>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div v-if="loading" class="py-10 text-center text-gray-400">Memuat...</div>
          <table v-else class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th class="px-5 py-3 text-left">#</th>
                <th class="px-5 py-3 text-left">Nama Genre</th>
                <th class="px-5 py-3 text-left">Deskripsi</th>
                <th class="px-5 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="(g, i) in genreList" :key="g.id" class="hover:bg-gray-50">
                <td class="px-5 py-3 text-gray-400">{{ i + 1 }}</td>
                <td class="px-5 py-3 font-medium">
                  <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {{ g.nama_genre }}
                  </span>
                </td>
                <td class="px-5 py-3 text-gray-500">{{ g.deskripsi || '-' }}</td>
                <td class="px-5 py-3">
                  <div class="flex gap-2">
                    <button @click="openModal(g)"
                      class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-200">
                      Edit
                    </button>
                    <button @click="hapus(g.id)"
                      class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="genreList.length === 0">
                <td colspan="4" class="px-5 py-10 text-center text-gray-400">Belum ada data genre.</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <h3 class="font-bold text-gray-800">{{ isEdit ? 'Edit Genre' : 'Tambah Genre' }}</h3>
            <button @click="showModal = false" class="text-gray-400 text-2xl leading-none">&times;</button>
          </div>
          <div class="p-6 space-y-4">
            <div v-if="formError" class="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {{ formError }}
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Genre *</label>
              <input v-model="form.nama_genre"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: Novel"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea v-model="form.deskripsi" rows="3"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Deskripsi singkat genre..."></textarea>
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
      loading:   true,
      saving:    false,
      showModal: false,
      isEdit:    false,
      editId:    null,
      formError: '',
      genreList: [],
      form: { nama_genre: '', deskripsi: '' },
    };
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      try {
        const res    = await api.get('/genre');
        this.genreList = res.data.data;
      } finally {
        this.loading = false;
      }
    },

    openModal(g = null) {
      this.formError = '';
      if (g) {
        this.isEdit = true;
        this.editId = g.id;
        this.form   = { nama_genre: g.nama_genre, deskripsi: g.deskripsi || '' };
      } else {
        this.isEdit = false;
        this.editId = null;
        this.form   = { nama_genre: '', deskripsi: '' };
      }
      this.showModal = true;
    },

    async simpan() {
      if (!this.form.nama_genre) {
        this.formError = 'Nama genre wajib diisi.';
        return;
      }
      this.saving    = true;
      this.formError = '';
      try {
        if (this.isEdit) {
          await api.put(`/genre/${this.editId}`, this.form);
        } else {
          await api.post('/genre', this.form);
        }
        this.showModal = false;
        await this.loadData();
      } catch (err) {
        this.formError = err.response?.data?.message || 'Gagal menyimpan.';
      } finally {
        this.saving = false;
      }
    },

    async hapus(id) {
      if (!confirm('Yakin hapus genre ini?')) return;
      try {
        await api.delete(`/genre/${id}`);
        await this.loadData();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus.');
      }
    },
  },
};