<template>
    <div v-show="type" class="card">
        <div v-if="type == 'ability'" class="ability">
            
            <h2>{{ type }}</h2>
            <div class="ability-title">
                <h3>{{ abilityTitle }}</h3>
            </div>
            <div class="ability-content">
                <p> {{ abilityEffect }} </p>
            </div>

            <details>
                <summary open="">Pokemon with this ability: </summary>
                <CardList :profilesData="profiles" />
            </details>

        </div>
            

        <div v-else-if="type == 'move'" class="move">
            
            <div class="move-details">

                <div class="move-details-text">

                    <h2>{{ searchData.name }}</h2>

                    <div class="move-details-text-title">
                        <h3>{{ moveTitle }}</h3>
                    </div>
                    <div class="move-details-text-content">
                        <p> {{ moveEffect }} </p>
                    </div>
                </div>

                <div class="move-details-stats">
                    <table class="move-details-stats-table">
                        <tbody>
                            <tr>
                                <td>Type</td>
                                <td>{{ searchData.type.name }}</td>
                            </tr>
                            
                            <tr>
                                <td>Category</td>
                                <td>{{ searchData.damage_class.name }}</td>
                            </tr>
                            
                            <tr>
                                <td>Power</td>
                                <td>{{ searchData.power }}</td>
                            </tr>

                            <tr>
                                <td>Accuracy</td>
                                <td>{{ searchData.accuracy }}</td>
                            </tr>

                            <tr>
                                <td>PP</td>
                                <td>{{ searchData.pp }}</td>
                            </tr>
                            
                            <tr>
                                <td>Secondary Effect</td>
                                <td>{{  searchData.effect_chance !== null ? shortMoveEffect : 'No Effect' }}</td>
                            </tr>
                            
                            <tr>
                                <td>Target</td>
                                <td>{{ searchData.target.name }}</td>
                            </tr>

                            <tr>
                                <td>Priority</td>
                                <td>{{ searchData.priority }}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>

            </div>

            <details>
                <summary>Pokemon which can learn this move:</summary>
                <CardList :profilesData="profiles"/>
            </details>
        </div>

        <div v-else-if="type == 'pokemon'" class="pokemon">
            <div class="pokemon-profile">
                <div class="pokemon-profile-img">

                    <img :src="searchData.sprites.front_default" :alt="searchData.name"/>

                </div>

                <div class="pokemon-profile-data">
                    <div class="pokemon-profile-data-types">

                        <!-- Types -->
                        <p v-for="type in searchData.types" class="types" 
                        :style="{backgroundColor: typeColors[type.type.name]}">
                        {{ type.type.name }} </p>

                    </div>

                    <div class="pokemon-profile-data-abilities">
                        <!-- Abilities -->
                        <div class="title">
                            <h3>Abilities</h3>
                        </div>

                        <div class="abilities">
                            
                            <div v-for="(ability,key) in searchData.abilities" class="ability"> 
                                <p v-if="ability.is_hidden"> Hidden </p>
                                <p v-else> Ability {{key + 1}} </p>
                                
                                <p> {{ ability.ability.name }} </p>


                                    
                            </div>

                        </div>
                    </div>

                    <table class="pokemon-profile-data-table">
                        <tbody>
                            <!-- Species -->
                            <tr>
                                <td>Species</td>
                                <!-- url -> search -> genera -> language == 'en' -->
                                <td>{{ species }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="pokemon-details">
                <summary>Base Stats</summary>

                <table class="pokemon-profile-stats">
                    <tr v-for="stat in searchData.stats">
                        <td>{{ stat.stat.name }}</td>
                        <td>{{ stat.base_stat }}</td>
                    </tr>
                </table>

            </div>

            <div class="pokemon-moves">

                <details>
                        <summary>Moves</summary>
                        <ul>
                            <li v-for="move in searchData.moves">
                                {{ move.move.name }}
                            </li>
                        </ul>
                </details>

            </div>
        </div>

    </div>

</template>

<script>
    import CardList from '@/components/CardList';

    export default {
        name: 'Card',
        
        components: {
            CardList,
        },

        props: {
            type: String,
            searchData: Object,
            profiles: Object,
        },

        data() {
            return {
                typeColors: {
                    // Normal 
                    'normal':'#a8a878',
                    // Fire
                    'fire': '#f08030',
                    // Water
                    'water': '#6890f0',
                    // Grass
                    'grass': '#78c850',
                    // Flying
                    'flying': '#a890f0',
                    // Fighting
                    'fighting': '#c03028',
                    // Poison
                    'poison': '#a040a0',
                    // Electric
                    'electric': '#f8d030',
                    // Ground
                    'ground': '#e0c068',
                    // Rock
                    'rock': '#b8a038',
                    // Psychic
                    'psychic': '#f85888',
                    // Ice
                    'ice': '#98d8d8',
                    // Bug
                    'bug': '#a8b820',
                    // Ghost
                    'ghost': '#705898',
                    // Steel
                    'steel': '#b8b8d0',
                    // Dragon
                    'dragon': '#7038f8',
                    // Dark
                    'dark': '#705848',
                    // Fairy
                    'fairy': '#ee99ac',
                },

                species: '',
            }
        },
        

        computed: {
            abilityTitle() {
                return this.searchData.title;
            },

            abilityEffect() {
                return this.searchData.effect;
            },

            moveTitle() {
                let title = this.searchData.flavor_text_entries.find(text => text.language.name == 'en');
                return title.flavor_text;
            },

            moveEffect() {
                let effect = this.searchData.effect_entries.reverse().find(text => text.language.name == 'en');

                effect.effect = effect.effect.replace('$effect_chance',this.searchData.effect_chance)  
                return effect.effect;
            },

            shortMoveEffect() {
                let effect = this.searchData.effect_entries.reverse().find(text => text.language.name == 'en');

                effect.short_effect = effect.short_effect.replace('$effect_chance',this.searchData.effect_chance)  
                return effect.short_effect;
            },

            


        },

        updated() {
            if(this.type == 'pokemon') {

                let speciesUrl = this.searchData.species.url;
                fetch(speciesUrl)
                
                .then(rawUrl => rawUrl.json())
                
                .then(result => {
                    let species = result.genera.find(name => name.language.name == 'en');
                    console.log('data',species.genus);
                    this.species = species.genus;
                })
                .catch(err => console.log(err));
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/_setup.scss';
    
    .card{
        margin-top: 1em;
        padding: 1em;
        // width:90%;
        background: darken($dex-white, 15);

        summary{
            background-color: $dex-white;
            margin: 10px 0;
            padding: 6px;
            border-radius: 6px;
            font-weight: bold;
        }

        .move {
            &-details {
                
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 10px;

                &-text-content {
                    text-align: justify;
    
                }

                &-stats {
                    background: lighten($dex-red,30);
                    border-radius: 6px;

                    table {
                        width: 100%;
                        background: $dex-white;
                        // border-collapse: collapse;

                        td {
                            padding: 4px;
                            border: 1px solid black;
                        }
                        tr:nth-child(1), tr:nth-child(2)  {
                            td {

                                color: $dex-blue;
                                border-radius: 10px;
                            }
                        }
                        td:nth-child(2){
                            text-align: right;
                            background: $dex-black;
                            color: $white;
                        }
                    }
                }
            }

        }

        .pokemon {
            display: grid;
            grid-template-columns: 1fr 1fr;

            &-profile {
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
                &-img {

                    display: flex;
                    justify-content: center;
                    
                    background-color: $dex-white;
                    width: 40vh;
                
                    img {
                        width: 60%;
                    }

                }

                &-data {
                    width: 90%;

                    &-types {
                        display: flex;
                        justify-content: center;
                        column-gap: 10px;
                        margin: 10px 0px;

                        p {
                            text-shadow: 1px 1px 1px $dex-black;
                            padding: 2px 8px;
                            margin-bottom: 4px;
                            border-radius: 25px;
                            width: 35%;
                            text-align: center;
                            color: white;
                        }
                    }

                    &-abilities {
                        // border: 1px solid $dex-black;
                        margin-bottom: 10px;

                        .title {
                            background-color: $dex-black;
                            border-radius: 0 6px 6px 0;
                            padding: 6px;
                            color: $white;

                            text-align: center;
                        }
                        .abilities {

                            .ability {
                                display: flex;
                                justify-content: space-between;
                                background-color: $dex-white;
                                border-radius: 6px;
                                margin: 6px 0px;

                                p {
                                    padding: 4px;
                                    min-width: 68px;
                                }

                                p:nth-child(1) {
                                    background: $dex-black;
                                    color: $white;
                                }

                                p:nth-child(2) {
                                    margin: 0px 10px;
                                }
                            }
                        }
                    }

                    &-table {
                        width: 100%;
                        // border: 2px solid $dex-white;
                        
                        tr {
                            border-radius: 50px;
                        }

                        td {
                            background-color: $dex-white;
                            border-radius: 10px 0 0 10px;
                            padding: 6px;

                        }

                        td:nth-child(2) {
                            border-radius: 0 10px 10px 0;
                            color: red;
                            text-align: center;
                        }
                    }
                }

                
                
                &-stats {
                    width: 100%;
                    
                    td:nth-child(2) {
                        color: red;
                        text-align: right;
                    }

                }

            }

        }

    }
</style>