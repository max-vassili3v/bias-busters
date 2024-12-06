const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    console.log("Making window!")

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: false, // Required for some older libraries
    },
  });

  win.loadFile(path.join(__dirname, 'dist/index.html')); // Load the Vite build
}

app.whenReady().then(() => {
  createWindow();
  console.log("Succesful");

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
    console.log("left");
  if (process.platform !== 'darwin') app.quit();
});