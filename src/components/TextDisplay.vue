<script setup>
import { marked } from "marked";
defineProps({
  fontSize: Number,
  lineSpacing: Number,
  text: String,
});
</script>

<template>
  <div
    class="bg-cream h-full flex flex-col"
    :style="{
      fontSize: `${fontSize}px`,
      lineHeight: lineSpacing,
      maxWidth: '75ch',
    }"
  >
    <div class="pl-2 overflow-y-auto flex-grow">
      <div v-html="marked(text)"></div>
    </div>
  </div>
</template>
