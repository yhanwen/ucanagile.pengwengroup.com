<template>
<div class="node-labels-wrapper">
  <div class="list" v-if="nodeLabels.length">
    <span class="tag" v-for="label in nodeLabels" :key="label.label" @click="showLabelGraph(label.label)">
      {{label.label}} <em v-if="label.count">({{label.count}})</em>
    </span>
  </div>
  <div class="empty" v-else-if="loadingLabels">
    {{$t('ui.loading')}}...
  </div>
  <div class="empty" v-else>
    {{$t('ui.empty')}}
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('Connections', {
      nodeLabels: state => state.nodeLabels,
      loadingLabels: state => state.loadingLabels,
    }),

  },
  methods: {
    ...mapActions('Tabs', ['openNewTab']),
    showLabelGraph(label) {
      this.openNewTab({
        title: `NodeLabel#${label}`,
        component: 'query',
        props: {
          cypher: `MATCH (n:${label}) RETURN n LIMIT 100`,
        },
      });
    },
  },
};
</script>

<style lang="less">
@import '../../assets/styles/vars.less';
@import '../../assets/styles/mixins.less';

.node-labels-wrapper {
  .list {
    padding: 10px;
    .tag {
      font-size: 12px;
      margin: 0px 4px 4px 0;
      display: inline-block;
      padding: 0px 5px;
      border-radius: 3px;
      border: solid 1px fadeout(@green, 40);
      background: fadeout(@green, 94);
      color: fadeout(@white, 20);
      cursor: pointer;
      transition: all 0.4s;
      em {
        color: fadeout(@white, 60);;
        font-style: normal;
      }
      &:hover {
        background: fadeout(@white, 94);
        border: solid 1px fadeout(@white, 40);
        color: fadeout(@white, 0);
      }
    }
  }
  .empty {
    padding: 50px 0;
    text-align: center;
    color: @gray;
    font-size: 12px;
  }
}
</style>
