// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let server = tiny_http::Server::http("localhost:9975").unwrap();
            std::thread::spawn(move || {
                for rq in server.incoming_requests() {
                    let response =
                        tiny_http::Response::from_string(include_str!("../redirect/index.html"))
                            .with_header(tiny_http::Header {
                                field: "Content-Type".parse().unwrap(),
                                value: "text/html; charset=utf8".parse().unwrap(),
                            });

                    let _ = rq.respond(response);
                }
            });

            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
