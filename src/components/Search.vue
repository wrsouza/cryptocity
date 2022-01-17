<template>
  <form @submit.prevent="search" class="search">
    <input type="text" v-model="searchInput" placeholder="search coin id" />
    <button type="submit" class="btn-search">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const searchInput = ref<string>('')

    return {
      setCoin: (value: string) => store.dispatch('Crypto/setCoin', value),
      searchInput
    }
  },

  methods: {
    async search() {
      await this.setCoin(this.searchInput)
      this.searchInput = ''
    }
  }
})
</script>
