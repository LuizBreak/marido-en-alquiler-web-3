export function spinnerLoader() {
  const preloader = document.querySelector(".page-loading");

  if (!preloader) {
    return;
  }

  preloader.classList.remove("active");

  setTimeout(function () {
    try {
      if (!preloader || !preloader.isConnected) {
        return;
      }
      preloader.remove();
    } catch (error) {
      console.log(error);
    }
  }, 2000);
}
