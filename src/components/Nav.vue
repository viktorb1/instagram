<script setup>
  import {RouterLink, useRouter} from "vue-router"
  import Container from "@/components/Container.vue"
  import {ref, watch} from "vue"
  import AuthModal from "@/components/AuthModal.vue"
  import {useUsersStore} from "@/stores/users.js"
  import { storeToRefs } from "pinia"

  const userStore = useUsersStore()
  const {user, loadingUser} = storeToRefs(userStore)

  const router = useRouter()
  const searchUsername = ref("")
  const isAuthenticated = ref(false)

  const onSearch = () => {
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
        searchUsername.value = ""
    }
  }

  const handleLogout = async () => {
    await userStore.handleLogout()
  }

  const goToUsersProfile = () => {
    router.push(`/profile/${user.value.username}`)
  }

</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
    <Container>
        <div class="nav-container">
            <div class="left-content">
                <RouterLink to="/">Instagram</RouterLink>
                <a-input-search
                    v-model:value="searchUsername"
                    placeholder="username..."
                    style="width: 200px"
                    @search="onSearch"
                />
            </div>
            <div v-if="!loadingUser">
                <div class="right-content" v-if="!user">
                    <AuthModal :isLogin="false"/>
                    <AuthModal :isLogin="true"/>
                </div>
                <div class="right-content" v-else>
                    <AButton type="primary" @click="goToUsersProfile">Profile</AButton>
                    <AButton type="primary" @click="handleLogout">Logout</AButton>
                </div>
            </div>
        </div>
    </Container>
</a-layout-header>
  </a-layout>
</template>

<style scoped>
    .nav-container  {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .left-content {
        display: flex;
        align-items: center;
    }
    
    .right-content {
        display: flex;
        align-items: center;
    }

    .right-content button {

        margin-left: 10px;
    }

     .left-content a {
        margin-right: 10px;
    }

</style>