<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view/> -->
  <div class="container">
    <Header/>
    <SearchBar @dex-data="setValues" type="ability"/>
    <Card :ability="abilityContent" :profiles="profileContent['content']"/>
  </div>

</template>

<script>
  import Header from '@/components/Header' 
  import SearchBar from '@/components/SearchBar' 
  import Card from '@/components/Card'

  export default {
    name: 'App',

    data() {
      return{
        abilityContent: {},
        profileContent: [],
      }
    },

    components: {
      Header,
      SearchBar,
      Card,
    },

    methods: {
      setValues({ability,profile}) {

        // Set ability and profiles data
        this.abilityContent = { ...ability }
        this.profileContent['content'] = profile


      }
    },
  }


</script>

<style lang="scss">
  @import '@/assets/scss/_setup.scss';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $dex-black;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

  }

  .container {
    display: grid;
    // place-items: center;
    padding: 10px;
  }

</style>
