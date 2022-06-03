//Variables
const boton = document.querySelector('#add');
const formulario = document.querySelector('#formulario');
const listado = document.querySelector('.task');
let tareas = [];



//Eventos

eventos();

function eventos() {
  //Cuando el usuario agrega una nueva tarea
  formulario.addEventListener('submit', agregar);
  //Cuando el documento termina de cargar
  document.addEventListener('DOMContentLoaded', () => {
    tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    crearHTML();
  });
}

//Funciones


function agregar(e) {
  e.preventDefault();
  const tarea = document.querySelector('#tarea').value;

  if (tarea === '') {
    mostrarError('Los campos no pueden ser vacíos');
    return;
  }

  const tareaObj = {
    id: Date.now(),
    tarea
  }

  tareas = [...tareas, tareaObj];

  //Una vez agregado al array, creo el html
  crearHTML();

  //Limpio el input

  formulario.reset();


}

function mostrarError(error) {
  const msg = document.createElement('p');
  msg.textContent = error;
  msg.classList.add('error');
  listado.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}

function crearHTML() {
  limpiarHTML();
  if (tareas.length > 0) {
    tareas.forEach(tarea => {
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn-eliminar');
      btnEliminar.innerText = 'X';
      btnEliminar.onclick = () => {
        eliminar(tarea.id);
      }
      const divTask = document.createElement('div');
      divTask.classList.add('task-container');
      //Creacion del HTML
      const p = document.createElement('p');
      p.innerText = tarea.tarea;
      p.classList.add('task-msg')
      divTask.appendChild(p)
      divTask.appendChild(btnEliminar);
      listado.appendChild(divTask);

    })
  }

  agregarStorage();
}

function agregarStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eliminar(id) {
  tareas = tareas.filter(tarea => tarea.id != id);
  crearHTML();

}

function limpiarHTML() {
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
}
