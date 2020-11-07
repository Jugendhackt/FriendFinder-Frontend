window.onscroll = function () {stickheader()};


var modal = document.getElementById("myModal");

var btn = document.getElementById("op");

var span = document.getElementsByClassName("close")[0];




var header = document.getElementById("myHeader")

var sticky = header.offsetTop;

function stickheader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }else {
        header.classList.remove("sticky")
    }
}



function openModal() {
   document.getElementById("myModal").style.visibility = "visible"
}

function closeModal() {
    document.getElementById("myModal").style.visibility = "hidden"
}

