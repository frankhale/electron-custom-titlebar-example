const { app, BrowserWindow } = require("electron");
const io = require("socket.io").listen(3001);

let win;

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
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    backgroundColor: "#fff",
    show: false,
    frame: false,
    resizable: true
  });
  //win.loadURL(`file://${__dirname}/index.html`);
  win.loadURL("http://localhost:3000");
  win.once("ready-to-show", () => {
    win.show();
    win.webContents.openDevTools();
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
