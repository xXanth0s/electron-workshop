# LAB 3: Kommunikation

## Aufgaben
- Lade die ToDo-Tasks vom Main Prozess
- Benachrichtige den Main Prozess, wenn ToDo-Task getoggelt wurde und aktualisiere die Tasks entsprechend
- Achte auf die Korrekte Verwendung von Invoke und Send


## Hints

### Fenster im MainController schließen

```javascript
ipcMain.on(MESSAGE, (event, args) => {
    BrowserWindow.fromWebContents(event.sender).close();
})
```


### IPC Message an BrowserWindow senden

```javascript
BROWSER_WINDOW_INSTANCE.send(message.type, (data) => {
    // your code here
});
```
 


