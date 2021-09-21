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
  <v-row justify="center" class="ma-12">
    <v-data-table
      :headers="headers"
      :items="allPost"
      sort-by="calories"
      class="elevation-1"
    >
    <!-- <template v-slot:item.actions="{ item }"> -->
    <!-- <template v-slot:[`item.actions`]="{ item }"> -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn icon>
      <v-icon
        small
        @click="dialogEdit = true, getConfig(item)"
      >
        mdi-pencil
      </v-icon>
      </v-btn>
      <v-btn icon>
      <v-icon
        small
        @click="dialogDelete = true, getConfig(item)"
      >
        mdi-delete
      </v-icon>
      </v-btn>
<!--           <v-btn class="mr-2" icon="">
            <v-icon >mdi-pencil</v-icon>
          </v-btn> -->
<!--       <v-tooltip left="">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on"  v-bind="attrs" icon @click="item.dialogDelete = ! item.dialogDelete, getDeleteInfo(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Eliminar Cliente</span>
        </v-tooltip> -->
    </template>
    </v-data-table>
  </v-row>
  <v-dialog v-model="dialogEdit" persistent max-width="900px" style="font-size:2vm;">
    <v-form v-model="valid" ref="form" v-on:submit.prevent lazy-validation>
      <v-card>
        <v-card-title>
        <span class="title">Modificación</span>
        </v-card-title>
        <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <span>Título</span>
              <v-text-field solo v-model="editPost.title"></v-text-field>
            </v-col>
            <v-col cols="6">
              <span>Mensaje</span>
              <v-text-field solo v-model="editPost.body"></v-text-field>
            </v-col>
            <v-row class="justify-center text-center">
              <v-col cols="12">
                <v-btn x-large="" color="primary" dark="" @click="updatePostAsync()">
                  CONFIRMAR
                </v-btn>
                <v-btn x-large="" color="error" dark="" @click="dialogEdit = false" class="ma-2">
                  CANCELAR
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
  <v-dialog v-model="dialogDelete" persistent max-width="500px">
    <template>
      <v-system-bar color="error"></v-system-bar>
      <v-card class="text-center">
        <span class="text-center"><strong class="title">Título: </strong>{{editPost.title}}</span>
        <v-card-actions>
          <v-col class="text-center mt-n4">
            <v-btn dark color="primary" @click="deletePostAwait">SI</v-btn>
          </v-col>
          <v-col class="text-center mt-n4">
            <v-btn dark color="error" @click="dialogDelete = false">NO</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <v-btn @click="updatePost" color="success">Update Post</v-btn>
</v-container>
</template>
<script>
import createPost from '../graphql/createPost.gql'
import updatePost from '../graphql/updatePost.gql'
import deletePost from '../graphql/deletePost.gql'
import gql from 'graphql-tag'
export default {
  name: 'UsersApollo',
  data () {
    return {
      title: 'Titulo',
      body: 'Texto',
      headers: [
        {
          text: 'Index',
          align: 'center',
          value: 'id'
        },
        {
          text: 'Título',
          align: 'center',
          value: 'title'
        },
        {
          text: 'Mensaje',
          align: 'center',
          value: 'body'
        },
        {
          text: 'Acciones',
          align: 'center',
          value: 'actions'
        }
      ],
      allPost: [],
      dialogEdit: false,
      dialogDelete: false,
      valid: true,
      post: {
        title: '',
        body: ''
      },
      editPost: {
        id: '',
        title: '',
        body: ''
      }
    }
  },
  created () {
    // this.createPost()
    this.getPosts()
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
          console.log('CreatePost =>', result)
        })
        .catch((err) => {
          console.log(err)
        })
      this.getPosts()
    },
    async getPosts () {
      const { data } = await this.$apollo.query({
        query: gql`
        {
          posts {
            data {
              id,
              title,
              body
            }
          }
        }
        `
      })
      console.log('Post =>', data.posts.data)
      this.allPost = data.posts.data
    },
    updatePost () {
      this.$apollo.mutate({
        mutation: updatePost,
        variables: {
          id: this.editPost.id,
          input: {
            title: this.editPost.title,
            body: this.editPost.body
          }
        }
      })
        .then(result => {
          console.log('Update Post =>', result)
          this.dialogEdit = false
          this.getPosts()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getConfig (item) {
      console.log('Item => ', item)
      this.editPost.id = item.id
      this.editPost.title = item.title
      this.editPost.body = item.body
    },
    async updatePostAsync () {
      try {
        const data = await this.$apollo.mutate({
          mutation: updatePost,
          variables: {
            id: this.editPost.id,
            input: {
              title: this.editPost.title,
              body: this.editPost.body
            }
          }
        })
        console.log('2 => Update', data)
        this.dialogEdit = false
        this.getPosts()
      } catch (error) {
        console.log('=> Error', error)
      }
    },
    deletePost () {
      this.$apollo.mutate({
        mutation: deletePost,
        variables: {
          id: this.editPost.id
        }
      })
        .then(result => {
          console.log('Delete => ', result)
          this.dialogDelete = false
          this.getPosts()
        })
        .catch(err => {
          console.log(err)
        })
    },
    async deletePostAwait () {
      try {
        const data = await this.$apollo.mutate({
          mutation: deletePost,
          variables: {
            id: this.editPost.id
          }
        })
        console.log('=> Delete await', data)
        this.dialogDelete = false
        this.getPosts()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
