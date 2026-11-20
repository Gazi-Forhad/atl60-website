import { photos } from "./media";

/**
 * SERVICES
 * --------------------------------------------------------------
 * 01–03 come from the brief. 04 was added after reviewing the
 * client's channels: the YouTube channel is a "community driven"
 * street web series, and Facebook reviews mention their event
 * coverage (Super Bowl). Deliverables are a proposal. Confirm with
 * the client.
 */

export type Service = {
  number: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    number: "01",
    slug: "features",
    title: "Food & Restaurant Features",
    short: "Your spot, in the spotlight.",
    description:
      "We put Atlanta's food scene in the spotlight. From hidden gems to established favorites, we create engaging experiences that get people talking.",
    deliverables: [
      "On-site visit, tasting and honest first-bite reactions",
      "60-second vertical review, cut for Reels and Shorts",
      "Must-Try menu callouts and your exact address",
      "Search-friendly captions people use to find food",
      "Posted across Instagram, Facebook and YouTube",
    ],
    idealFor: "Restaurants · Food trucks · New openings",
    image: photos.crabLegsTall,
    imageAlt: "Snow crab legs on a tray (placeholder photo)",
  },
  {
    number: "02",
    slug: "ugc",
    title: "UGC & Content Creation",
    short: "Content you own, made to be posted.",
    description:
      "We create authentic visual stories for restaurants and brands through engaging videos, food photography and social-first content.",
    deliverables: [
      "Short vertical videos for your own channels",
      "Food, menu and interior photography",
      "Hooks, captions and on-screen text that stop the scroll",
      "Raw footage library for ads and future posts",
    ],
    idealFor: "Restaurants · Hospitality groups · CPG food brands",
    image: photos.phoneShootTall,
    imageAlt: "Phone filming a plated dish (placeholder photo)",
  },
  {
    number: "03",
    slug: "collaborations",
    title: "Brand Collaborations & Marketing",
    short: "Atlanta's attention, on your brand.",
    description:
      "We connect businesses with local audiences through creative storytelling, influencer marketing and collaborative campaigns.",
    deliverables: [
      "Sponsored features and multi-post series",
      "Menu launches, limited drops and seasonal specials",
      "Influencer campaigns with local creators",
      "Giveaways and collabs that drive foot traffic",
    ],
    idealFor: "Brands · Delivery apps · Beverage & lifestyle",
    image: photos.friendsLaugh,
    imageAlt: "Friends laughing around a restaurant table (placeholder photo)",
  },
  {
    number: "04",
    slug: "events",
    title: "Events, Interviews & Street Coverage",
    short: "Where the city is, we're there.",
    description:
      "Grand openings, pop-ups, festivals and big-game weekends. Plus the chef, owner and street interviews that started ATL in 60 Seconds.",
    deliverables: [
      "Event recap reels, from same-day to next-day",
      "Chef and owner interviews",
      "Street interviews and audience reactions",
      "Live stories during the moment",
    ],
    idealFor: "Event organisers · Venues · Festivals · Openings",
    image: photos.crowdLights,
    imageAlt: "Crowd under concert lights (placeholder photo)",
  },
];

export const process = [
  {
    code: "00:00",
    title: "The Pull-Up",
    body: "We visit like real customers do. We order the hits, taste everything and talk to the people behind the counter.",
    image: photos.restaurantMoody,
  },
  {
    code: "00:15",
    title: "The Shoot",
    body: "Vertical first. Steam, sauce, crunch, reactions. We capture the moments that make people hungry.",
    image: photos.phoneShootTopDown,
  },
  {
    code: "00:30",
    title: "The Cut",
    body: "Sixty seconds, no filler. Tight edits, captions, your Must-Try list and exactly where to find you.",
    image: photos.cameraNeon,
  },
  {
    code: "00:45",
    title: "The Drop",
    body: "Posted to Instagram, Facebook and YouTube with search-friendly captions, so locals find you long after the post goes live.",
    image: photos.atlNightAerial,
  },
  {
    code: "01:00",
    title: "The Rush",
    body: "Followers pull up, tag friends and come back. You keep content that keeps working on your own channels.",
    image: photos.friendsTable,
  },
];

/** Proposed collaboration formats. Names and scope are suggestions. Confirm pricing and contents with the client. */
export const formats = [
  {
    name: "The 60",
    tag: "Single feature",
    body: "One visit, one 60-second feature, posted everywhere. The fastest way to put your spot in front of hungry Atlanta.",
    points: ["On-site shoot", "1 feature reel", "Cross-platform post", "Must-Try callouts"],
  },
  {
    name: "The Series",
    tag: "Monthly content",
    body: "A steady stream of content for your own channels, plus recurring features that keep you top of mind.",
    points: ["Monthly shoot day", "UGC video pack", "Photo set", "Caption & hook writing"],
    highlight: true,
  },
  {
    name: "The Takeover",
    tag: "Launch & event",
    body: "Openings, launches and big weekends. Coverage before, during and after, built to fill the room.",
    points: ["Pre-launch teasers", "Live stories", "Recap reel", "Creator collabs"],
  },
];

export const faqs = [
  {
    q: "How does a restaurant feature work?",
    a: "Tell us about your spot through the form. We'll confirm a date, visit, shoot on site, and post a 60-second feature with your Must-Try items and location. You'll know the posting plan before we arrive.",
  },
  {
    q: "Where does the content get posted?",
    a: "Our core channels are Instagram and Facebook (@atlin60sec), with the archive on YouTube. Posting plans for each package are confirmed before we shoot.",
  },
  {
    q: "Can we use the content on our own channels?",
    a: "Yes, with UGC and content packages. Usage rights depend on the package, and we spell them out in writing before production.",
  },
  {
    q: "Do you only cover Atlanta proper?",
    a: "We cover Metro Atlanta, from Mableton to Decatur, Smyrna to College Park. If you're nearby, ask us.",
  },
  {
    q: "Is a feature a paid ad?",
    a: "Paid collaborations are always clearly disclosed. Our first bite stays honest either way. That's why people trust where we tell them to eat.",
  },
];
