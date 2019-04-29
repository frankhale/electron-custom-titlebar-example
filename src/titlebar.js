const socket = io("http://localhost:3001");

class TitleBar extends React.Component {
  constructor() {
    super();

    this.state = {
      restartClassName: "restart-button",
      minimizeClassName: "minimize-button",
      maximizeClassName: "maximize-button",
      maximizedClassName: "",
      closeClassName: "close-button",
      titleClassName: "title",
      restartEnterClassName: "",
      minimizeEnterClassName: "",
      maximizeEnterClassName: "",
      closeEnterClassName: "",
      isMaximized: false
    };
  }

  componentDidMount() {
    window.onfocus = () => {
      this.setState({
        restartClassName: "restart-button",
        minimizeClassName: "minimize-button",
        maximizeClassName: this.state.isMaximized
          ? "maximized-button"
          : "maximize-button",
        closeClassName: "close-button",
        titleClassName: "title"
      });
    };

    window.onblur = () => {
      this.setState({
        restartClassName: "restart-button-inactive",
        minimizeClassName: "minimize-button-inactive",
        maximizeClassName: this.state.isMaximized
          ? "maximized-button-inactive"
          : "maximize-button-inactive",
        closeClassName: "close-button-inactive",
        titleClassName: "title-inactive"
      });
    };

    socket.on("maximize", () => {
      this.setState({
        isMaximized: true,
        maximizeClassName: "maximized-button"
      });
    });

    socket.on("unmaximize", () => {
      this.setState({
        isMaximized: false,
        maximizeClassName: "maximize-button",
        maximizedClassName: ""
      });
    });

    socket.on("isMaximized", result => {
      this.setState(
        {
          isMaximized: result
        },
        () => {
          window.focus();

          if (!this.state.isMaximized) {
            socket.emit("maximize");

            this.setState({
              maximizeClassName: "",
              maximizedClassName: "maximized-button"
            });
          } else {
            socket.emit("unmaximize");

            this.setState({
              maximizeClassName: "maximize-button",
              maximizedClassName: ""
            });
          }
        }
      );
    });
  }

  restartEnterHandler = e => {
    if (
      !document
        .querySelector("#restart")
        .classList.contains("restart-button-inactive")
    ) {
      this.setState({ restartEnterClassName: "restart-button-hover" });
    }
  };

  restartLeaveHandler = e => {
    this.setState({ restartEnterClassName: "" });
  };

  minimizeEnterHandler = e => {
    if (
      !document
        .querySelector("#minimize")
        .classList.contains("minimize-button-inactive")
    ) {
      this.setState({ minimizeEnterClassName: "minimize-button-hover" });
    }
  };

  minimizeLeaveHandler = e => {
    this.setState({ minimizeEnterClassName: "" });
  };

  maximizeEnterHandler = e => {
    if (
      !document
        .querySelector("#maximize")
        .classList.contains("maximize-button-inactive")
    ) {
      this.setState({
        maximizeEnterClassName: this.state.isMaximized
          ? "maximized-button-hover"
          : "maximize-button-hover"
      });
    }
  };

  maximizeLeaveHandler = e => {
    this.setState({ maximizeEnterClassName: "" });
  };

  closeEnterHandler = e => {
    if (
      !document
        .querySelector("#close")
        .classList.contains("close-button-inactive")
    ) {
      this.setState({ closeEnterClassName: "close-button-hover" });
    }
  };

  closeLeaveHandler = e => {
    this.setState({ closeEnterClassName: "" });
  };

  restartButtonHandler = e => {
    window.focus();
    socket.emit("reload");
  };

  minimizeButtonHandler = e => {
    window.focus();
    this.setState(
      {
        minimizeEnterClassName: ""
      },
      () => {
        // need to wait a tiny bit for the hover state to clear otherwise the
        // preview of the app on the Windows taskbar will still have the minimize
        // button's hover state incorrect.
        let minimizeInterval = setInterval(() => {
          clearInterval(minimizeInterval);
          socket.emit("minimize");
        }, 25);
      }
    );
  };

  maximizeButtonHandler = e => {
    socket.emit("isMaximized");
  };

  closeButtonHandler = e => {
    window.focus();
    socket.emit("close");
  };

  render() {
    return (
      <div>
        <div
          id="restart"
          className={`${this.state.restartClassName} ${
            this.state.restartEnterClassName
          } fas fa-recycle`}
          onClick={this.restartButtonHandler}
          onMouseEnter={this.restartEnterHandler}
          onMouseLeave={this.restartLeaveHandler}
        />
        <div id="title" className={`${this.state.titleClassName} titlebar`}>
          {this.props.title}
        </div>
        <div
          id="minimize"
          className={`${this.state.minimizeClassName} ${
            this.state.minimizeEnterClassName
          }`}
          onClick={this.minimizeButtonHandler}
          onMouseEnter={this.minimizeEnterHandler}
          onMouseLeave={this.minimizeLeaveHandler}
        />
        <div
          id="maximize"
          className={`${this.state.maximizeClassName} ${
            this.state.maximizeEnterClassName
          } ${this.state.maximizedClassName}`}
          onClick={this.maximizeButtonHandler}
          onMouseEnter={this.maximizeEnterHandler}
          onMouseLeave={this.maximizeLeaveHandler}
        />
        <div
          id="close"
          className={`${this.state.closeClassName} ${
            this.state.closeEnterClassName
          }`}
          onClick={this.closeButtonHandler}
          onMouseEnter={this.closeEnterHandler}
          onMouseLeave={this.closeLeaveHandler}
        />
      </div>
    );
  }
}

class CustomTitleBarExample extends React.Component {
  render() {
    return (
      <div>
        <TitleBar title="Custom Electron TitleBar Example" />
        <div id="content">
          <span className="centered">Electron is Awesome!!!</span>
        </div>
      </div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(<CustomTitleBarExample />, document.getElementById("ui"));
};
