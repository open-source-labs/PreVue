<p align="center">
  <img width="350" src="src/assets/prevue-large-green.png?raw=true">
  <h1 align="center">PreVue </h1>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/teamprevue/PreVue/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE LINK GOES HERE)

<h3 align="center">
An open source Vue application prototyping tool for developers and designers.
</h3>

PreVue allows the user to design/visualize their component architecture - previewing component template HTML structure, setting up views/routes, establishing parent-child component relationships - and then export their component architecture as a Vue application created with the default Vue CLi settings.

## Getting Started

If you are looking for the executable version of PreVue, you can download it at [prevue.io](https://www.prevue.io/)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

PreVue was developed using node runtime @ v10.15.0. You should make sure you at least have that version installed to ensure full compatibility. You can download the latest version of node [here](https://nodejs.org/en/)

### Setup

Clone this repo

```
git clone https://github.com/teamprevue/PreVue.git
```

Install dependencies

```
npm install
```

Run electron app

```
npm run electron:serve
```

After prototyping your application the way you want, just click export project to your local machine.

Just install dependencies 
```
npm install
```
and run your server

```
npm start
```

Then navigate to localhost:8080 in your browser and your application is now running!

## Features

- Create components using 'Create a Component' form
- Edit components by double clicking on them
- Add standard html elements to template of a component that is created or being edited
- Draggable editing of component HTML template code structure
- Live updating of component HTML template code structure display
- Establish parent-child component relationships via dropdown menu when creating or editng components
- Create route components using 'Routes' form that allows for designing of multiple views of a SPA at once.
- Components will automatically save to the route that they are created in
- Display tree view of entire Vue application component architecture when tree icon on navbar is clicked
- Project Open/Save
- Hotkeys for opening and saving projects, and opening and closing tabs
- Export project as Vue application!

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

### Editor Hotkeys:

- cmd/ctrl + s: save
- cmd/ctrl + o: open
- cmd/ctrl + n: new project tab
- cmd/ctrl + w: close project tab

## Built With

- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/guide/#html)
- [Vuex](https://vuex.vuejs.org/)
- [Electron](https://electronjs.org/)
- [Vue-Electron CLI](https://github.com/nklayman/vue-cli-plugin-electron-builder)
- [Buefy](https://buefy.org/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [Travis](https://travis-ci.org/)
- [localForage](https://localforage.github.io/localForage/)
- [Vue D3 Tree](https://github.com/David-Desmaisons/Vue.D3.tree)

## Contributing

PreVue is currently in beta release. We encourage you to submit issues for any bugs or ideas for enhancements. Also feel free to fork this repo and submit pull requests to contribute as well.

## Authors

- **Hubert Lin** [@hubelin](https://github.com/hubelin)
- **Franklin Pinnock** [@pinnockf](https://github.com/pinnockf)
- **Annette Lin** [@al2613](https://github.com/al2613)
- **Daniel Shu** [@danshuu](https://github.com/danshuu)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
