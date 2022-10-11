<template>
    <!-- Search input for in the navigation bar -->
    <div class="box">
        <Icon-Magnify width="20" class="search-icon" />
        <input
            v-if="type === 'navigation'"
            v-model="query"
            @input="search()"
            @click="focusSearch = true"
            @blur="debounceUnfocus()"
            type="text"
            placeholder="Search..."
            class="navigation-input"
            :class="{ 'rounded':focusSearch && (noResults || Object.keys(results).length > 0) }">
        <!-- Results div -->
        <ul
            v-if="Object.keys(results).length > 0 && focusSearch"
            class="results-container"
        >
            <li v-for="(item, index) in results" :key="index">
                <nuxt-link :to="`/meal/${item.idMeal}`"><img :src="`${item.strMealThumb}/preview`" width="40" height="40" @error="$setImagePlaceholder" /> {{item.strMeal}}</nuxt-link>
            </li>
        </ul>
        
        <div v-if="noResults && focusSearch" class="results-container">
            <p>No results have been found...</p>
        </div>
    </div>
</template>

<style scoped>
.box {
    position: relative;
}

.navigation-input {
    outline: none;
    border: none;
    background-color: var(--light-grey);
    height: 35px;
    width: 230px;
    border-radius: 30px;
    padding: 8px 10px 8px 40px;
    font-size: 1rem;
    font-weight: 400;
    transition: .20s ease-in-out;
}

.navigation-input:focus {
    width: 350px;
}

.navigation-input.rounded {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

.search-icon {
    position: absolute;
    top: 7px;
    left: 10px;
}

/* Results div */
.box .results-container {
    position: absolute;
    width: 100%;
    background-color: var(--light-grey);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 8px;
    z-index: 50;
}

.box .results-container li {
    margin-bottom: 10px;
    line-height: 21px;
    color: var(--dark);
    font-size: 1rem;
    font-weight: 400;
    border-radius: 5px;
    transition: .10s ease-in-out;
}

.box .results-container li:hover {
    background-color: #e7e7e7;
}

.box .results-container li a {
    text-decoration: none;
    color: var(--dark);
    display: flex;
}

.box .results-container li a img {
    margin-right: 8px;
    border-radius: 10px;
}

/* Media queries */
@media only screen and (max-width: 470px) {
    .navigation input {
        width: 100%;
    }
    
    .navigation-input:focus {
        width: 100%;
    }
}
</style>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            query: "", // The search query, default = empty
            results: {}, // Results out of the API will appear here
            noResults: false, // If searching, but there are no results, this will go to true to show a text that says there are no results
            focusSearch: false, // If the search is focussed or not (so if outside click, results will dissapear)

            abortController: null // The abort controller instance
        }
    },

    methods: {
        // Function to search through meals
        search() {
            if (this.query.length === 0) {
                // Input has been cleared, clear results and stop
                this.noResults = false;
                this.results = {};
                return;
            }
            if (this.abortController) this.abortController.abort(); // There is already an ongoing HTTP request, cancel that one

            // Create a new abort controller, so we can cancel the outgoing HTTP request if we want (great if someone is typing a word quickly)
            this.abortController = new AbortController();
            const signal = this.abortController.signal; // Create signal, we can later on put this in the HTTP request to communicate with it
            
            // Run the fetch request
            // P.S. using OhMyFetch in this function as it gives flexibility that useFetch doesn't give
            $fetch(`search.php?s=${this.query}`, {
                method: "GET",
                baseURL: useRuntimeConfig().public.MEAL_BASE_URL,
                signal // signal variable from abortController here, so we can cancel the request later on if needed
            })
            .then((response) => {
                if (response.meals) {
                    if (Object.keys(response.meals).length > 0) {
                        // Results have been found, set the data
                        this.noResults = false;
                        this.results = response.meals;
                    } else {
                        // No results have been found
                        this.noResults = true;
                        this.results = {};
                    }
                } else {
                    // No meals have been returned from the API
                    this.noResults = true;
                    this.results = {};
                }
            })
            .catch((error) => {
                // Log the error into the console.
                console.log(error);
            })
        },

        // Unfocus the search box, but after 100ms so the links can still be clicked!
        debounceUnfocus() {
            setTimeout(() => {
                this.focusSearch = false;
            }, 100);
        }
    }
}
</script>