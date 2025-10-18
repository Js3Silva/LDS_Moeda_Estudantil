# Etapa de build
FROM --platform=linux/amd64 maven:3.9.6-eclipse-temurin-21-alpine AS builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Etapa de execução
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]