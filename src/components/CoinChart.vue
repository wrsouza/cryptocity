<template>
  <svg viewBox="0 0 300 300">
    <polyline
      fill="none"
      stroke="#378bee"
      stroke-width="3"
      points="
       0,300
       10,250,
       20,280,
       30,230,
       40,250,
       50,220,
       60,230,
       70,200,
       80,210,
       90,170,
       100,175,
       110,120,
       120,150,
       130,180,
       140,200,
       150,150,
       160,175,
       170,120,
       180,135
       190,100,
       200,105,
       210,85,
       220,130,
       230,125,
       240,100,
       250,150,
       260,125,
       270,180,
       280,160,
       290,175,
       300,150"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Chart',
  mounted() {
    console.log('chart')
  }
})
</script>
