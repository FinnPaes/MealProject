<template>
    <nav class="navigation">
        <div class="content">
            <!-- Left side of the navigation -->
            <div>
                <nuxt-link to="/"><Icon-Burger width="30" height="30" /> <span class="title">Meal Finder</span></nuxt-link>
            </div>
            
            <!-- Right side of navigation -->
            <div>
                <Shared-Search :type="'navigation'" />
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navigation {
    width: 100%;
    height: 60px;
    background-color: var(--white);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.navigation .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    padding: 0px 20px;
    height: 100%;
    margin: auto;
}

.navigation .content a {
    font-size: 2.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--dark);
}

/* Media queries */
@media only screen and (max-width: 700px) {
    .navigation .content a {
        font-size: 1.5rem;
    }
}

@media only screen and (max-width: 470px) {
    .navigation .content a span.title {
        display: none;
    }
}
</style>