<template>
    <section v-if="meal">
        <!-- Ingredients bar -->
        <div class="ingredients">
            <h2>Ingredients:</h2>
            <ul>
                <li v-for="(item, index) in $getIngredients(meal, true, true)" :key="index">{{ item }}</li>
            </ul>

            <div class="action-buttons">
                <button @click="navigateTo('/')"><Icon-Home width="30" height="30" /></button>
                <button :class="{ 'favorited':favorited }" @click="applyFavorite()"><Icon-Heart width="30" height="30" /></button>
            </div>
        </div>

        <!-- Main block of info -->
        <div v-if="meal" class="meal-wrapper">
            <!-- Top -->
            <div class="top-info">
                <!-- Left -->
                <div>
                    <img :src="meal.strMealThumb" @error="$setImagePlaceholder" width="300" height="300" />
                    <div class="label-wrapper">
                        <div class="label" v-if="meal.strCategory">Category: {{ meal.strCategory }}</div>
                        <div class="label" v-if="meal.strArea">Country: {{ meal.strArea }}</div>
                    </div>
                </div>

                <!-- Right -->
                <div>
                    <h1>{{ meal.strMeal }}</h1>
                    <p>{{ meal.strInstructions }}</p>
                </div>
            </div>

            <!-- Content -->
            <div class="content">
                <div v-if="meal.strYoutube && meal.strYoutube !== ''">
                    <h2>Preparation video:</h2>
                    <iframe :src="meal.strYoutube.replace('/watch?v=', '/embed/')" class="youtube-player"></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- If the meal is not found, show this div with text -->
    <div v-else class="not-found">
        <h1>Meal not found!</h1>
    </div>
</template>

<style scoped>
section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

/* Ingredients bar */
.ingredients {
    width: 23%;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 15px;
    border-radius: 5px;
    margin: 50px 0px;
}

.ingredients h2 {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--green);
    margin-bottom: 10px;
}

.ingredients ul li {
    line-height: 22px;
    font-size: 1rem;
}

.ingredients .action-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.ingredients .action-buttons button {
    outline: none;
    border: none;
    padding: 10px;
    background-color: #F0F0F0;
    /* Min width & max width because of Safari making the button oval... */
    min-height: 60px;
    max-height: 60px;
    width: calc(50% - 7.5px);
    cursor: pointer;
    transition: .15s ease-in-out;
    border-radius: 5px;
}

.ingredients .action-buttons button:hover {
    background-color: #D8D8D8;
}

.ingredients .action-buttons button.favorited {
    background-color: var(--red);
}

.ingredients .action-buttons button.favorited svg {
    fill: var(--white);
}

/* Meal block wrapper */
.meal-wrapper {
    width: 75%;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 15px;
    border-radius: 5px;
    margin: 50px 0px;
}

/* The top information, picture, title etc. */
.top-info {
    width: 100%;
    display: flex;
    align-items: flex-start;
}

.top-info img {
    border-radius: 5px;
    margin-right: 15px;
}

.top-info h1 {
    font-size: 2rem;
    font-weight: 500;
    color: var(--green);
    margin-bottom: 10px;
}

.top-info p {
    font-size: 1.05rem;
    line-height: 22px;
    color: var(--dark);
}

/* Content below the image and prepare text */
.content {
    width: 100%;
    margin-top: 30px;
}

.content > div:last-of-type {
    margin-bottom: 0px;
}

.content h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: var(--green);
}

.content .youtube-player {
    width: 100%;
    max-width: 800px;
    height: 400px;
    border-radius: 5px;
}

/* Meal not found section */
.not-found {
    width: 100%;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
}

/* Media queries */
@media only screen and (max-width: 1050px) {
    .ingredients {
        width: 28%;
    }

    .meal-wrapper {
        width: 70%;
    }
}
@media only screen and (max-width: 980px) {
    .top-info {
        flex-direction: column;
    }

    .top-info img {
        margin-right: 0px;
    }

    .top-info h1 {
        margin-top: 30px;
    }
}

@media only screen and (max-width: 800px) {
    section {
        flex-direction: column;
    }

    .ingredients {
        margin-top: 50px!important;
    }

    .ingredients, .meal-wrapper {
        width: 100%;
        margin: 10px 0px;
    }
}

@media only screen and (max-width: 430px) {
    .top-info img {
        width: 100%;
        height: auto;
    }
}
</style>

<script>
export default {
    async setup() {
        const mealID = useRoute().params.id[0];
        if (mealID) {
            // Send a fetch to MealDB to receive the specific meal if a meal ID has been given in URL
            const { data: res } = await useFetch(`lookup.php?i=${mealID}`, {
                baseURL: useRuntimeConfig().public.MEAL_BASE_URL,
                initialCache: false // This is set to false because otherwise if you go from /meal/123 to /meal/456 it would not fetch again and still show the same meal
            })

            if (res["_rawValue"] && res["_rawValue"].meals) {
                // If the API returns a valid meal, set the title of the page to the meal name
                useHead({
                    title: res["_rawValue"].meals[0].strMeal
                })
            } else {
                // Meal is not found in the API, so set the title to not found
                useHead({
                    title: "Meal not found"
                })
            }

            return {
                meal: res["_rawValue"] && res["_rawValue"].meals ? res["_rawValue"].meals[0] : null // Return either the meal, or null if something went wrong (404, 500, api down, or anything)!
            }
        } else {
            // No meal ID has been given, redirect back to the home page
            navigateTo("/")
        }
    },

    data() {
        return {
            favorited: false
        }
    },

    mounted() {
        // Once the component/page has been mounted, get the favorites
        const currentFavorites = JSON.parse(localStorage.getItem("favorites"));
        
        // Check if favorites isn't empty, and IF the meal is in the favorites, set the favorited status to true
        if (currentFavorites && this.meal.idMeal in currentFavorites) this.favorited = true;
    },

    methods: {
        // Add a meal to your favorites, or delete it from the favorites
        applyFavorite() {
            // Get the current favorites (if they exist) out of browser/visitors localStorage
            let currentFavorites = JSON.parse(localStorage.getItem("favorites"));

            if (this.favorited) {
                // The meal is already favorited, so delete!
                delete currentFavorites[this.meal.idMeal];
            } else {
                // Check if the amount of favorited meals is not already on 5 (that's the limit)
                if (currentFavorites && Object.keys(currentFavorites).length > 4) {
                    // Trigger the notification through Sweetalert (/plugins/sweetalert.js global function)
                    this.$swal.fire(
                        "Favorite limit reached",
                        "You favorited 5 meals, this is the limit. Consider deleting some of your current favorites!",
                        "error"
                    );
                    return;
                }

                // If the currentFavorites are null, then create an empty object
                if (currentFavorites === null) currentFavorites = Object();

                // Add the meal to the Object
                currentFavorites[this.meal.idMeal] = this.meal.strMeal;
            }

            // Save/update into localStorage
            localStorage.setItem("favorites", JSON.stringify(currentFavorites));

            // Change the favorited state of the current meal
            this.favorited = !this.favorited;
        }
    }
}
</script>