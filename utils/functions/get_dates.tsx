export function formatDate(date) {
    date = new Date(date)
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
}

// Get the start-end date for the games promotions following the format dd/mm
export function getDates(game) {
    if (game.promotions.promotionalOffers.length != 0 || game.promotions.upcomingPromotionalOffers.length != 0) {
        let startDate, endDate;

        if (game.promotions.promotionalOffers.length != 0) {
            startDate = new Date(game.promotions.promotionalOffers[0].promotionalOffers[0].startDate);
            endDate = new Date(game.promotions.promotionalOffers[0].promotionalOffers[0].endDate);
        }

        if (game.promotions.upcomingPromotionalOffers.length != 0) {
            startDate = new Date(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].startDate);
            endDate = new Date(game.promotions.upcomingPromotionalOffers[0].promotionalOffers[0].endDate);
        }

        let formattedStartDate = `${startDate.getUTCDate()}/${startDate.getUTCMonth() + 1}`;
        let formattedEndDate = `${endDate.getUTCDate()}/${endDate.getUTCMonth() + 1}`;

        if (startDate < new Date()) {
            return `Free Now - ${formattedEndDate}`;
        } else {
            return `Free ${formattedStartDate} - ${formattedEndDate}`;
        }
    }
}
