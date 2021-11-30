<template>
    <div class="table">
        <!-- <div v-for="food in foodList" class="item">
            {{ food }}
        </div> -->
        <Profile/>
    </div>
</template>

<script>
    import Profile from '@/components/Profile'

    export default {
        name: 'CardList',
        
        data() {
            return {
                // foodList: ['salt','apple','pizza','pasta','hamburger','bread','cake',],

            }
        },

        props: {
            urls: Array,
        },

        components: {
            Profile,
        },

        methods: {
            setPokeDetails(urls) {

                urls.forEach(async (pokemon,id) => {

                    let rawPokemon = await fetch(pokemon);
                    let currentPokemon = await rawPokemon.json();
                    console.log(`Poke ${id}:`,`${currentPokemon.name}/${currentPokemon.abilities}/${currentPokemon.types}`);
                    // name,types,abilities(first,second,hidden)
                });
                // const apiUrls = fetch(urls)
            }
        },

        updated() {
            this.setPokeDetails(this.urls);
        }

    }
</script>

<style lang="scss" scoped>
    .table {
        display: grid;
        grid-template-columns: repeat(4,1fr);
    
        .item {
            border: 1px solid black;

        }
    }
    
</style>
