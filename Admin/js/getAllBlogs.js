let statusCode;
let token = localStorage.getItem('token')

fetch("https://my-brand-aimelive.herokuapp.com/api/v1/blogs")
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        let length = data.Number_of_blogs
        document.querySelector(".totalBlogs").innerHTML = length
        for (let index = 0; index < length; index++) {

            const blog = data.Content[index]

            const blogID = blog._id;
            const title = blog.title;
            const photo = blog.imgURL;
            const date = new Date().toDateString(blog.dateCreated);
            const category = blog.category;
            const preview = blog.preview;
            const comments = blog.comments.length;
            const body = blog.body;
            const status = blog.Status;

            getBlogs(index, blogID, title, photo, date, category, preview, body, comments, status)

        }

    })

function getBlogs(i, postId, blogTitle, blogPhoto, uploadDate, blogCategory, blogPreview, blogBody, noComment, status) {
    const date = new Date().toDateString(uploadDate)
    const getcom = document.getElementById("articles");
    const commentRow = document.createElement("tr");
    const st = "Public";
    if (status = 0) st = "Private";
    const container = `
        <td>${i+1} </td>
        <td><img src="${blogPhoto}" width="50px"/> </td>
        <td>${blogTitle} </td>
        <td>${blogCategory}</td>
        <td>${noComment} </td>
        <td>${date}</td>
        <td>${st} </td>
        <td id="actions"><a href="editPost.html?${postId}" style="color:grey;cursor:pointer"><i class="fa fa-pencil"></i></a>
        <a style="color:red;cursor:pointer" onclick="deleteBlog('${postId}')"> <i class="fa fa-trash-o"></i></a>
        <a style="color:#3299F9;cursor:pointer" onclick="commento('${postId}','${noComment}','${blogTitle}')"> <i class="fa fa-comments-o"></i></a>
        </td>`
    commentRow.innerHTML = container;
    getcom.appendChild(commentRow);
}

function commento(post, comments, blog) {
    if (comments > 0) {
        location.href = `comments.html?${post}`
    } else {
        swal('No Message Yet', `${blog}`, 'error')
    }
}

function deleteBlog(blogId) {
    swal('Delete Blog', "Are you sure do you want to delete?", 'warning', {
        buttons: {
            cancel: "Cancel",
            Delete: true
        }
    }).then((u) => {
        if (u) {
            fetch("https://my-brand-aimelive.herokuapp.com/api/v1/blogs/" + blogId, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                })
                .then((response) => {
                    statusCode = response.status
                    return response.json();
                })
                .then((data) => {
                    if (statusCode == 202) {
                        swal('success', data.Message, 'success').then(() => {
                            location.reload()
                        })

                    }
                    //const data = await resp.json()

                    if (statusCode == 404) {
                        swal('error', data.Message, 'error')
                    }
                    if (statusCode == 400) {
                        swal('error', data.Message, 'error')
                    }
                })

        }
    })
}