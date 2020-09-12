import vuex from 'vuex'
import vue from 'vue'
import Product from './Product'
import Path from './Path'
import Notif from './Notif'
import Cart from './Cart'
import Setting from './Setting'
import Auth from './Auth'

vue.use(vuex)

const store = new vuex.Store({
  modules: {
    product: Product,
    path: Path,
    notif: Notif,
    cart: Cart,
    setting: Setting,
    auth: Auth
  }
})

export default store