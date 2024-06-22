export interface User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: string;
  country: string;
}

const API_URL = "https://ultatel-fullstack-task-server.onrender.com";

// Function to register a new user
export const registerUser = async (userData: User): Promise<void> => {
  try {
    console.log("Sending data to server:", userData);
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }

    return response.json() as Promise<LoginResponse>;
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};

// Function to get the list of students
export const getStudents = async (token: string): Promise<Student[]> => {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }

    return response.json() as Promise<Student[]>;
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};

// Function to create a new student
export const createStudent = async (
  student: Student,
  token: string
): Promise<Student> => {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }

    return response.json() as Promise<Student>;
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};

// Function to update an existing student
export const updateStudent = async (
  id: number,
  student: Student,
  token: string
): Promise<Student> => {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }

    return response.json() as Promise<Student>;
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};

// Function to delete a student
export const deleteStudent = async (
  id: number,
  token: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error("Network or server error:", error);
    throw error;
  }
};
