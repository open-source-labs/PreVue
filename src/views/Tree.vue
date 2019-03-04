<template>
  <div class="container">
    <tree
      :data="tree"
      node-text="name"
      layoutType="euclidean"
      type="tree"
      :duration="0"
      :zoomable="true"
      radius="4"
    ></tree>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
export default {
  components: {
    tree
  },
  data() {
    return {
      tree: {
        name: 'father',
        children: [
          {
            name: 'son1',
            children: [
              {
                name: 'grandson',
                children: [
                  { name: 'great grandson' },
                  { name: 'great grandson 2' }
                ]
              },
              { name: 'grandson2' }
            ]
          },
          {
            name: 'son2',
            children: [{ name: 'grandson3' }, { name: 'grandson4' }]
          }
        ]
      }
    };
  }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 90%;
}
</style>
