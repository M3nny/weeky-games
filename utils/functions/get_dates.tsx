// Get the start-end date for the games promotions following the format dd/mm
export function getDates(game) {
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
