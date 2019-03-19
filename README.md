# vue-virtual-scroller

### Use

```
<template>
  <div id="app">
    <virtual-scroller :size="20" :count="10" :cache="20">
      <div class="list-item" v-for="(item, index) in list" :key="index" v-text="item"></div>
    </virtual-scroller>
  </div>
</template>
<style scoped>
  .list-item {
    width: 20px;
    height: 20px;
  }
</style>
<script>
import virtualScroller from './src/index.js'
export default {
  name: 'App',
  components: {
    virtualScroller
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    for (let i = 0; i < 10000; i++) {
      this.list.push(i)
    }
  }
}
</script>
```

### Props

prop  | Description
---   | ---
size  | item height
count | how many item can show
cache | cache count