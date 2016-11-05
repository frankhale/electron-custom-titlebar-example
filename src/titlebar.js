const remote = require("electron").remote;

class TitleBar extends React.Component {  
  constructor() {
    super();

    this.restartEnterHandler = this.restartEnterHandler.bind(this);
    this.restartLeaveHandler = this.restartLeaveHandler.bind(this);
    this.minimizeButtonHandler = this.minimizeButtonHandler.bind(this);
    this.minimizeEnterHandler = this.minimizeEnterHandler.bind(this);
    this.minimizeLeaveHandler = this.minimizeLeaveHandler.bind(this);
    this.maximizeButtonHandler = this.maximizeButtonHandler.bind(this);
    this.maximizeEnterHandler = this.maximizeEnterHandler.bind(this);
    this.maximizeLeaveHandler = this.maximizeLeaveHandler.bind(this);
    this.closeEnterHandler = this.closeEnterHandler.bind(this);
    this.closeLeaveHandler = this.closeLeaveHandler.bind(this);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
    this.restartButtonHandler = this.restartButtonHandler.bind(this);

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
      closeEnterClassName: ""
    };   
  }
  getBrowserWindow() {
    return remote.getCurrentWindow(); 
  }  
  componentDidMount() {
    $(window).on("focus", () => {
      this.setState({
        restartClassName: "restart-button",
        minimizeClassName: "minimize-button",
        maximizeClassName: (this.getBrowserWindow().isMaximized()) ? "maximized-button" : "maximize-button",
        closeClassName:"close-button",
        titleClassName: "title" 
      });
    });
    
    $(window).on("blur", () => {
      this.setState({
        restartClassName: "restart-button-inactive",
        minimizeClassName: "minimize-button-inactive",
        maximizeClassName: (this.getBrowserWindow().isMaximized()) ? "maximized-button-inactive" : "maximize-button-inactive",
        closeClassName:"close-button-inactive",
        titleClassName: "title-inactive"  
      });
    });
  }
  restartEnterHandler(e) { 
    if(! $("#restart").hasClass("restart-button-inactive")) {
      this.setState({ restartEnterClassName: "restart-button-hover" });
    }
  }
  restartLeaveHandler(e) { 
    this.setState({ restartEnterClassName: "" });
  }
  minimizeEnterHandler(e) {
    if(! $("#minimize").hasClass("minimize-button-inactive")) {
      this.setState({ minimizeEnterClassName: "minimize-button-hover" });
    }
  }
  minimizeLeaveHandler(e) {
    this.setState({ minimizeEnterClassName: "" });
  }
  maximizeEnterHandler(e) {
    if(! $("#maximize").hasClass("maximize-button-inactive")) {
      this.setState({ maximizeEnterClassName: (this.getBrowserWindow().isMaximized()) ? "maximized-button-hover" : "maximize-button-hover" });
    }
  }
  maximizeLeaveHandler(e) {
    this.setState({ maximizeEnterClassName: "" });
  }
  closeEnterHandler(e) { 
    if(! $("#close").hasClass("close-button-inactive")) {
      this.setState({ closeEnterClassName: "close-button-hover" });
    }
  }
  closeLeaveHandler(e) { 
    this.setState({ closeEnterClassName: "" });
  }
  restartButtonHandler(e) {
    $(window).focus();
    this.getBrowserWindow().reload();
  }
  minimizeButtonHandler(e) {
    $(window).focus();
    this.setState({
      minimizeEnterClassName: "" 
    }, () => {
      // need to wait a tiny bit for the hover state to clear otherwise the
      // preview of the app on the Windows taskbar will still have the minimize
      // button's hover state incorrect.
      let minimizeInterval = setInterval(() => { 
          clearInterval(minimizeInterval);
          this.getBrowserWindow().minimize();
      }, 25);
    });
  } 
  maximizeButtonHandler(e) {
    $(window).focus();
    if (!this.getBrowserWindow().isMaximized()) {
      this.setState({
        maximizeClassName: "",
        maximizedClassName: "maximized-button"
      }, () => { this.getBrowserWindow().maximize(); });      
    } else {
      this.setState({
        maximizeClassName: "maximize-button",
        maximizedClassName: ""
      }, () => { this.getBrowserWindow().unmaximize(); });
    }
  } 
  closeButtonHandler(e) {
    $(window).focus();
    this.getBrowserWindow().close();    
  }  
  render() {
    return (
      <div>
        <div id="restart" className={this.state.restartClassName + " " + this.state.restartEnterClassName + " fa fa-refresh icon-offset"} onClick={this.restartButtonHandler} onMouseEnter={this.restartEnterHandler} onMouseLeave={this.restartLeaveHandler}></div>
        <div id="title" className={this.state.titleClassName + " titlebar"}>{this.props.title}</div>
        <div id="minimize" className={this.state.minimizeClassName + " " + this.state.minimizeEnterClassName} onClick={this.minimizeButtonHandler} onMouseEnter={this.minimizeEnterHandler} onMouseLeave={this.minimizeLeaveHandler}></div>
        <div id="maximize" className={this.state.maximizeClassName + " " + this.state.maximizeEnterClassName + " " + this.state.maximizedClassName} onClick={this.maximizeButtonHandler} onMouseEnter={this.maximizeEnterHandler} onMouseLeave={this.maximizeLeaveHandler}></div>
        <div id="close" className={this.state.closeClassName + " " + this.state.closeEnterClassName} onClick={this.closeButtonHandler} onMouseEnter={this.closeEnterHandler} onMouseLeave={this.closeLeaveHandler}></div>
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

$(document).ready(function () {
  ReactDOM.render(<CustomTitleBarExample />, document.getElementById("ui"));
});