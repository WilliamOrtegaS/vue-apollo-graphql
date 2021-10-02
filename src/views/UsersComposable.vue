<template>
<v-container>
  <h1 class="text-center">Usuarios-Composable</h1>
  <!-- [Vue warn]: Error in render: "TypeError: _vm.result is undefined" =>
  Fix al utilizar un valor del return <p v-if="result">{{result}}</p> se estan cargando los datos... -->
  <template v-if="result" >
    <h3> |___ User____    | ____  Email____</h3>
    <ul v-for="user in result.users.data" :key="user.id" >
      <li>{{user.name}} = > {{user.email}}</li>
    </ul>
  </template>
  <br>
  <h2>Result</h2>
  <p v-if="result">{{result}}</p>
  <h2>AllUser</h2>
  <span v-if="allUser">{{allUser}}</span>
  <h2>Data User</h2>
  <span v-if="allUserQuery">{{allUserQuery}}</span>
  <h2>...</h2>
  <span v-if="dataAllUser">{{dataAllUser}}</span>
</v-container>
</template>
<script>
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import allUsers from '../graphql/allUsers.gql'

export default {
  name: 'UserCompsable',
  setup () {
    // Ejemplo 1
    const { result } = useQuery(gql`
      query getUsers {
        users {
          data {
            id,
            name,
            email
          }
        }
      }
    `)
    console.log('Result =>', result)
    // Ejemplo 2
    // Reemplazar result por userResult =>
    const { result: userResult } = useQuery(gql`
      query getUsers {
        users {
          data {
            id,
            name,
            email
          }
        }
      }
    `)
    // useResult =>
    const allUser = useResult(userResult, null, data => data.users.data)
    console.log('User => ', allUser) // User => value: Array(10) [ {…}, {…}, {…}, … ]
    // Ejemplo 3
    const { result: allUserQuery } = useQuery(allUsers)
    const dataAllUser = useResult(allUserQuery, null, data => data.users.data)
    console.log('DataAllUser => ', dataAllUser)
    return {
      result, allUser, allUserQuery, dataAllUser
    }
  }
}
</script>
