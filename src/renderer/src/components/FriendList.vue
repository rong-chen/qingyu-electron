<template>
  <div class="friendList">
    <el-collapse v-for="item in props.data" :key="item.ID">
      <el-collapse-item :name="item.id">
        <template #title>
          <div style="display: flex; width: 100%; justify-content: space-between">
            {{ item.label }}
            <span style="font-size: 12px"> #{{ item.children.length }}人# </span>
          </div>
        </template>
        <template #default>
          <div v-for="item2 in item.children" :key="item2.ID">
            <ContextMenu :menu="['删除', '添加好友分类']" @select="CtClickHandler($event, item2)">
              <div
                class="item"
                :class="{
                  isActive: currentFriendId === item2.friendInfo.ID
                }"
                @click.stop.prevent="$emit('select', item2)"
              >
                {{ item2.friendInfo.nickname ? item2.friendInfo.nickname.slice(0, 16) : '' }}
              </div>
            </ContextMenu>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import ContextMenu from './contextMenu/index.vue'

const CtClickHandler = (e, item) => {
  console.log(e)
  console.log(item)
}
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  currentFriendId: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.friendList {
  .item {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
  }

  .isActive {
    background: #dcdcf8;
  }

  .item:hover {
    background: #dcdcf8;
  }
}
</style>

<style lang="scss">
.friendList {
  .el-collapse {
    background: transparent;
    border-top: none;
    --el-collapse-border-color: none;

    .el-collapse-item {
      box-sizing: border-box;
      width: 80%;
      margin: 0 auto;

      .el-collapse-item__wrap {
        background-color: transparent;
        border-bottom: none;
      }

      .el-collapse-item__header {
        background-color: transparent !important;
        border-bottom: none;
      }

      .el-collapse-item__content {
        background-color: transparent !important;
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  }
}
</style>
