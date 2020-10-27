'use strict'

import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import Storage from './electron/storage'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const isDevelopment = process.env.NODE_ENV !== 'production'

// Storage
const storage = new Storage({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 1200x600 is the default size of our window
    windowBounds: { width: 1200, height: 600 }
  }
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Preload init
  const preload = (process.env.NODE_ENV === 'development') ?
      // eslint-disable-next-line no-undef
      path.resolve(__static, '..', 'src', 'preload.js') : // dev
      // eslint-disable-next-line no-undef
      path.resolve(__static, 'preload.js');  // prod
  // Window size
  let { width, height } = storage.get('windowBounds');
  // Create the browser window.
  win = new BrowserWindow({
    width: width,
    height: height,
    backgroundColor: '#fff', // prevents blurry text: https://electronjs.org/docs/faq#the-font-looks-blurry-what-is-this-and-what-can-i-do
    useContentSize: true,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: false,// process.env.ELECTRON_NODE_INTEGRATION
      preload: preload,
      contextIsolation: true,
    },
    // eslint-disable-next-line no-undef
    icon: path.join(__static, 'icon.png')
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools({ mode: 'detach' })
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.setMinimumSize(400, 50)

  win.on('closed', () => {
    win = null
  })

  win.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = win.getBounds();
    // Now that we have them, save them using the `set` method.
    storage.set('windowBounds', { width, height });
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('set-title', (event, args) => {
  win.setTitle(args)
})

ipcMain.on('close-app', () => {
  win.close()
  // require('electron').remote.getCurrentWindow().id
  // console.log("test")
})

ipcMain.on('maximize-app', () => {
  win.isMaximized() ? win.unmaximize() : win.maximize();
})

ipcMain.on('minimize-app', () => {
  win.minimize()
})