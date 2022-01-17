<template>
  <div>
    <h1>Home</h1>
    <div>{{ counter }}</div>
    <div>
      <button @click="add">+</button>
      <button @click="rem">-</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
  name: 'Home',
  setup() {},
  computed: {
    ...mapGetters('Counter', ['counter'])
  },
  methods: {
    ...mapActions('Counter', ['setCounter']),
    add() {
      this.setCounter(this.counter + 1)
    },
    rem() {
      this.setCounter(this.counter - 1)
    }
  },
  mounted() {}
})
</script>
