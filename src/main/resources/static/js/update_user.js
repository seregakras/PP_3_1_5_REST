async function updateUser(event) {
    event.preventDefault();
    let form = event.target.closest('form');
    let inputs = form.getElementsByClassName('form-control');
    let select = (form.getElementsByClassName("form-select"))[0];
    let selected = Array.from(select.options)
        .filter(option => option.selected)
        .map(option => option.value)
    let user = {
        id: inputs[0].value,
        name: inputs[1].value,
        lastName: inputs[2].value,
        age: inputs[3].value,
        email: inputs[4].value,
        password: inputs[5].value,
        roleNames: selected
    };
    await fetch('/rest/admin/', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    document.getElementById("home-tab-pane").classList
        .add('active', 'show');
    document.getElementById("profile-tab-pane").classList
        .remove('active', 'show');
    document.getElementById("home-tab").classList.add('active');
    document.getElementById("profile-tab").classList.remove('active');

    let response = await fetch('/rest/admin/');
    let users = await response.json(); // читаем ответ в формате JSON
    let html = '';
    for (let key in users) {
        let roles = '';
        for (let index in users[key].roleNames) {
            roles += users[key].roleNames[index] + ' ';
        }
        html += '<tr>\n' +
            '<td>' + users[key].id + '</td>\n' +
            '<td>' + users[key].name + '</td>\n' +
            '<td>' + users[key].lastName + '</td>\n' +
            '<td>' + users[key].age + '</td>\n' +
            '<td>' + users[key].email + '</td>\n' +
            '<td>' + roles + '</td>\n' +
            '<td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#edit' +
            +users[key].id + '">Edit</button>\n' +
            '<div th:insert="~{editUser :: edit-user}"></div></td>\n' +
            '<td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete' +
            +users[key].id + '">Delete</button>\n' +
            '<div th:insert="~{deleteUser :: delete-user}"></div></td>\n' +
            '</tr>';
    }
    document.getElementById("users-content").innerHTML = html;
}