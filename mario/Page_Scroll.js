document.oncontextmenu = function () { return false; }
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
