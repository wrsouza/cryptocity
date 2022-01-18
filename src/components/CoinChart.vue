<template>
  <div class="coins-item-chart">
    <svg viewBox="0 0 300 180">
      <polyline
        fill="none"
        stroke="#378bee"
        stroke-width="2"
        :points="points"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'Chart',
  props: {
    points: String
  },
  setup(props) {
    const { points } = toRefs(props)
    return {
      points
    }
  },
  mounted() {
    console.log('chart')
  }
})
</script>
