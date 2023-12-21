// Sets year for footer
const setYear = () => {
    const copyrightYear = document.getElementById("year");
    copyrightYear.innerHTML = new Date().getFullYear();
}

// Stops propagation on form missing required fields
(function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

// Adds border to blog post images (embedded through Quill RTE)
const blogImgs = document.querySelectorAll('article img');
blogImgs.forEach((img) => {
    img.classList.add('img-thumbnail');
});

const makePname = () => {
    const inputName = document.getElementById('name').value;
    const sanitizedName = inputName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^A-Za-z0-9._\/-]/g, '');
    document.getElementById("pname").value = sanitizedName;
}
