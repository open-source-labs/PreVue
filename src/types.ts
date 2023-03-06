export type Icons = {
  //   [k: string]: string;
  div: string;
  button: string;
  form: string;
  img: string;
  link: string;
  list: string;
  paragraph: string;
  'list-ol': string;
  'list-ul': string;
  input: string;
  navbar: string;
};

export type HtmlElementMap = {
  div: string[];
  button: string[];
  form: string[];
  img: string[];
  link: string[];
  list: string[];
  paragraph: string[];
  'list-ol': string[];
  'list-ul': string[];
  input: string[];
  navbar: string[];
};

export type Component = {
  componentName: string;
  children: string[];
  htmlList: HtmlList;
  isActive?: boolean;
  x?: number;
  y?: number;
  h?: number;
  w?: number;
};
export type ComponentMap = {
  [k: string]: Component;
};

export type Routes = {
  [k: string]: string[];
};

export type Project = {
  filename: string;
  lastSavedLocation: string;
};
export type Type = string;

export type State = {
  icons: Icons;
  htmlElementMap: HtmlElementMap;
  componentMap: ComponentMap;
  routes: Routes;
  componentNameInputValue: string;
  projects: Project[];
  activeRoute: string;
  activeComponent: string;
  selectedElementList: object[];
  projectNumber: number;
  activeTab: number;
  componentChildrenMultiselectValue: string[];
  modalOpen: boolean;
  htmlElements: any[];
};

export type Mutations<State> = {
  [k: Type]: (
    state: State,
    payload?: any,
    elementName?: string,
    id?: number
  ) => void;
};
export type Actions = {
  [k: Type]: (context: any, payload?: any) => void;
};

export type HtmlChild = {
  text: string;
  children: HtmlChild[];
  _id?: number;
};

export type HtmlList = HtmlChild[];
