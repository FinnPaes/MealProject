<template>
    <div class="block">
        <p class="title">Your favorites:</p>
        
        <ul v-if="getFavorites()">
            <li v-for="(item, index) in getFavorites()" :key="index"><nuxt-link :to="`/meal/${index}`">{{ item }}</nuxt-link></li>
        </ul>
        <p v-else class="disclaimer">You don't have any saved meals...</p>
    </div>
</template>

<style scoped>
.block {
    width: 23%;
    border-radius: 5px;
    background-color: var(--white);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 15px;
    position: relative;
}

.block::after {
    position: absolute;
    bottom: 15px;
    right: 15px;
    content: v-bind('favoriteCount');
    font-size: 4rem;
    font-weight: 900;
    color: var(--black);
    opacity: .1;
}

.block .title {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--green);
}

.block ul {
    margin-top: 10px;
}

.block ul li {
    line-height: 23px;
}

.block ul li a {
    color: var(--dark);
}

.block .disclaimer {
    font-size: 1rem;
    font-style: italic;
    color: var(--dark);
    opacity: .6;
    margin-top: 10px;
}

@media only screen and (max-width: 900px) {
    .block {
        width: 100%;
        margin-top: 20px;
    }
}
</style>

<script>
export default {
    methods: {
        // Get the current favorites
        getFavorites() {
            const favorites = JSON.parse(localStorage.getItem("favorites")); // Get the favorites out of the localStorage from the client's/visitors browser
            if (favorites && Object.keys(favorites).length > 0) {
                // Favorites exists in localStorage, so send that back!
                return favorites;
            } else {
                // No favorites have been saved, send null back so it doesn't render
                return null;
            }
        }
    },

    computed: {
        // Count of the favorites, this is used in the CSS and called via a v-bind
        favoriteCount() {
            const favorites = JSON.parse(localStorage.getItem("favorites"));
            if (favorites) {
                // There are favorites, return the amount!
                return `"${Object.keys(favorites).length}/5"`;
            } else {
                // No favorites, so count will be default 0/5
                return '"0/5"';
            }
        }
    }
}
</script>