/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { order } from "../utils/functions/sort.tsx";
import { getDates } from "../utils/functions/get_dates.tsx";

export const handler: Handlers = {
    async GET(_, ctx) {
    const resp = await fetch(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=IT`);
    if (resp.status === 404) {
        return ctx.render(null);
    }
    const epic_json_api = await resp.json();
    let free_games =  await epic_json_api.data.Catalog.searchStore.elements;
    return ctx.render(order(free_games));
  }
}

export default function Index(props) {
    if (!props.data) {
        return <h1>There aren't free games promotions at the moment</h1>
    }
    return (
        <body class={tw`bg-base font-sans`}>
            <title>Weeky Games</title>
            
            <nav class={tw`flex items-center justify-between bg-surface0 flex-wrap p-6`}>
                <div class={tw`flex items-center flex-shrink-0 mr-6`}>
                    <img class={tw`fill-current h-14 w-14 mr-2`} src="logo.svg"></img>
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
                        <a href="/" class={tw`inline-block text-sm px-4 py-2 leading-none border text-teal border-teal rounded mt-4 lg:mt-0`}>
                            Placeholder
                        </a>
                    </div>
                </div>
            </nav>
            
            <div class={tw`container grid place-items-center h-screen mt-3 mx-auto px-4 md:px-12`}>
                <div class={tw`flex justify-center flex-wrap -mx-1 lg:-mx-4`}>
                    {props.data.map(game => {
                        return (
                            <a href={`game/${game.title}`}>
                                <div class={tw `flex flex-wrap -mx-1 lg:-mx-4`}>
                                    <div class={tw `my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3`}>
                                        <div class={tw`mx-1 bg-white rounded-lg shadow-md w-80`}>
                                            <img class={tw`rounded-t-lg`} src={
                                                (game.keyImages.filter(function(item) {
                                                    return item.type === "Thumbnail";
                                                }))[0].url
                                            }/>
                                            <div class={tw`p-5 rounded-b-lg bg-crust`}>
                                                <h5 class={tw`mb-2 text-2xl font-bold tracking-tight text-peach truncate`}>{game.title}</h5>
                                                <p class={tw`mb-3 font-normal text-subtext1`}>{getDates(game)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
                <div class={tw`mb-8 text-text`}>
                    Created with <a href="https://fresh.deno.dev/"><img class={tw`inline-block h-6`}src="fresh_logo.svg"></img></a>
                    by <a class={tw`text-blue`} href="https://github.com/M3nny">M3nny</a> 
                </div>
            </div>
        </body>
    )
}
