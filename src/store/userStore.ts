import create from 'zustand';

// Definición del estado inicial basado en tu modelo de usuario
type UserState = {
 id: number;
 name: string;
 email: string;
 password: string;
 clients: any[]; // Asumiendo que tienes un tipo para Client
 projects: any[]; // Asumiendo que tienes un tipo para Project
 roles: any[]; // Asumiendo que tienes un tipo para Role
 activeDB: boolean;
 setUser: (user: Partial<UserState>) => void;
};

// Creación de la tienda de estado con Zustand
export const useUserStore = create<UserState>((set) => ({
 id: 0,
 name: '',
 email: '',
 password: '',
 clients: [],
 projects: [],
 roles: [],
 activeDB: true,
 setUser: (user) => set(() => user),
}));
