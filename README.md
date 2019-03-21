
## WHAT IS PREVUE
PreVue aims to streamline the development process by making it easy to visualize the architecture of a Vue application. PreVue makes Vue more accessible by allowing users to prototype components. With PreVue, users can easily set up their Vue component architecture with ease and export Vue.js code.

## USING PREVUE
| Install from our website| Running Your Own Version |
| ------------- | ------------- |
| 1. Install <a href="https://www.prevue.io/">PreVue</a>. | 1. Clone the repo and ```npm install``` |
| 2. Access from donwloaded programs and run | 2. ```run electron:serve ```

## CORE FEATURES:
  - Component creation: Insert a name and select desired HTML elements. The created component will render as a box on the main canvas. Child relationships can be established during component creation. Note that at least two components need to be created to be able to view selectable components in the select child dropdown 
  - Routes creation: Create different routes as needed for different application views
  - Editable popup modal: Once a component is created, it is editable by double clicking 
  - Draggable HTML elements: In Edit Mode, additional HTML element can be selected. HTML elements can be nested by dragging accordingly.
  - Live HTML code display: As selected HTML elements are dragged, the code display will change accordingly. It will be a live preview of the Vue template code
  - When saving projects, projects are saved as json files
  - Exportable code: When you are happy with your work, you can export the entire project. The exported directory structure includes:
    ```
    src/
      assets/
      App.vue
      components/
        YourCreatedComponent.vue
      views/
        HomeView.vue
        YourCreatedRoute
     ```
  
      ### Navigating the Editor:
         cmd/ctrl + s: save
         cmd/ctrl + o: open
         cmd/ctrl + n: new project tab
         cmd/ctrl + t: close project tab
  
## FEATURES TO COME
- Support for React
- Prop passing

## CREDITS
- Hubert Lin https://www.linkedin.com/in/lin-huberth/
- Franklin Pinnock https://www.linkedin.com/in/pinnockf/
- Annette Lin https://www.linkedin.com/in/alin10/
- Daniel Shu https://www.linkedin.com/in/danielshu/

## License
MIT
