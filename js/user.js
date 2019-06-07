// axiosInstance came from app.js


function setUser(user) {
    localStorage.setItem("USER", JSON.stringify(user));
}

function performLogin(registry, password, success, error) {
    axiosInstance.get('/user/login', {
        params: {
            registry: registry,
            password: password
        }
    }).then(function (response) {
        var data = response.data;
        if (data.success) {
            data.user.token = data.token; // set token to user
            success(data.user);
        } else {
            error(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}


function performSignup(registry, password, age, patent, name, success, error) {
    var body = {
        registry: registry,
        password: password,
        age:      age,
        patent:   patent,
        name:     name,
    }

    if (getUser()) {
        axiosInstance.post('/user/signup', body, {
            headers: {
                "Auth": getUser().token
            }
        }).then(function (e) {
            console.log(e);
            setUser(false);
            loginPage();
        });
    }
}

function logout() {
    if (getUser()) {
        axiosInstance.post('/user/logout', null, {
            headers: {
                "Auth": getUser().token
            }
        }).then(function (e) {
            console.log(e);
            setUser(false);
            loginPage();
        });
    }
}
