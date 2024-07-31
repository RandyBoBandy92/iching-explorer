#!/bin/bash

# Run the build process
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build succeeded. Copying files..."

    # Navigate to the iching-explorer-public directory
    cd ../iching-explorer-public

    # Show files that will be deleted first, and add confirm prompt
    echo "The following files will be deleted:"
    # List all files in the repository, except for the .git folder
    find . -path ./.git -prune -o -type f -print

    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo # move to a new line

    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        echo "Aborting script."
        exit 1
    fi

    # Remove existing files in the repository, except for the .git folder
    find . -path ./.git -prune -o -type f -exec rm -f {} +

    # Copy all files from the 'dist' folder to the 'iching-explorer-public' folder
    cp -r ../iching-explorer/dist/* .

    # Add changes to git
    git add .

    # Commit changes with a message
    git commit -m "Update public files after build"

    # Push changes to the remote repository
    git push

    echo "Files copied and changes pushed to the repository."
else
    echo "Build failed. Aborting script."
    exit 1
fi

# Go back to the original directory
cd ../iching-explorer
