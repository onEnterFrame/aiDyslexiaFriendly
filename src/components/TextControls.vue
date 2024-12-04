<script setup>
defineProps({
  fontSize: Number,
  lineSpacing: Number,
});

defineEmits(["update:fontSize", "update:lineSpacing"]);
</script>

<template>
  <div class="space-y-1">
    <div>
      <label for="font-size" class="block text-xs text-gray-800">
        Font Size: {{ fontSize }}px
      </label>
      <input
        type="range"
        id="font-size"
        :value="fontSize"
        @input="(e) => $emit('update:fontSize', +e.target.value)"
        min="16"
        max="24"
        class="w-full"
      />
    </div>
    <div>
      <label for="line-spacing" class="block text-xs text-gray-800">
        Line Spacing: {{ lineSpacing }}
      </label>
      <input
        type="range"
        id="line-spacing"
        :value="lineSpacing"
        @input="(e) => $emit('update:lineSpacing', +e.target.value)"
        min="1.5"
        max="2"
        step="0.1"
        class="w-full"
      />
    </div>
  </div>
</template>
