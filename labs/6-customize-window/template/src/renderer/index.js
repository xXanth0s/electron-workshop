import '../pollyfills'

const webivew = () => document.querySelector('webview');

const urlInput = () => document.getElementById('urlInput');

window.navbar = {
  back: () => webivew().canGoBack() && webivew().goBack(),
  forward: () => webivew().canGoForward() && webivew().goForward(),
  navigate: () => webivew().loadURL(urlInput().value),
}
