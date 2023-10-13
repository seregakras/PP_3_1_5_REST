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
    if (formValidate()) {
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

        await createTableUsers();
    }
}