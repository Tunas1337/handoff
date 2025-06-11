import sys
import os
import time
import ctypes

# This script is primarily designed for Windows due to the use of the winreg module.
# Administrator privileges are required to write to the HKEY_CLASSES_ROOT registry hive.

SCHEME_NAME = "andrejlauncher"

# Dictionary to map URI schemes to application paths
APP_MAPPING = {
    "andrejlauncher://calculator/": "C:/Windows/System32/calc.exe",
    "andrejlauncher://explorer/": "C:/Windows/explorer.exe",
    "andrejlauncher://terminal/": "C:/Windows/System32/wt.exe"
}

def handle_uri(uri):
    """
    This function is executed when the script is invoked via its custom URI scheme.
    """
    # Open the application requested by the URI
    if uri in APP_MAPPING:
        os.startfile(APP_MAPPING[uri])
    else:
        # Make message box
        ctypes.windll.user32.MessageBoxW(0, f"Invalid URI: {uri}", "Error", 0)


def register_for_windows():
    """
    Registers the custom URI scheme in the Windows Registry.
    Requires administrator privileges.
    """
    # Import Windows-specific modules
    import winreg
    import ctypes

    # 1. Check for administrator privileges
    try:
        is_admin = ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        print("Could not check for administrator privileges.")
        is_admin = False

    if not is_admin:
        print("Error: Registration requires administrator privileges.")
        print(f"Please re-run this script as an administrator to register the '{SCHEME_NAME}' URI scheme.")
        return

    # 2. Get the necessary paths
    # Path to the python.exe interpreter
    python_executable = sys.executable
    # Path to this script
    script_path = os.path.abspath(__file__)
    
    # 3. Define the command that will be executed when the URI is called
    # The "%1" is a placeholder that Windows will replace with the full URI
    command_to_run = f'"{python_executable}" "{script_path}" "%1"'

    # 4. Create the necessary keys in the Windows Registry
    try:
        # Open HKEY_CLASSES_ROOT
        with winreg.OpenKey(winreg.HKEY_CLASSES_ROOT, '', 0, winreg.KEY_WRITE) as hkey:
            # Check if the key already exists
            try:
                winreg.OpenKey(hkey, SCHEME_NAME)
                # The key already exists, but we want to re-add it in case the script or Python path has changed.
                # So, delete the existing key and re-create it.
                winreg.DeleteKey(hkey, fr"{SCHEME_NAME}\shell\open\command")
                winreg.DeleteKey(hkey, fr"{SCHEME_NAME}\shell\open")
                winreg.DeleteKey(hkey, fr"{SCHEME_NAME}\shell")
                winreg.DeleteKey(hkey, SCHEME_NAME)
                # Now proceed to create the key as if it didn't exist
                raise FileNotFoundError # ;)
            except FileNotFoundError:
                # Create the main scheme key: HKEY_CLASSES_ROOT\andrejlauncher
                with winreg.CreateKey(hkey, SCHEME_NAME) as scheme_key:
                    # Set the default value to identify the protocol
                    winreg.SetValue(scheme_key, None, winreg.REG_SZ, f"URL:{SCHEME_NAME} Protocol")
                    # Create a string value named "URL Protocol"
                    winreg.SetValueEx(scheme_key, "URL Protocol", 0, winreg.REG_SZ, "")
                    
                    # Create the command key: HKEY_CLASSES_ROOT\andrejlauncher\shell\open\command
                    with winreg.CreateKey(scheme_key, r"shell\open\command") as command_key:
                        # Set the command to be executed
                        winreg.SetValue(command_key, None, winreg.REG_SZ, command_to_run)
        
        print(f"Successfully registered the '{SCHEME_NAME}://' URI scheme.")
        print("You can now test it by opening a link like 'andrejlauncher://test-data'")
        input("Press Enter to exit...")

    except Exception as e:
        print(f"An error occurred while writing to the registry: {e}")
        print("Registration failed.")

def main():
    """
    Main function to determine if we are registering or handling a URI.
    """
    # If there is more than one argument, it means the script was launched by a URI call.
    if len(sys.argv) > 1:
        uri_argument = sys.argv[1]
        handle_uri(uri_argument)
    else:
        # If there are no arguments, it's a first-time/manual run. Attempt registration.
        print("No URI argument detected. Running registration process...")
        if sys.platform == 'win32':
            register_for_windows()
        else:
            print(f"This registration script is designed for Windows.")
            print(f"On macOS or Linux (for now), you would need to configure this manually (e.g., via an Info.plist or .desktop file).")

if __name__ == "__main__":
    main()