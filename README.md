# **Gym Project**

## 1. **Introduction**

This project is a simple web-based Gym application, developed as a part of a training project. The application consists of a single-page interface that provides basic functionality for gym management. While the project is not highly complex, it incorporates a variety of DevOps practices and tools to facilitate continuous integration, deployment, and security scanning. The project also utilizes cloud infrastructure for deployment and testing, ensuring a hands-on experience with modern DevOps tools.

### **Project Objectives:**
- To create a fully integrated DevOps pipeline.
- Perform static code analysis using SonarQube to ensure code quality.
- Implement Continuous Delivery (CD) using Jenkins and ArgoCD.
- Scan Docker images for vulnerabilities using Trivy.
- Deploy the application on Kubernetes (Minikube for local development) and EC2 (for cloud-based deployment).

## 2. **Tools and Technologies**

The following tools and technologies were utilized in the Gym project:

- **Docker**: Containerization technology used to package the application into isolated containers, ensuring consistency across development, testing, and deployment stages.
  
- **Kubernetes (Minikube)**: Minikube was used to set up a local Kubernetes cluster, allowing for orchestration of Docker containers and testing the deployment of the application in a Kubernetes environment.

- **Jenkins**: Automates the build, test, and deployment processes to enable a smooth and repeatable delivery pipeline.

- **Git** and **Gitea**: Git was used for version control, while Gitea hosted the project’s Git repository. Webhooks were configured to trigger Jenkins builds whenever changes were pushed.

- **SonarQube**: A static code analysis tool that ensures high code quality by identifying bugs, security vulnerabilities, and code smells.

- **Trivy**: A security scanner for Docker images, used to identify vulnerabilities in images before deployment.

- **ArgoCD**: A continuous delivery tool for Kubernetes, automating the deployment of the application from Git repositories to Kubernetes clusters.

- **EC2**: Used for manual deployment of the application as an initial approach to running the app on the cloud.

## 3. **Environment Setup**

### **Local Environment Setup:**

1. **Docker**:
   - Install Docker on your machine to enable the building and running of Docker containers.
   - A custom `Dockerfile` was created to build the container for the Gym project.

2. **Kubernetes (Minikube)**:
   - Minikube was used to set up a local Kubernetes environment for testing the application before deploying it to the cloud.

3. **Jenkins**:
   - Jenkins was set up to automate the CI/CD pipeline, which includes pulling code from the Gitea repository, building Docker images, performing security scans using Trivy, and deploying the application using ArgoCD.

4. **Gitea**:
   - A Gitea instance was set up as a self-hosted Git service to manage the source code of the Gym project. It was integrated with Jenkins to trigger builds upon code changes.

### **EC2 Deployment Setup:**

1. **Set up EC2 Instances**:
   - The application was deployed to an EC2 instance using SSH.
   - Docker was used on EC2 to run the Gym app in a containerized environment.