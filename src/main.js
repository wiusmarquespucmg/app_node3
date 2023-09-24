import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import axiosPlugin from './plugins/axios.js';

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

const AppTheme = {
    dark: true,
    colors: {
        background: '#0A0A0A', /// 0A0A0A f7faff
        primary: '#FFF000',
        secondary: '#808080',
        error: "#f44336",
        info: "#2196F3",
        success: "#4caf50",
        warning: "#fb8c00",
        anchor: "#FF9800",

        // background: "#15202b",
        surface: "#171c38",
        // primary: "#FFF000",
        // secondary: "#03dac6",
        // error: "#f44336",
        // info: "#2196F3",
        // success: "#4caf50",
        // warning: "#fb8c00",
        // anchor: "#FF9800",
    },
}

const vuetify = createVuetify({
    directives,
    components: {
        ...components,
        ...labsComponents,
    },
    theme: {
    defaultTheme: 'AppTheme',
    themes: {
        AppTheme,
    },
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
  },
});


const app = createApp(App);

app.use(store);
app.use(axiosPlugin);
app.use(vuetify);
app.mount('#app');