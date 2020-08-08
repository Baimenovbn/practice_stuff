let newId = 4;
let newTest = {'name': null, 'id': newId, 'result': null};

let tests = [
    {'name':'Distillation 50%', 'id':'1', 'result':"43"},
    {'name':'Flash Point', 'id':'2', 'result':"61"},
    {'name':'Water By Karl Fischer', 'id':'3', 'result':"24"},
];
const tBody = document.getElementById('tests-table');

for (let test of tests) {
    addRow(test);
}

function addRow(test) {
    let row = `<tr scope="row" class="test-row-${test.id}" data-testid=${test.id}>
                    <td>${test.name}</td>
                    <td data-action="edit">${test.result}</td>
                    <td>
                        <button id="delete" class="btn btn-danger btn-sm">Delete</button> 
                        <button id="save" class="btn btn-info btn-sm" disabled>Save</button>

                        <button id="cancel" class="btn btn-danger btn-sm hidden">Cancel</button> 
                        <button id="confirm" class="btn btn-primary btn-sm hidden">Confirm</button>
                    </td>
                </tr>`;
    tBody.insertAdjacentHTML('beforeend', row);
}


// START OF Editing functionality of existing values
function deleteTest(id, row) {
    row.querySelectorAll('button').forEach(button => {
        button.classList.toggle('hidden');
    })
}

function cancelDeletion(id, row) {
    row.querySelectorAll('button').forEach(button => {
        button.classList.toggle('hidden');
    })
}

function confirmDeletion(id, row) {
    row.remove();
}

function editResult(td, id, row) {
    let value = td.textContent;
    td.innerHTML = `<input class="result form-control" data-test="${id}" value=${value} autofocus></input>`;
    td.addEventListener('input', function(e) {
        row.querySelector('#save').disabled = false;
    });
}

function saveUpdate(id, row) {
    let newValue = row.querySelector('input').value;
    row.cells[1].textContent = `${newValue}`;
    row.querySelector('#save').disabled = true;
    row.style.opacity = '0.5';
    setTimeout(() => row.style.opacity = '1', 2000);
}
const table = document.querySelector('.table');

table.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON' && e.target.dataset.action !== 'edit') return;
    
    let row = e.target.closest('tr');
    if (!row) return;

    let testId = row.dataset.testid;

    if (e.target.tagName === 'BUTTON') {
        switch (e.target.id) {
            case 'delete':
                deleteTest(testId, row);
                break;
            case 'save':
                saveUpdate(testId, row);
                break;
            case 'cancel':
                cancelDeletion(testId, row);
                break;
            case 'confirm':
                confirmDeletion(testId, row);
                break;
        }
    } else if (e.target.dataset.action === 'edit') {
        if (table.querySelector('input')) return;
        editResult(e.target, testId, row);       
    }
});

// END OF Editing functionality of existing values


// Adding new tests
const formWrapper = document.querySelector('.form-wrapper');

document.getElementById('add-test').addEventListener('click', function(e) {
    formWrapper.classList.toggle('hidden');
})

formWrapper.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT') {
        newTest.result = e.target.value;
    };
    if (e.target.tagName === 'SELECT') {
        newTest.name = e.target.value;
    };
})

document.querySelector('#create-test').addEventListener('click', function(e) {
    if (newTest.name == null || newTest.result == null || newTest.id == null) return;
    addRow(newTest);
    newTest.name = null;
    newTest.id += 1;
    newTest.result = null;
    formWrapper.classList.add('hidden');
    cleanFields();
});

function cleanFields() {
    document.querySelector('#test-result').value = '';
    document.querySelector('#test-name').value = '';
}