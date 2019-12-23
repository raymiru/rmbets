import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ store }) => {
  Vue.use(
    VueSocketIO,
    io('http://localhost:3200', {
      transports: ['websocket'],
      query: {
        service: 'client',
        username: localStorage['username']
      }
    }),
    { store }
  )

}


