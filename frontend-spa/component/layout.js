// component/Layout.js

const Layout = {
  template: `
    <div class="min-h-screen flex bg-gray-100">

      <!-- Sidebar -->
      <aside :class="['bg-blue-800 text-white flex-shrink-0 flex flex-col transition-all duration-300',
                       sidebarOpen ? 'w-64' : 'w-16']">

        <!-- Logo -->
        <div class="flex items-center gap-3 px-4 py-5 border-b border-blue-700">
          <svg class="w-8 h-8 flex-shrink-0 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
              C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477
              14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18
              16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <span v-if="sidebarOpen" class="font-bold text-lg">E-Library</span>
        </div>

        <!-- Menu -->
        <nav class="flex-1 py-4 space-y-1 px-2">
          <router-link
            v-for="item in menuItems" :key="item.path" :to="item.path"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-100
                   hover:bg-blue-700 hover:text-white transition text-sm"
            active-class="bg-blue-700 text-white font-semibold"
          >
            <span v-html="item.icon" class="w-5 h-5 flex-shrink-0"></span>
            <span v-if="sidebarOpen">{{ item.label }}</span>
          </router-link>
        </nav>

        <!-- User + Logout -->
        <div class="border-t border-blue-700 p-3">
          <div v-if="sidebarOpen" class="flex items-center gap-2 px-2 mb-3">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {{ userInitial }}
            </div>
            <div class="overflow-hidden">
              <p class="text-sm font-medium truncate">{{ userName }}</p>
              <p class="text-xs text-blue-300">{{ userRole }}</p>
            </div>
          </div>
          <button @click="logout"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                   text-red-300 hover:bg-red-900 hover:text-white transition text-sm">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0
                01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span v-if="sidebarOpen">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Konten utama -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Topbar -->
        <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
          <button @click="sidebarOpen = !sidebarOpen"
            class="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <h2 class="text-gray-800 font-semibold">{{ pageTitle }}</h2>
          <div class="ml-auto text-sm text-gray-400">{{ currentDate }}</div>
        </header>

        <!-- Slot isi halaman -->
        <main class="flex-1 overflow-y-auto p-6">
          <slot />
        </main>

      </div>
    </div>
  `,

  data() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      sidebarOpen: true,
      userName:    user.nama || 'Admin',
      userRole:    user.role || 'admin',
      userInitial: (user.nama || 'A').charAt(0).toUpperCase(),
      menuItems: [
        {
          path:  '/dashboard',
          label: 'Dashboard',
          icon:  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0
                      01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>`,
        },
        {
          path:  '/buku',
          label: 'Data Buku',
          icon:  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13
                      C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477
                      14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18
                      16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>`,
        },
        {
          path:  '/genre',
          label: 'Genre',
          icon:  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7
                      7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>`,
        },
        {
          path:  '/anggota',
          label: 'Anggota',
          icon:  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>
                  </svg>`,
        },
        {
          path:  '/peminjaman',
          label: 'Peminjaman',
          icon:  `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0
                      00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>`,
        },
      ],
    };
  },

  computed: {
    pageTitle() {
      const map = {
        '/dashboard':  'Dashboard',
        '/buku':       'Data Buku',
        '/genre':      'Data Genre',
        '/anggota':    'Data Anggota',
        '/peminjaman': 'Data Peminjaman',
      };
      return map[this.$route.path] || 'Panel Admin';
    },
    currentDate() {
      return new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    },
  },

  methods: {
    async logout() {
      if (!confirm('Yakin ingin logout?')) return;
      try {
        await api.post('/auth/logout');
      } catch (_) {}
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      this.$router.push('/login');
    },
  },
};