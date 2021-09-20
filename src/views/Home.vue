<template>
  <hello-world v-show="false"/>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    HelloWorld
  }
}
</script>
