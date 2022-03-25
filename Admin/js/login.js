const form = document.querySelector('.login_form');
let emails = document.getElementById("errorEmail");
let passwords = document.getElementById("errorPassword");

function myFunction() {
    var x = document.getElementById("toggle-password");

    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }


}

form.addEventListener('submit', async(e) => {
    e.preventDefault()

    try {
        const resp = await fetch(server + 'users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.email.value,
                password: form.password.value
            })
        })

        const data = await resp.json()
            //console.log(resp)
        if (resp.status == 200) {
            swal('success', data.Message, 'success').then(() => {
                localStorage.setItem('token', 'Bearer ' + data.Token)

                if (data.Role == 'admin') {
                    location.href = './Admin/dashboard.html'
                }
                if (data.Role == 'user') {
                    location.href = './blog.html'

                }
            })

        }
        //const data = await resp.json()

        if (resp.status == 404) {
            swal('Error', data.Error, 'error')
            form.reset()

        }
        if (resp.status == 403) {
            swal('Error', data.Error, 'error')
        }

        if (resp.status == 500) {
            swal('Error', data.Message, 'error')
        }


    } catch (error) {

    }

})