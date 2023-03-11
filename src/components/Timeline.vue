<script setup>
import Container from "@/components/Container.vue"
import Card from "@/components/Card.vue"

const data = [
    {
        id: 1,
        username: "selena",
        url: "https://pbs.twimg.com/profile_images/1599831054881374224/sx4KqXNX.jpg",
        caption: "goodbye haters"
    },
    {
        id: 2,
        username: "the weekend",
        url: "https://pbs.twimg.com/profile_images/1231654468657106944/9T8eZfpa_400x400.jpg",
        caption: "hey guys"
    }
]
</script>

<template>
    <Container>
        <div class="timeline-container">
            <Card 
            v-for="post in data" 
            :key="post.id" 
            :post="post"/>
        </div>
    </Container>
</template>


<style scoped>
    .timeline-container {
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }
</style>