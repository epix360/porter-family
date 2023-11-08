Quill.register("modules/imageUploader", ImageUploader);

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [2, 3, 4, 5, 6, false] }],
    ['link', 'image'],                              // link, media

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const quill = new Quill('#editor-container', {
    modules: {
        toolbar: {
            container: toolbarOptions
        },
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("folder", `porterfamily/blog`);
                    formData.append("upload_preset", "hrbbhef2");

                    fetch(
                        "https://api.cloudinary.com/v1_1/dzfjji5xy/image/upload",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            cloudinaryPublicIds.push(result.public_id);
                            imageInput.value = cloudinaryPublicIds;
                            resolve(result.url);
                        })
                        .catch((error) => {
                            reject("Upload failed");
                            console.error("Error:", error);
                        });
                });
            }
        },
    },
    placeholder: 'Write your story...',
    theme: 'snow'
});

quill.on('text-change', update);
var blogInput = document.querySelector('input[id=content]');
update();

function update(delta) {
    var contents = quill.getContents();
    console.log('contents', contents);
    var html = "contents = " + JSON.stringify(contents, null, 2);
    if (delta) {
        console.log('change', delta)
        html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
    }

    blogInput.value = quill.root.innerHTML;
}

let cloudinaryPublicIds = [];
let imageInput = document.querySelector('#imageIds');