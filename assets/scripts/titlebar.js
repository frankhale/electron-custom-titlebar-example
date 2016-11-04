const remote = require('electron').remote,
      browser = remote.getCurrentWindow();

let CUSTOM_TITLEBAR = (function () {
  let $restartButton = $(".restart-button"),
    $closeButton = $(".close-button"),
    $maximizeButton = $("#maximize"),
    $minimizeButton = $(".minimize-button"),
    $titlebar = $(".draggable-area");    

  function init() {
    $restartButton.click(function () {
      browser.reload();
    });

    $closeButton.click(function () {
      browser.close();
    });

    $maximizeButton.click(function () {
      if (!browser.isMaximized()) {
        browser.maximize();
        $maximizeButton.removeClass("maximize-button");
        $maximizeButton.addClass("maximized-button");
      } else {
        browser.unmaximize();
        $maximizeButton.removeClass("maximized-button");
        $maximizeButton.addClass("maximize-button");
      }
    });

    $minimizeButton.click(function () {
      browser.minimize();
    });

    $(window).blur(function (e) {
      $closeButton.removeClass("close-button");
      $closeButton.addClass("close-button-inactive");

      $maximizeButton.removeClass("maximize-button");
      $maximizeButton.addClass("maximize-button-inactive");

      $minimizeButton.removeClass("minimize-button");
      $minimizeButton.addClass("minimize-button-inactive");

      $restartButton.removeClass("restart-button");
      $restartButton.addClass("restart-button-inactive");

      $titlebar.css("color", "#bcbcbc");
    });

    $(window).focus(function (e) {
      $closeButton.removeClass("close-button-inactive");
      $closeButton.addClass("close-button");

      $maximizeButton.removeClass("maximize-button-inactive");
      $maximizeButton.addClass("maximize-button");

      $minimizeButton.removeClass("minimize-button-inactive");
      $minimizeButton.addClass("minimize-button");

      $restartButton.removeClass("restart-button-inactive");
      $restartButton.addClass("restart-button");
      
      $titlebar.css("color", "#000");
    });
  }

  return {
    init: function () {
      init();
    }
  }
})();

$(document).ready(function () {
  CUSTOM_TITLEBAR.init();
});