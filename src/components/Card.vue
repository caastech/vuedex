<template>
    <div v-show="title" class="card">
        <div class="card-title">
            <h3>{{ title }}</h3>
        </div>
        <div class="card-content">
            <p> {{ effect }} </p>
        </div>
        <CardList :urls="dexContent.pokemon" />

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
            dexContent: Object,
        },

        data() {
            return {
                
            }
        },
        

        computed: {
            title() {
                return this.dexContent.title;
            },

            effect() {
                return this.dexContent.effect;
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
        background: lighten($dex-red, 20);
    }
</style>