var token = getCookie("token");

var ws = new WebSocket("ws://pepe44.dev:8080", 'echo-protocol')
var current_chat;

var knownMessages = []

var input = document.getElementById("message");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("send").click();
    }
});


ws.onmessage = function(ctx) {
    var resp = JSON.parse(ctx.data);

    if(resp.code === "TOKEN_INVALID") {
        document.location = "login.html";
    }

    if(resp.request === "newmessage") {
        if(resp.room.id !== current_chat) {
            return;
        }
        if(knownMessages.includes(resp.randomID)) {
            return;
        }

        let own = resp.sender === resp.name;
        var box = document.createElement("span");
        box.classList.add("msg-box");
        var header = document.createElement("span");
        header.classList.add("msg-box-header");
        var footer = document.createElement("span");
        footer.classList.add("msg-box-footer");
        if(own) {
            header.classList.add("own-message");
            footer.classList.add("own-text");
        }
        header.innerText = resp.sender;
        footer.innerText = resp.text;

        box.appendChild(header);
        box.appendChild(footer);
        document.getElementById("messages").appendChild(box);
        document.getElementById("messages").scrollBy(0, box.offsetHeight + 10);
        knownMessages.push(resp.randomID);
        /*
        if(resp.text === "!clear") {
            document.getElementById("messages").innerHTML = "";
        }*/

    }
    if (resp.response === "successful") {
        if (resp.data !== undefined) {
            if(resp.req === "chat:getrooms") {
                chat = resp.data // List of Channels
                document.getElementById("friendlist").innerHTML = "";
                chat.forEach(chn => {

                    var node = document.createElement("span");
                    node.style.display = "block";
                    node.onclick = function () {
                        openChat(chn.id);
                    }
                    var textnode = document.createTextNode("Channel von: " + chn.people.join(", "));         // Create a text node
                    node.appendChild(textnode);                              // Append the text to <li>
                    document.getElementById("friendlist").appendChild(node);
                })

            } else if(resp.req === "chat:getMessages") {
                msgs = resp.data // List of all Messages

                document.getElementById("messages").innerHTML = ""; // Clear all Messages shown
                knownMessages = []
                for (let messageid in msgs) {
                    let message = msgs[messageid];
                    let own = message.sender === resp.name;
                    var box = document.createElement("span");
                    box.classList.add("msg-box");
                    var header = document.createElement("span");
                    header.classList.add("msg-box-header");
                    var footer = document.createElement("span");
                    footer.classList.add("msg-box-footer");
                    if(own) {
                        header.classList.add("own-message");
                        footer.classList.add("own-text");
                    }
                    header.innerText = message.sender;
                    footer.innerText = message.msg;

                    box.appendChild(header);
                    box.appendChild(footer);
                    document.getElementById("messages").appendChild(box);
                    document.getElementById("messages").appendChild(box);
                    document.getElementById("messages").scrollBy(0, box.offsetHeight + 10);

                    knownMessages.push(message.randomID);
                }
            }

        }else {


        }
    }else {


    }
}
function getChats() {
    ws.send(JSON.stringify({"request": "chat:getrooms", "token": token}));

}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function openChat(id) {

    if(current_chat !== undefined) {
        ws.send(JSON.stringify({"request": "chat:iDontCare", "token": token, "room": current_chat}));
    }
    ws.send(JSON.stringify({"request": "chat:getMessages", "token": token, "room": id}));
    ws.send(JSON.stringify({"request": "chat:iCare", "token": token, "room": id}));
    current_chat = id;
    document.getElementById("message").removeAttribute("disabled")
    document.getElementById("send").removeAttribute("disabled")
}
function sendMessage() {
    let msg = document.getElementById("message").value;
    if(msg !== undefined || msg !== "") {
        ws.send(JSON.stringify({"request": "chat:sendMessage", "token": token, "room": current_chat, "message": msg }))
        document.getElementById("message").value = " ";
    } else {
        // No Input
    }
}
ws.onopen = function () {
    ws.send(JSON.stringify({"request": "session", "token": token}))
    getChats();
}

function logout() {

    ws.send(JSON.stringify({"request": "logout", "token": token }))
    window.location = "login.html"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}





