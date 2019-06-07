function homePage() {
    window.location.href = "home.html"
}

function loginPage() {
    window.location.href = "login.html"
}

function signupPage() {
    window.location.href = "signup.html"
}

function listOccurrencesPage() {
    user = getUser();

    if (user.type === "admin") {
        window.location.href = "list-occurrences-admin.html"
    } else {
        window.location.href = "list-occurrences.html"
    }
}

function registerOccurrencePage() {
    window.location.href = "register-occurrence.html"
}
