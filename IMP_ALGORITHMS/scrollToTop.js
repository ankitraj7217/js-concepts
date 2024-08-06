function scrollToTop() {
    window.scrollTo(0, 0);
}

const btn = document.getElementById("totop");
btn.onclick = scrollToTop;


requestAnimationFrame(scrollToTop);

