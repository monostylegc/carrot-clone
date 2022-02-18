import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    label: string;
    name: string;
    kind?: "text" | "price";
    register: UseFormRegisterReturn;
    type: string;
    required?: boolean;
}

export default function Input ({
    label,
    name,
    kind = "text",
    register,
    type,
    required
}: InputProps) {
    return (
        <div>
            <label
                className="mb-1 block text-sm font-medium text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            {kind === "text" ? (
                <div className="rounded-md relative flex  items-center shadow-sm">
                    <input
                        id={name}
                        {...register}
                        type={type}
                        required={required}
                        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                </div>
            ) : null}
            {kind === "price" ? (
                <div className="rounded-md relative flex  items-center shadow-sm">
                    <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">$</span>
                    </div>
                    <input
                        id={name}
                        {...register}
                        required={required}
                        type={type}
                        className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                    <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
                        <span className="text-gray-500">KRW</span>
                    </div>
                </div>
            ) : null}

        </div>
    );
}