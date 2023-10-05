async function updateUser(event) {
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
        roleIds: selected
    };
    await fetch('/rest/admin/', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
}