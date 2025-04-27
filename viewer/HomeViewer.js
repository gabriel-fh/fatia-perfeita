(() => {
  const navbarItems = document.querySelectorAll(".nav-bar ul li");
  const homeContentItems = document.querySelectorAll("#home-container > div");

  const setActiveSection = (selectedId) => {
    homeContentItems.forEach((contentItem) => {
      contentItem.classList.toggle("hidden", contentItem.id !== selectedId);
    });

    navbarItems.forEach((navItem) => {
      navItem.classList.toggle("active", navItem.id === selectedId);
    });
  };

  navbarItems.forEach((navItem) => {
    navItem.addEventListener("click", () => setActiveSection(navItem.id));
  });

  const cart = document.getElementById("cart");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartBtn = document.getElementById("cart-btn");
  cartBtn.addEventListener("click", () => {
    console.log();
    if (cart.classList.contains("isClosed")) {
      cart.classList.remove("isClosed");
      cart.style.right = "0px";
    } 
  });
  closeCartBtn.addEventListener("click", () => {
    cart.classList.add("isClosed");
    cart.style.right = "-100%";
  });
})();
