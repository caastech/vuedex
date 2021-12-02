<template>
    <main>
        <div class="buttons">
            <Button title="Abilities"/>
            <Button title="Moves"/>
            <Button title="Pokémon"/>
        </div>
        <input type="text" v-model='search' @change="getDexData(search,type)" placeholder="Search here...">
        
    </main>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'SearchBar',

    data () {
        return {
            search: '',
            API: 'https://pokeapi.co/api/v2',
            ability: {},
            pokeProfiles: [],
        }
    },

    props: {
        type:String,
    },

    components: {
        Button,
    },

    methods: {
        async getDexData(look,type) {

            this.pokeProfiles = [];

            // Formatted search word to match api form
            const formattedLook = look.toLowerCase().trim().replace(' ','-')
            
            // Fetch data and parsed as JSON
            try {

                const rawSearch = await fetch(`${this.API}/${type}/${formattedLook}`);
                const jsonSearch = await rawSearch.json();
                // console.log(jsonSearch);
                // Get last element of the array of flavor text 
                const flavorText = jsonSearch.flavor_text_entries.reverse().find((item) => {
                    return item.language.name == 'en';
    
                });
    
                // Get last element of the array of effect entries 
                const effectEntry = jsonSearch.effect_entries.reverse().find((item) => {
                    return item.language.name == 'en';
    
                });

                // Get the url of every pokemon who has the current ability 
                const pokemonList = jsonSearch.pokemon.map((pokeItem) => {
                    return pokeItem.pokemon.url;
                })

                // console.log('Effect:',effectEntry.effect);
                // console.log('Flavor:',flavorText.flavor_text);
    
                this.ability = {
                    title: flavorText.flavor_text,
                    effect: effectEntry.effect,
                }

                this.setPokeDetails(pokemonList);

            } catch (error) {
                console.error('Error',error)
                return    
            }
            

        },

        setPokeDetails(urls) {

            // Loop through every pokemon from url
            urls.forEach((pokemon,id) => {

                // Get data from api with promise structure

                fetch(pokemon)
                    .then(rawPokemon => {
                        return rawPokemon.json();
                    })
                    .then(currentPokemon => {
                        
                        // Filled pokemon profile with needed pokemon's data
                        this.pokeProfiles.push({
                            name: currentPokemon.name,
                            abilities: currentPokemon.abilities,
                            types: currentPokemon.types,
                            sprite: currentPokemon.sprites.front_default,
                        })

                    })
                    .catch(error => console.error('This one:',error))
            });
            
            this.$emit('dex-data',{ability: this.ability, profile: this.pokeProfiles});
            
        },

        // showMe(){
        //     console.log('Hello Brother');
        // }
    }


}
</script>

<style lang="scss" scoped>
    input {
        width: 100%;
        height: 8vh;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 12px

    }
</style>   