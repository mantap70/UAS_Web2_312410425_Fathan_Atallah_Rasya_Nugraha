// component/Peminjaman.js

const Peminjaman = {
  template: `
    <Layout>
      <div class="space-y-5">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-800">Data Peminjaman</h3>
          <button @click="openModal()"
            class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Catat Peminjaman
          </button>
        </div>

        <!-- Filter Status -->
        <div class="flex gap-2 flex-wrap">
          <button v-for="f in filters" :key="f.value" @click="activeFilter = f.value"
            :class="['px-4 py-1.5 rounded-full text-xs font-medium transition',
                     activeFilter === f.value ? f.activeClass : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
            {{ f.label }}
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
                  <th class="px-5 py-3 text-left">Anggota</th>
                  <th class="px-5 py-3 text-left">Buku</th>
                  <th class="px-5 py-3 text-left">Tgl Pinjam</th>
                  <th class="px-5 py-3 text-left">Tgl Kembali</th>
                  <th class="px-5 py-3 text-left">Status</th>
                  <th class="px-5 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(p, i) in filteredList" :key="p.id" class="hover:bg-gray-50">
                  <td class="px-5 py-3 text-gray-400">{{ i + 1 }}</td>
                  <td class="px-5 py-3 font-medium text-gray-800">{{ p.nama_anggota }}</td>
                  <td class="px-5 py-3 text-gray-600 max-w-xs truncate">{{ p.judul_buku }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ p.tgl_pinjam }}</td>
                  <td class="px-5 py-3 text-gray-500">{{ p.tgl_kembali }}</td>
                  <td class="px-5 py-3">
                    <span :class="badgeClass(p.status)">{{ p.status }}</span>
                  </td>
                  <td class="px-5 py-3">
                    <div class="flex gap-2">
                      <button @click="openModal(p)"
                        class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-200">
                        Update
                      </button>
                      <button @click="hapus(p.id)"
                        class="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredList.length === 0">
                  <td colspan="7" class="px-5 py-10 text-center text-gray-400">Tidak ada data.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <h3 class="font-bold text-gray-800">
              {{ isEdit ? 'Update Status Peminjaman' : 'Catat Peminjaman Baru' }}
            </h3>
            <button @click="showModal = false" class="text-gray-400 text-2xl leading-none">&times;</button>
          </div>
          <div class="p-6 space-y-4">
            <div v-if="formError" class="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {{ formError }}
            </div>

            <!-- Form tambah baru -->
            <template v-if="!isEdit">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Anggota *</label>
                <select v-model="form.anggota_id"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Pilih anggota</option>
                  <option v-for="a in anggotaList" :key="a.id" :value="a.id">{{ a.nama }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Buku *</label>
                <select v-model="form.buku_id"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Pilih buku</option>
                  <option v-for="b in bukuList" :key="b.id" :value="b.id">
                    {{ b.judul }} (stok: {{ b.stok }})
                  </option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tgl Pinjam *</label>
                  <input v-model="form.tgl_pinjam" type="date"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tgl Kembali *</label>
                  <input v-model="form.tgl_kembali" type="date"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
              </div>
            </template>

            <!-- Form update status -->
            <template v-else>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select v-model="form.status"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="dipinjam">Dipinjam</option>
                  <option value="dikembalikan">Dikembalikan</option>
                  <option value="terlambat">Terlambat</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tgl Kembali Aktual</label>
                <input v-model="form.tgl_kembali_aktual" type="date"
                  class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              </div>
            </template>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
              <input v-model="form.catatan"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Catatan opsional..."/>
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
      loading:        true,
      saving:         false,
      showModal:      false,
      isEdit:         false,
      editId:         null,
      formError:      '',
      activeFilter:   'semua',
      peminjamanList: [],
      anggotaList:    [],
      bukuList:       [],
      filters: [
        { value: 'semua',        label: 'Semua',        activeClass: 'bg-blue-700 text-white' },
        { value: 'dipinjam',     label: 'Dipinjam',     activeClass: 'bg-blue-100 text-blue-700' },
        { value: 'dikembalikan', label: 'Dikembalikan', activeClass: 'bg-green-100 text-green-700' },
        { value: 'terlambat',    label: 'Terlambat',    activeClass: 'bg-red-100 text-red-700' },
      ],
      form: {
        buku_id: '', anggota_id: '', tgl_pinjam: '', tgl_kembali: '',
        tgl_kembali_aktual: '', status: 'dipinjam', catatan: '',
      },
    };
  },

  computed: {
    filteredList() {
      if (this.activeFilter === 'semua') return this.peminjamanList;
      return this.peminjamanList.filter(p => p.status === this.activeFilter);
    },
  },

  async created() {
    await Promise.all([this.loadPeminjaman(), this.loadAnggota(), this.loadBuku()]);
  },

  methods: {
    async loadPeminjaman() {
      this.loading = true;
      try {
        const res           = await api.get('/peminjaman');
        this.peminjamanList = res.data.data;
      } finally {
        this.loading = false;
      }
    },
    async loadAnggota() {
      const res        = await api.get('/anggota');
      this.anggotaList = res.data.data;
    },
    async loadBuku() {
      const res      = await api.get('/buku');
      this.bukuList  = res.data.data;
    },

    openModal(p = null) {
      this.formError = '';
      if (p) {
        this.isEdit = true;
        this.editId = p.id;
        this.form   = {
          status:             p.status,
          tgl_kembali_aktual: p.tgl_kembali_aktual || '',
          catatan:            p.catatan || '',
        };
      } else {
        this.isEdit = false;
        this.editId = null;
        this.form   = {
          buku_id: '', anggota_id: '', tgl_pinjam: '', tgl_kembali: '',
          tgl_kembali_aktual: '', status: 'dipinjam', catatan: '',
        };
      }
      this.showModal = true;
    },

    async simpan() {
      this.saving    = true;
      this.formError = '';
      try {
        if (this.isEdit) {
          await api.put(`/peminjaman/${this.editId}`, this.form);
        } else {
          if (!this.form.buku_id || !this.form.anggota_id || !this.form.tgl_pinjam || !this.form.tgl_kembali) {
            this.formError = 'Semua field wajib diisi.';
            this.saving    = false;
            return;
          }
          await api.post('/peminjaman', this.form);
        }
        this.showModal = false;
        await this.loadPeminjaman();
      } catch (err) {
        this.formError = err.response?.data?.message || 'Gagal menyimpan.';
      } finally {
        this.saving = false;
      }
    },

    async hapus(id) {
      if (!confirm('Yakin hapus data peminjaman ini?')) return;
      try {
        await api.delete(`/peminjaman/${id}`);
        await this.loadPeminjaman();
      } catch (err) {
        alert(err.response?.data?.message || 'Gagal menghapus.');
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