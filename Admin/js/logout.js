function logout() {
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