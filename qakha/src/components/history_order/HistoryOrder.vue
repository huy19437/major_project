<template>
  <div class="container">
    <div class="page-header">
      <h1>{{ $t("historyOrders.title") }}</h1>
    </div>
    <div class="row" style="margin-bottom: 48px">
      <div class="col-12">
        <div class="row">
          <Content />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Content from "./Content.vue";
export default {
  components: {
    Content,
  },
};
</script>

<style lang="scss">
.pb-product-details-ul {
  list-style-type: none;
  padding-left: 0;
  color: black;
}

.pb-product-details-ul > li {
  padding-bottom: 5px;
  font-size: 15px;
}

#gradient {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#feffff+0,ddf1f9+31,a0d8ef+62 */
  background: #feffff; /* Old browsers */
  background: -moz-linear-gradient(
    left,
    #feffff 0%,
    #ddf1f9 31%,
    #a0d8ef 62%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    #feffff 0%,
    #ddf1f9 31%,
    #a0d8ef 62%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    #feffff 0%,
    #ddf1f9 31%,
    #a0d8ef 62%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#feffff', endColorstr='#a0d8ef',GradientType=1 ); /* IE6-9 */
  border: 1px solid #f2f2f2;
  padding: 20px;
}

#hits {
  border-right: 1px solid white;
  border-left: 1px solid white;
  vertical-align: middle;
  padding-top: 15px;
  font-size: 17px;
  color: white;
}

#fan {
  vertical-align: middle;
  padding-top: 15px;
  font-size: 17px;
  color: white;
}

.pb-product-details-fa > span {
  padding-top: 20px;
}

.tabs_div {
  width: 100%;
  border: 1px solid #ccc;
  .table {
    .success {
      background-color: #faa742;
    }
  }
  .tab-content {
    padding: 14px 14px 0;
  }
  ul {
    background-color: #ecedee;
    li {
      a {
        color: #6d6d6d;
      }
    }
  }
}
</style>