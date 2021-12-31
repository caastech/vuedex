<template>
    <main>
        <div class="title">
        </div>
        <div class="buttons"> 
            <h2>{{ type }}</h2>  
            <Button @click="type='ability'"  title="Abilities"/>
            <Button @click="type='move'" title="Moves"/>
            <Button @click="type='pokemon'" title="Pokemon"/>
        </div>
        <input type="text" v-model='search' @change="getDexData(search,type)" placeholder="Search here...">
        
    </main>
</template>

<script>
import Button from '@/components/Button'
import capitalCase from '@/services/TextFormatter.js'

export default {
    name: 'SearchBar',

    data () {
        return {
            search: '',
            API: 'https://pokeapi.co/api/v2',
            selectedSearch: {},
            pokeProfiles: [],
            type:'pokemon',
        }
    },

    components: {
        Button,
    },

    methods: {

        async getDexData(look,type) {

            this.pokeProfiles = [];
            this.selectedSearch = {};

            // Formatted search word to match api structure
            const formattedLook = look.toLowerCase().trim().replace(' ','-')

            
            // Fetch data and parsed as JSON
            try {

                const rawSearch = await fetch(`${this.API}/${type}/${formattedLook}`);
                const jsonSearch = await rawSearch.json();
                console.log(jsonSearch);

                if(type == 'ability') {

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
        
                    this.selectedSearch = {
                        title: flavorText.flavor_text,
                        effect: effectEntry.effect,
                    }
                    this.setPokeDetails(pokemonList);
                }

                else if(type == 'move'){
                    //     name: ,
                    //     power:,
                    //     accuracy:,
                    //     effect:,
                    //     effectChance:,
                    //     pp:,
                    //     priority:,
                    //     damageClass:,
                    //     target:,
                    //     type:,
                    //     pokemon:,

                    // Get the url of every pokemon who has the current ability 
                    const pokemonList = jsonSearch.learned_by_pokemon.map((pokeItem) => {
                        return pokeItem.url;
                    })

                    this.selectedSearch = {
                        ...jsonSearch


                    }
                    
                    // console.log(pokemonList);
                    this.setPokeDetails(pokemonList);
                }

                else if(type == 'pokemon') {
                    // Set array with capital case stats names
                    let statsNames = jsonSearch.stats.map(stat => capitalCase(stat.stat.name));
                    // Set array with stats values 
                    let statsValues = jsonSearch.stats.map(stat => stat.base_stat);

                    let stats = []

                    // Loop to add object with stat name and proper value to stats array
                    for (let index = 0; index < statsNames.length; index++) {
                        stats.push({name: statsNames[index], value: statsValues[index]})
                    }
                    //     name: ,
                    //     types:,
                    //     abilities:,
                    //     sprites:,
                    //     moves:,
                    //     stats:,
                    console.log('Pokemon',typeof statsValues[0]);

                    this.selectedSearch = {
                        ...jsonSearch,
                        stats: stats
                    }
                    // console.log(this.selectedSearch);
                    // Add son sort of emit like this.$emit(poke-search, data) 
                    this.$emit('dex-data',{selectedData: this.selectedSearch, type: this.type});
                    

                }

            } catch (error) {
                // console.error('Error',error);
                this.$emit('deploy-error',{err: error,type: this.type})
                // return alert(`This ${type} cannot be found, please check spelling...`);
                
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

                        // Changed abilities to uppercase and removed '-' separator
                        const pokemonAbilities = currentPokemon.abilities.map(ability => capitalCase(ability.ability.name))
                        const pokemonName = capitalCase(currentPokemon.name)
                        // Filled pokemon profile with needed pokemon's data
                        this.pokeProfiles.push({
                            name: pokemonName,
                            abilities: pokemonAbilities,
                            types: currentPokemon.types,
                            sprite: currentPokemon.sprites.front_default,
                        })

                    })
                    .catch(error => console.error('This one:',error))
            });
            
            this.$emit('dex-data',{selectedData: this.selectedSearch, profile: this.pokeProfiles, type: this.type});
            
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