import { ipcRenderer } from 'electron';
import { startVideoMessage } from '../messages/messages.creator';

console.log('preload script')
ipcRenderer.on(startVideoMessage.type, () => {
  console.log('message received')
  document.querySelectorAll('video').forEach(video => video.play())
})
