import {module} from './Task2_TODO.js';

export const main = document.getElementById('my-todo');

window.addEventListener('load', () => {
  let storage = sessionStorage.getItem('session');

  (storage == null) ? module.createList('My TODO') : main.innerHTML = JSON.parse(storage);

  module.enchance();
});
