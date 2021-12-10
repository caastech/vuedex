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

        <div v-else-if="type == 'pokemon'" class="card-pokemon">
            <h2>{{ searchData.name }}</h2>
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
                // show(selectedData,profile) {
                //     console.log(selectedData);
                //     console.log(profile);
                // }
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
            }


        }

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

        .move{
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

    }
</style>