<template>
    <div class="infoUserTop">
      <!-- <img :src="store.user.data.profile.avatarUrl" alt="" class="profileimg" />
      <div class="name">{{ store.user.data.profile.nickname }}</div> -->
    </div>
</template>
<script>
import { mapMutations,mapState } from 'vuex';
import { useStore } from 'vuex';
export default{
    setup(){
    const store = useStore()
    const user = localStorage.getItem('user')
    console.log(user)
    },
    computed: {
        ...mapState([
          'user',
        ])
    },
  };
</script>
<style lang="less" scoped>
    .infoUserTop {
      width: 100%;
      height: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    .profileimg {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .name{
        font-weight: 700;
        font-size: .4rem;
    }
  }
  </style>