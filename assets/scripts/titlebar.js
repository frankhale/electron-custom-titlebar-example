const remote = require('electron').remote,
      browser = remote.getCurrentWindow();

let MAIN = (function () {
  let $restartButton = $(".restart-button"),
    $closeButton = $(".close-button"),
    $maximizeButton = $("#maximize"),
    $minimizeButton = $(".minimize-button"),
    $titlebar = $(".draggable-area"),
    $restartIcon = $("#refresh-icon");
    //$titlebar = $(".titlebar");

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

    $restartButton.hover(
      function () {
        if(! $restartButton.hasClass("restart-button-inactive")) {
          $restartIcon.addClass('restart-button-invert')
        }
      },
      function () {
        if(! $restartButton.hasClass("restart-button-inactive")) {
          $restartIcon.removeClass('restart-button-invert')
        }
      }
    );

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
  MAIN.init();
});