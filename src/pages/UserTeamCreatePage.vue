<template>
  <div id="userTeamCreatePage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>

    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();

const searchText = ref('');

const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const  listTeam = async (val = '') =>{
  const res = await  myAxios.get("/team/list/my/create" , {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    Toast.fail('加入隊伍失敗，請刷新試試');
  }
}


onMounted(   () => {
 listTeam();
})


const onSearch = (val) => {
 listTeam(val);
}

</script>

<style scoped>
#teamPage{

}

</style>