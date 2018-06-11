<template>
  <div :class="$style.style" :style="{minHeight: height}">
    <aside>
      <a class="item" :class="{active: category==='all'}" @click="setCategory({category:'all'})">
        <span>All products</span>
      </a>
      <a class="item" v-for="item in list" :key="item.text" :class="{active: category===item.text}" @click="setCategory({category:item.text})">
        <span>{{item.text}}</span>
      </a>
    </aside>
    <section class="products">
      <router-link class="item" v-for="(item, idx) in items" :key="idx" :to="`/product/details/${item.productId}`">
        <img width="80" height="63" :src="item.img" />
        <p class="text-dark text-ts">{{item.name}}</p>
      </router-link>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('landing/home');
export default {
  data() {
    return {
      height: this.getHeight()
    };
  },
  computed: {
    ...mapState(['category', 'list']),
    items: function() {
      return this.list
        .reduce((box, item) => {
          if (this.category === 'all' || this.category === item.text) {
            return box.concat(item.subList);
          }
          return box;
        }, [])
        .sort((a, b) => {
          if (Number(a.price) > Number(b.price)) {
            return -1;
          } else if (Number(a.price) < Number(b.price)) {
            return 1;
          }
          return 0;
        });
    }
  },
  mounted() {
    window.addEventListener('resize', this.listener);
    this.listItems();
  },
  destroyed() {
    window.removeEventListener('resize', this.listener);
  },
  methods: {
    ...mapActions(['listItems', 'setCategory']),
    getHeight() {
      return document.documentElement.clientHeight - 44 - 50 + 'px';
    },
    listener() {
      console.log(this);
      this.height = this.getHeight();
    }
  }
};
</script>
<style lang="less" module>
:local(.style) {
  position: relative;
  background: #fff;
  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #f7f7f7;
    width: 120px;
    font-size: 14px;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .item {
      display: flex;
      text-align: center;
      align-items: center;
      min-height: 50px;
      padding: 0 10px;
      line-height: 1.2;
      span {
        margin: auto;
      }
      &:active {
        background-color: #eee;
      }
      &.active {
        background-color: #fff;
        box-shadow: inset 0.8vw 0 0 #529bd7;
      }
    }
  }
  .products {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 120px;
    right: 0;
    background: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .item {
      float: left;
      text-align: center;
      width: 50%;
      padding: 8px 8px 12px;
      &:active {
        background-color: #eee;
      }
      img {
        display: block;
        margin: auto;
      }
      p {
        margin-top: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 38px;
        overflow: hidden;
      }
    }
  }
}
</style>
