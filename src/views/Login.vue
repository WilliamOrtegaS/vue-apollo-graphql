<template>
  <v-container class="text-center">
    <h1 class="ma-5">Login</h1>
    <v-row justify="center">
      <v-card width="50%" color="red">
        <v-card-title>SignIn</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="6">
              <v-text-field v-model="email" solo label="Email" placeholder="Email"></v-text-field>
              <v-text-field v-model="password" solo label="Password" placeholder="Email"></v-text-field>
            </v-col>
          </v-row>
          <v-btn width="50%" color="success">Login</v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  // Guardar el ID y Token del usuario logueado
  saveUserData (id, token) {
    localStorage.setItem('USER_ID', id)
    localStorage.setItem('AUTH_TOKEN', token)
  },
  signInUser () {
  }
}
</script>
