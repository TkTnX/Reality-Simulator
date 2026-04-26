/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import type { LoginSchemaType, RegisterSchemaType } from "../resolvers";
import { login, register } from "../api/auth.api";

export function useAuth() {
    const registerMutation = () => useMutation({
        mutationKey: ['register'],
        mutationFn: (values: RegisterSchemaType) => register(values) 
    })

    const loginMutation = () => useMutation({
        mutationKey: ['login'],
        mutationFn: (values: LoginSchemaType) => login(values)
    })

    return {
        registerMutation,
        loginMutation
    }
}