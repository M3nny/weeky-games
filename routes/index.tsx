/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { order } from "../utils/sort.tsx";
import {getDates} from "../utils/get_dates.tsx";

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
        return <h1>Nessun gioco gratis</h1>
    }

    return (
        <body class={tw`bg-base`}>
            <div class={tw`container grid place-items-center h-screen my-12 mx-auto px-4 md:px-12`}>
                <div class={tw`flex flex-wrap -mx-1 lg:-mx-4`}>
                    {props.data.map(game => {
                        return (
                            <a href={`game/${game.title}`}>
                                <div class={tw `flex flex-wrap -mx-1 lg:-mx-4`}>
                                    <div class={tw `my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3`}>
                            
                                        <div class={tw`mx-1 bg-white rounded-lg border border-crust shadow-md w-80`}>
                                            <img class={tw`rounded-lg`} src={
                                                (game.keyImages.filter(function(item) {
                                                    return item.type === "Thumbnail";
                                                }))[0].url
                                            }/>
                                            <div class={tw`p-5 bg-crust`}>
                                                <h5 class={tw`mb-2 text-2xl font-bold tracking-tight text-text truncate`}>{game.title}</h5>
                                                <p class={tw`mb-3 font-normal text-subtext1`}>{getDates(game)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </body>
  )
}
