<template>
    <div class="table">
        
        <div class="item" v-for="profile in profilesData">
            <Profile :details="profile"/>
        </div>
            
    </div>
</template>

<script>
    import Profile from '@/components/Profile'

    export default {
        name: 'CardList',
        
        data() {
            return {
            }
        },

        props: {
            profilesData: Array,
        },

        components: {
            Profile,
        },

        methods: {
            showMe(){
                console.log('Here we are');
            },


        
        },

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
