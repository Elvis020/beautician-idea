import { StyleOption } from "@/types/try-on";
import { ServiceType } from "@/types";

export const tryOnStyles: StyleOption[] = [
  // Nails
  {
    id: "nail-french",
    service: "nails",
    name: "French Tips",
    previewImage: "/styles/nails/french.jpg",
    prompt: "elegant french manicure with white tips on fingernails, professional nail art, clean and polished",
    negativePrompt: "blurry, low quality, distorted hands",
  },
  {
    id: "nail-glitter",
    service: "nails",
    name: "Glitter Glam",
    previewImage: "/styles/nails/glitter.jpg",
    prompt: "sparkling glitter nails with gold and silver shimmer, glamorous nail art, party nails",
    negativePrompt: "blurry, low quality, distorted hands",
  },
  {
    id: "nail-red",
    service: "nails",
    name: "Bold Red",
    previewImage: "/styles/nails/red.jpg",
    prompt: "classic bold red nail polish, glossy finish, elegant manicure",
    negativePrompt: "blurry, low quality, distorted hands",
  },
  {
    id: "nail-ombre",
    service: "nails",
    name: "Pink Ombre",
    previewImage: "/styles/nails/ombre.jpg",
    prompt: "beautiful pink ombre gradient nails, soft fade from light to dark pink, trendy nail design",
    negativePrompt: "blurry, low quality, distorted hands",
  },

  // Makeup
  {
    id: "makeup-natural",
    service: "makeup",
    name: "Natural Glam",
    previewImage: "/styles/makeup/natural.jpg",
    prompt: "natural glam makeup look, soft contour, nude lips, subtle eyeshadow, glowing skin, professional makeup",
    negativePrompt: "heavy makeup, clown makeup, distorted face",
  },
  {
    id: "makeup-evening",
    service: "makeup",
    name: "Evening Glam",
    previewImage: "/styles/makeup/evening.jpg",
    prompt: "glamorous evening makeup, smokey eye, bold lashes, contoured cheekbones, glossy lips, red carpet ready",
    negativePrompt: "daytime makeup, natural look, distorted face",
  },
  {
    id: "makeup-bridal",
    service: "makeup",
    name: "Bridal Beauty",
    previewImage: "/styles/makeup/bridal.jpg",
    prompt: "beautiful bridal makeup, dewy skin, soft pink tones, elegant eye makeup, timeless wedding makeup",
    negativePrompt: "heavy makeup, dark colors, distorted face",
  },
  {
    id: "makeup-bold",
    service: "makeup",
    name: "Bold & Colorful",
    previewImage: "/styles/makeup/bold.jpg",
    prompt: "bold colorful makeup, vibrant eyeshadow, graphic liner, artistic makeup, editorial beauty look",
    negativePrompt: "natural makeup, subtle, distorted face",
  },

  // Wigs
  {
    id: "wig-bodywave",
    service: "wig",
    name: "Body Wave",
    previewImage: "/styles/wigs/bodywave.jpg",
    prompt: "beautiful body wave hair, long flowing waves, natural looking wig, glamorous hairstyle",
    negativePrompt: "bald, no hair, distorted face",
  },
  {
    id: "wig-straight",
    service: "wig",
    name: "Silky Straight",
    previewImage: "/styles/wigs/straight.jpg",
    prompt: "sleek silky straight hair, long smooth hair, elegant hairstyle, professional look",
    negativePrompt: "curly, wavy, distorted face",
  },
  {
    id: "wig-curly",
    service: "wig",
    name: "Curly Bob",
    previewImage: "/styles/wigs/curly.jpg",
    prompt: "bouncy curly bob hairstyle, voluminous curls, chic short hair, stylish look",
    negativePrompt: "straight hair, long hair, distorted face",
  },
  {
    id: "wig-braids",
    service: "wig",
    name: "Box Braids",
    previewImage: "/styles/wigs/braids.jpg",
    prompt: "beautiful long box braids, protective hairstyle, neat braids, African braiding style",
    negativePrompt: "loose hair, bald, distorted face",
  },
];

export function getStylesByService(service: ServiceType): StyleOption[] {
  return tryOnStyles.filter((style) => style.service === service);
}

export function getStyleById(id: string): StyleOption | undefined {
  return tryOnStyles.find((style) => style.id === id);
}
