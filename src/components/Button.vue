<template>
    <button>{{ title }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        title: String,
    }
}
</script>

<style lang="scss" scoped>
    button {
        padding: 12px 14px;
        border: none;
        border-radius: 0px;
    }
</style>