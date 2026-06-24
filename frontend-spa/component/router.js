// component/router.js

const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
  // ─── Public (tanpa login) ───────────────────────────────────────────────────
  { path: '/',      component: Home  },
  { path: '/login', component: Login },

  // ─── Protected (wajib login) ────────────────────────────────────────────────
  { path: '/dashboard',  component: Dashboard,  meta: { requiresAuth: true } },
  { path: '/buku',       component: Buku,        meta: { requiresAuth: true } },
  { path: '/genre',      component: Genre,       meta: { requiresAuth: true } },
  { path: '/anggota',    component: Anggota,     meta: { requiresAuth: true } },
  { path: '/peminjaman', component: Peminjaman,  meta: { requiresAuth: true } },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// ─── NAVIGATION GUARD (beforeEach) ────────────────────────────────────────────
// Cegat user yang belum login mencoba akses halaman protected
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Belum login → paksa ke halaman login
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    // Sudah login tapi buka /login → arahkan ke dashboard
    next('/dashboard');
  } else {
    next();
  }
});

// Expose router agar bisa diakses oleh interceptor Axios
window.__router__ = router;