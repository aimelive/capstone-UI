let messageId;
var modal = document.querySelector(".showModal")
var divEmail = document.querySelector(".divEmail")
var divName = document.querySelector(".divName")
var divMessage = document.querySelector(".divMessage")
var deletebtn = document.querySelector(".deletebtn")

function showModal(msgId, message, name, email) {
    messageId = msgId
    divEmail.innerHTML = email
    divName.innerHTML = name
    divMessage.innerHTML = message
    modal.style.display = "block"


}

deletebtn.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log(messageId)
    try {
        const resp = await fetch('https://my-brand-aimelive.herokuapp.com/api/v1/messages/' + messageId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        const data = await resp.json()
            //console.log(resp)
        if (resp.status == 202) {
            swal('success', data.Message, 'success').then(() => {
                location.reload()

            })

        }
        //const data = await resp.json()

        if (resp.status == 404) {
            swal('error', data.Message, 'error')
        }
        if (resp.status == 400) {
            swal('error', data.Message, 'error')
        }



    } catch (error) {
        console.log("AN ERROR OCCURED HERE IN THIS CATCH " + error)
    }

})

function closeModal() {
    modal.style.display = "none"
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}