<template>
    <div class="toolbar">
        <StartButton />
        <Spacer/>
        <div class="white-space"></div>
        <Spacer/>
        <Clock />

    </div>
</template>
<script setup>
import StartButton from './StartButton.vue'
import Spacer from './Spacer.vue'
import Clock from './Clock.vue'
</script>
<style scoped>
 .toolbar{
    width: 100vw;
    height: 2.5rem;
    display: flex;
    align-items: center;
    background-color: var(--tertiary-color);
    border-top-width: 2px;
    border-color: var(--border-white-color);
    padding: 0.25rem;
    position: absolute;
    bottom: 0;
 }
 .white-space {
    flex: 1 1 0%;
 }

</style>

