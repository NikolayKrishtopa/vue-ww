import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// import MyButton from './components/UI/MyButton.vue'
// import ModalWindow from './components/UI/ModalWindow.vue'

const app = createApp(App)

// app.component('my-button', MyButton)
// app.component('modal-window', ModalWindow)

const widget = document.getElementsByTagName('weather-widget')[0]
const scale = widget.getAttribute('scale') || '1'

const rootNode = document.createElement('div')
rootNode.id = 'weather-widget'

widget.parentNode.replaceChild(rootNode, widget)
rootNode.style.transform = `scale(${scale}) translate(${
  (-(1 - scale) / 2 / scale) * 100
}%, ${(-(1 - scale) / 2 / scale) * 100}%)`

app.mount('#weather-widget')
