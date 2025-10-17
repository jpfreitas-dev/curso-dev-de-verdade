const input = document.getElementById('toDo');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('tasks-list');

// Adicionar nova task
addTask.addEventListener('click', (event) => {
    event.preventDefault();
    const texto = input.value.trim();
    if (texto === '') return alert('Digite uma tarefa');

    const newTask = document.createElement('li');
    newTask.className = 'task';
    newTask.innerHTML = `
        <label>
            <input type="checkbox" name="done">
            <span class="checkmark"></span>
            <span class="task-text"></span>
            <input type="text" class="edit-text hidden">
        </label>
        <div class="delete-edit">
            <button class="delete">
                <p>Deletar</p>
                <img src="./assets/delete.png" alt="Ícone de lixeira">
            </button>
            <button class="edit">
                <img src="./assets/edit.png" alt="Ícone de lápis para editar">
            </button>
        </div>
    `;

    newTask.querySelector('.task-text').textContent = texto;
    newTask.querySelector('.edit-text').value = texto;
    taskList.appendChild(newTask);
    input.value = '';
});

// Delegação de eventos para deletar
taskList.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.delete');
    if (!delBtn) return;

    const li = delBtn.closest('.task');
    li.remove();
});

// Delegação de eventos para editar
taskList.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit');
    if (!editBtn) return;

    const li = editBtn.closest('.task');
    const taskText = li.querySelector('.task-text');
    const editInput = li.querySelector('.edit-text');

    const texto = taskText.textContent;
    editInput.value = texto;

    taskText.classList.add('hidden');
    editInput.classList.remove('hidden');
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
});

// Confirmar edição ao pressionar Enter
taskList.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const editInput = e.target.closest('.edit-text');
    if (!editInput) return;

    const li = editInput.closest('.task');
    const taskText = li.querySelector('.task-text');

    taskText.textContent = editInput.value.trim() || taskText.textContent;
    taskText.classList.remove('hidden');
    editInput.classList.add('hidden');
});

taskList.addEventListener('change', (e) => {
    const checkbox = e.target.closest('input[type="checkbox"]');
    if (!checkbox) return;

    const li = checkbox.closest('.task');
    if (checkbox.checked) {
        li.classList.add('done');
    } else {
        li.classList.remove('done');
    }
});