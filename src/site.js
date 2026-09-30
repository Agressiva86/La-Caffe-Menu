(function () {
  var langButtons = document.querySelectorAll("[data-set-lang]");
  var themeToggle = document.getElementById("theme-toggle");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  function currentLang() {
    return document.body.classList.contains("lang-en") ? "en" : "pl";
  }

  function syncLangButtons(lang) {
    langButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-set-lang") === lang);
    });
  }

  function setLang(lang) {
    var dark = document.body.classList.contains("dark");
    var page = document.body.getAttribute("data-page");
    document.body.className = "lang-" + lang + (dark ? " dark" : "");
    if (page) document.body.setAttribute("data-page", page);
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
    syncLangButtons(lang);
  }

  syncLangButtons(currentLang());

  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLang(button.getAttribute("data-set-lang"));
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.documentElement.classList.add("theme-transition");
      var isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      window.setTimeout(function () {
        document.documentElement.classList.remove("theme-transition");
      }, 450);
    });
  }

  function setNavOpen(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNavOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) setNavOpen(false);
  });

  function initCarousel(root) {
    var slides = root.querySelectorAll(".carousel-slide");
    var dots = root.querySelectorAll("[data-slide]");
    if (!slides.length) return;
    var index = 0;
    var timer;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function play() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        show(index + 1);
      }, 4500);
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        show(Number(dot.getAttribute("data-slide")) || 0);
        play();
      });
    });

    show(0);
    play();
  }

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);

  document.querySelectorAll("[data-quote-slider]").forEach(function (root) {
    var slides = root.querySelectorAll(".quote-slide");
    var next = root.querySelector("[data-quote-next]");
    if (!slides.length || !next) return;
    var index = 0;
    next.addEventListener("click", function () {
      index = (index + 1) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
    });
  });
})();
