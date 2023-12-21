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
            async upload(file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", `porterfamily`);
                formData.append("upload_preset", "hrbbhef2");

                try {
                    const response = await fetch(
                        "https://api.cloudinary.com/v1_1/dzfjji5xy/image/upload",
                        {
                            method: "POST",
                            body: formData
                        }
                    );
                    const result = await response.json();
                    const { secure_url, public_id } = result;
                    cloudinaryPublicIds.push(public_id);
                    imageInput.value = cloudinaryPublicIds;
                    return secure_url;
                } catch (error) {
                    console.error("Error:", error);
                    throw new Error("Upload failed");
                }
            }
        },
    },
    placeholder: 'Write your story...',
    theme: 'snow'
});

let cloudinaryPublicIds = [];
let imageInput = document.querySelector('#imageIds');
let imageIdsToDelete = document.querySelector('#imageIdsToDelete');
let idsToDestroy = [];

quill.on('text-change', update);
var blogInput = document.querySelector('input[id=content]');
update();

function update(delta) {
    const contents = quill.getContents();
    console.log('contents', contents);

    let html = `contents = ${JSON.stringify(contents, null, 2)}`;
    if (delta) {
        console.log('change', delta);
        html = `change = ${JSON.stringify(delta, null, 2)}\n\n${html}`;
    }

    const imgs = Array.from(document.querySelectorAll('.ql-editor img'));
    imgs.forEach(img => {
        const imgUrl = img.src;
        const imgSplit = imgUrl.split('/').pop();
        const imgId = `porterfamily/${imgSplit.split('.').shift()}`;
        img.setAttribute('id', imgId);
    });

    blogInput.value = quill.root.innerHTML;
}

// Select the node that will be observed for mutations
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const config = { attributes: true, attributeOldValue: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    const idsToDestroy = mutationList.map(mutation => mutation.removedNodes[0].attributes[1].value);
    const imageIdsToDelete = idsToDestroy.join(",");
    const idsToDeleteInput = document.querySelector('#imageIdsToDelete');
    idsToDeleteInput.value = imageIdsToDelete;
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback)

// Start observing the target node for configured mutations
observer.observe(targetNode, config);