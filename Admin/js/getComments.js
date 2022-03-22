let statusCode, status;
let token = localStorage.getItem('token')
const blogId = location.search.substring(1)

fetch("https://my-brand-aimelive.herokuapp.com/api/v1/blogs/" + blogId + "/comments")
    .then((response) => {
        status = response.status
        return response.json();
    })
    .then((data) => {
        if (status == 500) {
            swal('Error Occured!', data.Message, 'error').then(() => {
                location.href = 'news_article.html'
            })
        }
        if (status == 404) {
            swal('Error Occured!', data.Message, 'error').then(() => {
                location.href = 'news_article.html'
            })
        }
        const blog = data.Blog
        const results = data.Results
        if (data.Comments.comments.length != 0) {
            document.querySelector(".blogInfoCom").innerHTML = blog
            document.querySelector(".comLength").innerHTML = results
        } else {
            swal({
                title: 'No Comment Yet',
                text: 'Be The First To Comment',
                icon: 'warning',
                buttons: {
                    cancel: "Ok",
                    Comment: true
                }
            }).then((u) => {
                if (u) {
                    location.href = `../../read.html?${blogId}#commentSection`
                } else {
                    location.href = "news_article.html"
                }
            })

        }

        for (let index = 0; index < data.Comments.comments.length; index++) {

            const dataComment = data.Comments.comments[index]

            //console.log(dataComment);
            const commentID = dataComment._id;
            const postID = dataComment.postID;
            const name = dataComment.name;
            const email = dataComment.email;
            const comment = dataComment.comment;
            const date = new Date().toDateString(dataComment.dateCreated);
            getComment(index, name, email, comment, commentID, postID, date)

        }

    })

function getComment(i, name, email, comment, commentID, postID, date) {
    const getcom = document.getElementById("articles");
    const commentRow = document.createElement("tr");
    const container = `<td> ${i+1} </td>
                <td>${name}</td>
                <td>${email} </td>
                <td>${comment} </td>
                <td>${date}</td>
                <td><a href="?${commentID}"><i class="fa fa-reply"></i></a> &nbsp;<a onclick="deleteComment('${postID}','${commentID}')"> <i class="fa fa-trash-o"></i></a></td>`
    commentRow.innerHTML = container;
    getcom.appendChild(commentRow);
}

function deleteComment(blogId, commentId) {
    swal('Delete Comment', "Are you sure do you want to delete?", 'warning', {
        buttons: {
            cancel: "Cancel",
            Delete: true
        }
    }).then((u) => {
        if (u) {
            try {
                fetch("https://my-brand-aimelive.herokuapp.com/api/v1/blogs/" + blogId + "/" + commentId, {
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
                        if (statusCode == 404) {
                            swal('error', data.Message, 'error')
                        }
                    })
            } catch (error) {
                swal('error', 'WE CAN NOT RETRIEVE COMMENTS!!', 'error')
            }


        }
    })
}