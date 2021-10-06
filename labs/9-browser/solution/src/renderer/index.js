import '../pollyfills'

const webview = () => document.querySelector('webview');

const urlInput = () => document.getElementById('urlInput');

window.navbar = {
  back: () => webview().canGoBack() && webview().goBack(),
  forward: () => webview().canGoForward() && webview().goForward(),
  navigate: () => webview().loadURL(urlInput().value),
}
