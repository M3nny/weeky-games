/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";


function getDates(game) {
    let dates = [];
    try {
        let startDate = game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate;
        startDate = startDate.substring(startDate.indexOf(""),startDate.lastIndexOf("T")).split("-");
        dates.push(startDate);

        let endDate = game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate;
        endDate = endDate.substring(endDate.indexOf(""),endDate.lastIndexOf("T")).split("-");
        dates.push(endDate);
        return `Free ${dates[0][2]}/${dates[0][1]} - ${dates[1][2]}/${dates[1][1]}`;
    }
    catch(err) {
        let startDate = game.promotions.promotionalOffers[0].promotionalOffers[0].startDate;
        startDate = startDate.substring(startDate.indexOf(""),startDate.lastIndexOf("T")).split("-");
        dates.push(startDate);

        let endDate = game.promotions.promotionalOffers[0].promotionalOffers[0].endDate;
        endDate = endDate.substring(endDate.indexOf(""),endDate.lastIndexOf("T")).split("-");
        dates.push(endDate);
        return `Free Now - ${dates[1][2]}/${dates[1][1]}`;
    }
}

// Sort the game by alphabetical order
function sort(array) {
    for (let i = 0; i < array.length-1; i++) {
        if (array[i].title > array[i+1].title) {
            let tmp = array[i+1];
            array[i+1] = array[i];
            array[i] = tmp;
        }
    }
    return array;
}

// Order the games by free now(alphabetical order) -> free later(alphabetical order)
function order(games) {
    let free_now = [];
    let free_later = [];
    let free_games = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i].promotions != null) {
            if ((games[i].promotions.promotionalOffers).length != 0 ) {
                free_now.push(games[i]);
            }
            else {
                free_later.push(games[i]);
            } 
        }
    }
    free_now = sort(free_now);
    free_later = sort(free_later);
    // Merge the games that are free now with the games that are free later
    free_games = [...free_now, ...free_later];
    return free_games;
}

export const handler: Handlers = {
    async GET(_, ctx) {
        const resp = await fetch(`https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=IT`);
        if (resp.status === 404) {
            return ctx.render(null);
        }
        const epic_json_api = await resp.json();
        let free_games =  await epic_json_api.data.Catalog.searchStore.elements;
        free_games = order(free_games);
        return ctx.render(free_games);
  }
}

export default function Index(props) {
    if (!props.data) {
        return <h1>Nessun gioco gratis</h1>
    }

    return (
        <div class={tw`mx-5 mt-5 grid grid-cols-4 place-items-center h-screen`}>
            {props.data.map(game => {
                return (
                    <a href={`game/${game.title}`}>
                    
                        <div class={tw`bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-80`}>
                            <img class={tw`rounded-lg`} src={
                                (game.keyImages.filter(function(item) {
                                    return item.type === "Thumbnail";
                                }))[0].url
                            }/>
                            <div class={tw`p-5`}>
                                <h5 class={tw`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate`}>{game.title}</h5>
                                <p class={tw`mb-3 font-normal text-gray-700 dark:text-gray-400`}>{getDates(game)}</p>
                            </div>
                        </div>
                    </a>
                )
            })}
        </div> 
  )
}
