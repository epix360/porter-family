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

const bioEditQuill = new Quill('#edit-profile-container', {
    modules: {
        toolbar: toolbarOptions
    },
    placeholder: 'Write your story...',
    theme: 'snow'
});

const bioEditSubmit = document.querySelector('#bioEditForm');

bioEditSubmit.onsubmit = function () {
    // Populate hidden form on submit
    //Family member profile page
    var bioInput = document.querySelector('input[name=bio]');
    var bioText = bioEditQuill.root.innerHTML;
    bioInput.value = bioText;

    console.log("Submitted", $(formSubmit).serialize(), $(formSubmit).serializeArray());

    // No back end to actually submit to!
    console.log('Open the console to see the submit data!')
    return false;
};