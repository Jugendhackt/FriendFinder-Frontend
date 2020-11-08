
var ws = new WebSocket("ws://tallerik.myddns.me:8080", 'echo-protocol')
var token;
ws.onmessage = function(ctx) {
    var resp = JSON.parse(ctx.data);
    if(resp.response === "successful") {
        // Meldung das erfolgreich
        if(resp.token !== undefined) {
            token = resp.token;

            document.cookie = token
            window.location = "index.html"
        }
    } else {
        // Meldung das nicht erfolgreich
        var error = resp.message;

        alert(error)

    }
}

function getInput() {
    var username = getUname()
    var password = getPwd()

    ws.send(JSON.stringify({"request": "login", "user": username, "pw": password }))



function getUname() {
    if (document.getElementById("uname").value == "") {
        alert("Bitte gebe einen Benutzernamen ein")
    } else {
        return document.getElementById("uname").value;
    }
}

function getPwd() {
    if (document.getElementById("pwd").value == "") {
        alert("Bitte gebe ein Passwort ein")
    } else {
        return document.getElementById("pwd").value
    }
}



}
function getInputname() {
    var uname = document.getElementById("uname").value;
    return uname;
}

//var uname = document.getElementById("uname").value
//window.alert(uname)