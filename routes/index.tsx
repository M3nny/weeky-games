/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(_, ctx) {
        const resp = await fetch(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=IT`);
        if (resp.status === 404) {
            return ctx.render(null);
        }
        const epic_json_api = await resp.json();
        let free_games =  await epic_json_api.data.Catalog.searchStore.elements;

        return ctx.render(free_games);
  }
}

export default function Index(props) {
    if (!props.data) {
        return <h1>Nessun gioco gratis</h1>
    }

    return (
        <div class={tw`mx-5 mt-5 grid grid-cols-5 gap-2 place-items-center content-center`}>
            {props.data.map(game => {
                if (game.promotions != null) {
                    return (
                        <a href={`game/${game.title}`}>
                            <img class={tw`rounded-lg`} src={
                                (game.keyImages.filter(function(item) {
                                    return item.type === "Thumbnail";
                                }))[0].url
                            }/>
                        </a>
                    )
                }
            })}
        </div> 
  )
}
