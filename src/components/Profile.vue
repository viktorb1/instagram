<script setup>
import Container from "@/components/Container.vue"
import UserBar from "@/components/UserBar.vue"
import ImageGallery from "./ImageGallery.vue";

</script>

<template>
    <Container>
        <div class="profile-container">
            <UserBar :key="$route.params.username" username="laithharb" :userInfo="{posts: 4, followers: 100, following: 342}"/>
            <ImageGallery :posts="[
                {
                    id: 1,
                    image: 'https://www.randompower.eu/wp-content/uploads/2022/11/Random-Power2.jpg'
                },
                {
                    id: 2,
                    image: 'https://www.randompower.eu/wp-content/uploads/2022/11/Random-Power2.jpg'
                }
            ]"></ImageGallery>
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

    
</style>