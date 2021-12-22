import {main} from './app.js';

export let module = (function () {
  const doc = document;

  function createList(name = 'Happy Little Clouds') {
    let list = `<ul class = "list"></ul>`,
        text = `<textarea placeholder="My task" class="text"></textarea>`,
        sub = `<input type="submit" value="Post" class="btn" disabled>`,
        clearBtn = `<div><input type="submit" value="Clear tasks" class="clear"></div>`,
        listName = `<h3>${name}</h3>`;

    main.innerHTML = `${listName}${list}${text}${sub}${clearBtn}`;
  };

  function enchance () {
    const textArea = doc.querySelector('.text'),
          ul = doc.querySelector('.list'),
          btn = doc.querySelector('.btn'),
          clearBtn = doc.querySelector('.clear'),
          remove = `<input type="submit" value="Delete" class="remove">`,
          edit = `<input type="submit" value="Edit" class="edit">`,
          anchor = `<input type="submit" value="Anchor" class="anchor">`,
          done = `<input type="submit" value="Done" class="done">`;

    btn.addEventListener('click', () => {
          if (!textArea.value) return;

          ul.innerHTML += `<li><span>${textArea.value}</span> ${edit} ${anchor} ${done} ${remove}</li>`;
          ul.lastElementChild.scrollIntoView(false);
          textArea.value = '';
          btn.disabled = true;
          sessionStorage.setItem('session', JSON.stringify(main.innerHTML));
    });

    clearBtn.addEventListener('click', () => {
      if (confirm('R u sure?')) {
        ul.innerHTML = '';
        sessionStorage.removeItem('session');
      };
    });

    ul.addEventListener('click', e => {
      let target = e.target,
          parent = target.parentNode,
          fieldName = target.className,
          editBtn = parent.querySelector('.edit'),
          anchorBtn = parent.querySelector('.anchor');

      switch (fieldName) {
        case 'remove':
          parent.remove();
          break;

        case 'edit':
          if (!parent.classList.contains('inProgress')) {
            let text = parent.querySelector('span').textContent,
                value = `<textArea>${text}</textArea> ${edit}`;

            parent.innerHTML = value;
          } else {
            let newText = parent.querySelector('textArea').value;

            parent.innerHTML = `<span>${newText}</span> ${edit} ${anchor} ${done} ${remove}`;
          };

          parent.classList.toggle('inProgress');
          break;

        case 'anchor':
          ul.insertBefore(parent, ul.firstChild);
          parent.firstChild.style.color = 'green';
          break;

        case 'done':
          parent.className = 'cheked';
          editBtn.disabled = true;
          anchorBtn.disabled = true;
          break;
      };

      sessionStorage.setItem('session', JSON.stringify(main.innerHTML));
    });

    textArea.addEventListener('input', () => {
        textArea.value ? btn.disabled = false : btn.disabled = true;
    });
  };

  return {
    createList: createList,
    enchance: enchance
  };

})();
