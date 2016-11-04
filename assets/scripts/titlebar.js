const remote = require('electron').remote,
      browser = remote.getCurrentWindow();

let MAIN = (function () {
  let $restartButton = $(".restart-button"),
    $closeButton = $(".close-button"),
    $maximizeButton = $("#maximize"),
    $minimizeButton = $(".minimize-button"),
    $titlebar = $(".titlebar");

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
        $("#refresh-icon").addClass('restart-button-invert')
      },
      function () {
        $("#refresh-icon").removeClass('restart-button-invert')
      }
    );

    window.onblur = function (e) {
      $closeButton.removeClass("close-button");
      $closeButton.addClass("close-button-inactive");
    };

    window.onfocus = function (e) {
      $closeButton.removeClass("close-button-inactive");
      $closeButton.addClass("close-button");
    };
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