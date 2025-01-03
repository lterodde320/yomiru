# Yomiru

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Yomiru is a simple open-source RSS reader app that can be self-hosted. It is designed to help you stay updated with your favorite feeds in a seamless and efficient manner.

## Features

- Self-hosted RSS reader
- Built with Next.js for a fast and modern web experience
- Utilizes Shadcn for a sleek and responsive UI
- Prisma ORM for database management
- PostgreSQL as the database backend

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/lterodde320/yomiru.git
    cd yomiru
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    ```bash
    npx prisma migrate dev
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Add your favorite RSS feeds and start reading!

## License

This project is licensed under the AGPLv3 License - see the [LICENSE](https://www.gnu.org/licenses/agpl-3.0) file for details.