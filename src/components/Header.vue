<script setup>
defineEmits(["reload"]);
</script>

<template>
  <button
    @click="$emit('reload')"
    class="mb-4 px-4 py-2 text-sm md:text-base lg:text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    title="Make selection Dyslexia-Friendly"
  >
    Make selection Dyslexia-Friendly
  </button>
</template>
