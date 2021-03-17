import '../pollyfills'
import { startVideoMessage } from '../messages/messages.creator';

const webview = () => document.querySelector('webview');

const urlInput = () => document.getElementById('urlInput');

webview().addEventListener('dom-ready', () => {
  webview().openDevTools();
  webview().send(startVideoMessage.type, startVideoMessage())
})

window.navbar = {
  back: () => webview().canGoBack() && webview().goBack(),
  forward: () => webview().canGoForward() && webview().goForward(),
  navigate: () => webview().loadURL(urlInput().value),
}
