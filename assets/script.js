document.addEventListener("DOMContentLoaded", () => {
  const location = window.location.href;
  const button = document.getElementById("send");
  const responseContainer = document.getElementById("response-container");
  button.addEventListener("click", () => {
    const init = {
      method: "GET",
      header: new Headers(),
      mode: "cors",
      cache: "default",
    };
    fetch(`${location}api/whoami`, init)
      .then((response) => {
        response
          .json()
          .then((data) => {
            responseContainer.style.display = "flex";
            document.getElementById("ipaddress").innerText = data.ipaddress;
            document.getElementById("language").innerText = data.language;
            document.getElementById("software").innerText = data.software;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});
