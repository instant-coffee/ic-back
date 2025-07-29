# Tech Catalog Backend

A Node.js/Express backend API for managing technology catalog data with MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- pnpm
- Docker & Docker Compose

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

The API will be available at `http://localhost:3000`

## 📁 Project Structure

```
BACKEND/
├── src/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route handlers
│   ├── middleware/      # Express middleware
│   └── app.ts          # Express app setup
├── docker-compose.yml   # MongoDB container
├── package.json
└── tsconfig.json
```

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Database
MongoDB runs in a Docker container on port `27017`. The database name is `tech-catalog`.

## 📚 API Documentation

### Base URL
`http://localhost:3000/api`

### Technologies Endpoints

#### GET /api/technologies
Returns all technologies sorted by creation date (newest first).

**Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "brandColor": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### POST /api/technologies
Creates a new technology.

**Request Body:**
```json
{
  "name": "string",
  "brandColor": "string"
}
```

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "brandColor": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

**Validation:**
- Both `name` and `brandColor` are required
- Returns 400 error if missing required fields

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Development**: ts-node-dev for hot reload

## 🔒 Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tech-catalog
```

## 🐳 Docker

The project includes a `docker-compose.yml` file for running MongoDB:

```bash
# Start MongoDB
docker-compose up -d

# Stop MongoDB
docker-compose down

# View logs
docker-compose logs mongodb
```

## 📝 TODO

- [ ] Add caching headers to GET endpoints
- [ ] Implement authentication middleware
- [ ] Add input validation middleware
- [ ] Add error handling middleware
- [ ] Add logging
- [ ] Add tests 