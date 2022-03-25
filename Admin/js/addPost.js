const form = document.querySelector('.add-post-to-database');


form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const title = form.title.value
    const category = form.category.value
    const preview = form.preview.value
    const body = form.blog.value
    const imgURL = form.image.files[0]

    try {

        const formData = new FormData();

        formData.append("title", title)
        formData.append("category", category)
        formData.append("preview", preview)
        formData.append("body", body)
        formData.append("imgURL", imgURL)

        //console.log("AKIRA ISHIMWE " + formData + "AND THE TITLE " + title)

        const resp = await fetch('https://my-brand-aimelive.herokuapp.com/api/v1/addBlog', {
            method: 'POST',
            headers: {
                'Authorization': token
            },
            body: formData
        })

        const data = await resp.json()
            //console.log(resp)
        if (resp.status == 201) {
            swal('Success', data.Message, 'success').then(() => {
                location.reload()
            })

        }

        if (resp.status == 500) {
            swal(`Status: ` + data.Status, data.Message, 'error')

        }

        if (resp.status == 400) {
            swal(data.Blog, data.Title, 'error')
        }


    } catch (error) {
        console.log("AN ERROR OCCURED PLEASE" + error)
    }

})


//finishing to add new post to a database


$(document).ready(function() {
    $('#summernote').summernote();
});

function previewFile() {
    var pre = document.getElementById("imagePreview").style
    var preview = document.querySelector('#outputImage');
    var file = document.querySelector('#inputFile').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
    }


    if (file) {
        reader.readAsDataURL(file);
        pre.display = "block"
    } else {
        swal("Oops", "Can't preview!!", "error")
    }
}