<script setup>
    import {defineProps} from "vue"
    const envs = import.meta.env

    const props = defineProps(['posts'])

</script>
<template>
    <div class="image-gallery-container">
        <img 
        v-for="post in props.posts" 
        :key="post.id"
        :src="`${envs.VITE_BASE_PHOTO_URL}${post.url}`"
        >
    </div>
</template>

<style scoped>
.image-gallery-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
}

img {
    height: 200px;
    padding: 10px;
}
</style>

