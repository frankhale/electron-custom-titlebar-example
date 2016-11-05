"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var remote = require("electron").remote;

var TitleBar = function (_React$Component) {
  _inherits(TitleBar, _React$Component);

  function TitleBar() {
    _classCallCheck(this, TitleBar);

    var _this = _possibleConstructorReturn(this, (TitleBar.__proto__ || Object.getPrototypeOf(TitleBar)).call(this));

    _this.restartEnterHandler = _this.restartEnterHandler.bind(_this);
    _this.restartLeaveHandler = _this.restartLeaveHandler.bind(_this);
    _this.minimizeButtonHandler = _this.minimizeButtonHandler.bind(_this);
    _this.minimizeEnterHandler = _this.minimizeEnterHandler.bind(_this);
    _this.minimizeLeaveHandler = _this.minimizeLeaveHandler.bind(_this);
    _this.maximizeButtonHandler = _this.maximizeButtonHandler.bind(_this);
    _this.maximizeEnterHandler = _this.maximizeEnterHandler.bind(_this);
    _this.maximizeLeaveHandler = _this.maximizeLeaveHandler.bind(_this);
    _this.closeEnterHandler = _this.closeEnterHandler.bind(_this);
    _this.closeLeaveHandler = _this.closeLeaveHandler.bind(_this);
    _this.closeButtonHandler = _this.closeButtonHandler.bind(_this);
    _this.restartButtonHandler = _this.restartButtonHandler.bind(_this);

    _this.state = {
      restartClassName: "restart-button",
      minimizeClassName: "minimize-button",
      maximizeClassName: "maximize-button",
      maximizedClassName: "",
      closeClassName: "close-button",
      titleClassName: "title",
      restartEnterClassName: "",
      minimizeEnterClassName: "",
      maximizeEnterClassName: "",
      closeEnterClassName: ""
    };
    return _this;
  }

  _createClass(TitleBar, [{
    key: "getBrowserWindow",
    value: function getBrowserWindow() {
      return remote.getCurrentWindow();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var focus = function focus() {
        _this2.setState({
          restartClassName: "restart-button",
          minimizeClassName: "minimize-button",
          maximizeClassName: _this2.getBrowserWindow().isMaximized() ? "maximized-button" : "maximize-button",
          closeClassName: "close-button",
          titleClassName: "title"
        });
      };

      //$(window).on("mouseenter", () => { focus(); });
      $(window).on("focus", function () {
        focus();
      });

      $(window).on("blur", function () {
        _this2.setState({
          restartClassName: "restart-button-inactive",
          minimizeClassName: "minimize-button-inactive",
          maximizeClassName: _this2.getBrowserWindow().isMaximized() ? "maximized-button-inactive" : "maximize-button-inactive",
          closeClassName: "close-button-inactive",
          titleClassName: "title-inactive"
        });
      });
    }
  }, {
    key: "restartEnterHandler",
    value: function restartEnterHandler(e) {
      if (!$("#restart").hasClass("restart-button-inactive")) {
        this.setState({ restartEnterClassName: "restart-button-hover" });
      }
    }
  }, {
    key: "restartLeaveHandler",
    value: function restartLeaveHandler(e) {
      this.setState({ restartEnterClassName: "" });
    }
  }, {
    key: "minimizeEnterHandler",
    value: function minimizeEnterHandler(e) {
      if (!$("#minimize").hasClass("minimize-button-inactive")) {
        this.setState({ minimizeEnterClassName: "minimize-button-hover" });
      }
    }
  }, {
    key: "minimizeLeaveHandler",
    value: function minimizeLeaveHandler(e) {
      this.setState({ minimizeEnterClassName: "" });
    }
  }, {
    key: "maximizeEnterHandler",
    value: function maximizeEnterHandler(e) {
      if (!$("#maximize").hasClass("maximize-button-inactive")) {
        this.setState({ maximizeEnterClassName: this.getBrowserWindow().isMaximized() ? "maximized-button-hover" : "maximize-button-hover" });
      }
    }
  }, {
    key: "maximizeLeaveHandler",
    value: function maximizeLeaveHandler(e) {
      this.setState({ maximizeEnterClassName: "" });
    }
  }, {
    key: "closeEnterHandler",
    value: function closeEnterHandler(e) {
      if (!$("#close").hasClass("close-button-inactive")) {
        this.setState({ closeEnterClassName: "close-button-hover" });
      }
    }
  }, {
    key: "closeLeaveHandler",
    value: function closeLeaveHandler(e) {
      this.setState({ closeEnterClassName: "" });
    }
  }, {
    key: "restartButtonHandler",
    value: function restartButtonHandler(e) {
      $(window).focus();
      this.getBrowserWindow().reload();
    }
  }, {
    key: "minimizeButtonHandler",
    value: function minimizeButtonHandler(e) {
      var _this3 = this;

      $(window).focus();
      this.setState({
        minimizeEnterClassName: ""
      }, function () {
        // need to wait a tiny bit for the hover state to clear otherwise the
        // preview of the app on the Windows taskbar will still have the minimize
        // button's hover state incorrect.
        var minimizeInterval = setInterval(function () {
          clearInterval(minimizeInterval);
          _this3.getBrowserWindow().minimize();
        }, 25);
      });
    }
  }, {
    key: "maximizeButtonHandler",
    value: function maximizeButtonHandler(e) {
      var _this4 = this;

      $(window).focus();
      if (!this.getBrowserWindow().isMaximized()) {
        this.setState({
          maximizeClassName: "",
          maximizedClassName: "maximized-button"
        }, function () {
          _this4.getBrowserWindow().maximize();
        });
      } else {
        this.setState({
          maximizeClassName: "maximize-button",
          maximizedClassName: ""
        }, function () {
          _this4.getBrowserWindow().unmaximize();
        });
      }
    }
  }, {
    key: "closeButtonHandler",
    value: function closeButtonHandler(e) {
      $(window).focus();
      this.getBrowserWindow().close();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement("div", { id: "restart", className: this.state.restartClassName + " " + this.state.restartEnterClassName + " fa fa-refresh icon-offset", onClick: this.restartButtonHandler, onMouseEnter: this.restartEnterHandler, onMouseLeave: this.restartLeaveHandler }),
        React.createElement(
          "div",
          { id: "title", className: this.state.titleClassName + " draggable-area" },
          this.props.title
        ),
        React.createElement("div", { id: "minimize", className: this.state.minimizeClassName + " " + this.state.minimizeEnterClassName, onClick: this.minimizeButtonHandler, onMouseEnter: this.minimizeEnterHandler, onMouseLeave: this.minimizeLeaveHandler }),
        React.createElement("div", { id: "maximize", className: this.state.maximizeClassName + " " + this.state.maximizeEnterClassName + " " + this.state.maximizedClassName, onClick: this.maximizeButtonHandler, onMouseEnter: this.maximizeEnterHandler, onMouseLeave: this.maximizeLeaveHandler }),
        React.createElement("div", { id: "close", className: this.state.closeClassName + " " + this.state.closeEnterClassName, onClick: this.closeButtonHandler, onMouseEnter: this.closeEnterHandler, onMouseLeave: this.closeLeaveHandler })
      );
    }
  }]);

  return TitleBar;
}(React.Component);

var CustomTitleBarExample = function (_React$Component2) {
  _inherits(CustomTitleBarExample, _React$Component2);

  function CustomTitleBarExample() {
    _classCallCheck(this, CustomTitleBarExample);

    return _possibleConstructorReturn(this, (CustomTitleBarExample.__proto__ || Object.getPrototypeOf(CustomTitleBarExample)).apply(this, arguments));
  }

  _createClass(CustomTitleBarExample, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(TitleBar, { title: "Hello, World!" }),
        React.createElement(
          "div",
          { id: "content" },
          React.createElement(
            "span",
            { className: "centered" },
            "Electron is Awesome!!!"
          )
        )
      );
    }
  }]);

  return CustomTitleBarExample;
}(React.Component);

$(document).ready(function () {
  ReactDOM.render(React.createElement(CustomTitleBarExample, null), document.getElementById("ui"));
});
//# sourceMappingURL=titlebar.js.map
