import os
import subprocess

def launch_backend():
    app_name = "backend"
    app_config_path = os.path.join(app_name, "docker-compose.yaml")
    print(f"Launching {app_name}...")
    subprocess.run(["docker-compose", "-f", app_config_path, "up", "-d"])
    print("App launched successfully!")

def launch_frontend():
    try:
        print("Launching frontend...")
        os.chdir("./frontend")
        subprocess.check_call(['npm', 'install'])
        subprocess.Popen(['npm', 'start'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.chdir("../")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred while running the Node.js application: {e}")

def launch_network():
    pass

APP_CONFIGS = {
    "backend": launch_backend,
    "frontend": launch_frontend,
    "network": launch_network
}


def display_menu():
    print("=== Launcher ===")
    print("Required: Docker, Docker Compose, Python 3.6+, node")
    print("Select an app to launch:")
    for idx, app_name in enumerate(APP_CONFIGS.keys(), start=1):
        print(f"{idx}. {app_name}")
    print("0. Exit")

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
        APP_CONFIGS[app_name]()


if __name__ == "__main__":
    main()