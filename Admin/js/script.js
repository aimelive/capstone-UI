if (!localStorage.getItem('token')) {
    location.href = '../login.html'
}
token = localStorage.getItem('token')
async function getuserInfo() {
    response = await fetch("https://my-brand-aimelive.herokuapp.com/api/v1/users/info/user", {
        headers: {
            "Authorization": token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const user = await response.json()

    if (user.Data.role != 'admin') {
        location.href = '../blog.html'
    }
}
getuserInfo()