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

// closes electron process, when window is closed
app.on('window-all-closed', () => {
  // on MacOS, app is minimized to taskbar, when all windows are closed
  // User must close app with "CMD + Q"
  // process.platform is 'darwin' in MacOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// executes, when app is activated. Occurs in multiple different scenarios
app.on('activate', () => {
  // when no window is open, main window will be created. Mostly on MacOS
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
