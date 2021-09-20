<template>
<v-container class="text-center">
  <ApolloQuery
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
  </ApolloQuery>
</v-container>
</template>
<script>
export default {
  name: 'UsersApollo',
  data () {
    return {
    }
  }
}
</script>
