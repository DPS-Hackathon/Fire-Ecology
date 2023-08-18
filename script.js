const firebaseConfig = {
    apiKey: "AIzaSyAAuSmDXm3UbNcPTSNm5gUC1J5bmHoP0DU",
    authDomain: "fire-ecology-f1ae7.firebaseapp.com",
    databaseURL: "https://fire-ecology-f1ae7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fire-ecology-f1ae7",
    storageBucket: "fire-ecology-f1ae7.appspot.com",
    messagingSenderId: "483478000209",
    appId: "1:483478000209:web:e00d5eabe799d722e05e70",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const user = auth.currentUser;

const database = firebase.database();

//Function to generate alerts 
function generate_alert_error(title, description) {
    let document_area = document.getElementById("content-area");
    document_area.insertAdjacentHTML("afterbegin", `<div class=\"alert alert-primary alert-dismissible mt-3  fade show\"  role=\"alert\"><strong class="text-dark">${title} :  </strong> ${description}<button type=\"button\" class=\"btn-close\" id=\"errorAlert\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>`);
}

function signUp() {

    let username_value = document.getElementById("signUpUsername");
    let email = document.getElementById("signUpEmail");
    let password = document.getElementById("signUpPassword");

    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(function (working) {
            database.ref("users/" + auth.currentUser.uid).set(
                {
                    username: username_value.value
                }
            );
            generate_alert_error("Account created successfully", "Your account has been successfully created");
        })

        .catch(function (error) {

            let errorCode = error.code;
            if (errorCode == "auth/weak-password") { generate_alert_error("Weak Password", "The password is too weak and the minimum size of password is 6 charecters"); }
            else if (errorCode == "auth/email-already-in-use") { generate_alert_error("Email alreasy used", "The email is already in use"); email.value = ""; password.value = ""; username_value.value = "" }
            else if (errorCode == "auth/invalid-email") { generate_alert_error("Invalid Email", "The email id is invalid"); email.value = ""; password.value = ""; username_value.value = "" }
            else if (errorCode == "auth/operation-not-allowed") { generate_alert_error("Email not", "The email is not allowed"); email.value = ""; password.value = ""; username_value.value = "" }
            else { generate_alert_error("Please try again", ""); email.value = ""; password.value = ""; username_value.value = "" }
        });
    auth.onAuthStateChanged(user => {
        if (user) {
            window.location = 'index.html';
        }
    });
}

function signIn() {
    let email = document.getElementById("signInEmail");
    let password = document.getElementById("signInPassword");
    auth.signInWithEmailAndPassword(email.value, password.value).catch(function (error) {

        let errorCode = error.code;

        if (errorCode == "auth/wrong-password") { generate_alert_error("Wrong Password", "The password used for the email is incorrect"); email.value = ""; password.value = ""; }
        else if (errorCode == "auth/invalid-email") { generate_alert_error("Invalid Email", "The email is invalid"); email.value = ""; password.value = ""; }
        else {
            generate_alert_error("An error occured, please try again", "");
        }
        email.value = "";
        password.value = "";
    }
    );
    auth.onAuthStateChanged(user => {
        if (user) {
            window.location = 'index.html';
        }
    });
};




function getDATA() {

    const loadingIcon = document.getElementById('loading')

    database.ref("blogs").once("value")
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const post = childSnapshot.val();

                postContent = post.content;
                let document_area = document.getElementById("blogList")
                let document_area_blog = document.getElementById("blogReads")
                document_area.insertAdjacentHTML("afterbegin", `<div class=\"col-8 col-sm-5 col-lg-4 col-xl-3 mx-1 blog-card rounded-2 shadow-lg my-4  \"><div class=\"text-center mb-4 mt-3 blog-img\"><img src=${post.image} class=\"img-fluid\" alt=\"\"></div><div class=\"text-center my-4 \"><h2 class=\"fs-4\">${post.title}</h2></div><div class=\"text-center mt-3 mb-5\"><h3 class=\"fs-6\">By: ${post.by}</h3></div><div class=\"text-center mt-4 mb-4\"><button class=\"btn buttonPost\" id=\"${post.id+"_button"}\" onclick=showBlog(\"${post.id+"_button"}\")>Read </button></div></div>`);
                document_area_blog.insertAdjacentHTML("afterbegin",`<div class=\"container rounded-4 d-flex blogRead d-none\" id=\"${post.id+"_read"}\"> <div class=\"row \"> <div class=\"col-12  py-4\"> <button class=\"closeBtn\" onclick=\"closeBlog(\"${post.id+"_button"}\")> <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"1.8em\" fill=\"currentColor\" class=\"bi bi-x-circle\" viewBox=\"0 0 16 16\"> <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\" /> <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\" /> </svg> </button> <br> <br> <span class=\"fs-2 \" id=\"readTitle\">${post.title}</span> <br> <span class=\"fs-6 \" id=\"readAuthor\">${post.by}</span> <br> <br> <br> <span class=\"fs-6 text-justify\" id=\"readContent\">${post.content}</span> </div> </div>`)
            });
            loadingIcon.classList.add('d-none')
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

let num = 0

function blog_save() {

    title_field = document.getElementById("title");
    author_field = document.getElementById("author");
    content_field = document.getElementById("blogContent");
    posting = document.getElementById('blogPost')
    post_button = document.getElementById('postButton');

    posting.classList.remove("d-none");
    title_field.classList.add('Disabled');
    author_field.classList.add('Disabled');
    content_field.classList.add('Disabled');
    post_button.classList.add('Disabled');


    database.ref("blog_stuff").once("value")


        .then((snapshot) => {

            snapshot.forEach((childSnapshot) => {

                const post = childSnapshot.val();

                let id = post.blog_count

                // Image save
                let file = document.getElementById("thumbnail").files[0]

                const storageRef = firebase.storage().ref(`${id + 1}`);
                const imageRef = storageRef.child("pic");

                imageRef.put(file).then(() => {
                    // Image uploaded successfully, get download URL
                    return imageRef.getDownloadURL();
                }).then((url) => {
                    console.log("Image URL:", url);
                    database.ref(`blogs/${id + 1}/`).set(
                        {
                            by: author_field.value,
                            content: content_field.value,
                            id: (id + 1),
                            image: url,
                            title: title.value,
                        }
                    );
                    database.ref("blog_stuff/val/").set(
                        {
                            blog_count: (id + 1)
                        });
                }).catch((error) => {
                    console.error("Error uploading image:", error);
                });

                // database.ref(`blogs/${id+1}/`).set(
                //     {
                //         by:author_field.value,
                //         content:content_field.value,
                //         id:(id+1),
                //         image:,
                //         title:title.value,
                //     }
                // );
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    setTimeout(() => {
        window.location = "blog.html"
    }, 45000);

}

// If user is signed in return him to homepage 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (["signin.html#", "signin.html#?", "signin.html", "signin.html?"].includes(location.href.split("/").slice(-1)[0]) || ["signup.html#", "signup.html#?", "signup.html", "signup.html?"].includes(location.href.split("/").slice(-1)[0])) {
            window.location = "index.html";
        }
    }
    else {
        if (["blogwrite.html"].includes(location.href.split("/").slice(-1)[0])) {



            window.location = "signin.html";



        }
    }
});


function userIcon() {
    const profileIcon = document.getElementById('profileIcon');
    const logoutIcon = document.getElementById('LogutIcon');


    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            logoutIcon.classList.remove('d-none');
            profileIcon.classList.add('d-none');
        }
        else {
            logoutIcon.classList.add('d-none');
            profileIcon.classList.remove('d-none');
        };

    });

}

function logout() {
    auth.signOut();
    generate_alert_error("Signed out successfully", "You have successfully signed out");
}

function showBlog(id){
    let button_id = id;
    let blog_read = document.getElementById((button_id.replace(button_id.slice(-7),"")+"_read"))
    blog_read.classList.remove("d-none")
}

function closeBlog(id){
    let button_id = id;
    let blog_read = document.getElementById((button_id.replace(button_id.slice(-7),"")+"_read"))
    blog_read.classList.add("d-none")
}
