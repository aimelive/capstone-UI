let commentID = 0;

const commentBar = (name, comment) => {

    let currentTime = new Date();

    commentID++;

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

    commentForm.addEventListener('submit', () => {
        document.getElementById('comment-section').insertAdjacentHTML('beforeend', commentBar(commentForm.yourName.value, commentForm.yourComment.value));

        let thisComment = document.getElementById(commentID);
        thisComment.style.opacity = "0";
        thisComment.style.animation = "comment-change 0.3s";
        thisComment.style.animationDirection = "alternate-reverse";
        thisComment.style.animationFillMode = "forwards";
        setTimeout(() => {
            thisComment.style.opacity = "1";
            thisComment.style.animation = "none";
        }, 299);
    });
}