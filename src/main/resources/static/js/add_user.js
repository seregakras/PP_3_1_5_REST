function addUser() {
    alert("Adding user");
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
        roles: selected
    };
    let response = fetch('/rest/admin/add-user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    let result = response.json();
    alert(result.message);
}