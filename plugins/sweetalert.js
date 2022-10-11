// This plugin handles notifcations made with SweetAlert 2 (https://sweetalert2.github.io/)
import Swal from "sweetalert2";

const $swal = {
    install: (Vue, options) => {
        Vue.config.globalProperties.$swal = Swal.mixin(options);
    },
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use($swal, {
        reverseButtons: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#1a79ee",
    });
});