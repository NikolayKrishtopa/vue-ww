import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// import MyButton from './components/UI/MyButton.vue'
// import ModalWindow from './components/UI/ModalWindow.vue'

const app = createApp(App)

// app.component('my-button', MyButton)
// app.component('modal-window', ModalWindow)

const widget = document.getElementsByTagName('weather-widget')[0]

const rootNode = document.createElement('div')
rootNode.id = 'app'
rootNode.classList.add('page')
widget.parentNode.replaceChild(rootNode, widget)

app.mount('#app')
