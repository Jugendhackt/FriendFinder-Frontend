window.onscroll = function () {stickheader()};

var header = document.getElementById("myHeader")

var sticky = header.offsetTop;

function stickheader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    }else {
        header.classList.remove("sticky")
    }
}