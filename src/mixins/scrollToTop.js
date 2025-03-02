export function scrollFunction() {
  var element = document.querySelector(".btn-scroll-top"),
    scrollOffset = 250;

  if (element == null) return;
  var offsetFromTop = parseInt(scrollOffset, 10);

  window.addEventListener("scroll", function (e) {
    if (e.currentTarget.pageYOffset > offsetFromTop) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
}
