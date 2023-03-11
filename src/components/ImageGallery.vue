<script setup>
    import {defineProps} from "vue"

    const props = defineProps(['posts'])

</script>
<template>
    <div class="image-gallery-container">
        <img 
        v-for="post in props.posts" 
        :key="post.id"
        :src="`https://gjtqpotrvjnnqavogfll.supabase.co/storage/v1/object/public/images/${post.url}`"
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

