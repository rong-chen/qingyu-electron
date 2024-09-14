const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('qingyu', {
  CloseWindow: (data) => ipcRenderer.send('closeWindow', data),
  GoToHomePage: (data) => ipcRenderer.send('goToHomePage',data),
})
