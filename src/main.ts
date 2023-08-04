import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { invoke } from '@tauri-apps/api/tauri';
import { Configuration, OpenAIApi } from "openai";

export async function read_env_var(name: string): Promise<string> {
    const result = await invoke("read_env_var", { name: name });
    if (typeof result === "string") {
        return result;
    }
    throw new Error("Wrong type returned from read_env_var" + typeof result);
}

const openai_api_key = await read_env_var("OPENAI");
console.log("openai_api_key: " + openai_api_key);
const configuration = new Configuration({ apiKey: openai_api_key });
delete configuration.baseOptions.headers['User-Agent'];

// Make a client
const openai = new OpenAIApi(configuration);

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App, { openai }).use(vuetify).mount("#app");
