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
        let yt_api_key = '';
        let query: string = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + game[0].title + ' Official Trailer&type=video&key=' + yt_api_key);
        let yt_json_api = await query.json();
        console.log(yt_json_api.items[0].id.videoId);
        game.push('https://www.youtube.com/embed/' + yt_json_api.items[0].id.videoId);
        return ctx.render(game);
    }
}

export default function Game(props) {
    return (
        <body class={tw`bg-base font-sans`}>
            <title>Weeky Games - {props.params.game.replace(/%20/g, ' ')}</title>
            <Navbar/>
            
            <iframe width="560" height="315" src={props.data[1]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </body>
    )
}

