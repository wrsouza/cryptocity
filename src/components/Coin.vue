<template>
  <div :class="classCoinMonitor">
    <div class="coins-item-header">
      <div class="logotipo">
        <img :src="coin.image" class="logotipo-icon" />
        <div class="logotipo-text">
          <span class="logotipo-text-name">{{ coin.name }}</span>
          <strong class="logotipo-text-symbol">({{ coin.symbol }})</strong>
        </div>
      </div>
      <button @click="remove" title="Remover" class="btn-trash">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class="coins-item-prices">
      <div class="current-price">
        <span class="current-price-number">{{ currentPrice }}</span>
        <span class="current-price-text">({{ coin.status }})</span>
      </div>
      <div class="level-price">
        <div class="level-price-high">
          <span class="level-price-high-text">{{ highPrice }}</span>
          <span class="level-price-high-icon">
            <i class="fas fa-long-arrow-alt-up"></i>
          </span>
        </div>
        <div class="level-price-low">
          <span class="level-price-low-text">{{ lowPrice }}</span>
          <span class="level-price-low-icon">
            <i class="fas fa-long-arrow-alt-down"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="coins-item-monitor">
      <form @submit.prevent="updateMonitor">
        <div class="row">
          <div class="form-group">
            <label>Buy</label>
            <input type="text" v-model="limitBuy" @keypress="onlyNumber" />
          </div>
          <div class="form-group">
            <label>Sell</label>
            <input type="text" v-model="limitSell" @keypress="onlyNumber" />
          </div>
        </div>
        <button type="submit" :class="classBtnMonitor">
          {{ labelBtnMonitor }}
        </button>
      </form>
    </div>
    <div class="coins-item-swap">
      <span class="coins-item-swap-title">Coin Swap</span>
      <form @submit.prevent="addSwap">
        <div class="row">
          <div class="form-group">
            <label>Quantity</label>
            <input type="text" v-model="quantity" @keypress="onlyNumber" />
          </div>
          <div class="form-group">
            <label>Discount(%)</label>
            <input type="text" v-model="discount" @keypress="onlyNumber" />
          </div>
          <button type="submit" class="btn-swap">Ok</button>
        </div>
      </form>
      <table class="coins-item-swap-table">
        <thead>
          <tr>
            <th align="left">COIN SYMBOL</th>
            <th align="right">VALUE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left"><span class="symbol">BNB</span></td>
            <td align="right">
              <span class="value">{{ quantityBnb }}</span>
            </td>
          </tr>
          <tr>
            <td align="left"><span class="symbol">USD</span></td>
            <td align="right">
              <span class="value">{{ quantityUsd }}</span>
            </td>
          </tr>
          <tr>
            <td align="left"><span class="symbol">BRL</span></td>
            <td align="right">
              <span class="value">{{ quantityBrl }}</span>
            </td>
          </tr>
          <tr v-for="item in otherCoins" :key="item.id">
            <td align="left">
              <span class="symbol">{{ item.symbol }}</span>
            </td>
            <td align="right">
              <span class="value">{{
                formatter(calcSwap(item), item.symbol)
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <coinchart></coinchart>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import CoinChart from './CoinChart.vue'

export default defineComponent({
  props: {
    item: String
  },
  components: {
    coinchart: CoinChart
  },
  setup(props) {
    const { item } = toRefs(props)
    const store = useStore()
    const coinType = store.state.Crypto.coinType
    const coin = computed(() => store.getters['Crypto/getCoin'](item.value))
    const otherCoins = computed(() =>
      store.getters['Crypto/getFilteredCoins'](item.value)
    )
    return {
      coinType,
      coin,
      otherCoins,
      quantity: coin.value.quantity,
      discount: coin.value.discount,
      limitBuy: coin.value.limitBuy,
      limitSell: coin.value.limitSell,
      setSwap: (payload: SetSwapPayload) =>
        store.dispatch('Crypto/setSwap', payload),
      removeCoin: (id: string) => store.dispatch('Crypto/removeCoin', id),
      setMonitor: (payload: SetMonitorPayload) =>
        store.dispatch('Crypto/setMonitor', payload)
    }
  },
  computed: {
    currentPrice() {
      if (this.coin.currentPrice) {
        return this.formatter(
          this.coin.currentPrice[this.coinType],
          this.coinType
        )
      }
      return 0
    },
    highPrice() {
      if (this.coin.high24h) {
        return this.formatter(this.coin.high24h[this.coinType], this.coinType)
      }
      return 0
    },
    lowPrice() {
      if (this.coin.low24h) {
        return this.formatter(this.coin.low24h[this.coinType], this.coinType)
      }
      return 0
    },
    quantityBnb() {
      return this.formatter(this.calcQuantity('bnb'), 'bnb')
    },
    quantityBrl() {
      return this.formatter(this.calcQuantity('brl'), 'brl')
    },
    quantityUsd() {
      return this.formatter(this.calcQuantity('usd'), 'usd')
    },
    classBtnMonitor() {
      return this.coin.monitor ? 'btn-monitor dark' : 'btn-monitor'
    },
    labelBtnMonitor() {
      return this.coin.monitor ? 'Stop Monitor' : 'Start Monitor'
    },
    classCoinMonitor() {
      if (
        this.coin.monitor &&
        this.coin.currentPrice[this.coinType] <= this.limitBuy
      ) {
        return 'coins-item buy'
      }
      if (
        this.coin.monitor &&
        this.coin.currentPrice[this.coinType] >= this.limitSell
      ) {
        return 'coins-item sell'
      }
      return 'coins-item'
    }
  },
  methods: {
    onlyNumber(evt) {
      if (evt.type === 'paste') {
        key = evt.clipboardData.getData('text/plain')
      } else {
        var key = evt.keyCode || evt.which
        key = String.fromCharCode(key)
      }
      var regex = /[0-9]|\./
      if (!regex.test(key)) {
        evt.returnValue = false
        if (evt.preventDefault) evt.preventDefault()
      }
    },
    formatter(value: number, type: string) {
      const lang: string = type === 'usd' ? 'en' : 'pt-BR'
      const currency: string = type === 'usd' ? 'USD' : 'BRL'
      const fractionDigits: number = type === 'brl' || type === 'usd' ? 3 : 4
      const formatter = new Intl.NumberFormat(lang, {
        style: 'currency',
        currency,
        minimumFractionDigits: fractionDigits
      })

      if (type === 'usd') {
        return formatter.format(value).replace('$', '$ ').trim()
      }

      if (type === 'brl') {
        return formatter.format(value)
      }

      return formatter.format(value).replace('R$', '').trim()
    },
    calcQuantity(type: string) {
      const quantity = this.coin.quantity || 0
      const discount = this.coin.discount || 0
      const price = this.coin.currentPrice[type] || 0
      const total = quantity * price
      if (!total) {
        return 0
      }
      return total - (total / 100) * discount
    },
    addSwap() {
      const id = this.coin.id
      const quantity = Number(this.quantity) || 0
      const discount = Number(this.discount) || 0
      this.setSwap({ id, quantity, discount })
    },
    remove() {
      this.removeCoin(this.coin.id)
    },
    calcSwap(item: CryptoCoin) {
      const currentPrice = this.coin.currentPrice[this.coinType]
      const price = item.currentPrice[this.coinType]
      const quantity = this.coin.quantity || 0
      const discount = this.coin.discount || 0
      const total = quantity * currentPrice
      if (!total) {
        return 0
      }
      return (total - (total / 100) * discount) / price
    },
    updateMonitor() {
      const id = this.coin.id
      const limitBuy = this.limitBuy
      const limitSell = this.limitSell
      const monitor = limitBuy && limitSell ? !this.coin.monitor : false
      this.setMonitor({
        id,
        limitBuy,
        limitSell,
        monitor
      })
    }
  }
})
</script>
