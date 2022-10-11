<template>
    <div class="block" v-if="meal">
        <div class="left">
            <nuxt-link :to="`/meal/${meal.idMeal}`">
                <img
                    :src="meal.strMealThumb"
                    :alt="meal.strMeal"
                    @error="$setImagePlaceholder"
                    width="200" height="200" />
            </nuxt-link>
        </div>

        <div class="right">
            <p class="title"><nuxt-link :to="`/meal/${meal.idMeal}`">{{ meal.strMeal }}</nuxt-link></p>
            <p class="description">Made with: {{ $getIngredients(meal, false, false) }}</p>
            <div class="label-wrapper">
                <div class="label" v-if="meal.strCategory">Category: {{ meal.strCategory }}</div>
                <div class="label" v-if="meal.strArea">Country: {{ meal.strArea }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.block {
    width: 75%;
    border-radius: 5px;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    padding: 15px;
}

.block a {
    text-decoration: none;
    color: var(--green);
}

/* Left of the block */
.block .left img {
    border-radius: 5px;
}

.block .left {
    margin-right: 15px;
}

/* Right of the block */
.block .right .title {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--dark);
}

.block .right .description {
    font-size: 1rem;
    line-height: 24px;
    margin-top: 15px;
    color: var(--dark);
}

/* Media queries */
@media only screen and (max-width: 900px) {
    .block {
        width: 100%;
    }
}

@media only screen and (max-width: 640px) {
    .block {
        flex-direction: column;
    }

    .block .left {
        margin-right: 0px;
    }
    
    .block .right .title {
        margin-top: 20px;
    }
}

@media only screen and (max-width: 400px) {
    .block .left img {
        width: 100%;
        height: auto;
    }
}
</style>

<script>
export default {
    async setup() {
        // Send a fetch request to MealDB api to fetch a random meal, and use the baseURL of the API
        const { data: res } = await useFetch("random.php", {
            baseURL: useRuntimeConfig().public.MEAL_BASE_URL
        })

        return {
            meal: res["_rawValue"] ? res["_rawValue"].meals[0] : null // Return either the meal, or null if something went wrong (404, 500, api down, or anything)!
        }
    }
}
</script>