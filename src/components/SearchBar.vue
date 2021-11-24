<template>
    <main>
        <div class="buttons">
            <Button title="Abilities"/>
            <Button title="Moves"/>
            <Button title="Pokémon"/>
        </div>
        <input type="text" placeholder="Search here...">
    </main>
</template>

<script>
import Button from '@/components/Button'

export default {
    name: 'SearchBar',

    components: {
        Button,
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