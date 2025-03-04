import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ui from "@nuxt/ui/vue-plugin";
import { router } from "./plugins/router.ts";

const app = createApp(App);

app.use(router);
app.use(ui);

app.mount("#app");
