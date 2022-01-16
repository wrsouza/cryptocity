<template>
  <div class="coins-item">
    <div class="coins-item-header">
      <div class="logotipo">
        <img :src="image" class="logotipo-icon" />
        <div class="logotipo-text">
          <span class="logotipo-text-name">{{ name }}</span>
          <strong class="logotipo-text-symbol">({{ symbol }})</strong>
        </div>
      </div>
      <button title="Remover" class="btn-trash">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <div class="coins-item-prices">
      <div class="current-price">
        <span class="current-price-number">{{ price }}</span>
        <span class="current-price-text">({{ status }})</span>
      </div>
      <div class="level-price">
        <div class="level-price-high">
          <span class="level-price-high-text">{{ high24h }}</span>
          <span class="level-price-high-icon">
            <i class="fas fa-long-arrow-alt-up"></i>
          </span>
        </div>
        <div class="level-price-low">
          <span class="level-price-low-text">{{ low24h }}</span>
          <span class="level-price-low-icon">
            <i class="fas fa-long-arrow-alt-down"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="coins-item-monitor">
      <form>
        <div class="row">
          <div class="form-group">
            <label>Buy</label>
            <input type="text" />
          </div>
          <div class="form-group">
            <label>Sell</label>
            <input type="text" />
          </div>
        </div>
        <button type="submit" class="btn-monitor">Start Monitor</button>
      </form>
    </div>
    <div class="coins-item-swap">
      <span class="coins-item-swap-title">Coin Swap</span>
      <form>
        <div class="row">
          <div class="form-group">
            <label>Quantity</label>
            <input type="text" />
          </div>
          <div class="form-group">
            <label>Discount(%)</label>
            <input type="text" />
          </div>
          <button type="submit" class="btn-swap">Ok</button>
        </div>
      </form>
      <table class="coin-item-swap-table">
        <thead>
          <tr>
            <th>COIN SYMBOL</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BNB</td>
            <td>0.47</td>
          </tr>
          <tr>
            <td>USD</td>
            <td>0.47</td>
          </tr>
          <tr>
            <td>BRL</td>
            <td>0.47</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { toRefs } from 'vue'

export default defineComponent({
  props: {
    name: String,
    symbol: String,
    image: String,
    price: Number,
    high24h: Number,
    low24h: Number,
    quantity: Number,
    status: String,
    percent: Number
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>
