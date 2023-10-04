async function deleteUser(event) {
    let form = event.target.closest('form');
    let inputs = form.getElementsByClassName('form-control');
    let userId = inputs[0].value;
    let userName = inputs[1].value;
    let isDelete = confirm("Delete user: " + userName);
    if (isDelete) {
        await fetch('/rest/admin/delete-user/' + userId, {
            method: 'DELETE',
        });
    }
}