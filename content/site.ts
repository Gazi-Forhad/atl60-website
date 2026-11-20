/**
 * Brand facts. Sources noted inline — anything marked VERIFY should be
 * confirmed with the client before launch.
 */

export const site = {
  name: "ATL in 60 Seconds",
  shortName: "ATL in 60",
  handle: "@atlin60sec",
  tagline: "The city. The food. The experience.",
  description:
    "ATL in 60 Seconds is an Atlanta food and lifestyle media brand. Restaurant features, UGC, influencer marketing and event coverage across Metro Atlanta.",
  url: "https://atlin60seconds.com",
  // Source: YouTube channel "Joined 18 Sept 2017".
  established: 2017,
  contact: {
    // Source: YouTube About ("CONTACT/BOOKING INQUIRIES"). VERIFY still current.
    email: "atlin60sec@gmail.com",
    phone: "678-573-9666",
    phoneHref: "tel:+16785739666",
    addressLines: ["2451 Cumberland Pkwy SE, Ste 3269", "Atlanta, GA 30339"],
  },
} as const;

export type SocialId = "instagram" | "facebook" | "youtube";

export const socials: Array<{
  id: SocialId;
  label: string;
  handle: string;
  href: string;
  blurb: string;
}> = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@atlin60sec",
    href: "https://www.instagram.com/atlin60sec/",
    blurb: "Daily reels, first bites and where to eat next.",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "ATLin60sec",
    href: "https://www.facebook.com/atlin60sec/",
    blurb: "3.4K+ followers. Full reviews, Must-Try lists and community.",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@atlin60seconds35",
    href: "https://www.youtube.com/@atlin60seconds35",
    blurb: "The archive: interviews, food trucks and the web series.",
  },
];

export const nav = [
  { label: "Discover", href: "/discover", code: "00:12" },
  { label: "Videos", href: "/videos", code: "00:24" },
  { label: "Services", href: "/services", code: "00:36" },
  { label: "About", href: "/about", code: "00:48" },
  { label: "Collaborate", href: "/collaborate", code: "00:54" },
  { label: "Contact", href: "/contact", code: "00:60" },
] as const;

/** Metro cities & neighbourhoods. "Navigating Metro Cities!" is from their Facebook bio. */
export const metroAreas = [
  "Mableton",
  "Midtown",
  "Buckhead",
  "West End",
  "Decatur",
  "East Point",
  "Smyrna",
  "Marietta",
  "College Park",
  "Downtown",
  "Old Fourth Ward",
  "Buford Hwy",
];

/**
 * Brand stats. Only verified numbers (checked Nov 2026) are shown.
 * Update these whenever the client sends current analytics.
 */
export const stats = [
  { value: 2017, prefix: "", suffix: "", label: "On Atlanta streets since", source: "YouTube channel join date" },
  { value: 113, prefix: "", suffix: "+", label: "Videos in the YouTube archive", source: "YouTube channel, Nov 2026" },
  { value: 3.4, prefix: "", suffix: "K+", label: "Facebook community", source: "Facebook page, Nov 2026", decimals: 1 },
  { value: 60, prefix: "", suffix: "s", label: "Every story, one minute", source: "Brand format" },
];
