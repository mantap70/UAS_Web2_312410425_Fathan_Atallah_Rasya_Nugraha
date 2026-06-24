// component/app.js
const { createApp } = Vue;

const app = createApp({});

// Daftarkan Layout sebagai komponen global
app.component('Layout', Layout);

// Pasang router
app.use(router);

// Mount ke #app
app.mount('#app');