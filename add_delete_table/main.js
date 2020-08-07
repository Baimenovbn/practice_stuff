let tests = [
    {'name':'Distillation 50%', 'id':'1', 'result':"43"},
    {'name':'Flash Point', 'id':'2', 'result':"61"},
    {'name':'Water By Karl Fischer', 'id':'3', 'result':"24"},
];

function fillTable() {
    let tBody = document.getElementById('tests-table');
    for (let person of tests) {
        let row = `<tr scope="row" class="test-row-${person.id}" data-testid=${person.id}>
                        <td>${person.name}</td>
                        <td>${person.result}</td>
                        <td>
                            <button id="delete" class="btn btn-danger btn-sm">Delete</button> 
                            <button id="save" class="btn btn-info btn-sm" disabled>Save</button>

                            <button id="cancel" class="btn btn-danger btn-sm hidden">Cancel</button> 
                            <button id="confirm" class="btn btn-primary btn-sm hidden">Confirm</button>
                        </td>
                    </tr>`;
        tBody.insertAdjacentHTML('beforeend', row);
    }
}

fillTable();