<script setup>
import Container from "@/components/Container.vue"
import UserBar from "@/components/UserBar.vue"
import ImageGallery from "./ImageGallery.vue";
import {ref, onMounted} from "vue"
import {supabase} from "../supabase"
import { useRoute } from "vue-router";

const route = useRoute()
const {username} = route.params
const posts = ref([])
const user = ref(null)
const loading = ref(false)

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    const {data: userData} = await supabase.from("users").select().eq('username', username).single()
    
    if (userData) {
        user.value = userData
    } else {
        loading.value = false
        return user.value = null
    }

    const {data: postsData} = await supabase.from("posts").select().eq("owner_id", user.value.id)
    posts.value = postsData
    loading.value = false

}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar :user="user" :key="$route.params.username" :addNewPost="addNewPost" :userInfo="{posts: 4, followers: 100, following: 342 }"/>
            <ImageGallery :posts="posts"></ImageGallery>
        </div>
        <div class="spinner" v-else>
            <ASpin />
        </div>
    </Container>
</template>



<style scoped>
    .profile-container {
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: left;
        padding: 20px 0;
    }

    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 85vh;
    }
</style>