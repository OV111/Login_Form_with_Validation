let clearUserNameInput = () => {
    document.querySelector("#username").placeholder = "";
}
let clearEmailInput = () => {
    document.querySelector("#email").placeholder = "";
}
let clearPasswordInput = () => {
    document.querySelector("#password").placeholder = "";
}

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const signUp = document.querySelector("#sign_up");
const logIn = document.querySelector("#log_in");
const successMessage = document.querySelector("#success-message");

const eyeCloseIcon = document.querySelector("#passwd-close-eye");
const eyeIcon = document.querySelector("#passwd-eye");

eyeCloseIcon.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            eyeIcon.style.display = "flex";
            passwordInput.type = "text";
            eyeCloseIcon.style.display = "none";
        } else {
            eyeCloseIcon.style.display = "flex"
            passwordInput.type = "password";
            eyeIcon.style.display = "none";
        }
        eyeIcon.addEventListener("click", () => {
                eyeIcon.style.display = "none";
                passwordInput.type = "password";
                eyeCloseIcon.style.display = "flex";
        })
})  
    
const userInfo = new Map();       // Important Variable

const saveUserInfoToLocalStorage = (userInfoIntoMapObject) => {
    localStorage.setItem("userInfo",JSON.stringify([...userInfoIntoMapObject]));
};
const getUserInfoFromLocalStorage = () => {
    let UserInfoString = localStorage.getItem("userInfo");
    return UserInfoString ? new Map(JSON.parse(UserInfoString)) : new Map();
};

// Sign Up Logic
if(signUp) {
    signUp.addEventListener("click", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if(username === "" || username == null) {
            usernameInput.placeholder = "Username cannot be empty!";
            usernameInput.classList.add("error");
            usernameInput.value = "";
        }
        if(email === "" || email == null) {
            emailInput.placeholder = "Email is required!";
            emailInput.classList.add("error");
            emailInput.value = "";
        }
        if(password === "" || password == null) {
            passwordInput.placeholder = "Password is required!"
            passwordInput.classList.add("error");
            passwordInput.value = "";
        }
        if(userInfo.has(username)) {
            usernameInput.placeholder = usernameInput.value + " username is already taken!"
            usernameInput.style.color = "blue";
            usernameInput.value = "";
            console.log("the username already taken!");
        } else if(userInfo.has(email)) {
            emailInput.placeholder = "";
            console.log("the email already taken");
        } 
        userInfo.set(username, {Email: email, passwd: password});
        saveUserInfoToLocalStorage(userInfo);

        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
    });
}

// Log In Logic
if(logIn) {
    logIn.addEventListener("click", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
    
        if(username === "" || username == null) {
            usernameInput.placeholder = "Username can't be empty!";
            usernameInput.classList.add("message");
            usernameInput.value = "";
        } else if(email === "" || username == null) {
            emailInput.placeholder = "Email is required for login!"
            emailInput.classList.add("message");
            emailInput.value = "";
        } else if(password === "" || username == null) {
            passwordInput.placeholder = "Password input can't be empty!"
            passwordInput.classList.add("message");
            passwordInput.value = "";
        } else {
        
            const getUserInfo = getUserInfoFromLocalStorage();
            if(getUserInfo.has(username)) {
                let userEmail = getUserInfo.get(username).Email;
                let userPassword = getUserInfo.get(username).passwd;
            
                if(userEmail !== email) {
                    emailInput.placeholder = "Email is incorrect for " + usernameInput.value + " user!"
                    emailInput.classList.add("message");
                    emailInput.value = "";
                } else if (userPassword === password) {
                    console.log("Succesfully Login");
                    document.querySelector(".container").style.display = "none";
                    document.querySelector("#success-message").style.display = "flex";
                } else {
                    passwordInput.placeholder = "Incorrect Password!";
                    passwordInput.classList.add("message");
                    passwordInput.value = "";
                }
            } else {
                usernameInput.placeholder = "The Username is already taken!"
                usernameInput.classList.add("error");
                usernameInput.value = "";
            } 
        }  
    });
}