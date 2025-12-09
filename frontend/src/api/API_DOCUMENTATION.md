# CarValue API Documentation

This document describes all the API endpoints required for the CarValue frontend application.

## Base URL

Development: http://localhost:5050
```

All API endpoints are prefixed with `/api`

---

## Authentication

Currently, the frontend uses a simple user ID system. Future implementation should include:
- JWT token-based authentication
- Session management
- OAuth integration (optional)

**Current User ID**: `user-001` (hardcoded for demo)

---

## Endpoints

### 1. Create Car Evaluation

Creates a new car valuation based on user input.

**Endpoint**: `POST /api/evaluations`

**Request Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "userId": "string | null",
  "make": "string (required)",
  "model": "string (required)",
  "variant": "string (required)",
  "year": "number (required)",
  "mileage": "number (required)",
  "transmission": "string (required)",
  "engineCapacity": "number | null",
  "fuelType": "string (required)",
  "interiorCondition": "string | null",
  "exteriorCondition": "string | null",
  "isAccidental": "boolean (default: false)",
  "modificationStatus": "string (default: 'stock')",
  "images": "string[] | null"
}
```

**Response** (201 Created):
```json
{
  "id": "string",
  "userId": "string | null",
  "make": "string",
  "model": "string",
  "variant": "string",
  "year": "number",
  "mileage": "number",
  "transmission": "string",
  "engineCapacity": "number | null",
  "fuelType": "string",
  "interiorCondition": "string | null",
  "exteriorCondition": "string | null",
  "isAccidental": "boolean",
  "modificationStatus": "string",
  "images": "string[] | null",
  "suggestedPrice": "number",
  "minPrice": "number",
  "maxPrice": "number",
  "confidence": "number (0-100)",
  "aiAnalysis": "string | null",
  "createdAt": "ISO 8601 datetime"
}
```

**Example**:
```bash
curl -X POST http://localhost:5050/api/evaluations \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001",
    "make": "Toyota",
    "model": "Corolla",
    "variant": "Altis 1.6",
    "year": 2020,
    "mileage": 35000,
    "transmission": "Automatic",
    "engineCapacity": 1600,
    "fuelType": "Petrol",
    "interiorCondition": "Excellent",
    "exteriorCondition": "Good",
    "isAccidental": false,
    "modificationStatus": "stock",
    "images": null
  }'
```

---

### 2. Get User Evaluations

Retrieves all evaluations for a specific user.

**Endpoint**: `GET /api/evaluations?userId={userId}`

**Query Parameters**:
- `userId` (required): User ID

**Response** (200 OK):
```json
[
  {
    "id": "string",
    "userId": "string | null",
    "make": "string",
    "model": "string",
    "variant": "string",
    "year": "number",
    "mileage": "number",
    "transmission": "string",
    "suggestedPrice": "number",
    "minPrice": "number",
    "maxPrice": "number",
    "confidence": "number",
    "aiAnalysis": "string | null",
    "createdAt": "ISO 8601 datetime"
  }
]
```

**Example**:
```bash
curl http://localhost:5050/api/evaluations?userId=user-001
```

---

### 3. Get Evaluation by ID

Retrieves a specific evaluation.

**Endpoint**: `GET /api/evaluations/{id}`

**URL Parameters**:
- `id` (required): Evaluation ID

**Response** (200 OK):
```json
{
  "id": "string",
  "userId": "string | null",
  "make": "string",
  "model": "string",
  // ... full evaluation object
}
```

**Response** (404 Not Found):
```json
{
  "error": "Evaluation not found"
}
```

---

### 4. Delete Evaluation

Deletes a specific evaluation.

**Endpoint**: `DELETE /api/evaluations/{id}`

**URL Parameters**:
- `id` (required): Evaluation ID

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Evaluation deleted successfully"
}
```

**Response** (404 Not Found):
```json
{
  "error": "Evaluation not found"
}
```

**Example**:
```bash
curl -X DELETE http://localhost:5050/api/evaluations/eval-001
```

---

### 5. Create Price Alert

Creates a price alert for a car.

**Endpoint**: `POST /api/alerts`

**Request Body**:
```json
{
  "userId": "string (required)",
  "evaluationId": "string | null",
  "carName": "string (required)",
  "targetPrice": "number (required)",
  "currentPrice": "number (required)",
  "notifyEmail": "boolean (default: true)",
  "notifyPush": "boolean (default: true)"
}
```

**Response** (201 Created):
```json
{
  "id": "string",
  "userId": "string",
  "evaluationId": "string | null",
  "carName": "string",
  "targetPrice": "number",
  "currentPrice": "number",
  "status": "string (active/paused/triggered)",
  "notifyEmail": "boolean",
  "notifyPush": "boolean",
  "triggeredAt": "ISO 8601 datetime | null",
  "createdAt": "ISO 8601 datetime"
}
```

**Example**:
```bash
curl -X POST http://localhost:5050/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-001",
    "evaluationId": "eval-001",
    "carName": "Toyota Corolla Altis 1.6 (2020)",
    "targetPrice": 4000000,
    "currentPrice": 4200000,
    "notifyEmail": true,
    "notifyPush": true
  }'
```

---

### 6. Get User Alerts

Retrieves all price alerts for a specific user.

**Endpoint**: `GET /api/alerts?userId={userId}`

**Query Parameters**:
- `userId` (required): User ID

**Response** (200 OK):
```json
[
  {
    "id": "string",
    "userId": "string",
    "evaluationId": "string | null",
    "carName": "string",
    "targetPrice": "number",
    "currentPrice": "number",
    "status": "string",
    "notifyEmail": "boolean",
    "notifyPush": "boolean",
    "triggeredAt": "ISO 8601 datetime | null",
    "createdAt": "ISO 8601 datetime"
  }
]
```

---

### 7. Update Alert Status

Updates the status of a price alert.

**Endpoint**: `PATCH /api/alerts/{id}/status`

**URL Parameters**:
- `id` (required): Alert ID

**Request Body**:
```json
{
  "status": "string (active/paused/triggered)"
}
```

**Response** (200 OK):
```json
{
  "id": "string",
  "status": "string",
  "updatedAt": "ISO 8601 datetime"
}
```

**Example**:
```bash
curl -X PATCH http://localhost:5050/api/alerts/alert-001/status \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'
```

---

### 8. Delete Price Alert

Deletes a specific price alert.

**Endpoint**: `DELETE /api/alerts/{id}`

**URL Parameters**:
- `id` (required): Alert ID

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Alert deleted successfully"
}
```

**Response** (404 Not Found):
```json
{
  "error": "Alert not found"
}
```

**Example**:
```bash
curl -X DELETE http://localhost:5050/api/alerts/alert-001
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "details": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error description"
}
```

---

## Data Types

### Evaluation Object
- **id**: UUID string
- **userId**: UUID string or null
- **make**: Car manufacturer (e.g., "Toyota", "Honda")
- **model**: Car model (e.g., "Corolla", "Civic")
- **variant**: Model variant (e.g., "Altis 1.6", "Oriel 1.5T")
- **year**: Manufacturing year (number)
- **mileage**: Odometer reading in kilometers
- **transmission**: "Manual", "Automatic", "CVT", "DCT"
- **engineCapacity**: Engine size in CC (number or null)
- **fuelType**: "Petrol", "Diesel", "Hybrid", "Electric", "CNG"
- **interiorCondition**: "Excellent", "Good", "Fair", "Poor"
- **exteriorCondition**: "Excellent", "Good", "Fair", "Poor"
- **isAccidental**: Boolean
- **modificationStatus**: "stock", "modified"
- **images**: Array of image URLs or null
- **suggestedPrice**: AI-calculated price in PKR
- **minPrice**: Minimum estimated price in PKR
- **maxPrice**: Maximum estimated price in PKR
- **confidence**: Confidence score (0-100)
- **aiAnalysis**: AI-generated analysis text
- **createdAt**: ISO 8601 datetime

### PriceAlert Object
- **id**: UUID string
- **userId**: UUID string
- **evaluationId**: UUID string or null
- **carName**: Display name of the car
- **targetPrice**: Desired price in PKR
- **currentPrice**: Current market price in PKR
- **status**: "active", "paused", "triggered"
- **notifyEmail**: Boolean
- **notifyPush**: Boolean
- **triggeredAt**: ISO 8601 datetime or null
- **createdAt**: ISO 8601 datetime

---

## Notes for Backend Developers

1. **AI Integration**: The `createEvaluation` endpoint should integrate with OpenAI API for price analysis. The analysis should consider:
   - Base price from car database
   - Year depreciation
   - Mileage impact
   - Condition ratings
   - Accident history
   - Market trends

2. **Image Processing**: If images are provided, they should be:
   - Validated for size and format
   - Stored in cloud storage (e.g., AWS S3)
   - Optionally analyzed by AI for condition assessment

3. **Price Alerts**: Implement a background job/cron to:
   - Monitor market prices
   - Trigger alerts when target price is reached
   - Send email/push notifications

4. **Database**: Use PostgreSQL with Drizzle ORM as specified in the project setup

5. **Authentication**: Implement JWT-based authentication for production

6. **Rate Limiting**: Add rate limiting to prevent abuse of AI evaluation endpoint

7. **CORS**: Configure CORS to allow frontend domain in production
