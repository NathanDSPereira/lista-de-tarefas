const btnNewTask = document.getElementById('btn-new-task');
const inputNewTask = document.getElementById('input-new-task');
const localStorageKey = 'to-do-list';
let inputNewTaskValue;

btnNewTask.addEventListener('click', () => {


    inputNewTask.style.border = '';
    inputNewTaskValue = inputNewTask.value;

    if(inputNewTaskValue == '' || inputNewTaskValue == null) {
    
        inputNewTask.style.border = '1px solid red';

        alert('Digite sua nova task para inserir na lista');
    
    } else if(validadeIfExistNewTask()) {
        
        alert('Já existe uma task com essa descrição');
    
    } else {

        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        values.push({
            name: inputNewTaskValue
        })

        localStorage.setItem(localStorageKey, JSON.stringify(values));

        showValues();
    }

    inputNewTask.value = '';

});

function validadeIfExistNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

    let inputValue = inputNewTask.value;
    let exists = values.find(x => x.name == inputValue);

    return !exists ? false : true;
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

    let list = document.getElementById('to-do-list');
    list.innerHTML = '';

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-task-completed' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
        
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let index = values.findIndex(element => element.name == data);
    values.splice(index, 1);

    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showValues();
}

showValues();