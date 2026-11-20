/**
 * PLACEHOLDER MEDIA REGISTRY
 * --------------------------------------------------------------
 * Every temporary photo/video on the site comes from this file, so
 * swapping in the client's real footage is a one-file job.
 *
 * Photos: Unsplash (free licence). Videos: Mixkit (free licence).
 * Replace each entry with the client's own asset URL (Sanity, Mux,
 * Cloudinary, or /public) before launch.
 */

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export type VideoAsset = { src: string; poster: string };
const mixkit = (id: number): VideoAsset => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
});

export const photos = {
  // Seafood / Cajun
  seafoodBoilTall: unsplash("photo-1655992829036-ce6c395d4909"),
  seafoodPile: unsplash("photo-1655992829046-ae2d44d205f7"),
  seafoodBasket: unsplash("photo-1655992829003-b1d5b4b35a73"),
  crawfishTall: unsplash("photo-1650290373703-45dcf099d275"),
  crawfishDark: unsplash("photo-1555709180-40fd7a925918"),
  crabLegsTall: unsplash("photo-1511543865714-5a5a5ce51a94"),
  // Wings, BBQ, burgers
  wingsTall: unsplash("photo-1567620832903-9fc6debc209f"),
  wingsBasket: unsplash("photo-1608039755401-742074f0548d"),
  ribsGrill: unsplash("photo-1679711246825-1f2bd51b16d0"),
  grillTall: unsplash("photo-1586058584825-c1e87ed735b4"),
  brisketTall: unsplash("photo-1529193591184-b1d58069ecdd"),
  burgerDark: unsplash("photo-1651993841930-946a700c1524"),
  burgerTall: unsplash("photo-1611309454921-16cef3438ee0"),
  // Other plates
  ramenTall: unsplash("photo-1526318896980-cf78c088247c"),
  tacosTall: unsplash("photo-1565299585323-38d6b0865b47"),
  tacosSpread: unsplash("photo-1599974579688-8dbdd335c77f"),
  donutStack: unsplash("photo-1551024601-bec78aea704b"),
  saucePour: unsplash("photo-1499126167718-c87f5c1387e8"),
  saucePour2: unsplash("photo-1611516081814-55d97d5a7488"),
  // Drinks & rooms
  barTall: unsplash("photo-1767022724924-993b00fc04b3"),
  cocktailDark: unsplash("photo-1610515660473-c11d4f3f7d37"),
  restaurantRoom: unsplash("photo-1517248135467-4c7edcad34c4"),
  restaurantMoody: unsplash("photo-1583354608715-177553a4035e"),
  // Kitchen
  chefFlame: unsplash("photo-1600565193348-f74bd3c7ccdf"),
  chefFlameTall: unsplash("photo-1556940211-ea1d97e04458"),
  wokFireTall: unsplash("photo-1575664579788-0ce4503c7e89"),
  // Street & city
  foodTruck: unsplash("photo-1570441262582-a2d4b9a916a5"),
  foodTruckNight: unsplash("photo-1509315811345-672d83ef2fbc"),
  foodTruckBlue: unsplash("photo-1565123409695-7b5ef63a2efb"),
  nightMarket: unsplash("photo-1628324716243-0c9c29971a58"),
  streetNightTall: unsplash("photo-1514327567052-1eed4e4902c1"),
  atlNight: unsplash("photo-1594834871043-d1db06ef57b1"),
  atlNightAerial: unsplash("photo-1606416357029-8cc2e025682e"),
  atlMoody: unsplash("photo-1575917649705-5b59aaa12e6b"),
  atlSunset: unsplash("photo-1702494600481-043a92b6271e"),
  crowd: unsplash("photo-1459749411175-04bf5292ceea"),
  crowdLights: unsplash("photo-1470229722913-7c0e2dbbafd3"),
  friendsTable: unsplash("photo-1553321846-ad6616f5d1db"),
  friendsLaugh: unsplash("photo-1681641092941-b1acee507ee0"),
  // Creator / UGC
  phoneShootTopDown: unsplash("photo-1472393365320-db77a5abbecc"),
  phoneShootTall: unsplash("photo-1614442042855-e17d53875286"),
  phoneShootTable: unsplash("photo-1589270018935-ae7e307e79b6"),
  cameraTall: unsplash("photo-1580707221190-bd94d9087b7f"),
  cameraNeon: unsplash("photo-1581591524425-c7e0978865fc"),
} as const;

export const videos = {
  seafoodBoil: mixkit(46585),
  seafoodBubbling: mixkit(46584),
  saucePour: mixkit(30826),
  wingsDrop: mixkit(30818),
  shrimpGrill: mixkit(12035),
  steakSear: mixkit(45723),
  wokFire: mixkit(47555),
  busyBar: mixkit(4043),
  smokingCocktail: mixkit(22850),
  cheeseMelt: mixkit(12016),
  firstBite: mixkit(47978),
  burgerSmile: mixkit(29059),
  festivalCrowd: mixkit(4185),
  friendsToast: mixkit(48636),
  cityAerialNight: mixkit(42343),
  streetGrill: mixkit(31348),
  chefKitchen: mixkit(39535),
  friesDrop: mixkit(47159),
  photographingFood: mixkit(22070),
  cocktailCraft: mixkit(4172),
} as const;
