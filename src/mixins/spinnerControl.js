export function spinnerLoader() {
  var preloader = document.querySelector(".page-loading");
  try {
    preloader.classList.remove("active");
  } catch (error) {
    console.log(error);
  }
  setTimeout(function () {
    try {
      preloader.remove();
    } catch (error) {
      console.log(error);
    }
  }, 2000);
}
