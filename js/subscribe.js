let humberg = document.getElementById("humberg")
let navBar = document.getElementById("mobileNav")
let mybodyhover = document.getElementById("mybodyhover")
const subscribeform = document.querySelector(".subscriptionForm")
let info_item = document.querySelector(".info-item")
let info_item2 = document.querySelector(".info-item2")
let subscribeButton = document.querySelector(".subscribeButton")
let h1 = document.querySelector(".h1")

function showNav() {
    navBar.style.width = "45%";
    mybodyhover.style.display = "block"
}

function closeNav() {
    navBar.style.width = 0
    mybodyhover.style.display = "none"
}


async function getuserInfo() {
    response = await fetch(server + "users/info/user", {
        headers: {
            "Authorization": token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const user = await response.json()

    //existSubsriber(user.Data.email, user.Data.name)

    if (response.status == 200) {
        subscribeform.lastname.value = user.Data.name
        subscribeform.lastname.disabled = true
        subscribeform.email.value = user.Data.email
        subscribeform.email.disabled = true
    } else {
        subscribeform.lastname.disabled = false
        subscribeform.email.disabled = false
    }
}

subscribeform.addEventListener('submit', async(e) => {
    e.preventDefault()
    try {

        const resp = await fetch(server + 'subscriptions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: subscribeform.lastname.value,
                email: subscribeform.email.value,
            })
        })
        const data = await resp.json()

        if (resp.status == 201) {
            swal('success', data.Congratulation, 'success').then(() => {
                info_item.style.display = "none"
                info_item2.style.display = "none"
                subscribeButton.style.display = "none"
                h1.innerHTML = `<b>${data.Data.Subscriber.name} </b> <br> Thanks for subscribing!! <br><br>`
                h1.style.display = "block"
                subscribeform.reset()



            })
        }
        if (resp.status == 409) {
            swal('error', data.Message, 'error').then(() => {
                subscribeform.email.focus()
            })
        }

        if (resp.status == 400) {
            swal('error', data.Message, 'error').then(() => {})
        }


    } catch (error) {
        console.log("AN ERROR OCCURED PLEASE " + error)
    }

});