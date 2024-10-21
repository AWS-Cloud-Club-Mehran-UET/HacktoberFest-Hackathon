# Web Application Dockerization

## Description
This project contains a simple web application consisting of a single `index.html` file. The application is Dockerized using an Nginx server to serve the HTML file. The purpose of this project is to demonstrate how to containerize a web application and run it in a containerized environment using Docker.

## Docker Image Details
The Docker image uses the official Nginx Alpine image, which is lightweight and optimized for running in production environments. The `index.html` file is copied to the default directory used by Nginx to serve static files.

## Instructions for Pulling and Running the Docker Image

1. **Pull the Docker image from Docker Hub:**

   You can pull the Docker image from Docker Hub by running the following command:

   ```bash
   docker pull httpsmojojojo/issue-05
   ```

2. **Run the Docker container:**

   To run the web application, use the following command:

   ```bash
   docker run -d -p 8080:80 httpsmojojojo/issue-05
   ```

   This command will:
   - Run the container in detached mode (`-d`).
   - Map port `8080` on your host machine to port `80` in the container, which is the port that Nginx listens on.

3. **Access the web application:**

   Open your browser and go to [http://localhost:8080](http://localhost:8080). You should see the web page served by the Nginx server running in your Docker container.

## Approach to Dockerizing the Application

1. **Base Image:**
   - The project uses the official Nginx Alpine image as the base. This image is lightweight and ideal for serving static web files.

2. **File Copying:**
   - The `index.html` file is copied to the `/usr/share/nginx/html/` directory inside the container, which is the default location for Nginx to serve static files.

3. **Port Exposure:**
   - The Dockerfile exposes port 80 so the web application can be accessed when running the container.

4. **Best Practices:**
   - The use of the Nginx Alpine image reduces the size of the image and ensures better performance and security in containerized environments.
   - The image is built using multi-stage builds, minimizing the final image size and improving the deployment efficiency.

## Building and Pushing the Image (For Developers)

### Build the Image

If you want to build the Docker image yourself, navigate to the project directory and run the following command:

```bash
docker build -t httpsmojojojo/issue-05 .
```

### Push the Image to Docker Hub

After building the image, push it to Docker Hub:

```bash
docker push httpsmojojojo/issue-05
```