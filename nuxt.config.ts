// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Disable server sided rendering as it's not required for this project
    ssr: false,

    // Define global (env) variables
    runtimeConfig: {
        public: {
            MEAL_BASE_URL: process.env.MEAL_BASE_URL // URL of the MealDB API
        }
    },

    // Meta tags and everything else for in the head
    app: {
        head: {
            htmlAttrs: {
                lang: "nl"
            },
            link: [
                { rel: "stylesheet", href: "/css/app.css" },
            ]
        }
    }
})
