
function getUser() {
    return JSON.parse(localStorage.getItem("USER"));
}


function require(url) {
    var scriptElement = document.createElement("script");
    scriptElement.src = url;
    document.head.appendChild(scriptElement);
}

// importa arquivo dinamicamente
require("./js/occurrence.js");
require("./js/user.js");
require("./js/page.js");
require("./js/table.js");


// axios - usado para fazer requisicoes
var axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    crossDomain: true,
    headers: {
        "Auth": getUser() ? getUser().token : "",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Auth",
    },
});


function parseDate(date) {
    try {
        var dat = date.split("T")[0];
        var dates = dat.split("-");
        var year = dates[0];
        var month = dates[1];
        var day = dates[2];
        return day + "/" + month + "/" + year;
    } catch (e) {
        return null;
    }
}

// HOME FUNCTIONS

function startIndex() {
    var user = getUser();

    if (user) {
        homePage()
    } else {
        loginPage()
    }
}

function startHome() {
    var user = getUser();

    document.getElementById("username").innerText = user ? user.name : "fake";

    if (user) {
        document.getElementById("body").classList.add(user.type);
    }

}


function listOccurrences(approveds, tableId = "table", bodyId = "table-body") {


    var headers = ["Policial", "Tipo", "Vitimas?", "Local", "Data"];

    if (getUser() && getUser().type === "admin") {
        headers.push("Ações");
    }

    mountTableHeader(headers, tableId, bodyId);

    getOccurrences(approveds, function (occurrences) {
        // GERA HTML PARA TABLE

        var html = "";
        for (var i = 0; i < occurrences.length; i++) {
            var occurrence = occurrences[i];
            var line = "";

            var temVitimas = occurrence.victims ? "Sim" : "Não";

            line += td(occurrence.officerName);
            line += td(occurrence.type);
            line += td(temVitimas);
            line += td(occurrence.local);
            line += td(parseDate(occurrence.date));


            if (getUser() && getUser().type === "admin") {
                var buttons = '<button class="delete" onclick="removeOccurrence(\'' + occurrence._id + '\')">Apagar</button>';

                if (approveds) {
                    buttons += '<button onclick="unapproveOccurrence(\'' + occurrence._id + '\')">Desaprovar</button>';
                } else {
                    buttons += '<button onclick="approveOccurrence(\'' + occurrence._id + '\')">Aprovar</button>';
                }

                line += td(buttons);
            }

            html += tr(line);
        }

        var tableBody = document.getElementById(bodyId);

        // INSERE HTML NA TABLE
        tableBody.innerHTML = html;
    });
}
