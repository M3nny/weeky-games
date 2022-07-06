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
        return <h1>Nessun gioco gratis</h1>;
    }

  return (
    <div class={tw`flex h-screen`}>
        <div class={tw`m-auto`}>
            <ul>
                {props.data.map(game => {
                    if (game.promotions != null) {
                        return <li><a href={`game/${game.title}`}>{game.title}</a></li>
                    }
                })}
            </ul>
        </div>
    </div>
  );
}

