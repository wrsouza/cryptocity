<template>
  <div>
    <search />
    <div class="coins-list">
      <coin v-for="item in coins" :key="item" :item="item"></coin>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Coin from '~/components/Coin.vue'
import Search from '~/components/Search.vue'
import { dataRead } from '~/utils'

export default defineComponent({
  components: {
    Coin,
    Search
  },
  setup() {
    const store = useStore()
    return {
      coins: computed(() => store.getters['Crypto/getIds']),
      setCoin: (id: string) => store.dispatch('Crypto/setCoin', id),
      updateCoins: (payload: CryptoCoin[]) =>
        store.dispatch('Crypto/updateCoins', payload)
    }
  },
  methods: {
    async update() {
      for (let coinId of this.coins) {
        await this.setCoin(coinId)
      }
      setTimeout(() => this.update(), 1000 * 90)
    }
  },
  mounted() {
    const coins = dataRead('cryptos')
    if (coins) {
      this.updateCoins(coins)
    }
    setTimeout(() => this.update(), 1000)
    Notification.requestPermission().then(result => {
      if (result === 'granted') {
        // alert('Thanks, you will receive buy or sell notification!')
      }
    })
  }
})
</script>
