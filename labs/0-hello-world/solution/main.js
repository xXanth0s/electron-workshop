const { app, BrowserWindow } = require('electron');

function createWindow() {
  const window = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile('./index.html');
}

// calls function when app is started
app.whenReady().then(createWindow);
