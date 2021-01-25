<template>
  <div id="app">
    <Navbar />
    <div class="page_body">
      <router-view />
      <div class="message" v-if="messages.isMessage">
        {{ messages.message }}
      </div>
      <div class="loading__wrapper" v-if="loading">
        <div class="lds-dual-ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    messages() {
      if (this.$store.state.message) {
        return {
          isMessage: true,
          message: this.$store.state.message
        }
      } else {
        return {
          isMessage: false
        }
      }
    },
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css');

.message {
  width: 240px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 4px;
}
.loading__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  z-index: 10;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
