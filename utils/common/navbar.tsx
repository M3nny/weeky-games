/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Navbar () {
    return (
        <nav class={tw`flex items-center justify-between bg-surface0 flex-wrap p-6`}>
            <div class={tw`flex items-center flex-shrink-0 mr-6`}>
                <img class={tw`fill-current h-14 w-14 mr-2`} src="/logo.svg"></img>
                <span class={tw`font-semibold text-xl text-lavender tracking-tight`}>Weeky Games</span>
            </div>
            <div class={tw`w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div class={tw`text-sm lg:flex-grow`}>
                    <a href="/" class={tw`block mt-4 text-text lg:inline-block lg:mt-0 mr-4`}>
                        Home
                    </a>
                    <a href="https://github.com/M3nny/epic_free_games" class={tw`block mt-4 text-text lg:inline-block lg:mt-0 mr-4`}>
                        About
                    </a>
                </div>
                <div>
                    <a href="https://www.buymeacoffee.com/M3nny" class={tw`inline-block text-sm px-4 py-2 leading-none border text-teal border-teal rounded mt-4 lg:mt-0`}>
                       Buy me a coffee 
                    </a>
                </div>
            </div>
        </nav>
    )
}
