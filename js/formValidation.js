(() => {
'use strict'

const forms = document.querySelectorAll('.needs-validation')
const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            toastBootstrap.show()
        }

        form.classList.add('was-validated')
    }, false)
})
})()