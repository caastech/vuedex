<template>
    <div class="profile">
        <div class="profile-title">
            <h3>{{ 'title' }}</h3>
        </div>
        <div v-if="details.length !== 0" class="profile-content">
            <p> {{ details[0].name }} </p>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Profile',
        props: {
            details: Array,
        }
    }
</script>

<style lang="scss" scoped>

    

</style>
