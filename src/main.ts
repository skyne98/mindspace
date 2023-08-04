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

// Make an embedding
const openai = new OpenAIApi(configuration);
const embedding = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: ["Hello, my name is"],
});
console.log("embedding: " + JSON.stringify(embedding));

createApp(App).mount("#app");
