const { app, BrowserWindow } = require('electron');
const path = require("path");


let mainWindow;

/* FONCTION QUI PREPARE LA CREATION D'UNE WINDOW */
function createWindow() {

    mainWindow = new BrowserWindow({
        frame: true, /* BAR NAV */
        title: "veille electronjs",
        width: 1318,
        height: 710,
        resizable: true,
        minWidth:577,
        minHeight:609,
        icon: path.join(__dirname, "/assets/logo.png"),
        webPreferences: {
            preload: path.join(__dirname, '/module/preload.js'),
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: false,
        }
    });

    mainWindow.setMenuBarVisibility(false); /* BAR NAV OLD */

    // mainWindow.loadURL("http://useritium.fr/connect.php").then(r => console.log("loadUrl", r)) /* CHARGEMENT SUR UNE URL */

    mainWindow.loadFile('index.html'); /* CHARGEMENT SUR UN FICHIER */


    // TITRE DE L'APP SUR L'OS
    mainWindow.webContents.on('page-title-updated', (event, title) => {
        mainWindow.setTitle('veille electronjs');
    });

}

/* AU CHARGEMENT DE L'APP */
app.whenReady().then(() => {

    createWindow();



})