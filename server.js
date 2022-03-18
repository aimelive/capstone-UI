const server = 'https://my-brand-aimelive.herokuapp.com/api/v1/'



//logout functions here
let logoutBtn = document.getElementById("admin_login")

logoutBtn.style.cursor = "pointer"

if (localStorage.getItem('token')) {
    logoutBtn.innerHTML = "Logout"
}

function login_out() {
    if (!localStorage.getItem('token')) {
        location.href = "login.html"
    } else {
        swal({
            title: 'Log out',
            text: 'Are you sure you want to log out?',
            icon: 'warning',
            buttons: {
                cancel: "Not sure",
                Sure: true
            }
        }).then((deleteToken) => {
            if (deleteToken) {
                localStorage.removeItem('token')
                location.reload()
            }


        })
    }
}