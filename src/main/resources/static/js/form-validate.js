function formValidate() {
    const form = event.target.closest('.form-validated');
    form.querySelectorAll('.d-block').forEach(function (element) {element.classList.remove('d-block');})
    let fields = form.querySelectorAll('.form-control');
    try {
        fields.forEach(function (element) {
            if (!element.value) {
                element.parentNode.querySelector('.invalid-feedback').classList.add('d-block');
                throw false;
            }
            if(!form.querySelector('.form-select').value) {
                form.querySelector('.select').classList.add('d-block');
                throw false;
            }
        });
    } catch (e) {
        return  e;
    }
    return true;
}