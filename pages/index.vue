<template>
    <section class="welcome-row">
        <div>
            <h1>Hey! What are you going to eat today?</h1>
        </div>

        <div class="wrapper">
            <Home-RandomMeal />
            <Home-FavoriteMeal />
        </div>
    </section>
</template>

<style scoped>
.welcome-row {
    margin-top: 50px;
}

.welcome-row h1 {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    color: var(--dark);
}

.welcome-row .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 40px 0px;
}

/* Media queries */
@media only screen and (max-width: 900px) {
    .welcome-row .wrapper {
        flex-direction: column;
    }
}
</style>

<script>
export default {
    // Set meta tags
    head: {
        title: "Meal Finder - Find your meal!"
    }
}
</script>