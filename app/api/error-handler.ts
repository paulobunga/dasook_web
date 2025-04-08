import { type NextRequest, NextResponse } from "next/server"
import { AuthenticationError, AuthorizationError, ValidationError, NotFoundError } from "@/lib/error-utils"

/**
 * Wraps an API route handler with error handling
 */
export function withErrorHandler(handler: (req: NextRequest) => Promise<Response> | Response) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error("API Error:", error)

      if (error instanceof AuthenticationError) {
        return NextResponse.json({ message: error.message }, { status: 401 })
      }

      if (error instanceof AuthorizationError) {
        return NextResponse.json({ message: error.message }, { status: 403 })
      }

      if (error instanceof ValidationError) {
        return NextResponse.json({ message: error.message, errors: error.errors }, { status: 422 })
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json({ message: error.message }, { status: 404 })
      }

      // Handle any other errors
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"

      return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 })
    }
  }
}

/**
 * Example usage:
 *
 * export const GET = withErrorHandler(async (req) => {
 *   // Your API logic here
 *   if (!user) {
 *     throw new AuthenticationError()
 *   }
 *
 *   return NextResponse.json({ data: "success" })
 * })
 */
