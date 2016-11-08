const {app, BrowserWindow, session} = require('electron');

let win;

app.on('ready', () => {
  win = new BrowserWindow({ 
    width: 400,
    minWidth: 400, 
    height: 300, 
    minHeight: 300,
    backgroundColor: "#fff", 
    show: false, 
    frame: false, 
    resizable:true 
  });
  win.loadURL(`file://${__dirname}/index.html`);
  win.once('ready-to-show', () => { win.show(); win.webContents.openDevTools(); });
  win.on('closed', () => { win = null; });
  win.on("maximize", () => { win.webContents.send("maximize"); });
  win.on("unmaximize", () => { win.webContents.send("unmaximize"); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
app.on('activate', () => { if (win === null) { createWindow(); } });