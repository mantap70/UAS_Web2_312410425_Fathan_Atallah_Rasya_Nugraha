// component/Anggota.js

const Anggota = {
  template: `
    <Layout>
      <div class="space-y-5">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800">Data Anggota</h3>
          <button @click="openModal()"
            class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Anggota
          </button>
        </div>

        <!-- Tabel -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div v-if="loading" class="py-10 text-center text-gray-400">Memuat...</div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-5 py-3 text-left">#</th>
                  <th class="px-5 py-3 text-left">Nama</th>
                  <th class="px-5 py-3 text-left">Email</th>
                  <th class="px-5 py-3 text-left">Telepon</th>
                  <th class="px-5 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(a, i) in anggotaList" :key="a.id" class="hover:bg-gray-50">
                  <td class="px-5 py-3 text-gray-400">{{ i + 1 }}</td>
                  <td class="px-5 py-3 font-medium text-gray-800">{{ a.nama }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ a.email }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ a.telepon || '-' }}</td>
                  <td class="px-5 py-3">
                    <div class="flex gap-2">
                      <button @click="openModal(a)"
                        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-200">
                        Edit
                      </button>
                      <button @click="hapus(a.id)"
                        class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="anggotaList.length === 0">
                  <td colspan="5" class="px-5 py-10 text-center text-gray-400">Belum ada anggota.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <h3 class="font-bold text-gray-800">{{ isEdit ? 'Edit Anggota' : 'Tambah Anggota' }}</h3>
            <button @click="showModal = false" class="text-gray-400 text-2xl leading-none">&times;</button>
          </div>
          <div class="p-6 space-y-4">
            <div v-if="formError" class="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {{ formError }}
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama *</label>
              <input v-model="form.nama"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nama lengkap"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="form.email" type="email"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="email@contoh.com"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
              <input v-model="form.telepon"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="08xxxxxxxxxx"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea v-model="form.alamat" rows="2"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                placeholder="Alamat lengkap..."></textarea>
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
      formError:   '',
      anggotaList: [],
      form: { nama: '', email: '', telepon: '', alamat: '' },
    };
  },

  async created() {
    await this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      try {
        const res        = await api.get('/anggota');
        this.anggotaList = res.data.data;
      } finally {
        this.loading = false;
      }
    },

    openModal(a = null) {
      this.formError = '';
      if (a) {
        this.isEdit = true;
        this.editId = a.id;
        this.form   = { nama: a.nama, email: a.email, telepon: a.telepon || '', alamat: a.alamat || '' };
      } else {
        this.isEdit = false;
        this.editId = null;
        this.form   = { nama: '', email: '', telepon: '', alamat: '' };
      }
      this.showModal = true;
    },

    async simpan() {
      if (!this.form.nama || !this.form.email) {
        this.formError = 'Nama dan email wajib diisi.';
        return;
      }
      this.saving    = true;
      this.formError = '';
      try {
        if (this.isEdit) {
          await api.put(`/anggota/${this.editId}`, this.form);
        } else {
          await api.post('/anggota', this.form);
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
      if (!confirm('Yakin hapus anggota ini?')) return;
      try {
        await api.delete(`/anggota/${id}`);
        await this.loadData();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus.');
      }
    },
  },
};