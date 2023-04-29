<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1 " description="搜索结果为空"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import {Toast} from "vant";

const route = useRoute()
import qs from 'qs';
import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
      const userListData = await myAxios.get('/user/search/tags', {
        params: {
          tagNameList: tags
        },
        paramsSerializer: params => {
          return qs.stringify(params, {indices: false})
        }
      })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
      console.log(userListData)
      if (userListData) {
        userListData.forEach(user => {
          if (user.tags) {
            user.tags = JSON.parse(user.tags);
          }
        })
        userList.value = userListData;
      }
})

/*


const mockUser = {
  id: 123456,
  username: '鱼皮',
  userAccount: '123456',
  profile: '普通人 普通过 会心动 会难过 会感动 会生气 想好好生活',
  avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
  gender: 0,
  phone: '123112312',
  email: '12345@qq.com',
  userRole: 0,
  planetCode: '1234',
  tags: ['java','emo','打工中'],
  createTime: new Date(),
}
*/

</script>

<style scoped>

</style>