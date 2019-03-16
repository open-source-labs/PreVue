'use strict';

const { app, protocol, BrowserWindow, dialog } = require('electron');
const ipc = require('electron').ipcMain;

const {
  createProtocol,
  installVueDevtools
} = require('vue-cli-plugin-electron-builder/lib');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function showExportDialog(event) {
  dialog.showSaveDialog(
    {
      title: 'Choose location to save folder in',
      defaultPath: app.getPath('desktop'),
      message: 'Choose location to save folder in',
      nameFieldLabel: 'Application Name'
    },
    result => {
      // console.log(result);
      // if (nameLabel === 'JSON Name') event.sender.send('json-location', result);
      event.sender.send('export-project-location', result);
    }
  );
}

function showSaveJsonDialog(event) {
  dialog.showSaveDialog(
    {
      title: 'Choose location to save JSON object in',
      defaultPath: app.getPath('desktop'),
      message: 'Choose location to save JSON object in',
      nameFieldLabel: 'Application State Name',
      filters: [
        {
          name: 'JSON Files',
          extensions: ['json']
        }
      ]
    },
    result => {
      event.sender.send('save-json-location', result);
    }
  );
}

ipc.on('show-open-dialog', event => {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'JSON Files',
          extensions: ['json']
        }
        // { name: 'Text Files', extensions: ['txt', 'text'] },
      ]
    },
    result => {
      event.sender.send('open-json-location', result);
    }
  );
});

ipc.on('show-save-json-dialog', event => {
  showSaveJsonDialog(event);
});

ipc.on('show-export-dialog', event => {
  showExportDialog(event);
});
