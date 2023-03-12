<script setup>
import Container from "@/components/Container.vue"
import {useUsersStore} from "@/stores/users"
import { storeToRefs } from "pinia";
import Cards from "@/components/Cards.vue"
import LogInMessage from "@/components/LogInMessage.vue"

const userStore = useUsersStore()

const { user, loadingUser } = storeToRefs(userStore)


</script>

<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user"/>
            <LogInMessage v-else/>
        </div>
        <div class="timeline-spinner" v-else>
            <a-spin/>
        </div>
    </Container>
</template>


<style>
    .timeline-container {
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

    .timeline-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 85vh;
    }
</style>