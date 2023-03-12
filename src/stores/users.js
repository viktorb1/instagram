import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"



export const useUsersStore = defineStore('counter', () => {
  const user = ref(null)
  let errorMessage = ref("")
  const loading = ref(false)
  const loadingUser = ref(false)


  const clearErrorMessage = () => {
    errorMessage.value = ""
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const {email, password} = credentials

    if (!validateEmail(email)) {
      return errorMessage.value = "Email is invalid"
    }

    if (!password.length)
      return errorMessage.value = "Password cannot be empty"
    
    loading.value = true;

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      loading.value = false;
      return errorMessage.value = error.message
    }

    const { data: existingUser }  = await supabase
      .from("users").select().eq('email', email).single()

    
    user.value = {
      email: existingUser.email,
      username: existingUser.username,
      id: existingUser.id,
    }
    loading.value = false
    errorMessage.value = ""
  }

  const handleSignup = async (credentials) => {
    const {email, password, username} = credentials

    if (password.length < 6) {
      return errorMessage.value = "Password length is too short"
    }

    if (username.length < 4) {
      return errorMessage.value = "Username length is too short"
    }

    if (!validateEmail(email)) {
      return errorMessage.value = "Email is invalid"
    }

    loading.value = true

    const { data: userWithUsername }  = await supabase
      .from("users").select().eq('username', username).single()
    
    if (userWithUsername) {
      loading.value = false
      return errorMessage.value = "User already exists"
    }

    
    const {error} = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    await supabase.from("users").insert([{username, email}])

    const { data: newUser }  = await supabase
      .from("users").select().eq('email', email).single()

    loading.value = false

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getUser = async () => {
    loadingUser.value = true;
    const {data} = await supabase.auth.getUser()

    if (!data.user) {
      loadingUser.value = false
      return user.value = null
    }

    const {data: userWithEmail} = await supabase
      .from("users").select().eq("email", data.user.email).single()

    user.value = {
      username: userWithEmail.username,
      email: userWithEmail.email,
      id: userWithEmail.id
    }
    loadingUser.value = false
  }

  return {
    loading,
    loadingUser, 
    user, 
    errorMessage, 
    handleLogin, 
    handleSignup, 
    handleLogout, 
    getUser, 
    clearErrorMessage
   }
})
