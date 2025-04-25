# **Game Project Documentation Using Docker, Kubernetes, Jenkins, Git, Gitea, SonarQube, Trivy, ArgoCD, and EC2**

## 1. **Introduction**

This project is a web-based application focused on managing a game. It leverages modern DevOps practices and a wide range of tools to ensure continuous integration, deployment, and security checks. The project involves setting up a continuous delivery pipeline and automated security scanning using advanced tools.

**Project Objectives:**
- Build a fully integrated DevOps environment.
- Perform static code analysis with SonarQube.
- Implement Continuous Delivery using Jenkins and ArgoCD.
- Run vulnerability scanning on Docker images using Trivy.
- Deploy the application on Kubernetes and EC2.

## 2. **Tools and Technologies**

The following tools and technologies were used in this project:

- **Docker**: Used for containerization to run the application in isolated environments, ensuring consistency across different stages of development and deployment.
  
- **Kubernetes**: Managed the orchestration of Docker containers, enabling efficient deployment and scaling of applications.
  
- **Jenkins**: Automates the build, test, and deployment pipeline to ensure smooth and repeatable software delivery.
  
- **Git** and **Gitea**: Used for version control. Git handles branching and commits, while Gitea serves as the Git repository manager.
  
- **SonarQube**: A static code analysis tool that ensures the code quality by identifying bugs, vulnerabilities, and code smells.
  
- **Trivy**: A security scanner for Docker images, used to scan for vulnerabilities and ensure the integrity of the images before they are deployed.
  
- **ArgoCD**: Automates and manages continuous delivery of applications to Kubernetes clusters.
  
- **EC2**: Used for manually deploying the application initially, as a simpler method for running the application in the cloud.

## 3. **Environment Setup**

### **Local Environment Setup:**

1. **Docker**:
   - Install Docker on your local machine.
   - Create a `Dockerfile` that defines the build process for your container.

2. **Kubernetes**:
   - Set up a Kubernetes cluster using tools like Minikube (for local setups) or cloud-based clusters like Google Kubernetes Engine (GKE) or AWS Elastic Kubernetes Service (EKS).

3. **Jenkins**:
   - Install Jenkins and configure it on a server.
   - Set up tools like Node.js and SonarQube integration within Jenkins.

4. **Gitea**:
   - Host a Gitea instance to store the project’s source code.
   - Set up webhooks to trigger Jenkins builds automatically upon new commits.

### **EC2 Deployment Setup:**

1. **Set up EC2 Instances**:
   - Deploy the application to an EC2 instance using SSH and Docker.
   - Create a Docker container on EC2 to run the application.

## 4. **Project Setup**

### **Git and Gitea Setup:**
- The project is linked to a Gitea repository, with the `main` branch as the source for the application.

### **Docker Setup:**
- A `Dockerfile` is used to build the Docker container:
  ```Dockerfile
  FROM node:14
  WORKDIR /app
  COPY . .
  RUN npm install
  CMD ["npm", "start"]
