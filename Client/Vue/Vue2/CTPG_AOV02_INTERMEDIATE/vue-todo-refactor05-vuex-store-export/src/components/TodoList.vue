<template>
  <div>
    <transition-group name="list" tag="ul">
      <li class="shadow" v-for="(todoItem, index) in this.todoItems" v-bind:key="index">
        <i class="fas fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}"
          v-on:click="toggleComplete({ todoItem, index })">
        </i>
        <span v-bind:class="{textCompleted: todoItem.completed}">
          {{ todoItem.item }}
        </span>
        <!-- <span class="removeBtn" v-on:click="removeTodo(todoItem, index)"> -->
        <span class="removeBtn" v-on:click="removeTodo({ todoItem, index })">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    // todoItems() {
    //   return this.$store.getters.storedTodoItems
    // }

    // ...mapGetters(['storedTodoItems'])

    ...mapGetters({
      todoItems: 'storedTodoItems',
    })
  },
  methods: {
    // removeTodo(todoItem, index) {
    //   this.$store.commit('removeOneItem', { todoItem, index })
    // },
    // toggleComplete(todoItem, index) {
    //   this.$store.commit('toggleOneItem', { todoItem, index })
    // },
    ...mapMutations({
      removeTodo: 'removeOneItem',
      toggleComplete: 'toggleOneItem',
    }),
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
/* .list-leave-active below version 2.1.8 */
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>