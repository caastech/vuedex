<template>
    <div v-if="details.length !== 0" class="profile">
        <div class="profile-title">
            <h3>{{ name }}</h3>
        </div>
        <div class="profile-content">

            <div class="profile-img">
                <img :src="details.sprite" :alt="details.name"/>
            </div>

            <div class="profile-types">
                <p v-for="type in details.types" class="types" 
                :style="{backgroundColor: typeColors[type.type.name]}"
                > {{ type.type.name }} </p>
                
            </div>

            <div class="profile-abilities">
                <table>
                    <tr v-for="ability,index in details.abilities">
                        <td> {{ (index == 0) ? 'Ab.1' : (index == 1) ? 'Ab.2' : 'Hidden' }} </td>
                        <td> {{ ability.ability.name }} </td> 
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',

        data(){
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
                }
            }
        },
        
        props: {
            details: Object,
        },

        computed: {
            name() {
                let nameText = this.details.name;

                nameText = nameText.replace('-',' ')
                .split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ');
                    
                return nameText;
            },

        }
    }
    
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/_setup.scss';

    .profile{ 

        color: $dex-white;

        &-title{
            text-align: center;
            background-color: $dex-black;
        }
    
        &-img{
            display:flex;
            justify-content: center;
            
            img {
                width: 96px;
                height: 96px;
            }
        }
    
        &-types{
            display: flex;
            justify-content: center;
            column-gap: 6px;

            .types{
                text-shadow: 1px 1px 1px $dex-black;
                padding: 2px 8px;
                margin-bottom: 4px;
                border-radius: 25px;
                width: 80px;
                text-align: center;
                color: white;
            }
        }

        &-abilities {
            color: lighten($dex-black, 20);
            background-color: $dex-black;
            display: flex;
            padding: 0 6px;
            
            table {
                width: 100%;
                border-collapse: collapse;

                td:nth-child(1){
                    width: 25%;
                    padding: 3px;
                    padding-right: 6px;
                }

                td:nth-child(2) {
                    background: $dex-white;
                    color: $dex-black;
                    text-align: center;
                }
            }
        }
    }




    

</style>
