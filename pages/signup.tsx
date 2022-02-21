import Link from "next/link";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface SignUpForm {
    username: string;
    email: string;
    password: string;
}

async function createUser (
    name: string,
    email: string,
    password: string
): Promise<any> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
    return data;
}

export default function Enter () {
    const { register, handleSubmit, reset } = useForm<SignUpForm>();
    const router = useRouter()

    const onValid = async (data: SignUpForm) => {
        try {
            const result = await createUser(
                data.username,
                data.email,
                data.password,
            )
            console.log(result);
            router.replace('/signin')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mt-16 px-4">
            <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
            <div className="mt-8">
                <div className="flex flex-col items-center">
                </div>
                <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-8 space-y-4">
                    <Input register={register('username', { required: true })} name="email" label="Username" type="text" required />
                    <Input register={register('email', { required: true })} name="email" label="Email address" type="email" required />
                    <Input register={register('password', { required: true })} name="password" label="Password" type="password" required />
                    <Button text="SignUp" />
                </form>
            </div>
        </div>
    );
}