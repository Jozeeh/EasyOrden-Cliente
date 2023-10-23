import { createStore } from 'vuex'

export default createStore({
  state: {
    ipLocal: '',
    numeroMesa: '',
    qr: '',
    stateInicio: false,
    estadoSesion: false,
    datosUsuario: [],

    //Array de la lista de comidas a pedir
    carrito: []

  },
  getters: {
    getCarrito(state) {
      return state.carrito
    },
    getTotalCarrito(state) {
      const total = state.carrito.reduce((acumular, producto) => {
        return acumular + parseFloat(producto.precio);
      }, 0);

      return total.toFixed(2);
    }, 
    // Este es para mostrar la cantidad de productos que se han añadido al carrito
    getCantidadCarrito(state) {
      const cantidad = state.carrito.length
      return cantidad
    }

  },
  mutations: {
    agregarCarrito(state, nuevoProducto) {
      console.log(nuevoProducto)
      state.carrito.push(nuevoProducto)
    },
    eliminarCarrito(state){
      state.carrito = []
    },
    iniciarSesion(state){
      state.estadoSesion = true
      state.carrito = []
    },
    cerrarSesion(state){
      state.estadoSesion = false
      state.datosUsuario = []
      state.carrito = []
    }
        
  },
  actions: {
    agregarCarritoAccion(context, nuevoProducto){
      context.commit('agregarCarrito', nuevoProducto)
    },

    eliminarCarritoAccion(context){
      context.commit('eliminarCarrito')
    },

    iniciarSesionAccion(context){
      context.commit('iniciarSesion')
    },
    cerrarSesionAccion(context){
      context.commit('cerrarSesion')
    }

  }
})
