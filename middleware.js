const verifyToken = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  if (user) {
    const form = document.getElementById("login-form");
    const hiddenElements = document.querySelectorAll(".hidden.auth");
    const main = document.getElementsByTagName("main")[0];
    hiddenElements.forEach((element) => {
      element.classList.remove("hidden");
    });
    form.classList.add("hidden");
    main.classList.remove("flex-center");
    return true;
  } else {
    return false;
  }
};

verifyToken();
