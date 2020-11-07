var token = document.cookie;

var ws = new WebSocket("ws://tallerik.myddns.me:8080", 'echo-protocol')

ws.onmessage = function(ctx) {
    var resp = JSON.parse(ctx.data);
    if (resp.response === "successful") {
        if (resp.data !== undefined) {
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
            alert(chat)
            alert("responsedata")
        }else {
            alert(resp.message)
            alert("responsenodata")
        }
    }else {
        alert(resp.message)
        alert("noconn")
    }
}
function getChats() {
    ws.send(JSON.stringify({"request": "chat:getrooms", "token": token}));
   alert()
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function openChat(id) {
    alert(id);
}