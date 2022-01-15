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
    <div>
      <span>{{ price }} ({{ percent?.toFixed(2) }})</span>
    </div>
    <div>
      <span>{{ low24h }}</span>
      <span> - </span>
      <span>{{ high24h }}</span>
    </div>
    <div>{{ status }}</div>
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
    const {
      name,
      symbol,
      image,
      price,
      high24h,
      low24h,
      quantity,
      status,
      percent
    } = toRefs(props)
    return {
      name,
      symbol,
      image,
      price,
      high24h,
      low24h,
      quantity,
      status,
      percent
    }
  }
})
</script>
