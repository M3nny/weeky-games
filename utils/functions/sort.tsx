// Order the games by free now(chronological order) -> free later(chronological order)
export function order(games) {
    let free_now = [];
    let free_later = [];

    for (let i = 0; i < games.length; i++) {
        if (games[i].promotions != null) {
            if (games[i].promotions.promotionalOffers.length != 0) {
                free_now.push(games[i]);
            } else if (games[i].promotions.upcomingPromotionalOffers.length != 0) {
                free_later.push(games[i]);
            }
        }
    }

    free_now.sort((a, b) => new Date(a.promotions.promotionalOffers[0].promotionalOffers[0].startDate) - new Date(b.promotions.promotionalOffers[0].promotionalOffers[0].startDate));
    free_later.sort((a, b) => new Date(a.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate) - new Date(b.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate));

    // Merge the games that are free now with the games that are free later
    let free_games = [...free_now, ...free_later];
    return free_games;
}
