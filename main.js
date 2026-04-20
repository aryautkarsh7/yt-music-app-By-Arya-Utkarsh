const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendSwitch('no-sandbox')
app.commandLine.appendSwitch('disable-dev-shm-usage')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'YT Music',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  mainWindow.loadURL('https://music.youtube.com', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  })

  // Custom Mac menu bar
  const menu = Menu.buildFromTemplate([
    {
      label: 'YT Music',
      submenu: [
        { label: 'About YT Music', role: 'about' },
        { type: 'separator' },
        { label: 'Hide YT Music', role: 'hide' },
        { label: 'Hide Others', role: 'hideOthers' },
        { type: 'separator' },
        { label: 'Quit YT Music', role: 'quit', accelerator: 'Cmd+Q' }
      ]
    },
    {
      label: 'Controls',
      submenu: [
        {
          label: 'Play / Pause',
          accelerator: 'Space',
          click: () => mainWindow.webContents.executeJavaScript(`
            document.querySelector('#play-pause-button, .play-pause-button')?.click()
          `)
        },
        {
          label: 'Next Song',
          accelerator: 'Cmd+Right',
          click: () => mainWindow.webContents.executeJavaScript(`
            document.querySelector('.next-button, #next-button')?.click()
          `)
        },
        {
          label: 'Previous Song',
          accelerator: 'Cmd+Left',
          click: () => mainWindow.webContents.executeJavaScript(`
            document.querySelector('.previous-button, #previous-button')?.click()
          `)
        },
        { type: 'separator' },
        {
          label: 'Reload',
          accelerator: 'Cmd+R',
          click: () => mainWindow.webContents.reload()
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom In',       role: 'zoomIn',       accelerator: 'Cmd+=' },
        { label: 'Zoom Out',      role: 'zoomOut',      accelerator: 'Cmd+-' },
        { label: 'Reset Zoom',    role: 'resetZoom',    accelerator: 'Cmd+0' },
        { type: 'separator' },
        { label: 'Full Screen',   role: 'togglefullscreen', accelerator: 'Cmd+F' },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut',           role: 'cut' },
        { label: 'Copy',          role: 'copy' },
        { label: 'Paste',         role: 'paste' },
        { label: 'Select All',    role: 'selectAll' },
      ]
    }
  ])

  Menu.setApplicationMenu(menu)

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Page loaded!')

    mainWindow.webContents.insertCSS(`
      .ytp-ad-overlay-container,
      .ytp-ad-text-overlay,
      .ytp-ad-image-overlay,
      .ytp-ad-message-container,
      ytmusic-mealbar-promo-renderer,
      ytmusic-statement-banner-renderer,
      ytmusic-interstitial-banner-renderer,
      tp-yt-paper-dialog,
      ytmusic-popup-container {
        display: none !important;
        pointer-events: none !important;
      }
    `)

    mainWindow.webContents.executeJavaScript(`
      setInterval(() => {
        const isAdPlaying =
          document.querySelector('.ad-showing') ||
          document.querySelector('.ytp-ad-playing')

        if (!isAdPlaying) return

        console.log('🚫 Ad detected!')

        const skipBtn = document.querySelector(
          '.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern'
        )
        if (skipBtn) {
          skipBtn.click()
          console.log('⏭️ Ad skipped!')
          return
        }

        const video = document.querySelector('video')
        if (video) {
          video.muted = true
          video.playbackRate = 16
        }
      }, 500)
    `)
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})