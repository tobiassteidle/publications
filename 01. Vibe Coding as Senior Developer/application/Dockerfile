# Mehrstufiger Build für Angular + Spring Boot

# Stage 1: Build Angular Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build -- --configuration production

# Stage 2: Build Spring Boot Backend
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn package -DskipTests

# Stage 3: Final image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
COPY --from=frontend-build /app/frontend/dist/frontend /app/static

# Konfiguriere Spring Boot, um die statischen Frontend-Dateien zu servieren
ENV SPRING_RESOURCES_STATIC-LOCATIONS=classpath:/static/,file:/app/static/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]