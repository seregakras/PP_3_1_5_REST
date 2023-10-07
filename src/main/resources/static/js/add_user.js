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
    let users = await response.json();
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

            // ************** Modal edit window *************************

            '<div class="modal fade" id="edit' + users[key].id + '" tabindex="-1"' +
            ' aria-labelledby="editModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h1 class="modal-title fs-5" id="editModalLabel">Edit user</h1>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal"' +
            ' aria-label="Close"></button>' +
            '</div>' +
            '<div class="modal-body" id="modal-edit-content">' +
            '<form name="editUserForm">' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>ID</b></h6>' +
            '<input name="id" type="text" value="' + users[key].id + '"' +
            ' class="form-control" readonly>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>First name</b></h6>' +
            '<input name="name" type="text" value="' + users[key].name + '"' +
            ' class="form-control" placeholder="Name">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>Last name</b></h6>' +
            '<input name="lastName" type="text" value="' + users[key].lastName + '"' +
            ' class="form-control" placeholder="Last name">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="mt-3 mb-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>Age</b></h6>' +
            '<input name="age" type="text" value="' + users[key].age + '"' +
            ' class="form-control" placeholder="Age">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>Email</b></h6>' +
            '<input name="email" type="text" value="' + users[key].email + '"' +
            ' class="form-control" placeholder="Email" readonly>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>Password</b></h6>' +
            '<input name="password" type="password"' +
            ' class="form-control" placeholder="Password">' +
            '</div>' +
            '</div>' +
            ' </div>' +
            '<div class="mt-3 row g-2">' +
            '<div class="col-md">' +
            '<div class="form-floating">' +
            '<h6><b>Role</b></h6>' +
            '<select class="form-select" name="roleNames" multiple required>' +
            '<option value="ADMIN">ADMIN</option>' +
            '<option value="USER">USER</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<hr>' +
            '<div class="bottom-buttons">' +
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' +
            'Close' +
            '</button>' +
            '<button name="editButton" class="btn btn-primary" onclick="updateUser(event)">' +
            'Edit' +
            '</button>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            // *******************************************************************************

            '</td>' +
            '<td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete' +
            + users[key].id + '">Delete</button>\n' +

            // ************** Modal delete window *************************

            '<div class="modal fade" id="delete' + users[key].id + '" tabindex="-1"\n' +
            '         aria-labelledby="deleteModalLabel" aria-hidden="true">\n' +
            '        <div class="modal-dialog">\n' +
            '            <div class="modal-content">\n' +
            '                <div class="modal-header">\n' +
            '                    <h1 class="modal-title fs-5" id="deleteModalLabel">Delete user</h1>\n' +
            '                    <button type="button" class="btn-close" data-bs-dismiss="modal"\n' +
            '                            aria-label="Close"></button>\n' +
            '                </div>\n' +
            '                <div class="modal-body" id="modal-delete-content">\n' +
            '                    <form name="deleteUserForm">\n' +
            '                        <div class="mt-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>ID</b></h6>\n' +
            '                                    <input name="id" type="text" value="' + users[key].id + '"\n' +
            '                                           class="form-control" readonly>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="mt-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>First name</b></h6>\n' +
            '                                    <input name="name" type="text" value="' + users[key].name + '"\n' +
            '                                           class="form-control" placeholder="Name" readonly>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="mt-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>Last name</b></h6>\n' +
            '                                    <input name="lastName" type="text" value="' + users[key].lastName + '"\n' +
            '                                           class="form-control" placeholder="Last name" readonly>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="mt-3 mb-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>Age</b></h6>\n' +
            '                                    <input name="age" type="text" value="' + users[key].age + '"\n' +
            '                                           class="form-control" placeholder="Age"\n' +
            '                                           readonly>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="mt-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>Email</b></h6>\n' +
            '                                    <input name="email" type="text" value="' + users[key].email + '"\n' +
            '                                           class="form-control" placeholder="Email" readonly>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="mt-3 row g-2">\n' +
            '                            <div class="col-md">\n' +
            '                                <div class="form-floating">\n' +
            '                                    <h6><b>Role</b></h6>\n' +
            '                                    <select class="form-select" name="roleNames" multiple>\n' +
            '                                        <option value="ADMIN">\n' +
            '                                                ADMIN' +
            '                                                </option>\n' +
            '                                        <option value="USER">\n' +
            '                                                USER' +
            '                                                </option>\n' +
            '                                    </select>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <hr>\n' +
            '                        <div class="bottom-buttons">\n' +
            '                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\n' +
            '                                Close\n' +
            '                            </button>\n' +
            '                            <button class="btn btn-danger" onclick="deleteUser(event)">\n' +
            '                                Delete\n' +
            '                            </button>\n' +
            '                        </div>\n' +
            '                    </form>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' +

            // *******************************************************************************

            '</td></tr>';
    }
    document.getElementById("users-content").innerHTML = html;

}