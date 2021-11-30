<template>
    <div class="table">
        <Profile :details="pokeProfile"/>
    </div>
</template>

<script>
    import Profile from '@/components/Profile'

    export default {
        name: 'CardList',
        
        data() {
            return {
                pokeProfile: [],
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

                // Loop through every pokemon from url
                urls.forEach((pokemon,id) => {

                    // Get data from api with promise structure
                    fetch(pokemon)
                        .then(rawPokemon => {
                            return rawPokemon.json();
                        })
                        .then(currentPokemon => {
                            
                            // Filled pokemon profile with every pokemon's data
                            this.pokeProfile.push({
                                name: currentPokemon.name,
                                abilities: currentPokemon.abilities,
                                types: currentPokemon.types,
                            })
                        })
                        .catch(error => console.error('This one:',error))
                });

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
