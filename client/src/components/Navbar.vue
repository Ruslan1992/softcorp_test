<template>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <div class="rate d-flex align-items-baseline">
      <span class="text-white">Текущий курс USD равен</span>

      <input
        type="number"
        class="form-control form-control-sm input-rate"
        v-model="rate.value"
        @input="changeRate"
      />

      <span class="text-white">руб.</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    changeRate(e) {
      this.$store.dispatch('changeRate', e.target.value)
    }
  },
  computed: {
    rate() {
      return this.$store.getters.getRate
    }
  }
}
</script>

<style lang="scss">
.form-control.input-rate {
  width: 70px;
  margin: 0 10px;
}
</style>
