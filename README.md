<p align="center">
  <img width="1000" src="src/assets/new-banner.png?raw=true">
</p>

---

<p align="center">
  <img width="250" src="src/assets/prevue-large-green-bottom.png">
  <h1 align="center">PreVue </h1>
</p>


<h3 align="center">
All-in-One Prototyping Tool 
For Vue Developers
</h3>

<h4 align="center">
From Component Architecture to Code Exporting
</h4>

<!-- <h4 align='center'>
  https://www.prevue.live
</h4> -->



PreVue allows users to conceptualize and visualize component architecture by making it possible to :

* Build components, visualize UI and preview the associated code
* Set up different routes and views for each project
* Establish parent-child component relationships
* View application hierarchy in tree format
* Save and open projects that are currently in progress, ensuring that completed work is not lost and can be revisited at any time
* Export component architecture as a Vue application created with default Vite settings

Use PreVue to create projects in single sessions or sign in with GitHub to save projects and update them at your convenience!

<!-- <p align="center">
  <img width="1000" src="src/assets/pvv.png?raw=true">
</p> -->

## Getting Started
---
### Adding Views
- Select an existing view from the View Creator dropdown, or enter a new view name, then select your custom view from the View Creator dropdown
- Any components created on a given view will be automatically saved to that specific view
- See your application’s hierarchy by clicking the ‘Tree’ icon in the navigation bar


<p align="center">
<img width ="300" src="src/assets/viewcreator.png?raw=true">
</p>

<h5 align="center">Tree View of Application Architecture</h5>

<p align="center">
  <img width="300" src="src/assets/treeview.png?raw=true">
</p>


### Adding Components
- Enter a component name in the Component Creator field and select HTML elements
- Clicked elements will be shown in the right sidebar -- drag elements to change their order
- Once you're satisfied, click ‘add component’ button and it will show up in the working area -- resize and move components to fit the design you have in mind

<img width="1000" src="src/assets/prevue-recording.gif">

### Editing Components

- Double click elements to bring up the modal view
- Add additional elements to a component with a live preview of the component code
- Drag selected elements to the right to nest elements
- Establish parent-child component relationships via the dropdown menu when creating or editing components

<img width="1000" src="src/assets/modal-image.png?raw=true">


### Saving / Opening / Exporting Projects

- If you're signed in with GitHub, click the ‘Save Project’ icon to save it to PreVue’s database
- Click ‘Open Project’ to retrieve past projects
- Once you're satisfied, click the export project icon to export your awesome project as new Vue application
- Other users can use PreVue's playground to create and export projects in single sessions without signing in

<!-- <img width="1000" src="src/assets/export.gif">
<img width="1000" src="src/assets/export.png"> -->

### Code Exporting

Below is the generated directory structure of the Vue application that is created when you export your design.

```
src/
  assets/
  App.vue
  components/
    UserCreatedComponent1.vue
    UserCreatedComponent2.vue
    ...
  views/
    HomeView.vue
    UserCreatedRouteComponent1.vue
    UserCreatedRouteComponent2.vue
    ...
```

<!-- ## Running your own local version

### Setup

Coming soon! -->

## Built With

---

* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Node.js](https://nodejs.org/en)
* [SuperTest](https://www.npmjs.com/package/supertest)
* [Vite](https://vitejs.dev/)
* [Vue Router](https://router.vuejs.org/guide/#html)
* [Vue Test Utils](https://test-utils.vuejs.org/)
* [Vue.js](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/)


## Changelog

---

PreVue 3.0 Updates:

- OAuth integration with GitHub for secure authentication
- Full CRUD functionality for prototype creation
- Implementation of appropriate hierarchical relationships reflected in UI
- Website and Homepage redesign for seamless user experience
- Realistic rendering of elements to Component Display
- Delete and Undo functionality for individual Components
- Project saving, loading & export ability

PreVue 2.0 Updates:

- Implementation of PreVue as a web application
- TypeScript integration
- Backend infrastructure built with Node/Express
- General UI/UX enhancements
- Testing with Vitest and Supertest (and Jest)

## Contributing to PreVue

---

We encourage you to submit issues for any bugs or ideas for enhancements. Please feel free to fork this repo and submit pull requests to contribute as well. Follow PreVue on [LinkedIn](https://www.linkedin.com/company/prevue-live/) for more updates.

Ideas for additional features include:

- Project livesharing for collaborative sessions (via Websockets)
- Migrate state management from Vuex to Pinia
- More thorough testing with Jest
- Ability to rename and add styling to individual components
- Containerization of PreVue App
- User Authentication updates via OAuth

## Authors

Prevue 3.0

- **April Sanders** [@algorithmrhythm](https://github.com/algorithmrhythm)
- **Cole Jaeger** [@colejaeger0](https://github.com/colejaeger0)
- **Ilay Eskinazi** [@Pixolino](https://github.com/Pixolino)
- **Nathan Bornstein** [@greenteaisgreat](https://github.com/greenteaisgreat)

PreVue 2.0

- **Jason Boo** [@jasonboo123](https://github.com/jasonboo123)
- **Robert Drake** [@rmdrake8](https://github.com/rmdrake8)
- **Sean Flynn** [@seanflynn5](http://github.com/seanflynn5)
- **Zach Pestaina** [@zachpestaina](https://github.com/zachpestaina)

PreVue 1.0

- **Hubert Lin** [@hubelin](https://github.com/hubelin)
- **Franklin Pinnock** [@pinnockf](https://github.com/pinnockf)
- **Annette Lin** [@al2613](https://github.com/al2613)
- **Daniel Shu** [@danshuu](https://github.com/danshuu)

## License

---

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
<div>
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/teamprevue/PreVue/pulls)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
</div>
