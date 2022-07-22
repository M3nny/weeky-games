// Sort the game by alphabetical order
export function sort(array) {
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
export function order(games) {
    let free_now = [];
    let free_later = [];
    let free_games = [];
    for (let i = 0; i < games.length; i++) {
        if (games[i].promotions != null) {
            if (games[i].promotions.promotionalOffers.length != 0 ) {
                free_now.push(games[i]);
            }
            else if (games[i].promotions.upcomingPromotionalOffers.length != 0){
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
