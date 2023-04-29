<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"/>
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeId.length === 0">请选择标签</div>
  <van-row gutter="20"  style="padding: 0 20px">
    <van-col v-for="tag in activeId">
    <van-tag   closeable size="small" type="primary" @close="doClose(tag)">
      {{ tag }}
    </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left" >选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button block type="primary"  @click="doSearchResult">搜索</van-button>
  </div>


</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()

const originTagList = [{
  text: '性别',
  children: [
    {text: '男', id: '男'},
    {text: '女', id: '女'},
  ],
},
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大3', id: '大3'},
      {text: '大4', id: '大4'},
      {text: '大5', id: '大5aaaaaaa'},
      {text: '大6', id: '大6aaaaaaa'},
    ],
  },
]

// 标签列表
let tagList = ref(originTagList);


const searchText = ref('');

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });

}


const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

const activeId = ref([]);
const activeIndex = ref(0);

//移出标签
const doClose = (tag) =>{
  activeId.value = activeId.value.filter(item =>{
    return item !==  tag;
  })
}


const doSearchResult = () =>{
  router.push({
    path: '/user/list',
    query: {
      tags: activeId.value
    }
  })
}

</script>

<style scoped>

</style>