#!/bin/bash

# Navigate to the iching-explorer directory

# Run the build process
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Build succeeded. Copying files..."

    # Copy all files from the 'dist' folder to the 'iching-explorer-public' folder
    cp -r dist/* ../iching-explorer-public/

    # Navigate to the iching-explorer-public directory
    cd ../iching-explorer-public

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
