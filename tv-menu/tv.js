(function () {
  var frame = document.getElementById("screen-frame");
  var board = document.getElementById("board");
  var pages = ["kawa.html?v=5", "napoje.html?v=5"];

  if (frame) {
    var params = new URLSearchParams(location.search);
    var locked = params.get("screen");
    var index = 0;
    var timer = null;
    var dwell = 25000;

    function show(next) {
      index = (next + pages.length) % pages.length;
      if (frame.getAttribute("src") !== pages[index]) frame.src = pages[index];
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
    return;
  }

  if (!board) return;

  function fit() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    board.style.transform = "scale(" + scale + ")";
  }

  window.addEventListener("resize", fit);
  fit();
})();
