// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  apiRequest: (channel: string, data: any) => {
    return ipcRenderer.invoke('api:request', channel, data);
  },
});
