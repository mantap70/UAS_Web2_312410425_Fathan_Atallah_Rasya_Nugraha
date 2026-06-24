// component/Login.js

const Login = {
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-700 to-teal-600 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477
                5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0
                3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">E-Library</h1>
          <p class="text-gray-400 text-sm mt-1">Sistem Informasi Rental Buku Digital</p>
        </div>

        <!-- Alert error -->
        <div v-if="errorMsg"
          class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
          {{ errorMsg }}
        </div>

        <!-- Form -->
        <div class="space-y-4">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@elibrary.com"
              @keyup.enter="login"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              @keyup.enter="login"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            @click="login"
            :disabled="loading"
            class="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300
                   text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>

        </div>

        <p class="text-center text-gray-400 text-xs mt-6">
          <router-link to="/" class="text-blue-600 hover:underline">← Kembali ke Beranda</router-link>
        </p>

      </div>
    </div>
  `,

  data() {
    return {
      email:    '',
      password: '',
      loading:  false,
      errorMsg: '',
    };
  },

  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.errorMsg = 'Email dan password wajib diisi.';
        return;
      }

      this.loading  = true;
      this.errorMsg = '';

      try {
        const res = await api.post('/auth/login', {
          email:    this.email,
          password: this.password,
        });

        const { token, nama, email, role, id } = res.data.data;

        // Simpan sesi ke localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token',       token);
        localStorage.setItem('user',        JSON.stringify({ id, nama, email, role }));

        // Arahkan ke dashboard
        this.$router.push('/dashboard');

      } catch (err) {
        this.errorMsg = err.response?.data?.messages?.error
                     || err.response?.data?.message
                     || 'Login gagal. Coba lagi.';
      } finally {
        this.loading = false;
      }
    },
  },
};