


function getOccurrences(approveds, success) {
    var url = approveds ? 'list-approveds' : 'list-unapproveds';

    return axiosInstance.get(/occurrence/ + url).then(function (response) {
        var data = response.data;
        if (data.success) {
            success(data.occurrences);
        } else {
            error(data.error);
        }
    }).catch(function (re) {
        console.log(re);
        // loginPage()
    });
}


function registerOccurrence(type, officer, place, victims, date, success, error) {
    var body = {
        type: type,
        officerName: officer,
        place: place,
        victims: victims,
        date: date
    };

    console.log(body);

    return axiosInstance.post('/occurrence/register', body).then(function (response) {
        var data = response.data;

        if (data.success) {
            success(data.occurrences);
        } else {
            error(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}



function approveOccurrence(id) {
    return axiosInstance.post('/occurrence/approve/' + id, null).then(function (response) {
        var data = response.data;

        if (data.success) {
            alert("Aprovado!");
            window.location.reload()
        } else {
            alert(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}


function unapproveOccurrence(id) {
    return axiosInstance.post('/occurrence/unapprove/' + id, null).then(function (response) {
        var data = response.data;

        if (data.success) {
            alert("Desaprovado!");
            window.location.reload()
        } else {
            alert(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}


function removeOccurrence(id) {
    return axiosInstance.post('/occurrence/remove/' + id, null).then(function (response) {
        var data = response.data;

        if (data.success) {
            alert("Removido!");
            window.location.reload()
        } else {
            alert(data.error);
        }
    }).catch(function (re) {
        loginPage()
    });
}
