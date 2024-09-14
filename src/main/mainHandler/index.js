import { app, BrowserWindow, ipcMain } from 'electron'

let AllWindows = []
app.whenReady().then(() => {
  ipcMain.on('closeWindow', (_, id) => {
    AllWindows = BrowserWindow.getAllWindows()
    let item = AllWindows.filter((item) => item['uid'] === id)[0]
    item.hide()
    item.close()
  })
  ipcMain.on('goToHomePage', (_, id) => {
    AllWindows = BrowserWindow.getAllWindows()
    let item = AllWindows.filter((item) => item['uid'] === id)[0]
    item.hide()
    item.setSize(960, 657)
    item.setMaximizable(true)
    item.center()
    item.setResizable(false)
    item.show()
  })
})
