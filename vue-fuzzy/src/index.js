import TestComponent from './components/Test.vue'

function install (App,options) {
  App.component(TestComponent.name, TestComponent)
}

export default {
  install
}
