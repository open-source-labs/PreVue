<template>
  <tree
    :data="tree"
    node-text="name"
    layoutType="euclidean"
    type="tree"
    :duration="0"
    :zoomable="true"
    radius="4"
  ></tree>
</template>

<script>
import { tree } from 'vued3tree';
export default {
  name: 'Tree',
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
  },
  components: {
    tree
  }
};
</script>
