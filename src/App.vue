<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view/> -->
  <div class="container">
  <Header/>
  <SearchBar/>
  </div>

</template>

<script>
import Header from '@/components/Header' 
import SearchBar from '@/components/SearchBar' 

export default {
  name: 'App',

  components: {
    Header,
    SearchBar,
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

.container {
  display: grid;
  place-items: center;
  padding: 10px;
}

</style>
