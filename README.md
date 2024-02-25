# Webpack Draco Loader Error Reproduction Guide
This guide provides steps to reproduce the webpack draco loader error in the project. Follow these instructions to identify and diagnose any issues encountered during the development or build process.


***
## Error Description
I am trying to load a 3D model in threejs which is compressed with draco compression in blender. When I run the project in development mode (dev-server) everything works fine, but when I am making the build and running the build 'index.html file with live-server then it is throwing some draco loader error. 
As per my knowledge this error is occuring due to the web-worker which draco-loader is trying to access.

Error:
``Uncaught ReferenceError: a0_0x5436 is not defined
at onmessage (a1ef9bb2-75a0-47db-b458-c69c77048684:122:1134)``

***

## Steps to Reproduce Error

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Anish-Someashwara/Webpack-Draco-Test.git
    ```
    

2. **Install Dependencies**
    ```bash
    cd Webpack-Draco-Test
    npm install
    ```
    Navigate into the cloned repository directory and install project dependencies using npm.

3. **Check Development Environment**
    ```bash
    npm run dev
    ```
    Run the development server to ensure everything is working fine.

4. **Build the Project**
    ```bash
    npm run build
    ```
    Generate a production build of the project.

5. **Run the Built Application**
    - Locate the `index.html` file inside the `dist` folder generated during the build process.
    - Open the `index.html` file with live-server.

6. **Inspect for Errors**
    - Open the developer console in your web browser to inspect for draco-worker error.
    - Look for any error messages or warnings that might appear related to the application functionality.

***
By following these steps, you should be able to reproduce the error and examine any error messages or warnings in the developer console. This will help in diagnosing and resolving any issues encountered during the development or build process.
