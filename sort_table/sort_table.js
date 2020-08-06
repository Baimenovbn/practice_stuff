let people = [
    {
        name: 'Michael',
        age: '30',
        birthday: '11/10/1989',
    },
    {
        name: 'Bakhtiyar',
        age: '24',
        birthday: '23/07/1996',
    },
    {
        name: 'Baglan',
        age: '23',
        birthday: '24/07/1996',
    },
    {
        name: 'Askar',
        age: '65',
        birthday: '11/10/1998',
    },
    {
        name: 'Julia',
        age: '22',
        birthday: '27/02/2000',
    },
    {
        name: 'Cillian',
        age: '14',
        birthday: '01/05/2005',
    },
];

let tableBody = document.getElementById('content');

fillTable(people);
searchTable();
sortTable();


function sortTable() {
    document.querySelector('thead').addEventListener('click', function(e) {
        let target = e.target;
        let colIndex = target.cellIndex;
        let rowsArray = Array.from(tableBody.rows);
    
        if (target.dataset.order === 'desc') {
            target.dataset.order = 'asc';

            rowsArray.sort((rowA, rowB) => {
                let rowAData = rowA.cells[colIndex].textContent;
                let rowBData = rowB.cells[colIndex].textContent;

                return sortData(rowAData, rowBData, colIndex);
            })

        } else {
            target.dataset.order = 'desc';

            rowsArray.sort((rowA, rowB) => {
                let rowAData = rowA.cells[colIndex].textContent;
                let rowBData = rowB.cells[colIndex].textContent;
                return sortData(rowBData, rowAData, colIndex);
            })
        }

        tableBody.append(...rowsArray)
    });
}

function fillTable(data) {
    
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].birthday}</td>
                   </tr>`;
        tableBody.innerHTML += row;
    }
}

function searchTable() {

    document.getElementById('search').addEventListener('keyup', function(e) {
        let value = this.value.toUpperCase();
        let rows = tableBody.rows;

        for (let i = 0; i < tableBody.rows.length; i++) {
            let name = rows[i].cells[0].textContent;

            if (!name.trim().toUpperCase().includes(value)) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    })
}

function sortDate(rowA, rowB) {
    return new Date(rowA.split('/').reverse().join('-')) > new Date(rowB.split('/').reverse().join('-')) ? 1 : -1;
}

function sortOther(rowA, rowB) {
    return rowA > rowB ? 1 : -1;
}

function sortData(rowA, rowB, colIndex) {
    switch (colIndex) {
        case 0:
            return rowA < rowB ? 1 : -1;
        case 1:
            return rowA > rowB ? 1 : -1;
        case 2:
            return new Date(rowA.split('/').reverse().join('-')) < new Date(rowB.split('/').reverse().join('-')) ? 1 : -1;
    }
}