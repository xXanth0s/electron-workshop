import '../pollyfills'

const webivew = () => document.querySelector('webview');

const urlInput = () => document.getElementById('urlInput');

window.navbar = {
  back: () => webivew().canGoBack() && webivew().goBack(),
  forward: () => webivew().canGoForward() && webivew().goForward(),
  navigate: () => webivew().loadURL(urlInput().value),
}

const webivew = () => document.querySelector('webview');

webivew().canGoBack() && webivew().goBack();
webivew().canGoForward() && webivew().goForward();
webivew().loadURL('https://eis.de');
