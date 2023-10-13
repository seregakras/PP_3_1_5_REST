async function deleteUser(event) {
    event.preventDefault();
    let form = event.target.closest('form');
    let inputs = form.querySelectorAll('.form-control');
    let userId = inputs[0].value;
    let userName = inputs[1].value;
    let isDelete = confirm("Delete user: " + userName);
    if (isDelete) {
        await fetch('/rest/admin/' + userId, {
            method: 'DELETE',
        });
    }

    await createTableUsers();
    document.querySelectorAll('div.modal-backdrop.fade.show')[0].remove();
    document.querySelectorAll("body")[0].classList.remove('modal-open');
    document.querySelectorAll("body")[0].style.cssText = '';
}