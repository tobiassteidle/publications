# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## General Infrormation
- Project Type: Spring Boot + Angular
- Version Control: Git
- Language: Java (Spring Boot), TypeScript (Angular)
- Database: PostgreSQL
- Containerization: Docker
- CI/CD: GitHub Actions
- Language for Comments, Types, etc.: English
- Language for UI: German
- Update .gitignore to exclude unnecessary files
- IDE: IntelliJ IDEA for Java and Angular development

# Directory Structure
- `frontend/`: Contains the Angular application
- `backend/`: Contains the Spring Boot application
- `Dockerfile`: Used to build a combined Docker container for both frontend and backend
- `README.md`: Project description and documentation

## Build and Test Commands
- Build: [Add build command once project type is determined]
- Lint: [Add lint command]
- Test (all): [Add test command]
- Test (single): [Add single test command]

## Code Style Guidelines
- **Formatting**: Use consistent indentation (2 or 4 spaces based on language)
- **Naming**: Use camelCase for variables/functions, PascalCase for classes
- **Types**: Use strong typing where available
- **Imports**: Group imports logically (standard library, third-party, local)
- **Error Handling**: Use try/catch blocks and proper error logging
- **Comments**: Document public APIs and complex logic; avoid obvious comments; comments in english
- **Testing**: Write unit tests for all public methods and critical logic; use descriptive test names
- **Version Control**: Commit often with clear messages; use branches for features/bugfixes; follow the Git Flow model
- **Documentation**: Update README and other documentation as needed; use markdown for formatting
- **Dependencies**: Keep dependencies up to date; use a dependency management tool (e.g., Maven, npm) to manage versions
- **Security**: Follow best practices for security (e.g., input validation, authentication, authorization); keep sensitive information out of the codebase; use environment variables for configuration;
  - Follow OWASP guidelines for secure coding
  - Follow best practices for handling sensitive data (e.g., passwords, API keys)
  - Authentication and authorization should be handled securely like using OAuth2 or JWT and described in `docs/auth-flow.md`
- **Performance**: Optimize for performance where necessary; avoid premature optimization
- **Code Reviews**: Conduct code reviews for all pull requests; provide constructive feedback and suggestions for improvement
- **Continuous Integration/Continuous Deployment (CI/CD)**: Set up CI/CD pipelines for automated testing and deployment; use GitHub Actions
- **Language-Specific Guidelines**: Follow language-specific guidelines (e.g., Java, JavaScript, TypeScript) for best practices and conventions
- **Framework-Specific Guidelines**: Follow framework-specific guidelines (e.g., Spring Boot, Angular) for best practices and conventions
- **Lombok**: Use Lombok for boilerplate code reduction in Java classes
- **Spring Boot**: Prevent @Autowired in constructors; use constructor injection instead, Create Beans with @Bean annotation in configuration classes
- **Java**: Use Java 17+ features where applicable; prefer var for local variable type inference

## Project-Specific Notes
- This project handles shipping jobs (Versandjobs)
- Update this file with more specific guidance as the project develops
- Logo and Favicon are available in the `frontend/public/logo.svg` or `frontend/src/assets` directory
- Authentication is handled via Keycloak described in `docs/auth-flow.md`
