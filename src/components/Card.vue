<template>
    <div v-show="type" class="card">
        <div v-if="type == 'ability'" class="card-ability">
            
            <h2>{{ type }}</h2>
            <div class="card-title">
                <h3>{{ title }}</h3>
            </div>
            <div class="card-content">
                <p> {{ effect }} </p>
            </div>

            <details>
                <summary open="">Pokemon with this ability: </summary>
                <CardList :profilesData="profiles" />
            </details>

        </div>
            

        <div v-else-if="type == 'move'" class="card-move">
            <h2> {{ type }} </h2>
        </div>

        <div v-else-if="type == 'pokemon'" class="card-pokemon">
            <h2>{{ type }}</h2>
        </div>

        <div v-else-if="type == 'error'">
            <h2>ERROR 404</h2>
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
            title() {
                return this.searchData.title;
            },

            effect() {
                return this.searchData.effect;
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
    }
</style>