/**
 * Utility functions for error handling
 */

// Function to handle API errors and return appropriate response
export async function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof Response) {
    // Handle Response errors (fetch API)
    return new Response(
      JSON.stringify({
        message: "An error occurred while processing your request",
        error: error.statusText,
      }),
      { status: error.status, headers: { "Content-Type": "application/json" } },
    )
  }

  if (error instanceof Error) {
    // Handle standard Error objects
    return new Response(
      JSON.stringify({
        message: "An error occurred while processing your request",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }

  // Handle unknown errors
  return new Response(
    JSON.stringify({
      message: "An unknown error occurred",
    }),
    { status: 500, headers: { "Content-Type": "application/json" } },
  )
}

// Function to check if user has permission for a specific action
export function checkPermission(userPermissions: string[], requiredPermission: string): boolean {
  // Check if user has admin permission (can do everything)
  if (userPermissions.includes("admin")) {
    return true
  }

  // Check if user has the specific permission required
  return userPermissions.includes(requiredPermission)
}

// Custom error classes
export class AuthenticationError extends Error {
  constructor(message = "Authentication required") {
    super(message)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends Error {
  constructor(message = "You don't have permission to perform this action") {
    super(message)
    this.name = "AuthorizationError"
  }
}

export class ValidationError extends Error {
  public errors: Record<string, string[]>

  constructor(message = "Validation failed", errors: Record<string, string[]> = {}) {
    super(message)
    this.name = "ValidationError"
    this.errors = errors
  }
}

export class NotFoundError extends Error {
  constructor(resource = "Resource", id?: string | number) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`
    super(message)
    this.name = "NotFoundError"
  }
}
