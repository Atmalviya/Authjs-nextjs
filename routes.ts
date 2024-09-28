/**
 * All the public routes
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * All the Authentication routes
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];


export const apiAuthPrefix = "/api/auth"; 

export const DEFAULT_LOGIN_REDIRECT = "/settings"