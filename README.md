# Product Management Application

A modern web application for managing products, built with Nuxt.js, Vue 3, and Vuetify.

## Features

- 📋 Complete product inventory management
- ✨ Create, read, update, and delete (CRUD) operations for products
- 📊 View all products in a sortable, searchable table
- 📱 Responsive design for desktop and mobile
- 🚀 Fast performance with server-side rendering
- 🔒 Integration with AWS DynamoDB for data storage

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - Vue.js framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vuetify 3](https://vuetifyjs.com/) - Material Design component library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/) - NoSQL database service
- [AWS SDK v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) - AWS JavaScript SDK

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) (for local development)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=local
DYNAMODB_TABLE=Products
```

### DynamoDB Setup

You can run DynamoDB Local using Docker:

#### Using Docker

```bash
docker run -p 8000:8000 -v $(pwd)/dynamodb:/home/dynamodblocal/data amazon/dynamodb-local -jar DynamoDBLocal.jar -dbPath /home/dynamodblocal/data
```

This command:

- Runs DynamoDB Local in a Docker container
- Maps port 8000 to your local machine
- Creates a persistent volume for your data
- Makes DynamoDB accessible at http://localhost:8000

1. Create the Products table:

```bash
aws dynamodb create-table \
    --table-name Products \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000 \
    --region local
```

2. Insert dummy product data:

```bash
aws dynamodb put-item --table-name Products --item '{
    "id": {"S": "35"},
    "name": {"S": "Robot Vacuum Cleaner"},
    "price": {"N": "499.99"},
    "quantity": {"N": "7"},
    "total_amount": {"N": "3499.93"},
    "created_at": {"S": "2024-03-25T03:30:00Z"},
    "updated_at": {"S": "2024-03-25T03:30:00Z"}
}' --endpoint-url http://localhost:8000 --region local
```

3. Check for items in the Products table:

```bash
aws dynamodb scan --table-name Products --endpoint-url http://localhost:8000 --region local
```

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Project Structure

```
product-management-app/
├── components/          # Reusable Vue components
├── composables/         # Shared composition functions
├── layouts/             # Page layouts
├── pages/               # Application routes
├── plugins/             # Vue plugins
├── public/              # Static files
├── server/              # Server-side code
│   ├── api/             # API endpoints
│   └── utils/           # Server utilities
├── types/               # TypeScript type definitions
├── app.vue              # Application entry point
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Project dependencies
```

## Product Management

The application manages products with the following properties:

- `id`: Unique identifier (UUID)
- `name`: Product name
- `price`: Product unit price
- `quantity`: Available quantity
- `total_amount`: Calculated total value (price × quantity)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## API Endpoints

- `GET /api/products` - List all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a specific product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## License

MIT

## Acknowledgements

- [Nuxt.js Team](https://nuxt.com/)
- [Vue.js Team](https://vuejs.org/)
- [Vuetify Team](https://vuetifyjs.com/)
