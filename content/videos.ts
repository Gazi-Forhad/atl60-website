import { videos as v, type VideoAsset } from "./media";
import { socials } from "./site";

/**
 * VIDEO EXPERIENCES
 * --------------------------------------------------------------
 * All footage below is placeholder stock (Mixkit). Replace `asset`
 * with the client's vertical reels (ideally hosted on Mux or
 * Cloudinary) and `href` with the exact Instagram/Facebook post URL.
 */

export const videoCategories = [
  "Food Reviews",
  "Hidden Gems",
  "Restaurant Experiences",
  "Events & Lifestyle",
  "Local Favorites",
] as const;

export type VideoCategory = (typeof videoCategories)[number];

export type Reel = {
  id: string;
  title: string;
  category: VideoCategory;
  area: string;
  caption: string;
  asset: VideoAsset;
  platform: "instagram" | "facebook";
  href: string;
};

const ig = socials.find((s) => s.id === "instagram")!.href;
const fb = socials.find((s) => s.id === "facebook")!.href;

export const reels: Reel[] = [
  { id: "seafood-boil", title: "Seafood Boil Breakdown", category: "Food Reviews", area: "Mableton", caption: "Crab, shrimp and that Cajun butter. Does it live up to the hype?", asset: v.seafoodBoil, platform: "facebook", href: fb },
  { id: "fries-drop", title: "Fries Don't Lie", category: "Local Favorites", area: "Westside", caption: "Crispy, salty, straight out the fryer. The side that steals the show.", asset: v.friesDrop, platform: "instagram", href: ig },
  { id: "behind-the-pass", title: "Behind the Pass", category: "Restaurant Experiences", area: "Midtown", caption: "Ten minutes in a kitchen at full speed. Here are the best sixty seconds.", asset: v.chefKitchen, platform: "instagram", href: ig },
  { id: "big-game", title: "Big Game Weekend", category: "Events & Lifestyle", area: "Downtown", caption: "Where the city ate, drank and partied all weekend.", asset: v.festivalCrowd, platform: "facebook", href: fb },
  { id: "street-grill", title: "Night Market Grill", category: "Hidden Gems", area: "Buford Hwy", caption: "No sign, no website, all flavor.", asset: v.streetGrill, platform: "instagram", href: ig },
  { id: "first-bite", title: "First Bite Reactions", category: "Food Reviews", area: "East Point", caption: "Our first bite is always honest. This one says it all.", asset: v.firstBite, platform: "instagram", href: ig },
  { id: "sauce-check", title: "Sauce Check", category: "Local Favorites", area: "West End", caption: "The house sauce everybody keeps asking about.", asset: v.saucePour, platform: "facebook", href: fb },
  { id: "smoke-citrus", title: "Smoke & Citrus", category: "Restaurant Experiences", area: "Buckhead", caption: "A cocktail that arrives with a show.", asset: v.smokingCocktail, platform: "instagram", href: ig },
  { id: "shrimp-grill", title: "Shrimp on the Grill", category: "Hidden Gems", area: "College Park", caption: "Charred, juicy and worth the drive.", asset: v.shrimpGrill, platform: "instagram", href: ig },
  { id: "cheese-pull", title: "Cheese Pull Certified", category: "Food Reviews", area: "Decatur", caption: "We came for the burger. We stayed for the cheese.", asset: v.cheeseMelt, platform: "facebook", href: fb },
  { id: "cheers", title: "Cheers to the City", category: "Events & Lifestyle", area: "Old Fourth Ward", caption: "Grand openings, pop-ups and nights worth remembering.", asset: v.friendsToast, platform: "instagram", href: ig },
  { id: "wok-fire", title: "Wok Fire", category: "Hidden Gems", area: "Doraville", caption: "High heat, fast hands, perfect fried rice.", asset: v.wokFire, platform: "instagram", href: ig },
  { id: "burger-verdict", title: "The Burger Verdict", category: "Local Favorites", area: "Smyrna", caption: "Is this the best burger in Smyrna? The face says yes.", asset: v.burgerSmile, platform: "facebook", href: fb },
  { id: "saturday-night", title: "Saturday Night Energy", category: "Events & Lifestyle", area: "Midtown", caption: "Full room, loud music, good food. That's Atlanta.", asset: v.busyBar, platform: "instagram", href: ig },
];

/** Clips used in the cinematic hero montage. */
export const heroReel = [
  { asset: v.seafoodBubbling, label: "Seafood boil", area: "Mableton" },
  { asset: v.saucePour, label: "Sauce pour", area: "West End" },
  { asset: v.shrimpGrill, label: "Shrimp on the grill", area: "College Park" },
  { asset: v.wokFire, label: "Kitchen heat", area: "Buford Hwy" },
];
