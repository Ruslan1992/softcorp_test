<template>
  <div class="group_container p-3">
    <div class="card">
      <div
        class="card-header bg-seccondary d-flex align-items-center justify-content-between"
      >
        <h5 class="m-0">{{ title }}</h5>
        <div :class="toggleClass" @click="toggle"></div>
      </div>
      <div class="card-body" v-if="show">
        <Product v-for="good in goods" :key="good.id" :product="good" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

export default {
  name: 'Group',
  components: {
    Product
  },
  props: {
    title: {
      type: String,
      required: true,
      default: () => {}
    },
    goods: {
      type: Array,
      required: true,
      default: () => {}
    }
  },
  data: function() {
    return {
      show: true
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    }
  },
  computed: {
    toggleClass() {
      return this.show ? 'toggle' : 'toggle active'
    }
  }
}
</script>

<style lang="scss">
.group_container {
  page-break-inside: avoid;
  break-inside: avoid;
}
.toggle {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    border-radius: 2px;
  }
  &:after {
    background: #444;
    left: 0;
    width: 100%;
    height: 4px;
    top: calc(50% - 2px);
  }
  &.active {
    &:before {
      width: 4px;
      height: 100%;
      left: calc(50% - 2px);
      top: 0;
      background: #444;
    }
  }
}
</style>
