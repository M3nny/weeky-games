/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { UnknownPageProps } from "$fresh/server.ts";

export default function Error500Page({ error }: ErrorPageProps) {
    return (
        <body class={tw`bg-base`}>
            <title>Weeky Games - 500</title>
            <div class={tw`grid place-items-center h-screen`}>
                <img src="https://http.cat/500" alt="500 internal server error" />
                <div class={tw`grid place-items-center`}>
                    <p class={tw`text-text text-2xl mb-10`}>{(error as Error).message}</p>
                    <a href="/" class={tw`inline-block text-sm px-4 py-2 leading-none border text-teal border-teal rounded mt-4 lg:mt-0`}>
                       Home 
                    </a>
                </div>
            </div>
        </body>
    )
}
