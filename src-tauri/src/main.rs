// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use dotenv::dotenv;

// Command to read an environment variable
#[tauri::command]
fn read_env_var(name: String) -> String {
    dotenv().ok();
    dotenv::var(name).unwrap_or_else(|_| "".to_string())
}

fn main() {
    // Read and display the present environment variables
    dotenv().ok();
    println!("Environment variables:");
    for (key, value) in dotenv::vars() {
        println!("{}: {}", key, value);
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_env_var])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
