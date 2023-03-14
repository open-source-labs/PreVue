// Map of html element opening and closing tags

import { HtmlElementMap } from '../../types';

const htmlElementMap: HtmlElementMap = {
  div: ['<div>', '</div>'],
  button: ['<button>', '</button>'],
  form: ['<form>', '</form>'],
  img: ['<img>', ''],
  link: ['<a href="#"/>', ''],
  list: ['<li>', '</li>'],
  paragraph: ['<p>', '</p>'],
  'list-ol': ['<ol>', '</ol>'],
  'list-ul': ['<ul>', '</ul>'],
  input: ['<input />', ''],
  navbar: ['<nav>', '</nav>']
};

export default htmlElementMap;
