//Variables
const button = document.querySelector('#add');
const form = document.querySelector('#formulario');
const list = document.querySelector('.task');
let tasks = [];

//Funciones

const add = (e) => {
  e.preventDefault();
  const tarea = document.querySelector('#tarea').value;

  if (tarea === '') {
    showError('Los campos no pueden ser vacíos');
    return;
  }

  const taskObj = {
    id: Date.now(),
    tarea
  }

  tasks = [...tasks, taskObj];

  //Una vez agregado al array, creo el html
  createHTML();

  //Limpio el input

  form.reset();


}

const showError = (error) => {
  const msg = document.createElement('p');
  msg.textContent = error;
  msg.classList.add('error');
  list.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}

const createHTML = () => {
  clearHTML();
  if (tasks.length > 0) {
    tasks.forEach(tarea => {
      const btnEliminar = document.createElement('button');
      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-trash');
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.appendChild(icon);
      btnEliminar.addEventListener('click', () => deleteTask(tarea.id));
      const divTask = document.createElement('div');
      divTask.classList.add('task-container');
      //Creacion del HTML
      const p = document.createElement('p');
      p.innerText = tarea.tarea;
      p.classList.add('task-msg')
      divTask.appendChild(p)
      divTask.appendChild(btnEliminar);
      list.appendChild(divTask);

    })
  }

  addStorage();
}

const addStorage = () => {
  localStorage.setItem('tareas', JSON.stringify(tasks));
}

const deleteTask = (id) => {
  tasks = tasks.filter(tarea => tarea.id != id);
  createHTML();

}

const clearHTML = () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

//Eventos

const events = () => {
  //Cuando el usuario agrega una nueva tarea
  form.addEventListener('submit', add);
  //Cuando el documento termina de cargar
  document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tareas')) || [];
    createHTML();
  });
}

events();