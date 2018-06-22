<template>
  <div :class="$style.style">
    <div class="banner autofix" style="padding-top:35%">
      <img src="//img1.qdingnet.com/817b612d38f4e625dbaa4efa1211b5f5.svg" />
    </div>

    <div class="list">
      <div class="item">
        <div class="avatar">
          <img width="20" src="//img1.qdingnet.com/905df3f57c25820deb603aab16953f31.svg" />
        </div>
        <div class="text">My Orders</div>
        <i class="icon text-gray">&#xe61a;</i>
      </div>
      <div class="item text-sm" ui-mode="15px 0px">
        <div class="text text-center">
          <img class="type" height="20" src="//img1.qdingnet.com/04dc0063f3d558f5fc6a3dd08cf9f4b4.svg" />
          <span>Unpaid</span>
        </div>
        <div class="text text-center">
          <img class="type" height="20" src="//img1.qdingnet.com/cf4cbc7ae775326fff2e140b2ee5615d.svg" />
          <span>Pending</span>
        </div>
        <div class="text text-center">
          <img class="type" height="20" src="//img1.qdingnet.com/332fb9a6da93718e31454a02d91f5d81.svg" />
          <span>Unshipped</span>
        </div>
        <div class="text text-center">
          <img class="type" height="20" src="//img1.qdingnet.com/749129670196058930d98d1a7160ebbd.svg" />
          <span>Shipped</span>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="item">
        <div class="avatar">
          <img width="20" src="//img1.qdingnet.com/b502929ba4aa2c52eb5fba8297d316f7.svg" />
        </div>
        <div class="text">Coupon</div>
        <i class="icon text-gray">&#xe61a;</i>
      </div>
    </div>

    <div class="list">
      <div class="item">
        <div class="avatar">
          <img width="20" src="//img1.qdingnet.com/cb2edead1678c2109df9453f1b1ee9a2.svg" />
        </div>
        <div class="text">Setting</div>
        <i class="icon text-gray">&#xe61a;</i>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" module>
:local(.style) {
  img.type {
    display: block;
    margin: 0 auto 3px;
  }
}
</style>
