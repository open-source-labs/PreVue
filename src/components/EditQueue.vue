<template>
  <div>
    <!-- <p class="panel-heading">selected elements</p>
    <draggable
      v-model="renderList"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <li
        class="list-group-item"
        v-for="(element, index) in renderList"
        :key="index + Date.now()"
      >
        <span>{{ element }}</span>

        <i class="fas fa-save fa-lg" @click="deleteElement(index)"></i>
      </li>
    </draggable>-->
    <p class="panel-heading">Selected Elements</p>
    <Tree :data="renderList" draggable="draggable" @change="convert">
      <div slot-scope="{ data }" class="white --text">
        <template v-if="!data.isDragPlaceHolder">
          <span>{{ data.text }}</span>
          <i class="fas fa-save fa-lg" @click="deleteElement(data._id)"></i>
        </template>
      </div>
    </Tree>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { DraggableTree } from 'vue-draggable-nested-tree';
import { mapState, mapActions } from 'vuex';
import {
  setClickedElementList,
  deleteFromComponentHtmlList,
  setComponentHtmlList,
  addToComponentElementList
} from '../store/types';

export default {
  name: 'EditQueue',
  props: {
    name: {
      type: String
    }
  },
  data: function() {
    return {
      listToRender: null
    };
  },
  computed: {
    ...mapState(['componentMap', 'activeComponent', 'routes', 'activeRoute']),
    renderList: {
      get() {
        return this.componentMap[this.activeComponent].htmlList;
      },
      set(newArr) {
        console.log('SET', newArr);
        this.setClickedElementList(newArr);
      }
    }
  },
  methods: {
    ...mapActions([setClickedElementList]),
    deleteElement(id) {
      //console.log(element);
      this.$store.dispatch(deleteFromComponentHtmlList, id);
    },
    convert() {
      console.log('CONVERT CALLED');
      let list = this.componentMap[this.activeComponent].htmlList;
      console.log(list);
      this.parseAndDelete(list);
    },
    parseAndDelete(htmlList) {
      htmlList.forEach(element => {
        if (element.children.length > 0) {
          console.log('in recurse');
          this.parseAndDelete(element.children);
        }
        delete element._vm;
        delete element.parent;
        delete element.open;
        delete element.active;
        delete element.style;
        delete element.class;
        delete element.innerStyle;
        delete element.innerClass;
        delete element.innerBackStyle;
        delete element.innerBackClass;
      });
    }
  },
  components: {
    draggable,
    Tree: DraggableTree
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.list-group-item {
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 0.5cm;
  background-color: #d1bfa7;
}

.delete-icon:hover {
  cursor: pointer;
}
</style>
