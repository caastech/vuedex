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
                    pokemon: pokemonList,
                }

                this.$emit('dex-data',this.ability);

            } catch (error) {
                console.error('Error',error)
                return    
            }
            

        }
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