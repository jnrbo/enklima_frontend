
function mountTableHeader(headers, id, bodyId) {
    var html = "<table><thead><tr>";
    for (var header of headers) {
        html += "<th>" + header + "</th>";
    }
    html += "</tr></thead>";
    html += '<tbody id="' + bodyId + '"></tbody>';
    html += "</table>";
    document.getElementById(id).innerHTML = html;
    return html;
}


function tr(text) {
    return "<tr>" + text + "</tr>";
}

function td(text) {
    return "<td>" + text + "</td>";
}
