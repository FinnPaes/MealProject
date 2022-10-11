
# Meal Finder

Single page web application to find meals from the [The mealDB](https://www.themealdb.com/api.php) API.

Made with Nuxt 3, VueJS 3, and Vitest. Reason behind this tech stack will be explained in the *Architectural decisions* section below.






## Requirements

- [NodeJS LTS](https://nodejs.org/en/download/) 16.11 or above *(tested with v16.16.0)*
- NPM *(tested with v8.11.0)*
## Deployment

1. Clone this project

2. Install the NPM packages

```bash
  npm install
```

3. Start the application:

```bash
  npm run dev
```

The SPA should be running on port 3000.
## Running Tests

In this project I use **Vitest** to do Unit testing. You can execute the tests through:

```bash
  npm run test
```

### Tests done:

#### **Icon test:**
The first test that executes is the Burger Icon test. This will test if the Burger Icon is included in the navigation/menu component. **tests/BurgerIcon.test.js**

#### **Nuxt test:**
The second test checks wether Nuxt is able to start/build without performing any crucial errors. **tests/Nuxt.test.js**

## Architectural decisions

#### **Folders:**
 - `/components`: *Contains all the components used across the SPA, bundled into seperate sub folders to maintain an organized workspace.*
 - `/pages`: *Contains all the pages used in the SPA. Such as the dashboard, and the meal page.*
 - `/plugins`: *Functions that can be used globally across other components have been placed in the helper.js plugin, this will be autoloaded by Nuxt. There is also another special plugin to make notifications possible using [Sweetalert 2](https://sweetalert2.github.io/)*.
 - `/public`: *CSS files for example are placed in this folder to make sure they can be accessed by the browser.*
 - `/tests`: *All unit tests are placed in this folder.*

### **Libraries/packages:**
- **Sweetalert**: *For notifications/alerts.*
- **Vitest, nuxt/test-utils-edge, jsdom, unplugin-auto-import, unplugin-vue-components, vite-plugin-vue-type-imports**: *To run unit tests, I wanted to use Jest but unfortunately Nuxt 3 is not supporting that yet in it's full potential.*
- **ohmyfetch**: *Used to run HTTP requests, for searching etc.*

### **Frameworks:**
- VueJS 3
- NuxtJS 3
## Features

#### **Random meal:**
When you visit the application you are greeted with a dashboard that shows a random meal out of TheMealDB. Every time you refresh, a random meal will be fetched and displayed.

#### **Search:**
In the navigation at the top right, you are able to search through meals using their name. The results will show a small picture, including the name of the meal. Selecting a meal from the search will open the meal in a new page, with information such as:

- Name of the dish
- Picture of the dish
- Instruction on how to prepare the dish
- Category and origin of the dish
- Video on how to prepare the dish *(if available from TheMealDB)*
- A list of ingredients including the measures

#### **Favorites:** *extra/bonus*
If you select a meal, you are able to add it to your favorites, this will be stored locally in your browser using [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). You are able to add 5 meals to your favorites. You can see your favorites on the dashboard.

#### **Navigation:** *extra/bonus*
When selecting a meal from the search bar, favorites or dashboard you will navigate to the meal page. At the left, under ingredients there are 2 buttons to take quick actions, one of them brings you back to the dashboard. All of this has been done without refreshing your browser, as Nuxt makes it into a SPA.
