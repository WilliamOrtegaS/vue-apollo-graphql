<template>
<v-container class="text-center">
  <div class="text-center">
    <h1> Usuarios:</h1>
    <ul v-for="user in users.data" :key="user.id">
      <li>{{user.name}} - {{user.email}}</li>
    </ul>
  </div>
</v-container>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'Users',
  data () {
    return {
      users: ''
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
  }
}
</script>
