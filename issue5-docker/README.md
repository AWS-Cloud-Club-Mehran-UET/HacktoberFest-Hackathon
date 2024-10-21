# issue 5 Docker👋

## Installation

### Pulling the Image
 ```bash
docker pull arayanmemon/expense-tracker:latest
  ```

### Running the Container
 ```bash
docker run -p 8080:5173 expense-tracker:latest
  ```
  
## 🛠️ DockerFile 
Step 1:  Using a Base Image of Node
```bash
FROM node:lts-alpine
```  
Step 2:  Setting a Work Directory
```bash
WORKDIR /usr/src/app
```
Step 3: Copy package.json file into current directory
```bash
COPY package*.json .
```
Step 4: Install Dependencies
```bash
RUN npm install
```
Step 5: Install vite in Container
```bash
RUN npm install vite -g
```
Step 6: Copy app files in Container
```bash
COPY . .
```
Step 7: Expose the app port to external env
```bash
EXPOSE 5173
```
Step 8: Give all permissions to the app folder
```bash
RUN chown -R node /usr/src/app
```
Step 9: Provide app running commands
```bash
CMD ["npm", "start"]
```