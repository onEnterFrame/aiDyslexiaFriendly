<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import Header from "./components/Header.vue";
import TextControls from "./components/TextControls.vue";
import TextDisplay from "./components/TextDisplay.vue";
import { useTextProcessing } from "./composables/useTextProcessing";

const fontSize = ref(18);
const lineSpacing = ref(1.5);

const {
  pageText,
  isProcessing,
  error,
  runAIOnSelectedText,
  cleanup,
  setupPortConnection,
} = useTextProcessing();

// Watch error and clear after 5 seconds
watch(error, (newError) => {
  if (newError) {
    setTimeout(() => {
      error.value = null;
    }, 5000);
  }
});

onMounted(() => {
  setupPortConnection();
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div class="flex flex-col h-screen bg-cream p-2">
    <Header @reload="runAIOnSelectedText" />

    <div
      v-if="error"
      class="mb-4 p-4 bg-red-100 text-red-700 text-sm rounded-md"
    >
      {{ error }}
    </div>

    <div v-if="isProcessing" class="mb-4">
      <div class="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-gray-600 rounded-full loading-bar"></div>
      </div>
    </div>

    <TextControls
      v-model:fontSize="fontSize"
      v-model:lineSpacing="lineSpacing"
      class="mb-2"
    />

    <div class="flex-grow overflow-hidden">
      <!-- Added wrapper -->
      <TextDisplay
        :fontSize="fontSize"
        :lineSpacing="lineSpacing"
        :text="pageText"
        class="h-full w-full"
      />
    </div>
  </div>
</template>

<style>
.loading-bar {
  width: 30%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(220%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
