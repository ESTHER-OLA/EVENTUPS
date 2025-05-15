"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create the authentication context
const AuthContext = createContext(null)

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (userData) => {
    // In a real app, this would make an API call
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  // Signup function
  const signup = (userData) => {
    // In a real app, this would make an API call
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Value object to be provided to consumers
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
