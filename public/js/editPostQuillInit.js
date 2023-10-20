var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const editPostQuill = new Quill('#edit-post-editor', {
    modules: {
        toolbar: toolbarOptions
    },
    placeholder: 'Write your story...',
    theme: 'snow'
});

const editorContents = editPostQuill.on('text-change', function () {
    var blogInput = document.querySelector('input[id=content]');
    var postContent = editPostQuill.root.innerHTML;
    blogInput.value = postContent;
    console.log(blogInput.value)
});
