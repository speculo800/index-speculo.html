   const hamb = document.querySelector(".hamb");
    const navbar = document.querySelector(".nav-bar");
    hamb.onclick = () => {
      navbar.classList.toggle("active");
    }

    window.addEventListener("scroll" , function(){
      var header = document.querySelector("header");
      header.classList.toggle("sticky" , window.scrollY > 0);
    });