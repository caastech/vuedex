<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view/> -->
  <div class="container">
    
    <div class="container-">

      <Header/>
      <SearchBar @dex-data="setValues" @deploy-error="displayError" />
      <Card :searchData="selectedContent" :profiles="profileContent['content']" :type="typeContent"/>
      
    </div>
   <!-- Must fixed error div staying even after solving search -->
    <div v-if="error" class="container-error">
        <h2 v-html="error"></h2>
    </div>

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
        selectedContent: {},
        profileContent: [],
        typeContent: '',
        error: '',
      }
    },

    components: {
      Header,
      SearchBar,
      Card,
    },

    methods: {
      setValues({selectedData,profile,type}) {

        if(profile){
          
          // Set selected and profiles data
          this.selectedContent = { ...selectedData };
          this.profileContent['content'] = profile;
          this.typeContent = type;

        } else {

          // Set selected and profiles data for pokemon search
          this.selectedContent = { ...selectedData };
          this.typeContent = type;

        }

      },

      displayError({err, type}){
        console.error('Error at SearhBar:',err,type);
        this.error = `Error 404: this <span>${type}</span> was not found, please check spelling`;
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

    &-error {
      margin-top: 10px;
      padding: 10px;
      border-radius: 6px;
      
      display: flex;
      justify-content: center;

      background-color: lighten($dex-red, 16);
      color: $dex-black;

      span {
        color: $dex-white;
        font-weight: bold;
      }
    }
  }

</style>
