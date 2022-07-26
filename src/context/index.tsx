import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateProfile
} from 'firebase/auth';
import { auth } from "../firebase";

export interface IContext {
  user: User | null,
  register: (email: string, password: string, name: string) => Promise<void>,
  authenticate: (email: string, password: string) => Promise<void>,
  logout: () => void
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      setUser(user);
    })

    return subscriber
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(user, { displayName: name })
      setUser(user)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const authenticate = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      setUser(user)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logout = () => {
    setUser(null)
    signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}