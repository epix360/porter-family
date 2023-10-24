//SETS YEAR FOR FOOTER
const setYear = () => {
    const copyrightYear = document.getElementById("year");
    copyrightYear.innerHTML = new Date().getFullYear();
}

//STOPS PROPOGATION ON FORM MISSING REQUIRED FIELDS
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//ADDS BORDER TO BLOG POST IMAGES (EMBEDDED THROUGH QUILL RTE)
document.querySelectorAll('article img').forEach(x=>x.classList.add('img-thumbnail'));