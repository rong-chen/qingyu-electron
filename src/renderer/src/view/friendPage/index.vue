<template>
  <div class="voiceClass-container">
    <div class="friend-container">
      <div class="left-container">
        <div class="title ellipsis">
          用户id:123213213
          <span>
            <el-button link style="margin-left: 10px" @click="copyUserId">
              <template #icon>
                <el-icon color="white"><CopyDocument /></el-icon>
              </template>
            </el-button>
          </span>
        </div>

        <div class="classify infinite-list" style="overflow: auto">
          <FriendList
            :data="classifyList"
            :current-friend-id="currentFriendChat?.ID"
            @select="clickItem"
          ></FriendList>
        </div>
      </div>
    </div>
    <div style="width: calc(100% - 200px)">
      <chatPage :info="currentFriendChat"></chatPage>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { userStore } from '@/store/user.js'
import chatPage from '@/components/chatPage/index.vue'
import { getClassifyList, SearchAllFriends } from '@/api/friends.js'
import FriendList from '@/components/FriendList.vue'

let currentFriendChat = ref({
  ID: ''
})
const clickItem = (item) => {
  currentFriendChat.value = item.friendInfo
}

const classifyList = ref([
  {
    label: '无分类',
    id: 0,
    children: []
  }
])
onMounted(async () => {
  await getClassifyList().then(async (res) => {
    const { code, data } = res
    if (code === 0) {
      data.forEach((item) => {
        classifyList.value.push({
          label: item.label,
          id: item.ID,
          children: []
        })
      })
      let res = await SearchAllFriends()
      if (res.code === 0) {
        classifyList.value.forEach((item, index) => {
          item.children = res.data.filter((item2) => {
            return item2['classifyId'] === item.id
          })
        })
      }
    }
  })
})

const copyUserId = () => {
  // navigator.clipboard.writeText(userEvent.userInfo.ID)
}
</script>

<style scoped lang="scss">
.voiceClass-container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;

  .friend-container {
    width: 200px;
    height: 100%;
  }

  .left-container {
    box-sizing: border-box;
    border-right: 1px solid white;
    height: 100%;

    .classify {
      height: calc(100% - 56px);
      width: 100%;
      background: #f6f6f6;
    }

    .title {
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid white;
      border-top-left-radius: 20px;
      box-sizing: border-box;
    }
  }
}
</style>

<style>
.voiceClass-container {
  .el-tree {
    background: transparent;
  }

  .el-tree-node__content:hover {
    background: transparent;
  }

  .el-tree-node:focus > .el-tree-node__content {
    background: transparent;
  }
}
</style>
