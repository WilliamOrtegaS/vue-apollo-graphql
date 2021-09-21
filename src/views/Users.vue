<template>
<v-container class="text-center">
  <div class="text-center">
    <h1> Usuarios:</h1>
    <ul v-for="user in users.data" :key="user.id">
      <li>{{user.name}} - {{user.email}}</li>
    </ul>
  </div>
  <div class="text-center mt-8">
    <h1>Get Usuarios:</h1>
    <ul v-for="user in allUsers" :key="user.id">
      <li>{{user.name}} - {{user.email}}- {{user.company.name}}</li>
    </ul>
  </div>
  <v-btn @click="getUsers" class="ma-10" color="success">Get User</v-btn>
</v-container>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'Users',
  data () {
    return {
      users: '',
      allUsers: ''
    }
  },
  apollo: {
    users: gql`{
      users{
        data {
          id,
          name,
          email
        }
      }
    }
    `
  },
  methods: {
    // Realizar una query separada
    async getUsers () {
      const { data } = await this.$apollo.query({
        query: gql`{
          users{
            data {
              id,
              name,
              email,
              company {
                name
              }
            }
          }
        }
        `
      })
      console.log('Usuarios => ', data.users.data)
      this.allUsers = data.users.data
    }
  },
  created () {
    this.getUsers()
  }
}
</script>
