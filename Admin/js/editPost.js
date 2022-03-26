let token = localStorage.getItem('token')
const form = document.querySelector('.edit-post-to-database');


form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const title = form.title.value
    const category = form.category.value
    const preview = form.preview.value
    const body = CKEDITOR.instances.blog.getData()
    const image = form.image.files[0]

    //console.log(body)

    try {

        if (form.image.value == "" || form.image.value == null) {
            const resp = await fetch('https://my-brand-aimelive.herokuapp.com/api/v1/blogs/' + searchID, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    title: title,
                    category: category,
                    preview: preview,
                    body: body
                })
            })

            const data = await resp.json()
                //console.log(resp)
            if (resp.status == 201) {
                swal('Success', data.Message, 'success').then(() => {
                    location.reload()
                })

            }

            if (resp.status == 404) {
                swal(data.Message, data.Oops, 'error')
            }

            if (resp.status == 500) {
                swal('Oops!', data.Message, 'error')
            }
        } else {

            const formData = new FormData();

            formData.append("title", title)
            formData.append("category", category)
            formData.append("preview", preview)
            formData.append("body", body)
            formData.append("imgURL", image)

            const resp = await fetch('https://my-brand-aimelive.herokuapp.com/api/v1/updateBlog/' + searchID, {
                method: 'PATCH',
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

            if (resp.status == 404) {
                swal('Oops!', data.Oops, 'error')
            }
        }



    } catch (error) {
        console.log("AN ERROR OCCURED PLEASE" + error)
    }

})


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