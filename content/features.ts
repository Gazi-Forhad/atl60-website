import { photos } from "./media";

/**
 * DISCOVERIES
 * --------------------------------------------------------------
 * kind "feature"  → full editorial page at /discover/[slug]
 * kind "archive"  → real past ATL in 60 videos (YouTube), linked out
 *
 * Archive titles come straight from the client's YouTube channel.
 * Images are placeholders. Swap for stills from each original video.
 * Move this file to Sanity (schema in /docs) when the CMS is added.
 */

export type FeatureCategory =
  | "Seafood"
  | "BBQ"
  | "Food Trucks"
  | "Drinks"
  | "Mexican"
  | "Sweets"
  | "Interviews"
  | "Atlanta Classics"
  | "Community";

export type Platform = "facebook" | "instagram" | "youtube";

export type Feature = {
  slug: string;
  number: string;
  kind: "feature" | "archive";
  title: string;
  subtitle?: string;
  category: FeatureCategory;
  area: string;
  address?: string;
  dateLabel?: string;
  dateISO?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  mustTry?: string[];
  watch: { label: string; href: string; platform: Platform };
  article?: {
    lede: string;
    body: string[];
    verdict: string;
    tags: string[];
  };
};

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const features: Feature[] = [
  {
    slug: "cajuns-city-seafood-wings-turkey-neck-bowl",
    number: "001",
    kind: "feature",
    title: "Cajun's City Seafood & Wings",
    subtitle: "The Turkey Neck Seafood Bowl",
    category: "Seafood",
    area: "Mableton",
    address: "4875 Floyd Rd SW Suite 103, Mableton, GA 30126",
    // VERIFY: publish date of the original Facebook post.
    dateLabel: "Nov 2026",
    dateISO: "2026-11-01",
    excerpt:
      "A seafood bowl packed with tender turkey necks, snow crab and shrimp. We pulled up to Cajun's City Seafood & Wings in Mableton to see if it lived up to the hype.",
    image: photos.seafoodBoilTall,
    imageAlt: "Seafood boil with crab legs, shrimp, corn and potatoes (placeholder photo)",
    mustTry: ["Turkey Neck Seafood Bowl", "Snow Crab Legs", "Shrimp Fried Rice"],
    watch: {
      label: "Watch the reel",
      href: "https://www.facebook.com/share/r/1d1tjEZsK8/",
      platform: "facebook",
    },
    article: {
      lede: "Turkey necks before Thanksgiving? This seafood bowl might be the real holiday MVP.",
      body: [
        "ATL, we found a serious contender before the holiday feast. We pulled up to Cajun's City Seafood & Wings and tried their famous Turkey Neck Seafood Bowl, and let's just say they understood the assignment.",
        "The turkey necks were fall-off-the-bone tender, the seafood was loaded with flavor, and that Cajun seasoning hit every bite just right.",
        "If you're looking for a seafood spot to add to your foodie list before Thanksgiving, this one deserves a visit.",
      ],
      verdict: "They understood the assignment.",
      tags: ["AtlantaFoodie", "SeafoodBoilATL", "TurkeyNecks"],
    },
  },
  {
    slug: "hattie-maries-bbq",
    number: "A-01",
    kind: "archive",
    title: "Hattie Marie's BBQ",
    subtitle: "BBQ meets seafood",
    category: "BBQ",
    area: "Atlanta",
    excerpt: "A full ATL in 60 food review at Hattie Marie's, where Atlanta BBQ meets seafood.",
    image: photos.ribsGrill,
    imageAlt: "Ribs on a smoky grill (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("zHUk0Q7cEWo"), platform: "youtube" },
  },
  {
    slug: "new-orleans-cajun-food-truck",
    number: "A-02",
    kind: "archive",
    title: "The Cajun Food Truck",
    subtitle: "New Orleans flavor, Atlanta streets",
    category: "Food Trucks",
    area: "Atlanta",
    excerpt: "We tracked down a food truck in Atlanta serving food with a New Orleans Cajun twist.",
    image: photos.foodTruck,
    imageAlt: "Food truck serving customers (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("Q7srfh-1AiY"), platform: "youtube" },
  },
  {
    slug: "nouveau-bar-cocktails",
    number: "A-03",
    kind: "archive",
    title: "Nouveau Bar",
    subtitle: "Amazing and different cocktails",
    category: "Drinks",
    area: "Metro ATL",
    excerpt: "Cocktails that don't play it safe. A night behind the bar at Nouveau.",
    image: photos.cocktailDark,
    imageAlt: "Cocktail on a dark bar (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("oEJXSdsotOQ"), platform: "youtube" },
  },
  {
    slug: "mccrays-tavern-chef-interview",
    number: "A-04",
    kind: "archive",
    title: "McCray's Tavern",
    subtitle: "Executive chef interview",
    category: "Interviews",
    area: "Metro ATL",
    excerpt: "We sat down with McCray's Tavern's executive chef, then came back for the nachos, cheeseburger and wings.",
    image: photos.chefFlame,
    imageAlt: "Chef cooking over open flame (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("Odm25tBn-UE"), platform: "youtube" },
  },
  {
    slug: "los-bravos-mexican",
    number: "A-05",
    kind: "archive",
    title: "Los Bravos",
    subtitle: "Mexican restaurant",
    category: "Mexican",
    area: "Metro ATL",
    excerpt: "Tacos, plates and the full Los Bravos experience, ATL in 60 style.",
    image: photos.tacosSpread,
    imageAlt: "Spread of tacos (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("Yf7VaNKuPg8"), platform: "youtube" },
  },
  {
    slug: "a-little-nauti-food-truck",
    number: "A-06",
    kind: "archive",
    title: "A Little Nauti",
    subtitle: "Street food on wheels",
    category: "Food Trucks",
    area: "Metro ATL",
    excerpt: "Street food from the A Little Nauti food truck, in one minute.",
    image: photos.foodTruckNight,
    imageAlt: "Food truck lit up at night (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("Iv-U8Hif_og"), platform: "youtube" },
  },
  {
    slug: "the-varsity",
    number: "A-07",
    kind: "archive",
    title: "The Varsity",
    subtitle: "What'll ya have?",
    category: "Atlanta Classics",
    area: "Atlanta",
    excerpt: "An Atlanta institution. We answered the most famous question in the city.",
    image: photos.burgerDark,
    imageAlt: "Burger on a dark background (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("KJjU_EBti1U"), platform: "youtube" },
  },
  {
    slug: "krispy-kreme-lemon-filled",
    number: "A-08",
    kind: "archive",
    title: "Krispy Kreme",
    subtitle: "Lemon-filled glazed",
    category: "Sweets",
    area: "Metro ATL",
    excerpt: "Hot light on. Lemon-filled glazed doughnuts, put to the test.",
    image: photos.donutStack,
    imageAlt: "Stack of glazed doughnuts (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("RuVBLDUzj68"), platform: "youtube" },
  },
  {
    slug: "atlanta-survival-program",
    number: "A-09",
    kind: "archive",
    title: "Atlanta Survival Program",
    subtitle: "Teardown food distribution",
    category: "Community",
    area: "Atlanta",
    excerpt: "Showing up for the city. We covered the Atlanta Survival Program's food distribution.",
    image: photos.atlMoody,
    imageAlt: "Atlanta skyline under a moody sky (placeholder photo)",
    watch: { label: "Watch on YouTube", href: yt("GqANAA2nxJg"), platform: "youtube" },
  },
];

export const featureCategories: FeatureCategory[] = Array.from(new Set(features.map((f) => f.category)));

export const leadFeature = features[0];
export const getFeature = (slug: string) => features.find((f) => f.slug === slug && f.kind === "feature");
