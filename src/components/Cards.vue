<script setup>
    import Card from "@/components/Card.vue"
    import { supabase } from "../supabase"
    import { storeToRefs } from "pinia"
    import { onMounted, ref } from "vue"
    import { useUsersStore } from "../stores/users"
    import Observer from "./Observer.vue"

    const userStore = useUsersStore()
    const {user} = storeToRefs(userStore)
    const lastCardIndex = ref(2)
    const ownerIds = ref([])
    const posts = ref([])
    const reachEnd = ref(false)

    const fetchData = async () => { 
        const {data: followings} = await supabase.from("followers_following").select("following_id").eq("follower_id", user.value.id).range(0, lastCardIndex.value).order("created_at", {ascending: false})
        
        ownerIds.value = followings.map(f => f.following_id)
        const {data} = await supabase.from("posts").select().in('owner_id', ownerIds.value)
        posts.value = data
    }

    const fetchNextSet = async () => {
        if (!reachEnd.value) {            
            const {data} = await supabase.from("followers_following").select("following_id").eq("follower_id", user.value.id).range(lastCardIndex.value + 1, lastCardIndex.value + 3).order("created_at", {ascending: false})

            posts.value = [
                ...posts.value,
                ...data
            ]

            lastCardIndex.value = lastCardIndex.value + 3

            if (data.length === 0) {
                reachEnd.value = true
            }
        }

    }   

    onMounted(async () => {
        await fetchData()
    })
</script>

<template>
    <div v-if="user" class="timeline-container">
        <Card 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"/>
        <Observer v-if="posts.length" @intersect="fetchNextSet" />
    </div>
</template>