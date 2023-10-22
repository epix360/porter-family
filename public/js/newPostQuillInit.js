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

const newPostQuill = new Quill('#new-post-editor', {
    modules: {
        toolbar: {
            container: toolbarOptions
        },
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    fetch(
                        "https://api.imgbb.com/1/upload?key=7a97dbf9e779c72eca388a12d7cd1df2",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);
                            resolve(result.data.url);
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

const editorContents = newPostQuill.on('text-change', function () {
    var blogInput = document.querySelector('input[id=content]');
    var postContent = newPostQuill.root.innerHTML;
    blogInput.value = postContent;
    console.log(blogInput.value)
});