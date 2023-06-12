# Arithmetic Calculator - Backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
### APIs

#### LOGIN
* **POST** /v1/auth/login
* **REQUEST BODY:**
```
{
  "username": "foo@test.com",
  "password": "abc123"
}
```
#### Operations
* **POST** /v1/operations
* **REQUEST BODIES:**


* **Addition:**
```
{
    "number1": 1,
    "number2": 1,
    "operationId": 0
}
```

* **Subtraction:**

```
{
    "number1": 1,
    "number2": 1,
    "operationId": 1
}
```
* **Multiplication:**
```
{
    "number1": 1,
    "number2": 1,
    "operationId": 2
}
```

* **Division:**
```
{
    "number1": 1,
    "number2": 1,
    "operationId": 3
}
```

* **Square root:**
```
{
    "number1": 1,
    "operationId": 4
}
```

* **Random string:**
```
{
    "operationId": 5
}
```
#### Records
* **GET** /v1/records?page=1&rowsPerPage=10&sortBy=id&order=DESC or ASC

#### Delete record by ID (soft delete)
* **DELETE** /v1/records/1
