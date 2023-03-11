<script setup>
import Container from "@/components/Container.vue"
import UserBar from "@/components/UserBar.vue"
import ImageGallery from "./ImageGallery.vue";
import {ref, onMounted, watch, reactive} from "vue"
import {supabase} from "../supabase"
import { useRoute } from "vue-router";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from "pinia";

const route = useRoute()
const {username} = route.params
const posts = ref([])
const user = ref(null)
const loading = ref(false)
const isFollowing = ref(false)
const userStore = useUsersStore()
const {user: loggedInUser} = storeToRefs(userStore)
const userInfo = reactive({posts: null, followers: null, following: null})

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
    await fetchIsFollowing()
    const followerCount = await fetchFollowersCount()
    const followingCount = await fetchFollowingCount()
    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false
}

const updateIsFollowing = (follow) => {
    isFollowing.value = follow
}

const fetchIsFollowing = async () => {
    if (loggedInUser.value && (loggedInUser.value.id != user.value.id)) {
        const {data} = await supabase.from("followers_following").select().eq("follower_id", loggedInUser.value.id).eq("following_id", user.value.id).single()
        if (data)
            isFollowing.value = true
    }
}

const fetchFollowersCount = async () => {
    const {count} = await supabase.from("followers_following").select("*", {count: 'exact'}).eq("following_id", user.value.id)
    return count
}

const fetchFollowingCount = async () => {
    const {count} = await supabase.from("followers_following").select("*", {count: 'exact'}).eq("follower_id", user.value.id)
    return count
}

watch(loggedInUser, async () => {
    await fetchIsFollowing()
})

onMounted(() => {
    fetchData()
})
</script>

<template>
    <Container>
        <div class="profile-container" v-if="!loading">
            <UserBar :updateIsFollowing="updateIsFollowing" :isFollowing="isFollowing" :user="user" :key="$route.params.username" :addNewPost="addNewPost" :userInfo="userInfo"/>
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