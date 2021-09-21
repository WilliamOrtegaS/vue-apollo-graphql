<template>
<v-container class="text-center">
<!--   <ApolloQuery
    :query="require('../graphql/allUsers.gql')"
  >
  <template v-slot="{ result: { loading, error, data }}">
    <div v-if="data">
      <h1> Usuarios:</h1>
      <ul v-for="user in data.users.data" :key="user.id">
        <li>{{user.name}} - {{user.email}} - {{user.company.name}}</li>
      </ul>
    </div>
    <div v-else-if="error"></div>
    <div v-else-if="loading"></div>
  </template>
  </ApolloQuery> -->
  <h1>Creacion Post</h1>
  <v-row class="ma-3">
    <v-col cols="6">
      <span>Título</span>
      <v-text-field solo v-model="title"></v-text-field>
    </v-col>
    <v-col cols="6">
      <span>Mensaje</span>
      <v-text-field solo v-model="body"></v-text-field>
    </v-col>
  </v-row>
  <v-btn large color="success" @click="createPost()">Crear</v-btn>
</v-container>
</template>
<script>
import createPost from '../graphql/createPost.gql'
export default {
  name: 'UsersApollo',
  data () {
    return {
      title: 'Titulo',
      body: 'Texto'
    }
  },
  created () {
    // this.createPost()
  },
  methods: {
    createPost () {
      this.$apollo.mutate({
        mutation: createPost,
        variables: {
          input: {
            title: this.title,
            body: this.body
          }
        }
      })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
