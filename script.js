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
function generate_alert_error(title,description) {
    let document_area = document.getElementById("content-area");
    document_area.insertAdjacentHTML("afterbegin",`<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\"><strong>${title}</strong> ${description}<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>`);
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
            alert("Account created successfully");
        })

        .catch(function (error) {

            let errorCode = error.code;
            if (errorCode == "auth/weak-password") { generate_alert_error("Weak Password", "The password is too weak and the minimum size of password is 6 charecters");}
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

function signIn(){
    let email = document.getElementById("signInEmail");
    let password = document.getElementById("signInPassword");
    auth.signInWithEmailAndPassword(email.value, password.value).catch(function (error) {

        let errorCode = error.code;

        if (errorCode == "auth/wrong-password") { generate_alert_error("Wrong Password","The password used for the email is incorrect"); email.value = ""; password.value = ""; }
        else if (errorCode == "auth/invalid-email") { generate_alert_error("Invalid Email","The email is invalid"); email.value = ""; password.value = ""; }
        else{
        generate_alert_error("An error occured, please try again","");
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
                postAUthor = post.by;
                postTitle = post.title;
                postContent = post.content;
                let document_area = document.getElementById("blogList")
                document_area.insertAdjacentHTML("afterbegin",`<div class=\"col-8 col-sm-5 col-lg-4 col-xl-3 mx-1 blog-card rounded-2 shadow-lg my-4  \"><div class=\"text-center mb-4 mt-3 blog-img\"><img src=\"https://placehold.co/400x300\" class=\"img-fluid\" alt=\"\"></div><div class=\"text-center my-4 \"><h2 class=\"fs-4\">${post.title}</h2></div><div class=\"text-center mt-3 mb-5\"><h3 class=\"fs-6\">By: ${post.postAUthor}</h3></div><div class=\"text-center mt-4 mb-4\"><a href=\"\" class=\"btn buttonPost\">Read </a></div></div>`);
                
            });
            loadingIcon.classList.add('d-none')
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
}

let num = 0

// function blog_save(){

//     title_field = document.getElementById("title");
//     author_field = document.getElementById("author");
//     content_field = document.getElementById("blogContent");

//     var userRef = database.ref('/blogs/');

//     userRef.get().then(function then(snapshot) {
//     num = snapshot.val();
//     console.log(num);
//     return num          
//     }
//     let num = then()
//     );
// }

// If user is signed in return him to homepage 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (["signin.html#","signin.html#?","signin.html","signin.html?"].includes(location.href.split("/").slice(-1)[0]) || ["signup.html#","signup.html#?","signup.html","signup.html?"].includes(location.href.split("/").slice(-1)[0])) 
        { 
            window.location = "index.html"; 
        }
    }
    else{
        if (["blogwrite.html"].includes(location.href.split("/").slice(-1)[0])) 
        { 
            window.location = "signin.html"; 
        }
    }
});

