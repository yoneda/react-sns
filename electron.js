const { app, BrowserWindow } = require("electron");

function createWindow() {
  // ブラウザウィンドウを作成
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:3000/login");
}

app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたときに終了します。
app.on("window-all-closed", () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  console.log("window-all-closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // macOSではユーザがドッグアイコンをクリックしたとき、
  // そのアプリのウィンドウがなかったら再生成する
  console.log("activate");
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
