async function addUser() {
    event.preventDefault();
    let select = document.getElementById("add-user-roles");
    let selected = Array.from(select.options)
        .filter(option => option.selected)
        .map(option => option.value)
    let user = {
        name: document.getElementById("add-name").value,
        lastName: document.getElementById("add-lastName").value,
        age: document.getElementById("add-age").value,
        email: document.getElementById("add-email").value,
        password: document.getElementById("add-password").value,
        roleNames: selected
    };
    await fetch('/rest/admin/', {
        method: 'POST',
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