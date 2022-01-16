<template>
  <div>
    <h1>Cryptos</h1>
    <div class="coins-list">
      <coin
        v-for="item in coins"
        :key="item.id"
        :name="item.name"
        :symbol="item.symbol"
        :image="item.image"
        :price="item.price"
        :high24h="item.high24h"
        :low24h="item.low24h"
        :quantity="item.quantity"
        :status="item.status"
        :percent="item.percent"
      ></coin>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Coin from '~/components/Coin.vue'

export default defineComponent({
  components: {
    Coin
  },
  setup() {
    const store = useStore()
    return {
      coins: computed(() => store.getters['Crypto/coins']),
      setCoin: (value: string) => store.dispatch('Crypto/setCoin', value)
    }
  },
  mounted() {
    for (let coin of this.coins) {
      this.setCoin(coin.id)
    }
  }
})
</script>
