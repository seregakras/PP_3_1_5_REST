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

            '<div class="modal fade" id="edit' + users[key].id + '" tabindex="-1"\n' +
            '     aria-labelledby="editModalLabel" aria-hidden="true">\n' +
            '    <div class="modal-dialog">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <h1 class="modal-title fs-5" id="editModalLabel">Edit user</h1>\n' +
            '                <button type="button" class="btn-close" data-bs-dismiss="modal"\n' +
            '                        aria-label="Close"></button>\n' +
            '            </div>\n' +
            '            <div class="modal-body" id="modal-edit-content">\n' +
            '                <form name="editUserForm">\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>ID</b></h6>\n' +
            '                                <input name="id" type="text" value="' + users[key].id + '"\n' +
            '                                       class="form-control" readonly>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>First name</b></h6>\n' +
            '                                <input name="name" type="text" value="' + users[key].name + '"\n' +
            '                                       class="form-control" placeholder="Name">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>Last name</b></h6>\n' +
            '                                <input name="lastName" type="text" value="' + users[key].lastName + '"\n' +
            '                                       class="form-control" placeholder="Last name">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 mb-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>Age</b></h6>\n' +
            '                                <input name="age" type="text" value="' + users[key].age + '"\n' +
            '                                       class="form-control" placeholder="Age">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>Email</b></h6>\n' +
            '                                <input name="email" type="text" value="' + users[key].email + '"\n' +
            '                                       class="form-control" placeholder="Email" readonly>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>Password</b></h6>\n' +
            '                                <input name="password" type="password"\n' +
            '                                       class="form-control" placeholder="Password">\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <div class="mt-3 row g-2">\n' +
            '                        <div class="col-md">\n' +
            '                            <div class="form-floating">\n' +
            '                                <h6><b>Role</b></h6>\n' +
            '                                <select class="form-select" name="roleNames" multiple required>\n' +
            '                                    <option value="ADMIN">ADMIN</option>\n' +
            '                                    <option value="USER">USER</option>\n' +
            '                                </select>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <hr>\n' +
            '                    <div class="bottom-buttons">\n' +
            '                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">\n' +
            '                            Close\n' +
            '                        </button>\n' +
            '                        <button name="editButton" class="btn btn-primary" onclick="updateUser(event)">\n' +
            '                            Edit\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </form>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' +
            '</div>' +

            // ************************************************************************************

            '<td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete' +
            +users[key].id + '">Delete</button>\n' +

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
    document.querySelectorAll("div.modal-backdrop.fade.show")[0].remove();
    document.querySelectorAll("body")[0].classList.remove('modal-open');
    document.querySelectorAll("body")[0].style.cssText = '';

}