
let CUSTOM_TITLEBAR = (() => {
  const remote = require('electron').remote,
      browser = remote.getCurrentWindow();

  let $restartButton = $(".restart-button"),
      $closeButton = $(".close-button"),
      $maximizeButton = $("#maximize"),
      $minimizeButton = $(".minimize-button"),
      $titlebar = $(".draggable-area");    

  function init() {
    $restartButton.click(() => { browser.reload(); });
    $closeButton.click(() => { browser.close(); });
    $minimizeButton.click(() => {        
      let minimizeInterval = setInterval(() => { 
        clearInterval(minimizeInterval);
        browser.minimize();
      }, 25); 
      $minimizeButton.removeClass("minimize-button-hover"); 
    });

    // If we use a CSS hover here it will not clear when minimizing and even
    // if you remove the class it still doesn't work. Need to control the hover
    // state using event handlers.
    $minimizeButton.on({
      "mouseenter" : function() { $(this).addClass("minimize-button-hover"); },
      "mouseleave" : function() { $(this).removeClass("minimize-button-hover"); }
    });

    $maximizeButton.click(() => {
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

    $(window).on("focus", () => {
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

    $(window).on("blur", () => {
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
  }

  return { init: () => { init(); } }
})();

$(document).ready(function () {
  CUSTOM_TITLEBAR.init();
});