const { app, BrowserWindow } = require("electron");

function createWindow(){
  // ブラウザウィンドウを作成
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      webSecurity: false,
      nodeIntegration: true
    }
  })

  // index.htmlをロード
  // win.loadFile("index.html");
  // win.loadURL("http://localhost:3000");
  // またはローカルファイルをロード
  win.loadURL(`file://${__dirname}/../dist/index.html`);

  // 開発者ツールを開く
  // win.webContents.openDevTools();
}

// Electronが初期化処理とブラウザウィンドウの作成準備が完了したときに呼ばれる
// 一部のAPIはこのイベントが発生した後にのみ利用できる
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたときに終了します。
app.on("window-all-closed", ()=>{
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  console.log("window-all-closed");
  if(process.platform !== "darwin"){
    app.quit();
  }
})

app.on("activate", () => {
  // macOSではユーザがドッグアイコンをクリックしたとき、
  // そのアプリのウィンドウがなかったら再生成する
  console.log("activate");
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
})

// アプリ固有のメインプロセスコードを含めることができます。
// 別ファイルに分割しておいてここでrequireしてもよい。
