# One Line Story

One Line Story is a collaborative storytelling platform where players contribute one sentence at a time to a communal story.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Docker
- Docker Compose
- Node.js
- npm

## Installation

To set up and run this app, follow these steps:

1. Clone this repository to your local machine.
2. Duplicate the PROJECT_ROOT_DIR/docker/.env.example file and rename it to ".env.[prod|dev]".
3. Customize Environment Variables (Optional): Open the newly created .env.[prod|dev] file and modify the environment variables as needed.
4. Navigate to the project directory and run the following command based on your needs:

   - For the production environment: `npm start` (uses PROJECT_ROOT_DIR/docker/.env.prod)
   - For the development environment: `npm run dev` (uses PROJECT_ROOT_DIR/docker/.env.dev)

This app has been tested on the following platforms:

- Windows Subsystem for Linux (WSL)

## Troubleshooting Dependencies

If you encounter issues with installing new dependencies in your project, you can use the following script to change ownership of directories:

make sure the script is executable:

```bash
chmod +x PROJECT_ROOT_DIR/scripts/change-ownership.sh
``` 

then run the script:

```bash
PROJECT_ROOT_DIR/scripts/change-ownership.sh
```
