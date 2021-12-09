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

export default {
    name: 'SearchBar',

    data () {
        return {
            search: '',
            API: 'https://pokeapi.co/api/v2',
            selectedSearch: {},
            pokeProfiles: [],
            type:'ability',
        }
    },

    components: {
        Button,
    },

    methods: {

        callMe(event){
            console.log('Soup', event.target);

            event.target.isSelected = msg;
            // this.isSelected = !this.isSelected;
        },

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
                    //     name: ,
                    //     types:,
                    //     abilities:,
                    //     sprites:,
                    //     moves:,
                    //     stats:,

                    this.selectedSearch = {
                        ...jsonSearch
                    }
                    // console.log(this.selectedSearch);
                    // Add son sort of emit like this.$emit(poke-search, data) 
                    this.$emit('dex-data',{selectedData: this.selectedSearch, type: this.type});
                    

                }

            } catch (error) {
                console.error('Error',error);
                console.log(this.selectedSearch);
                return alert(`This ${type} cannot be found, please check spelling...`);
                
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