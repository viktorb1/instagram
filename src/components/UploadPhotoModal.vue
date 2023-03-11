<script setup>
import { defineComponent, ref, defineProps } from 'vue';
import {supabase} from "../supabase"
import { useUsersStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const visible = ref(false);
const caption = ref("")
const file = ref(null)
const userStore = useUsersStore()
const loading = ref(false)
const errorMessage = ref("")

const {user} = storeToRefs(userStore)
const props = defineProps(['addNewPost'])

const showModal = () => {
    visible.value = true;
};

const handleOk = async (e) => {
    loading.value = true
    const filename = Math.floor(Math.random() * 100000000000000)
    if (file.value) {
        const {data, error} = await supabase.storage.from("images").upload("public/" + filename, file.value)
        if (error) {
            loading.value = false
            return errorMessage.value = "Unable to upload image"
        }
        if (data) {
            await supabase.from("posts").insert({
                url: data.path,
                caption: caption.value,
                owner_id: user.value.id
            })
        }
        
        props.addNewPost({
            url: data.path,
            caption: caption.value,
        })

    }
    loading.value = false
    visible.value = false
    caption.value = ""

    
};

const handleUploadChange = (e) => {
    if (e.target.files[0]) {
        file.value = e.target.files[0]
    }
}

</script>



<template>
    <div>
      <a-button @click="showModal">Upload photo</a-button>
      <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
        <div  v-if="!loading">
            <input type="file" accept=".jpeg,.png" @change="handleUploadChange"/>
            <AInput 
                v-model:value="caption" 
                placeholder="Caption..." 
                :maxLength="50"
            />
            <ATypographyText v-if="errorMessage" type="danger">{{ errorMessage }}</ATypographyText>
        </div>
        <div class="spinner" v-else>
            <ASpin />
        </div>
      </a-modal>
    </div>

  </template>


<style scoped>
input {
    margin-top: 10px;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>