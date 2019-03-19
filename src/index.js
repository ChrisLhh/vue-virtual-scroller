function debounce (fn, delay) {
  delay = delay || 0
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
  name: 'virtualScoller',
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
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      paddingTop: 0,
      start: 0,
      end: 0,
      range: this.count + (this.cache || 0)
    }
  },
  methods: {
    bindListener () {
      let con = document.querySelectorAll('.container')[0]
      con.addEventListener('scroll', debounce(this.handleScroll), false)
    },
    handleScroll (e) {
      this.compute(e.target.scrollTop)
    },
    compute (top) {
      let newStart = Math.ceil(top / this.size)
      if (!this.inCache(newStart)) {
        this.paddingTop = top
        this.start = newStart
        this.end = this.start + this.range
      }
    },
    inCache (newStart) {
      return newStart > this.start && newStart + this.count < this.end
    }
  },
  created () {
    this.end = this.start + this.range
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
