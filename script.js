const searchID = location.search.substring(1);
if (!searchID) {
    location.href = 'blog.html'
}



let commentID = 0,
    commentDisID = 0;

const commentBar = (commentId, name, comment, date) => {

    let currentTime = new Date(date);

    commentID = commentId;

    return `
<div class="comment-container" id="${commentID}">
    <div class="profileAvatar">
        <img src="avatar.png" class="avatar-image"/>
    </div>
    <div class="comment-data commentCard">
        <p class="posted-name">${name} <span style="color: #0077FF;">・</span> <span class="date">${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()} - ${currentTime.getHours()}:${currentTime.getMinutes()}</span></p>
        <p class="posted-text">${comment}</p>
    </div>
</div> `;
}

window.onload = () => {

    let charactersLeftIndicator = document.getElementById('characters-left');

    commentForm.yourComment.addEventListener('input', () => {
        setTimeout(() => {
            let charactersLeft = 500 - commentForm.yourComment.value.length;
            charactersLeftIndicator.innerText = charactersLeft;

            if (charactersLeft <= 5)
                charactersLeftIndicator.style.color = "#e60000";
            else if (charactersLeft <= 20)
                charactersLeftIndicator.style.color = "#ffa600";
            else
                charactersLeftIndicator.style.color = "#555555";
        }, 50);
    });

    commentForm.addEventListener('submit', async() => {
        document.getElementById('comment-section').insertAdjacentHTML('beforeend', commentDisBar(commentForm.yourName.value, commentForm.yourComment.value));

        let thisComment = document.getElementById(commentDisID);
        thisComment.style.opacity = "0";
        thisComment.style.animation = "comment-change 0.3s";
        thisComment.style.animationDirection = "alternate-reverse";
        thisComment.style.animationFillMode = "forwards";
        setTimeout(() => {
            thisComment.style.opacity = "1";
            thisComment.style.animation = "none";
        }, 299);


        //adding this comment in the database

        try {
            const resp = await fetch(server + 'blogs/' + searchID + '/comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postID: searchID,
                    name: commentForm.yourName.value,
                    email: commentForm.yourEmail.value,
                    comment: commentForm.yourComment.value
                })
            })

            const data = await resp.json()
                //console.log(resp)
            if (resp.status == 201) {
                swal('success', data.Message, 'success')

            }
            if (resp.status == 404) {
                swal('error', data.Message, 'error').then(() => {

                })
            }

        } catch (error) {

        }
        //ending catch


    });



}


const commentDisBar = (name, comment) => {

    let currentTime = new Date();

    commentDisID++;

    return `
    <div class="comment-container" id="${commentDisID}">
        <div class="profileAvatar">
            <img src="avatar.png" class="avatar-image"/>
        </div>
        <div class="comment-data commentCard">
            <p class="posted-name">${name} <span style="color: #0077FF;">・</span> <span class="date">${currentTime.getMonth() + 1}/${currentTime.getDate()}/${currentTime.getFullYear()} - ${currentTime.getHours()}:${currentTime.getMinutes()}</span></p>
            <p class="posted-text">${comment}</p>
        </div>
    </div> `;
}