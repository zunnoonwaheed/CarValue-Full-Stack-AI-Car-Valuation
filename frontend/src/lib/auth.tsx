import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "user" | "admin";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers = {
  user: {
    id: "user-001",
    username: "demo@carvalue.pk",
    password: "user123",
    email: "demo@carvalue.pk",
    name: "Demo User",
    role: "user" as UserRole,
  },
  admin: {
    id: "admin-001",
    username: "admin@carvalue.pk",
    password: "admin123",
    email: "admin@carvalue.pk",
    name: "Admin User",
    role: "admin" as UserRole,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("carvalue_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string, role: UserRole): boolean => {
    const mockUser = role === "admin" ? mockUsers.admin : mockUsers.user;

    if (username === mockUser.username && password === mockUser.password) {
      const authUser: AuthUser = {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      };
      setUser(authUser);
      localStorage.setItem("carvalue_user", JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("carvalue_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
