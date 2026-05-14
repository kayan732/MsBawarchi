/**
 * The Ms Bawarchi menu. The price-of-truth for both the marketing site
 * and the admin app. Keep names in title-case; prices are in INR.
 */

export type MenuCategoryId =
  | "tiffin"
  | "minimeals"
  | "parathe"
  | "quick-bites"
  | "soups"
  | "liquid"
  | "ande"
  | "non-veg"
  | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  category: MenuCategoryId;
  description?: string;
  /**
   * Tone string used by the abstract 3D card preview when a real food
   * photo isn't loaded yet. Hex without #.
   */
  tone: string;
  popular?: boolean;
  spicy?: 1 | 2 | 3;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  tagline: string;
  /** Emoji-free 3D-style glyph token used by the carousel tab icons. */
  glyph:
    | "tiffin"
    | "thali"
    | "rolling-pin"
    | "sandwich"
    | "soup"
    | "mug"
    | "egg"
    | "chicken"
    | "halwa";
};

export const CATEGORIES: MenuCategory[] = [
  {
    id: "tiffin",
    label: "Tiffin Service",
    tagline: "The full Ghar Ka Khaana — daily.",
    glyph: "tiffin",
  },
  {
    id: "minimeals",
    label: "Minimeals",
    tagline: "One-bowl comfort, hot and fresh.",
    glyph: "thali",
  },
  {
    id: "parathe",
    label: "Parathe ki Galli",
    tagline: "Hand-rolled, tawa-fresh.",
    glyph: "rolling-pin",
  },
  {
    id: "quick-bites",
    label: "Quick Bites",
    tagline: "Small hunger, big flavour.",
    glyph: "sandwich",
  },
  {
    id: "soups",
    label: "Soups",
    tagline: "Warm and homey.",
    glyph: "soup",
  },
  {
    id: "liquid",
    label: "Liquid Delights",
    tagline: "Brewed slow, served chilled.",
    glyph: "mug",
  },
  {
    id: "ande",
    label: "Ande ka Andaz",
    tagline: "Eggs, the Bawarchi way.",
    glyph: "egg",
  },
  {
    id: "non-veg",
    label: "Pehle Anda ya Murgh?",
    tagline: "Slow-cooked, ghar-style chicken.",
    glyph: "chicken",
  },
  {
    id: "desserts",
    label: "Kuch Meetha Hai Kya?",
    tagline: "Dadi's recipe book, sweet pages.",
    glyph: "halwa",
  },
];

export const MENU: MenuItem[] = [
  // TIFFIN
  {
    id: "full-tiffin",
    name: "Full Tiffin",
    price: 179,
    veg: true,
    category: "tiffin",
    description:
      "Two rotis, sabzi, dal, rice, salad and a dessert — a complete homestyle thali.",
    tone: "E8A33D",
    popular: true,
  },

  // MINIMEALS
  {
    id: "rajma-chawal",
    name: "Rajma Chawal",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Slow-cooked Punjabi rajma over steamed basmati.",
    tone: "C84B31",
    popular: true,
  },
  {
    id: "kadhi-chawal",
    name: "Kadhi Chawal",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Besan-yoghurt kadhi with crisp pakoras.",
    tone: "E8A33D",
  },
  {
    id: "chole-puri",
    name: "Chole Puri",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Punjabi chole with two soft poori.",
    tone: "B8862F",
  },
  {
    id: "dal-chawal",
    name: "Dal Chawal",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Tadka dal with ghee-rice.",
    tone: "F5EDD9",
  },
  {
    id: "mutter-paneer-chawal",
    name: "Mutter Paneer Chawal",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Tomato-cashew gravy with peas and paneer.",
    tone: "C84B31",
  },
  {
    id: "dal-khichdi",
    name: "Dal Khichdi",
    price: 129,
    veg: true,
    category: "minimeals",
    description: "Comfort moong-dal khichdi with desi ghee.",
    tone: "E8A33D",
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    price: 149,
    veg: true,
    category: "minimeals",
    description: "Overnight-simmered black dal with butter.",
    tone: "7A2E2E",
    popular: true,
  },
  {
    id: "paneer-burji",
    name: "Paneer Burji",
    price: 129,
    veg: true,
    category: "minimeals",
    description: "Spiced scrambled paneer with onions and tomato.",
    tone: "E8A33D",
  },
  {
    id: "vegetable-pulao",
    name: "Vegetable Pulao",
    price: 129,
    veg: true,
    category: "minimeals",
    description: "Whole-spice basmati with garden vegetables.",
    tone: "4A7C3A",
  },

  // PARATHE
  {
    id: "aloo-paratha",
    name: "Aloo Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Spiced potato stuffing, fresh-tawa hot.",
    tone: "E8A33D",
    popular: true,
  },
  {
    id: "gobi-paratha",
    name: "Gobi Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Cauliflower-ginger filling.",
    tone: "F5EDD9",
  },
  {
    id: "paneer-paratha",
    name: "Paneer Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Crumbled paneer with green chilli and coriander.",
    tone: "E8A33D",
  },
  {
    id: "aloo-pyaaz-paratha",
    name: "Aloo Pyaaz Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Potato and caramelised-onion stuffing.",
    tone: "B8862F",
  },
  {
    id: "aloo-gobi-paratha",
    name: "Aloo Gobi Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Potato-cauliflower duet.",
    tone: "E8A33D",
  },
  {
    id: "pyaz-paratha",
    name: "Pyaz Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Sweet onions, ajwain, green chilli.",
    tone: "C84B31",
  },
  {
    id: "lal-mirch-paratha",
    name: "Lal Mirch Paratha",
    price: 99,
    veg: true,
    category: "parathe",
    description: "Red-chilli pickle stuffing — fiery.",
    tone: "7A2E2E",
    spicy: 3,
  },

  // QUICK BITES
  {
    id: "maggi",
    name: "Maggi",
    price: 69,
    veg: true,
    category: "quick-bites",
    description: "Two-minute comfort. Done right.",
    tone: "E8A33D",
  },
  {
    id: "vegetable-maggi",
    name: "Vegetable Maggi",
    price: 79,
    veg: true,
    category: "quick-bites",
    description: "Maggi with sautéed seasonal vegetables.",
    tone: "4A7C3A",
  },
  {
    id: "cheese-maggi",
    name: "Cheese Maggi",
    price: 79,
    veg: true,
    category: "quick-bites",
    description: "Stringy melted cheese on classic Maggi.",
    tone: "E8A33D",
  },
  {
    id: "schezwan-maggi",
    name: "Schezwan Maggi",
    price: 79,
    veg: true,
    category: "quick-bites",
    description: "House-made schezwan sauce, plenty of garlic.",
    tone: "C84B31",
    spicy: 2,
  },
  {
    id: "coleslaw-sandwich",
    name: "Coleslaw Sandwich",
    price: 69,
    veg: true,
    category: "quick-bites",
    description: "Creamy coleslaw between buttered toast.",
    tone: "F5EDD9",
  },
  {
    id: "vegetable-sandwich",
    name: "Vegetable Sandwich",
    price: 69,
    veg: true,
    category: "quick-bites",
    description: "Bombay-style chutney veg sandwich.",
    tone: "4A7C3A",
  },
  {
    id: "kolhapuri-toast",
    name: "Kolhapuri Toast",
    price: 79,
    veg: true,
    category: "quick-bites",
    description: "Spicy onion-tomato-Kolhapuri masala on toast.",
    tone: "C84B31",
    spicy: 2,
  },
  {
    id: "aloo-toast",
    name: "Aloo Toast",
    price: 89,
    veg: true,
    category: "quick-bites",
    description: "Spiced mashed potato grilled into toast.",
    tone: "B8862F",
  },
  {
    id: "cheese-chilli-toast",
    name: "Cheese Chilli Toast",
    price: 89,
    veg: true,
    category: "quick-bites",
    description: "Cheese, green chilli, coriander — grilled.",
    tone: "E8A33D",
  },

  // SOUPS
  {
    id: "tomato-soup",
    name: "Tomato Soup",
    price: 69,
    veg: true,
    category: "soups",
    description: "Roasted tomato, fresh basil, cream swirl.",
    tone: "C84B31",
  },
  {
    id: "pumpkin-soup",
    name: "Pumpkin Soup",
    price: 69,
    veg: true,
    category: "soups",
    description: "Sweet pumpkin, ginger, nutmeg.",
    tone: "E8A33D",
  },
  {
    id: "drumstick-soup",
    name: "Drumstick Soup",
    price: 69,
    veg: true,
    category: "soups",
    description: "South-style drumstick rasam-soup.",
    tone: "4A7C3A",
  },
  {
    id: "protein-vegetable-soup",
    name: "Protein Vegetable Soup",
    price: 69,
    veg: true,
    category: "soups",
    description: "Pulse + vegetable blend, lentil broth base.",
    tone: "B8862F",
  },

  // LIQUID DELIGHTS
  {
    id: "classic-cold-coffee",
    name: "Classic Cold Coffee",
    price: 129,
    veg: true,
    category: "liquid",
    description: "Slow-churned cold brew, milk, vanilla.",
    tone: "8B6420",
  },
  {
    id: "chocolate-cold-coffee",
    name: "Chocolate Cold Coffee",
    price: 149,
    veg: true,
    category: "liquid",
    description: "Belgian chocolate cold coffee.",
    tone: "7A2E2E",
  },
  {
    id: "nutella-cold-coffee",
    name: "Nutella Cold Coffee",
    price: 149,
    veg: true,
    category: "liquid",
    description: "Nutella whip on cold brew base.",
    tone: "8B6420",
  },
  {
    id: "ice-cream-cold-coffee",
    name: "Ice Cream Cold Coffee",
    price: 149,
    veg: true,
    category: "liquid",
    description: "Cold coffee with a vanilla ice-cream float.",
    tone: "F5EDD9",
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    price: 129,
    veg: true,
    category: "liquid",
    description: "Cold brew, ice, milk on the side.",
    tone: "B8862F",
  },
  {
    id: "masala-tea",
    name: "Masala Tea",
    price: 119,
    veg: true,
    category: "liquid",
    description: "Hand-pounded masala, slow-boiled.",
    tone: "C84B31",
  },
  {
    id: "ginger-tea",
    name: "Ginger Tea",
    price: 119,
    veg: true,
    category: "liquid",
    description: "Fresh ginger, black tea, raw cane.",
    tone: "B8862F",
  },
  {
    id: "lemongrass-tea",
    name: "Lemongrass Tea",
    price: 119,
    veg: true,
    category: "liquid",
    description: "Garden lemongrass, lime, honey.",
    tone: "4A7C3A",
  },

  // ANDE
  {
    id: "masala-omelette",
    name: "Masala Omelette",
    price: 99,
    veg: false,
    category: "ande",
    description: "Three-egg omelette with onion, chilli, coriander.",
    tone: "E8A33D",
  },
  {
    id: "boiled-egg-sandwich",
    name: "Boiled Egg Sandwich",
    price: 129,
    veg: false,
    category: "ande",
    description: "Mayo-egg salad on toasted bread.",
    tone: "F5EDD9",
  },
  {
    id: "masala-french-toast",
    name: "Masala French Toast",
    price: 119,
    veg: false,
    category: "ande",
    description: "Savoury French toast with green chilli and onion.",
    tone: "E8A33D",
  },
  {
    id: "bhurji-pav",
    name: "Bhurji Pav",
    price: 119,
    veg: false,
    category: "ande",
    description: "Spiced egg bhurji with buttered pav.",
    tone: "C84B31",
    popular: true,
  },

  // NON-VEG
  {
    id: "ghar-ka-murgh",
    name: "Ghar ka Murgh",
    price: 399,
    veg: false,
    category: "non-veg",
    description: "Homestyle chicken curry, slow-cooked in whole spices.",
    tone: "7A2E2E",
    popular: true,
  },
  {
    id: "anda-curry-chawal",
    name: "Anda Curry Chawal",
    price: 299,
    veg: false,
    category: "non-veg",
    description: "Boiled-egg masala curry with steamed rice.",
    tone: "C84B31",
  },
  {
    id: "chicken-bhuna-masala",
    name: "Chicken Bhuna Masala",
    price: 349,
    veg: false,
    category: "non-veg",
    description: "Bhuna-style thick masala, dry-ish gravy.",
    tone: "7A2E2E",
    spicy: 2,
  },
  {
    id: "chicken-pulao",
    name: "Chicken Pulao",
    price: 449,
    veg: false,
    category: "non-veg",
    description: "Whole-spice basmati cooked with bone-in chicken.",
    tone: "B8862F",
  },
  {
    id: "cream-chicken",
    name: "Cream Chicken",
    price: 389,
    veg: false,
    category: "non-veg",
    description: "Mild cashew-cream chicken in a velvety gravy.",
    tone: "F5EDD9",
  },

  // DESSERTS
  {
    id: "suji-halwa",
    name: "Suji Halwa",
    price: 225,
    veg: true,
    category: "desserts",
    description: "Semolina halwa, ghee, slivered almonds.",
    tone: "E8A33D",
    popular: true,
  },
  {
    id: "no-bake-cake",
    name: "No-Bake Cake",
    price: 249,
    veg: true,
    category: "desserts",
    description: "Layered biscuit cake, no oven needed.",
    tone: "8B6420",
  },
  {
    id: "atta-halwa",
    name: "Atta Halwa",
    price: 225,
    veg: true,
    category: "desserts",
    description: "Whole-wheat halwa, ghee, jaggery.",
    tone: "B8862F",
  },
  {
    id: "fruit-cream",
    name: "Fruit Cream",
    price: 199,
    veg: true,
    category: "desserts",
    description: "Fresh fruit in a sweet whipped cream.",
    tone: "F5EDD9",
  },
];

export function itemsByCategory(category: MenuCategoryId): MenuItem[] {
  return MENU.filter((item) => item.category === category);
}

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}
