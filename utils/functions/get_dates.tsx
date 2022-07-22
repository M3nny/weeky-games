// Get the start-end date for the games promotions following the format dd/mm
export function getDates(game) {
    let dates = [];
    try {
        if (game.promotions.promotionalOffers.length != 0 || game.promotions.upcomingPromotionalOffers.length != 0) { 
            let startDate = game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate;
            startDate = startDate.substring(startDate.indexOf(""),startDate.lastIndexOf("T")).split("-");
            dates.push(startDate);
            
            let endDate = game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate;
            endDate = endDate.substring(endDate.indexOf(""),endDate.lastIndexOf("T")).split("-");
            dates.push(endDate);
            return `Free ${dates[0][2]}/${dates[0][1]} - ${dates[1][2]}/${dates[1][1]}`;
        }
    }
    catch(err) {
        if (game.promotions.promotionalOffers.length != 0 || game.promotions.upcomingPromotionalOffers.length != 0) { 
            let startDate = game.promotions.promotionalOffers[0].promotionalOffers[0].startDate;
            startDate = startDate.substring(startDate.indexOf(""),startDate.lastIndexOf("T")).split("-");
            dates.push(startDate);
            
            let endDate = game.promotions.promotionalOffers[0].promotionalOffers[0].endDate;
            endDate = endDate.substring(endDate.indexOf(""),endDate.lastIndexOf("T")).split("-");
            dates.push(endDate);
            return `Free Now - ${dates[1][2]}/${dates[1][1]}`;
        }
    }
}

export function formatDate(date) {
    date = date.substring(date.indexOf(""),date.lastIndexOf("T")).split("-");
    return (date[2] + '/' + date[1] + '/' + date[0]);
}
