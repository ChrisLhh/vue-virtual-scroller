function debounce (fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
export default {
  name: 'VirtualScoller',
  props: {
    size: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    cache: {
      type: Number
    }
  },
  data () {
    return {
      paddingTop: 0,
      start: 0,
      end: this.count
    }
  },
  methods: {
    bindListener () {
      let con = document.querySelectorAll('.container')[0]
      con.addEventListener('scroll', debounce(this.handleScroll, 500), false)
    },
    handleScroll (e) {
      debugger
      this.paddingTop = e.target.scrollTop
      this.compute(this.paddingTop)
    },
    compute (top) {
      this.start = Math.floor(top / this.size)
      this.end = this.start + this.size
    }
  },
  mounted () {
    this.bindListener()
  },
  render (h) {
    let slots = this.$slots.default
    return h('div', {
      class: 'container',
      style: {
        height: `${this.size * this.count}px`,
        overflow: 'auto'
      }
    }, [h('div', {
      style: {
        height: `${this.size * slots.length}px`
      }
    }, [h('div', {
      style: {
        paddingTop: `${this.paddingTop}px`
      }
    }, slots.slice(this.start, this.end))])])
  }
}
