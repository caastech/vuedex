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
                <h4 v-for="type in details.types" > {{ type.type.name }} </h4>
            </div>

            <div class="abilities">
                <p v-for="ability in details.abilities"> {{ ability.ability.name }} </p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Profile',
        
        props: {
            details: Object,
        },

        computed: {
            name() {
                let formattedName = this.details.name;

                formattedName = formattedName.replace('-',' ')
                .split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ');
                    
                return formattedName;
            }
        }
    }
    
</script>

<style lang="scss" scoped>
    .profile{ 
    }

    .profile-title{
        text-align: center;
        background-color: lightslategray;
    }

    .profile-img{
        display:flex;
        justify-content: center;
    }
    

</style>
