let status;
let token = localStorage.getItem('token')

window.onload = async(e) => {
    try {
        const resp = await fetch('https://my-brand-aimelive.herokuapp.com/api/v1/messages', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })

        const data = await resp.json()
            //console.log(resp)
        if (resp.status == 200) {
            document.querySelector(".totalMessages").innerHTML = data.Data.messages.length;

            for (let i = 0; i < data.Data.messages.length; i++) {
                const dataMessage = data.Data.messages[i];
                //console.log(dataMessage.email)
                const msgID = dataMessage._id;
                const name = dataMessage.name;
                const email = dataMessage.email;
                const message = dataMessage.message;
                const date = dataMessage.creationDate;
                getMessage(name, email, message, msgID, date)

            }
            //console.log(data.Data.messages[10].email)
        }
        if (resp.status == 500 || resp.status == 400 || resp.status == 401 || resp.status == 404) {
            console.log(data.Message)
            swal({
                title: `Status: ${data.Status} `,
                text: data.Message,
                icon: 'error'
            }).then((u) => {
                if (u) {
                    history.back()
                }
            })
        }


        function getMessage(name, email, message, msgID, date) {
            const getM = document.getElementById("getM");
            const faqs = document.createElement("div");
            faqs.classList.add("faqs");
            const container = `<img src="images/avatar.png" height="50px" width="50px" style="float: left;position: relative;top:10px">
    <p style="color: #3299F9;"><b><u>${name}</u></b> (${email})</p>
    <p>${message}</p>
    <button id="ans"><i class="fa fa-reply"></i> Answer</button>
    <button id="ign" class="${msgID}" onclick="showModal('${msgID}','${message}','${name}','${email}')"><i class="fa fa-trash"></i> Ignore</button>`
            faqs.innerHTML = container;
            getM.appendChild(faqs);
        }

    } catch (error) {
        console.log("AN ERROR OCCURED HERE!!" + error)
    }

}