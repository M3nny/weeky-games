/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { formatDate } from "../../utils/functions/get_dates.tsx"
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
        let yt_api_key = 'AIzaSyBKOY-o4TSWZn5oi7F8Mp-1VIM2cotvnfs';
        let query: string = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + game[0].title + ' Official Trailer&type=video&key=' + yt_api_key);
        let yt_json_api = await query.json();
        game.push('https://www.youtube.com/embed/' + yt_json_api.items[0].id.videoId);
        return ctx.render(game);
    }
}

export default function Game(props) {
    return (
        <body class={tw`bg-base font-sans h-screen`}>
            <title>Weeky Games - {props.params.game.replace(/%20/g, ' ')}</title>
            <Navbar/>
            
            <div class={tw`container grid place-items-center h-5/6 mt-3 mx-auto px-4 md:px-12`}>
                <div class={tw`flex justify-center flex-wrap w-9/12 h-3/6 -mx-1 lg:-mx-4`}>
                    <iframe class={tw`w-full h-full rounded-lg`}src={props.data[1]} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    
                    <div class={tw`bg-surface0 rounded px-1 py-1 mt-3`}>
                        <text class={tw`text-text`}>{props.data[0].description}</text>
                    </div>
                    
                    <div class={tw`flex justify-center mt-8`}>
                        <div class={tw`grid place-items-center`}>
                            <text class={tw`text-rosewater`}>Initial Release</text>
                            <text class={tw`text-yellow`}>{formatDate(props.data[0].effectiveDate)}</text>
                            <img class={tw`rounded-lg w-40 h-2 mt-3`} src="../separator.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

