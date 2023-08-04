<script setup lang="ts">
import { OpenAIApi } from 'openai';
import { ref, watch } from 'vue';

const props = defineProps({
  openai: OpenAIApi
});

// Refs
const openai = ref<OpenAIApi>(props.openai!);
const iframe = ref<HTMLIFrameElement | null>(null);
const prompt = ref<string>('');

function iframeSetContent(content: string) {
  if (iframe.value == null) {
    throw new Error('iframe is null');
  }

  const doc = iframe.value.contentDocument;
  if (doc == null) {
    throw new Error('iframe contentDocument is null');
  }

  doc.body.innerHTML = content;
}
function iframeEval(code: string) {
  if (iframe.value == null) {
    throw new Error('iframe is null');
  }

  const doc = iframe.value.contentDocument;
  if (doc == null) {
    throw new Error('iframe contentDocument is null');
  }

  const script = doc.createElement('script');
  script.textContent = code;
  doc.body.appendChild(script);
}
</script>

<template>
  <div style="max-width: 100vw; max-height: 100vh;">
    <div class="overlay-toolbar elevation-2">
      <!-- GPT prompt -->
      <v-textarea v-model="prompt" label="GPT Prompt" outlined dense rows="1" style="width: 100%;"></v-textarea>
      <v-btn @click="iframeEval(`gptPrompt = ${JSON.stringify(prompt)};`)" color="primary" style="margin-left: 5px;">
        Set
      </v-btn>
    </div>
    <iframe ref="iframe" style="width: 100%; height: 100%; border: none;">
      "Your browser does not support iframes.
    </iframe>
  </div>
</template>

<style scoped>
.overlay-toolbar {
  /* Floats 40 pixels above the bottom on top of the content */
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  width: calc(100vw - 20px);
  border-radius: 5px;
  padding: 5px;
}
</style>
