import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
    darkMode: "class",
    mode: "silent",
    theme: {
        colors: {
            rosewater: "#F2D5CF",
            flamingo: "#EEBEBE",
            pink: "#F4B8E4",
            mauve: "#CA9EE6",
            red: "#E78284",
            maroon: "#EA999C",
            peach: "#EF9F76",
            yellow:"#E5C890",
            green: "#A6D189",
            teal: "#81C8BE",
            sky: "#99D1DB",
            sapphire: "#85C1DC",
            blue: "#8CAAEE",
            lavender:"#BABBF1",

            text: "#C6D0F5",
            subtext1: "#B5BFE2",
            subtext0: "#A5ADCE",
            overlay2: "#949CBB",
            overlay1: "#838BA7",
            overlay0: "#737994",
            surface2: "#626880",
            surface1: "#51576D",
            surface0: "#414559",

            base: "#303446",
            mantle: "#292C3C",
            crust: "#232634",
        },
    },
};
if (IS_BROWSER) setup(config);
