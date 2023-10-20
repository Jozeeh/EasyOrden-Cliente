import { createStore } from 'vuex'

export default createStore({
  state: {

    qr: '',
    stateInicio: false,
    user:[

    ],

    productos:[
      {
        categoria: 'bebidas',
        nombre: 'Coca Cola', 
        descripcion:'una bebida azucarada gaseosa', 
        img:'https://www.coca-cola.com/content/dam/onexp/es/es/products/coca-cola-sabor-original/es_cc_original_750x750.jpg/width1960.jpg', 
        precio: 0.75
      },
      {
        categoria: 'bebidas',
        nombre: 'Pepsi',
        descripcion: 'Refresco de cola con sabor y burbujas',
        img: 'https://www.pepsi.com/en-us/refresh082123/images/cans/44341_Titan_Pep_Can_12oz_FR.png',
        precio: 0.80
      },
      {
        categoria: 'comidas',
        nombre: 'Pizza Margarita',
        descripcion: 'Pizza con salsa de tomate, mozzarella y albahaca',
        img: 'https://www.saborusa.com/hn/wp-content/uploads/sites/12/2019/11/Animate-a-disfrutar-una-deliciosa-pizza-de-salchicha-Foto-destacada.png',
        precio: 10.99
      },
      {
        categoria: 'postres',
        nombre: 'Pastel de Chocolate',
        descripcion: 'Pastel de chocolate decadente con glaseado',
        img: 'https://images.aws.nestle.recipes/original/2020_06_09T08_18_01_mrs_ImageRecipes_1810lrg.jpg',
        precio: 5.99
      },
      {
        categoria: 'otros',
        nombre: 'Pan con ajo',
        descripcion: 'Disfruta tu entradita con el delicioso pan co ajo',
        img: 'https://i.blogs.es/8e3bfe/pan_ajo/840_560.jpg',
        precio: 9.99
      }

    ],

    carrito:[
      {img: 'https://www.coca-cola.com/content/dam/onexp/es/es/products/coca-cola-sabor-original/es_cc_original_750x750.jpg/width1960.jpg', nombre:'Coca Cola', precio: 0.75},
      {img: 'https://www.coca-cola.com/content/dam/onexp/es/es/products/coca-cola-sabor-original/es_cc_original_750x750.jpg/width1960.jpg', nombre:'Coca Cola', precio: 0.75}
    ],

    pedidos:[

    ]
  },
  getters: {
  },
  mutations: {
    agregarCarrito(state, carrito){
      state.carrito.push(carrito)
    },

    eliminarProdCarrito(state, index){
      state.carrito.splice(index, 1)
    }
      
  },
  actions: {
    agregarCarritoAction(context, carrito){
      // Esta instrucción permite invocar una mutación
      context.commit('agregarCarrito', carrito)
      },
      eliminarProdCarritoAction(context, index){
      // Esta instrucción invocará una función definida en la propiedad actions
        context.commit('eliminarProdCarrito', index)
      }
  },
  modules: {
  }
})
