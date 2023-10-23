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

//ADD TODOS FROM JSONPLACEHOLDER DATA TO DOM (ERIC PAGE)
// const todosBtn = document.querySelector('#deliver-todos');
// let myList = document.querySelector("#todos-list");

// todosBtn.addEventListener("click", async () => {
//     for (let i = 1; i <= 10; i++) {
//         const request = await fetch('https://jsonplaceholder.typicode.com/todos/' + i, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json'
//             }
//         });
//         const json = await request.json();
//         let todo = json.title;
//         const li = document.createElement('li');

//         li.innerText = todo;

//         myList.appendChild(li);
//     }
// });

//TV SHOW SEARCH PRACTICE
// const form = document.querySelector('#searchForm');
// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     clearImages();
//     const searchTerm = form.elements.query.value;
//     const config = { params: { q: searchTerm } }
//     const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
//     makeImages(res.data);
//     form.elements.query.value = '';
// })

// const makeImages = (shows) => {

//     for (let result of shows) {
//         if (result.show.image) {
//             const img = document.createElement('IMG');
//             img.classList.add('result')
//             img.src = result.show.image.medium;
//             document.body.append(img);
//         }
//     }
// }

// function clearImages() {
//     const imgToDelete = document.getElementsByClassName('result');
//     while (imgToDelete[0]) {
//         imgToDelete[0].parentNode.removeChild(imgToDelete[0]);
//     }
// }

//DAD JOKE
// const jokeDisplay = document.querySelector("#jokeDisplay");

// window.onload = async () => {
//     const request = await fetch('https://icanhazdadjoke.com/', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json'
//         }
//     });
//     const json = await request.json();
//     const jokePara = document.createElement('p');
//     jokePara.innerText = json.joke;

//     jokeDisplay.appendChild(jokePara);
// }
//END DAD JOKE

//INITIALIZE RTE
// var quill = new Quill('#editor', {
//     theme: 'snow'
// });