export interface User {
    id: string
    name: string
    email: string 
    createdAt?: string
    updatedAt?: string
};

export interface RegisterInput {
    name: string
    email: string
    password: string
}

export interface LoginInput {
    email: string
    password: string
}

export interface Transaction {
    id: string
    description: string
    date: string
    categoryId: string
    value: number
    type: string
}

export interface Category {
    id: string
    name: string
    description: string
    icon: string
    color: string
}