/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Navbar from "../../utils/common/navbar.tsx";

export const handler: Handlers = {
    async GET(_, ctx) {
        const resp = await fetch(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=IT`);
        if (resp.status === 404) {
            return ctx.render(null);
        }
        const epic_json_api = await resp.json();
        let free_games =  await epic_json_api.data.Catalog.searchStore.elements;
        let game = await free_games.filter(function(item) {
            return item.title === ctx.params.game.replace(/%20/g, ' ');
        })
        return ctx.render(game);
  }
}

export default function Game(props) {
    return (
        <body class={tw`bg-base font-sans`}>
            <title>Weeky Games - {props.params.game.replace(/%20/g, ' ')}</title>
            <Navbar/>

            
        </body>
    )
}

