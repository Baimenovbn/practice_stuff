function addRow(test) {
    const tBody = document.getElementById('tests-table');
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

async function fillTable() {
    let dataURL = '/testapi/';
    let res = await fetch(dataURL);
    let data = await res.json();
    for (let test of data) {
        addRow(test);
    }
}
fillTable();

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

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


async function deleteTestPOST(id) {
    let url = '/delete-test/';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(id),
    });

    let data = await response.text();
    console.log(data);
}
function confirmDeletion(id, row) {
    row.remove();
    deleteTestPOST(id);
}


function editResult(td, id, row) {
    let value = td.textContent;
    td.innerHTML = `<input class="result form-control" data-test="${id}" value=${value} autofocus></input>`;
    td.addEventListener('input', function(e) {
        row.querySelector('#save').disabled = false;
    });
}


async function saveUpdatePOST(id, newText) {
    let url = '/update-test/';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({id, newText}),
    });

    let data = await response.text();
    console.log(data);
}

function saveUpdate(id, row) {
    let newText = row.querySelector('input').value;
    row.cells[1].textContent = `${newText}`;
    row.querySelector('#save').disabled = true;
    row.style.opacity = '0.5';
    setTimeout(() => {
        row.style.opacity = '1';
        saveUpdatePOST(id, newText);
    }, 2000);
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


let newTest = {result: null, name: null}
function createTestPOST() {
    let url = '/create-test/'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(newTest)
    })
    .then(res => res.text())
    .then(data => console.log(data));
}

function cleanFields() {
    document.querySelector('#test-result').value = '';
    document.querySelector('#test-name').value = '';
}

document.querySelector('#create-test').addEventListener('click', function(e) {
    if (newTest.name == null || newTest.result == null) return;
    addRow(newTest);
    createTestPOST();
    for (let key of Object.keys(newTest)) {
        newTest[key] = null;
    }
    formWrapper.classList.add('hidden');
    cleanFields();
});

