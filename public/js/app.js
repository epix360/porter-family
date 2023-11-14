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
let blogImgs = document.querySelectorAll('article img')
blogImgs.forEach(x => x.classList.add('img-thumbnail'));

// Function to delete an image in response to user action
// function deleteImageFromCloudinary(imagePublicId) {
//     fetch(`https://api.cloudinary.com/v1_1/dzfjji5xy/image/destroy?public_id=${imagePublicId}`, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (response.ok) {
//             // Image successfully deleted
//             console.log('Image deleted successfully');
//             // Additional actions after successful deletion
//         } else {
//             // Handle deletion failure
//             console.error('Failed to delete image');
//             // Additional actions on deletion failure
//         }
//     })
//     .catch(error => {
//         // Handle network errors or exceptions
//         console.error('Error:', error);
//     });
// }

// deleteImageFromCloudinary('IMAGE_PUBLIC_ID');

//GETS PROFILE NAME, SANITIZES AND HYPHENATES AS NEEDED TO FORM URL-FRIENDLY 'PNAME'
const makePname = () => {
    const gotName = document.getElementById('name').value;
    const pname = gotName.trim().toLowerCase().replace(/\s+/g, '-').normalize('NFKD').replace(/[^\w\s.\-_\/]/g, '');
    document.getElementById("pname").value = pname;
}