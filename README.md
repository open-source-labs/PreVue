<p align="center">
  <img width="350" src="src/assets/prevue-logo.png?raw=true">
  <h1 align="center">PreVue </h1>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/teamprevue/PreVue/pulls)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

<h3 align="center">
All in One Prototyping Tool 
For Vue Developers

</h3>

<h4 align="center">
From Component Architecture to Code Exporting
</h4>

PreVue allows the user to design/visualize their component architecture by allowing users to :

1. Create components and preview their code

2. Set up different views/routes

3. Establish parent-child component relationships

4. See their application architecture in tree format

5. Export the component architecture as a Vue application created with the default Vue CLI settings.

<p align="center">
  <img width="1000" src="src/assets/prevue.png?raw=true">

</p>

## Getting Started

---

Download for [MacOS](https://s3.amazonaws.com/prevue-app/PreVue-1.0.0.dmg), [Linux](https://s3.amazonaws.com/prevue-app/PreVue_1.0.0_amd64.deb), or [Windows](https://s3.amazonaws.com/prevue-app/PreVue+Setup+1.0.0.exe)

###### Support for Windows now here!

- Mac users only: for now you might need to go to your security settings to allow the app run on your system as we do not have an Apple license yet.

If you find any issues, [file issue](https://github.com/teamprevue/PreVue/issues)

## How to use

---

#### Adding Components

- Double click on the application icon
- Create components by entering a name and clicking the html elements you need

- Clicked elements will be shown on the right sidebar
- Drag them around to change the order!

- Once you're satisfied, click the button to add a component and it will show up in the center stage, with the ability to resize!

<img src='http://g.recordit.co/fyQ6LKvwlt.gif'/>

#### Editing Components

- Edit components by double clicking for the edit modal to show
- Add additional elements to a component with a live preview of the component code
- Drag elements on the right side bar to nest elements
- Establish parent-child component relationships via a dropdown menu when creating or editing components

<img src='http://g.recordit.co/A6rOQRJVOc.gif'/>

#### Adding Routes/Projects

- Create different routes for your application by entering a new route name and pressing enter
- Any components created on a certain route will be automatically saved to that route
- Play with multiple projects by clicking the add project icon!
- Display a tree view of entire application component architecture when the tree icon on navbar is clicked

<img src='http://g.recordit.co/bfYwX1sdtl.gif'/>

#### Tree View of Application Architecture

<p align="center">
  <img width="1000" src="src/assets/tree-demo.png?raw=true">

</p>

#### Saving/Opening/Exporting Projects

- If you ever need to save your current project, click the save project icon to save a json to your local directory
- Next time the application is started, open the project again by clicking the open project icon!
- Once you're satisfied, click the export project icon to export your awesome project as new Vue application!

<img src='http://g.recordit.co/uFLqyjAnMm.gif'/>

##### Code Exporting

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

## Running your own local version

---

PreVue was developed using node runtime @ v10.15.0. You should make sure you at least have that version installed to ensure full compatibility. You can download the latest version of node [here](https://nodejs.org/en/)

### Setup

Clone this repo

```
git clone https://github.com/teamprevue/PreVue.git
```

Install dependencies

```
npm i
```

Run electron app

```
npm run electron:serve
```

## Built With

---

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

---

PreVue is currently in beta release. We encourage you to submit issues for any bugs or ideas for enhancements. Also feel free to fork this repo and submit pull requests to contribute as well.

## Authors

---

- **Hubert Lin** [@hubelin](https://github.com/hubelin)
- **Franklin Pinnock** [@pinnockf](https://github.com/pinnockf)
- **Annette Lin** [@al2613](https://github.com/al2613)
- **Daniel Shu** [@danshuu](https://github.com/danshuu)

## License

---

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
