<template>
    <!-- :class="{'btn-selected' : isSelected}" -->
    <button class="btn">{{ title }}</button>
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
    @import '@/assets/scss/_setup.scss';

    .btn {
        padding: 12px 14px;
        border: none;
        border-radius: 0px;
    }

    .btn-selected {
        background-color: $dex-black;
    }
</style>