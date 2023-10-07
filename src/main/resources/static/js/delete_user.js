async function deleteUser(event) {
    event.preventDefault();
    let form = event.target.closest('form');
    let inputs = form.getElementsByClassName('form-control');
    let userId = inputs[0].value;
    let userName = inputs[1].value;
    let isDelete = confirm("Delete user: " + userName);
    if (isDelete) {
        await fetch('/rest/admin/' + userId, {
            method: 'DELETE',
        });
    }

    let response = await fetch('/rest/admin/');
    let users = await response.json(); // читаем ответ в формате JSON
    let html = '';
    for (let key in users) {
        html += '<tr>\n' +
            '<td>' + users[key].id + '</td>\n' +
            '<td>' + users[key].name + '</td>\n' +
            '<td>' + users[key].lastName + '</td>\n' +
            '<td>' + users[key].age + '</td>\n' +
            '<td>' + users[key].email + '</td>\n' +
            '<td><div style="float: left; margin-right: 5px"><p>' + users[key].roleIds[0] + '</p></div></td>\n' +
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