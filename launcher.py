import os
import subprocess

APP_CONFIGS = {
    "App 1": "backend/docker-compose.yml",
    "App 2": "frontend/docker-compose.yml",
    # Add more app configurations here
}

def display_menu():
    print("=== Launcher ===")
    print("Required: Docker, Docker Compose, Python 3.6+")
    print("Select an app to launch:")
    for idx, app_name in enumerate(APP_CONFIGS.keys(), start=1):
        print(f"{idx}. {app_name}")
    print("0. Exit")

def launch_app(app_config_path):
    subprocess.run(["docker-compose", "-f", app_config_path, "up", "-d"])

def main():
    while True:
        display_menu()
        choice = input("Enter your choice: ")

        if choice == "0":
            break

        try:
            choice_idx = int(choice)
            if choice_idx < 1 or choice_idx > len(APP_CONFIGS):
                raise ValueError
        except ValueError:
            print("Invalid choice. Please try again.")
            continue

        app_name = list(APP_CONFIGS.keys())[choice_idx - 1]
        app_config_path = APP_CONFIGS[app_name]

        print(f"Launching {app_name}...")
        launch_app(app_config_path)
        print("App launched successfully!")

if __name__ == "__main__":
    main()