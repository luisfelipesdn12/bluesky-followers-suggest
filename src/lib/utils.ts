import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import AtpAgent from "@atproto/api";
import axios from "axios";

export const getAtpAgent = async () => {
    const agent = new AtpAgent({
        service: "https://bsky.social"
    });
    // await agent.login({
    //     identifier: process.env.NEXT_PUBLIC_ATP_AGENT_ID as string,
    //     password: process.env.NEXT_PUBLIC_ATP_AGENT_PASSWORD as string,
    // });
    return agent;
};

/**
 * The function `cn` in TypeScript merges multiple class values using `clsx` and `twMerge`.
 * @param {ClassValue[]} inputs - The `inputs` parameter in the `cn` function is a rest parameter that
 * allows you to pass any number of arguments of type `ClassValue`. These arguments can be strings,
 * arrays, or objects representing CSS classes. The function then merges and processes these class
 * values using the `clsx` and
 * @returns The `cn` function is returning the result of merging the class names passed as arguments
 * using the `clsx` function and then applying Tailwind CSS utility classes using the `twMerge`
 * function.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const api = axios.create({
    baseURL: "https://public.api.bsky.app/xrpc"
});
