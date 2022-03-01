const AddBlogForm = document.querySelector("#form");
AddBlogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var title = AddBlogForm.title.value;
    var img = AddBlogForm.img.files[0];
    var description = AddBlogForm.description.value;

    if (AddBlogForm.title.value == "" || AddBlogForm.title.value == null) {
        document.getElementById('title-error').innerHTML = "Title is required";
        AddBlogForm.title.classList.add('is-invalid');
        AddBlogForm.title.focus();

        return false;
    } else {
        AddBlogForm.title.classList.remove('is-invalid');
        document.getElementById('title-error').innerHTML = "";

        AddBlogForm.title.classList.add('is-valid');

    }

    if ((AddBlogForm.img.value == "" || AddBlogForm.img.value == null)) {

        document.getElementById('img-error').innerHTML = "Image is required";
        AddBlogForm.img.classList.add('is-invalid');
        AddBlogForm.img.focus();

        return false;
    } else {
        AddBlogForm.img.classList.remove('is-invalid');
        document.getElementById('img-error').innerHTML = "";

        AddBlogForm.title.classList.add('is-valid');

    }
    if ((AddBlogForm.description.valuee == "" || AddBlogForm.description.value.length <= 5)) {

        document.getElementById('description-error').innerHTML = "Your description is less";
        AddBlogForm.description.classList.add('is-invalid');
        AddBlogForm.description.focus();

        return false;
    } else {
        AddBlogForm.description.classList.remove('is-invalid');
        document.getElementById('description-error').innerHTML = "";

        AddBlogForm.description.classList.add('is-valid');

    }
    const ImageName = img.name;
    var storageRef = app.storage().ref('blog_images/' + ImageName);
    var uploadTask = storageRef.put(img);
    uploadTask.on('state_changed', function(snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        swal('Please Waite Image is Beng Uploaded', {
            content: progress,
            timer: 9000,
        })
        console.log("upload is " + progress + " done");
    }, function(error) {

        swal('error', 'Error in Uploding picture', 'error');
    }, function() {

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

            const db = app.firestore();
            db.collection("blogs").add({
                    title: title,
                    imageURL: downloadURL,

                    description: description,
                    date: new Date(),

                })
                .then((docRef) => {
                    swal('Thank You', 'Your Message was Recieved', 'success').then(() => {
                        AddBlogForm.title.value = "";
                        AddBlogForm.img.value = "";
                        AddBlogForm.description.value = "";
                        AddBlogForm.title.classList.remove('is-valid');
                        AddBlogForm.img.classList.remove('is-valid');
                        AddBlogForm.description.classList.remove('is-valid');
                    });

                })
                .catch((error) => {
                    swal('error ', docRef.name + 'error', 'error');

                });

        });


    });
});