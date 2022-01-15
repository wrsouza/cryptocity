<template>
  <div>
    <h1>About</h1>
    <div>{{ counter }}</div>
    <div>
      <button @click="add">+</button>
      <button @click="rem">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    return {
      counter: computed(() => store.getters['Counter/counter']),
      setCounter: (value: number) => store.dispatch('Counter/setCounter', value)
    }
  },
  methods: {
    add() {
      this.setCounter(this.counter + 1)
    },
    rem() {
      this.setCounter(this.counter - 1)
    }
  }
})
</script>
