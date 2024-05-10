
## AuthRoute Endpoints

### 1. Signup

- **Method:** POST
- **Endpoint:** `/signup`
- **Request Body:**
  ```json
  {
    "firstName": "Jhon",
    "lastName": "Wick",
    "email": "jhonwick@gmail.com",
    "mobileNumber": "7000000000",
    "gender": "Male",
    "password": "password123",
    "branch": "New York",
    "dateOfBirth": "1985-01-01"
  }
- **Response:** `User registered successfully`

### 2. Login

- **Method:** POST
- **Endpoint:** `/login`
- **Request Body:**
  ```json
  {
    "email": "jhonwick@gmail.com",
    "password": "password123"
  }
- **Response:** `If both fields are correct returns employeeId and token. Incorrect email or password if either field is incorrect.`

### 3. Verify

- **Method:** POST
- **Endpoint:** `/verify`
- **Request Body:**
  ```json
  {
  }
- **Response:** `Status in true or false.`

### 4. GetAllUsers

- **Method:** GET
- **Endpoint:** `/users`
- **Response:** `Returns all the registered users`

## ShipRoute Endpoints

### 1.CreateShip

- **Method:** POST
- **Endpoint:** `/createShip`
- **Request Body:**
  ```json
  {
  "shipper": {
    "name": "Jhon Wick",
    "email": "jhonwick@gmail.com",
    "phonenumber": 7000000000,
    "shipperAddress": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharastra"
    }
  },
  "receiver": {
    "name": "Dominic Toreto",
    "email": "dominictoreto@gmail.com",
    "phonenumber": 9876543210,
    "receiverAddress": {
      "street": "456 Elm St",
      "city": "Raipur",
      "state": "Chhattisgarh"
    }
  },
  "parceltype": "Electronics",
  "quantity": 1,
  "rate": 10.5,
  "finalamount": 10.5,
  "bookingdate": "2024-05-10",
  "estdeliverydate": "2024-05-25"
}
- **Response:** `Returns the same object with added status and shipmentId`


### 2.GetAllShipments

- **Method:** GET
- **Endpoint:** `/getAllShipments`
- **Response:** `All the booked shipments`
