const firebaseConfig = {
    apiKey: "AIzaSyDPJNXs39XXwg8rZzatFSEVzHnwbdAo6-4",
    authDomain: "aimelive-capstone.firebaseapp.com",
    projectId: "aimelive-capstone",
    storageBucket: "aimelive-capstone.appspot.com",
    messagingSenderId: "319177014265",
    appId: "1:319177014265:web:bd5d6f830678f33f6c9b28"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore()


database.collection("blogs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        const dataBlog = doc.data();
        //console.log(dataBlog);
        const blogID = doc.id;
        const article = dataBlog.article;
        const photo = dataBlog.photo;
        const date = dataBlog.date;
        const category = dataBlog.category;
        getBlogs(article, photo, category, date, blogID)

    });
});

function getBlogs(article, photo, category, date, blogID) {
    const leftCol = document.getElementById("leftCol");
    const card = document.createElement("div");
    card.classList.add("card");
    const container = `
        <div class="cardimg toread">
            <img src="${photo}" />
            <h3>${category}</h3>
            <p>${article}&nbsp; <a href="read.html?${blogID}">read more</a></p> 
            <h5>Posted on, <span>${date.toDate().toDateString()}</span></h5>
        </div>`
    console.log(date);
    card.innerHTML = container;
    leftCol.appendChild(card);
}