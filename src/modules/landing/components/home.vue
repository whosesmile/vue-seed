<template>
  <div :class="$style.style" v-if="list.length">
    <div class="banner">
      <ex-swipe style="padding-top: 50%;" :list="images"/>
    </div>

    <div class="list" v-for="items in list" :key="items.text">
      <div class="item">
        <div class="text">{{items.text}}</div>
        <router-link class="text-sm link" v-if="items.subList.length > 2" :to="{path:'/product/category', query:{type: items.text}}">More</router-link>
      </div>
      <router-link class="item" v-for="(item, idx) in items.subList.slice(0,2)" :key="idx" :to="`/product/details/${item.productId}`">
        <div class="avatar" :class="{soldout: item.productStatus === 4}">
          <img width="120" height="95" :src="item.img" />
        </div>
        <div class="text">
          <h4>{{item.name}}</h4>
          <div class="brief" ui-mode="2">{{item.description}}</div>
          <div class="price text-primary">${{item.price}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('landing/home');
export default {
  data() {
    let images = [{ src: '//img1.qdingnet.com/3a906e27d91567e606db5a5582805ff2.png' }, { src: '//img1.qdingnet.com/9c343e9562b683b825e9bdec584c174e.png' }, { src: '//img1.qdingnet.com/46151c02ffd04eef688470a435a4b427.png' }];
    return { images };
  },
  computed: {
    ...mapState(['list'])
  },
  mounted() {
    this.listItems();
  },
  methods: {
    ...mapActions(['listItems'])
  }
};
</script>
<style lang="less" module>
:local(.style) {
  .price {
    margin-top: 5px;
  }
  .list .icon img {
    display: block;
  }
  .avatar.soldout {
    img {
      filter: grayscale(1);
    }
    &:after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent url(//img1.qdingnet.com/ab4f49725e394e3a045a404d29301bf4.svg) 0 0 no-repeat;
      background-size: cover;
    }
  }
}
</style>
