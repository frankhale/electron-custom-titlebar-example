const { app, BrowserWindow, shell } = require("electron");
const URL = require("url").URL;
const io = require("socket.io").listen(3001);

let win;

// Stop the warnings that we are exposing users to harmful
// security risks. We aren't loading any content from external
// sources. Sure we could use an HTTPS server for our socket.io
// but that requires additional steps to setup which is beyond
// the scope of this example.
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

io.on("connection", socket => {
  console.log("socket.io server is connected");

  socket.on("isMaximized", () => {
    socket.emit("isMaximized", win.isMaximized());
  });

  socket.on("unmaximize", () => {
    socket.emit("unmaximize");
    win.unmaximize();
  });
  socket.on("minimize", () => {
    win.minimize();
  });
  socket.on("maximize", () => {
    win.maximize();
  });
  socket.on("reload", () => {
    win.reload();
  });
  socket.on("close", () => {
    win.close();
  });
});

app.on("ready", () => {
  win = new BrowserWindow({
    width: 640,
    minWidth: 640,
    height: 480,
    minHeight: 480,
    backgroundColor: "#fff",
    show: false,
    frame: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      enableRemoteModule: false
    }
  });
  win.loadURL(`file://${__dirname}/frontend/build/index.html`);
  // For development you can use the following URL and the
  // typical development process you'd use with create-react-app
  //win.loadURL("http://localhost:3000");
  win.once("ready-to-show", () => {
    win.show();
    //win.webContents.openDevTools();
  });
  win.on("closed", () => {
    win = null;
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
app.on("web-contents-created", (_event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (parsedUrl.origin !== "http://localhost:3000") {
      event.preventDefault();
    }
  });
});
app.on("web-contents-created", (_event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternalSync(navigationUrl);
  });
});
