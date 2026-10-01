(function () {
  var board = document.getElementById("board");
  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var params = new URLSearchParams(location.search);
  var locked = params.get("screen");
  var index = 0;
  var timer = null;
  var dwell = 25000;

  function fit() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    board.style.transform = "scale(" + scale + ")";
  }

  function show(next) {
    index = (next + screens.length) % screens.length;
    screens.forEach(function (screen, i) {
      screen.classList.toggle("is-active", i === index);
    });
  }

  function arm() {
    clearInterval(timer);
    if (locked) return;
    timer = setInterval(function () {
      show(index + 1);
    }, dwell);
  }

  if (locked) {
    var n = parseInt(locked, 10);
    show(isNaN(n) ? 0 : n - 1);
  } else {
    show(0);
    arm();
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
      show(index + 1);
      arm();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      show(index - 1);
      arm();
    }
  });

  window.addEventListener("resize", fit);
  fit();
})();
