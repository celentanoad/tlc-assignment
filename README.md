# Bill Number Parser API

This project implements a RESTful API to parse and validate bill numbers. The API is built using Express and Node.js, and includes comprehensive error handling with structured responses.

## Functional Requirements

- **Endpoint**: `POST /api/billnumber/parse`
- **Payload**: A JSON object with a `billNumber` string property.
- **Response**: A JSON object containing:
  - `isValid`: `true` or `false`
  - `billNumberLong`: Normalized format (e.g., `HB00005`)
  - `billNumberShort`: Short format (e.g., `HB 5`)
  - `chamber`, `type`, `suffix`: Parsed components of the bill number

## Parsing Logic
- Handles inputs with or without spaces.
- Manages lowercase and mixed-case inputs.
- Expects a valid, non-empty bill number; empty or missing values are handled by the controller.

## Validation and Error Handling

### Input Validation (Controller Level)
- If the `billNumber` field is **missing** or **empty**, the API responds with:
  - **HTTP Status**: 400 (Bad Request)
  - **Response Body**:
    ```json
    {
      "isValid": false,
      "billNumberLong": null,
      "billNumberShort": null,
      "chamber": null,
      "type": null,
      "suffix": null,
      "error": {
        "code": 400,
        "message": "Bill number is required."
      }
    }
    ```

### Parsing Error (Invalid Format)
- If the `billNumber` is provided but fails validation (e.g., invalid chamber):
  - **HTTP Status**: 422 (Unprocessable Entity)
  - **Response Body**:
    ```json
    {
      "isValid": false,
      "billNumberLong": null,
      "billNumberShort": null,
      "chamber": null,
      "type": null,
      "suffix": null,
      "error": {
        "code": 422,
        "message": "Invalid bill number"
      }
    }
    ```

### Success Case
- For valid inputs, the API returns a status code of 200 with the parsed fields. For example:
  - Request with `"billNumber": "HB5"` might return:
    ```json
    {
      "isValid": true,
      "billNumberLong": "HB00005",
      "billNumberShort": "HB 5",
      "chamber": "H",
      "type": "B",
      "suffix": "00005"
    }
    ```

## How It Works

1. **Controller (`billController.js`)**
   - Receives the `POST` request.
   - Validates that the `billNumber` is present and non-empty.
   - If validation fails, returns a 400 error with the proper error object.
   - Delegates the parsing logic to the service if the input is valid.
   - If the parser returns an invalid result, the controller returns a 422 error.

2. **Service (`billParser.js`)**
   - Focuses solely on parsing the bill number without handling empty input.
   - Performs operations such as removing whitespace, validating the chamber and bill type, and formatting the numeric suffix.

3. **Global Error Handling**
   - A global error handler in `index.js` catches any unexpected errors and returns a 500 error with a standard message.

## Usage

### Running the API
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The server listens on port 3001.

### Testing the API
You can test the API using command-line tools (like `curl` or `HTTPie`) or integration testing with Supertest.

#### Example: Using curl
```bash
curl -X POST http://localhost:3001/api/billnumber/parse \
-H "Content-Type: application/json" \
-d '{ "billNumber": "HB5" }'
```

#### Example: Using HTTPie
```bash
http POST http://localhost:3001/api/billnumber/parse billNumber='HB5'
```

### Running Tests
- To run unit and integration tests, ensure you have Jest installed (and Supertest for integration tests) then run:
  ```bash
  npm test
  ```

## Project Structure

```
├── README.md
├── server
│   ├── index.js               // Entry point; sets up Express and global error handling
│   ├── package.json
│   ├── controllers
│   │   └── billController.js  // Handles input validation and delegates to parsing service
│   ├── routes
│   │   └── billRoutes.js      // Defines the /api/billnumber/parse endpoint
│   ├── services
│   │   └── billParser.js      // Contains the parsing and normalization logic
│   └── tests
│       ├── integration
│       │   └── billController.test.js  // Integration tests for the API endpoints
│       └── unit
│           ├── billParser.test.js        // Unit tests for parsing logic
│           └── mockData.js               // Test data for unit tests
└── ...
```

## API Documentation
- **Endpoint**: `POST /api/billnumber/parse`
- **Request Header**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "billNumber": "Your bill number here"
  }
  ```
- **Response Examples**:
  - **Empty Input** (400 Error):
    See above under Validation.
  - **Invalid Format** (422 Error):
    See above under Parsing Error.
  - **Successful Parse** (200 Success):
    See above under Success Case.