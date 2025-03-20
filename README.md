## Incident Management System

### Overview  
The **Incident Management System** is a web application built with **Java, Spring Boot, and MySQL**, designed to help users manage incident records dynamically. It includes user authentication and CRUD operations, ensuring efficient tracking and resolution of incidents. The application is containerized using **Docker Compose** for easy deployment.

### Features  
✅ User authentication (Login/Signup)  
✅ Create, Read, Update, and Delete (CRUD) incident records  
✅ MySQL database for persistent storage  
✅ Containerized with **Docker Compose** for seamless orchestration  

### Tech Stack  
- **Backend**: Java, Spring Boot  
- **Database**: MySQL  
- **Containerization**: Docker, Docker Compose  

### Setup & Installation  

#### Prerequisites  
Ensure you have the following installed on your system:  
- Docker & Docker Compose  
- Java 17+  
- Maven  

#### Steps to Run  
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/incident-management-system.git
   cd incident-management-system
   ```  
2. **Build the Application**  
   ```bash
   mvn clean package
   ```  
3. **Start the Application using Docker Compose**  
   ```bash
   docker-compose up -d
   ```  
4. **Access the Application**  
   - API runs on: `http://localhost:8080`  
   - MySQL Database runs on: `localhost:3306`  

### API Endpoints  
| Method | Endpoint          | Description                |
|--------|------------------|----------------------------|
| POST   | `/auth/signup`   | User registration         |
| POST   | `/auth/login`    | User login                |
| GET    | `/incidents`     | Get all incidents         |
| POST   | `/incidents`     | Create a new incident     |
| PUT    | `/incidents/{id}` | Update an incident        |
| DELETE | `/incidents/{id}` | Delete an incident        |

### Contributing  
Feel free to fork this repo and submit pull requests!  

### License  
This project is licensed under the MIT License.
