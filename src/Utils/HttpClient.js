const BASE_URL = "https://7star.in.net/hongkong/admin/api";
// const USER_TYPE = "User";



function get(endpoint, params) {
    return requestData(endpoint, params);
}

function post(endpoint, params) {
    return requestData(endpoint, params, "POST");
}

function put(endpoint, params) {
    return requestData(endpoint, params, "PUT");
}

function deletemethod(endpoint, params) {
    return requestData(endpoint, params, "POST");
}

async function requestData(url, data = {}, method = "GET") {
    // Define the base URL and initialize headers
    // const BASE_URL = 'https://example.com'; // Replace with your base URL
    const headers = new Headers();
    let options = { method, headers };

    // Set Content-Type and body if method is POST, PUT, PATCH
    if (method === "POST" || method === "PUT" || method === "PATCH") {
        headers.set("Content-Type", "application/json"); // Assuming JSON payload
        options.body = JSON.stringify(data);
    }

    try {
        // Make the HTTP request
        const response = await fetch(BASE_URL + url, options);

        // Check for HTTP errors
        if (!response.ok) {
            // Throw an error with status and status text
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }

        // Determine the response content type
        const contentType = response.headers.get("Content-Type");

        // Parse the response based on the content type
        let responseData;
        if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
        } else if (contentType && contentType.includes("text/html")) {
            responseData = await response.json();
        } else if (contentType && contentType.includes("text/plain")) {
            responseData = await response.json();
        } else if (contentType && contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await response.json();
            responseData = Object.fromEntries(new URLSearchParams(formData).entries());
        } else {
            // Fallback to raw response if content type is unknown
            responseData = await response.json();
        }

        return responseData;

    } catch (error) {
        // Handle errors (network issues, invalid JSON, etc.)
        throw new Error(`Request failed: ${error.message}`);
    }
}


// function checkingAuth() {
//     // let token = reactLocalStorage.get("token");
//     let token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTa2lsbCIsInN1YiI6IjQyZTg1YTlkYWYyYjA5Nzk4MjY1YmU1ZjUzNzU2MWI3NWRmY2Q5NDRhOThhY2NmZWNkNDk0NGMwYmIzMWVhZGUwZWEyYmViMzE3ZjEyYjc3Y2RhOGJkOTNiM2QwMmY5YmZmMWFjMDQxNDliNDM1ODM4YTczMzcwMmYzNDc2OTk1NDY3NWVjYzI1OWQ4Mzc5YzA4MDdmOGE3ZmY4NjdhODhjNjczNzdiYTA4Zjg4MWYwYmI1NDFiMTIwYTJmM2M3ZGUwIiwiYWciOiIzNDZkZGQ5YTgxNWYyNjJiOGJjYmRkMWE2NzkxYTZmZmEzYWJlMzgyYTg2ODMxMjY2ODk5YmJmNzUwNjI3NDg0ZjZhOWRkZmU1ZDFkMmE5MDE2MTFjMDM3NWRkN2MwNmZlMDBiMTRlMWYzMzk4OGUzZDk0ZWJhZTQ2OGM4NmQyNDlkYWI5NTM1Mzg1ZWRkNTM4NDg5YmRiMGJhZjE4ZTZjNjk0MDRkZDM4NzA1NGI5MDdjYmM5M2UwMzY2YjJhZjJiMmY0Y2IxNzQwMjIyN2I2M2U4NWE0NDU3YWQ4M2MwN2QwMTRmY2Y0ZGUiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzIyMzU0OTI5LCJleHAiOjE3MjI0NDEzMjl9.rDdF6TNlb9I011A3veBSBzapTTmwGgX-gj0M2-LBbDc"
//     if (token) {
//         return token;
//     }
//     return false;
// }



const request = {
    requestData,

    get,
    post,

    put,
    deletemethod,
    BASE_URL,
};
export default request;
export { BASE_URL }