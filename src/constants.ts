
export enum Category {
  ALL = "ALL",
  PREDATORS = "PREDATORS",
  AUTHORITARIANS = "AUTHORITARIANS",
  CORPORATE = "CORPORATE",
  WAR_CRIMINALS = "WAR CRIMINALS",
  MENACES = "MENACES",
  FRAUDSTERS = "FRAUDSTERS"
}

export interface Bastard {
  id: string;
  name: string;
  description: string;
  category: Category;
  pinataType: string;
  pinataEmoji: string;
}

export const ROSTER: Bastard[] = [
  // PREDATORS
  { id: "weinstein", name: "Harvey Weinstein", description: "Convicted serial sexual predator", category: Category.PREDATORS, pinataType: "Movie Reel", pinataEmoji: "🎞️" },
  { id: "epstein", name: "Jeffrey Epstein", description: "Sex trafficker", category: Category.PREDATORS, pinataType: "Private Jet", pinataEmoji: "🛩️" },
  { id: "maxwell", name: "Ghislaine Maxwell", description: "Convicted sex trafficker", category: Category.PREDATORS, pinataType: "Submarine", pinataEmoji: "🛥️" },
  { id: "rkelly", name: "R. Kelly", description: "Convicted of sex trafficking and racketeering", category: Category.PREDATORS, pinataType: "Gold Record", pinataEmoji: "📀" },
  { id: "cosby", name: "Bill Cosby", description: "Serial sexual predator", category: Category.PREDATORS, pinataType: "Pudding Cup", pinataEmoji: "🍮" },
  { id: "tate", name: "Andrew Tate", description: "Charged with human trafficking and rape", category: Category.PREDATORS, pinataType: "Bugatti", pinataEmoji: "🏎️" },
  { id: "nassar", name: "Larry Nassar", description: "Serial child molester, USA Gymnastics", category: Category.PREDATORS, pinataType: "Gymnastics Mat", pinataEmoji: "🤸" },
  { id: "spacey", name: "Kevin Spacey", description: "Multiple sexual assault allegations", category: Category.PREDATORS, pinataType: "Oscar Statue", pinataEmoji: "🏆" },
  { id: "masterson", name: "Danny Masterson", description: "Convicted rapist", category: Category.PREDATORS, pinataType: "Scientology E-Meter", pinataEmoji: "📡" },
  { id: "andrew", name: "Prince Andrew", description: "Sexual abuse, Epstein associate", category: Category.PREDATORS, pinataType: "Teddy Bear", pinataEmoji: "🧸" },
  
  // AUTHORITARIANS
  { id: "orban", name: "Viktor Orbán", description: "Dismantled Hungarian democracy", category: Category.AUTHORITARIANS, pinataType: "Iron Fence", pinataEmoji: "🚧" },
  { id: "duterte", name: "Rodrigo Duterte", description: "Extrajudicial killings of thousands", category: Category.AUTHORITARIANS, pinataType: "Police Badge", pinataEmoji: "👮" },
  { id: "erdogan", name: "Recep Tayyip Erdoğan", description: "Jailed journalists, authoritarian crackdowns", category: Category.AUTHORITARIANS, pinataType: "Prison Key", pinataEmoji: "🔑" },
  { id: "lukashenko", name: "Alexander Lukashenko", description: "Europe's last dictator", category: Category.AUTHORITARIANS, pinataType: "Potato Sack", pinataEmoji: "🥔" },
  { id: "modi", name: "Narendra Modi", description: "Hindu nationalist, Muslim persecution", category: Category.AUTHORITARIANS, pinataType: "Bulldozer", pinataEmoji: "🚜" },
  { id: "kim", name: "Kim Jong-un", description: "Nuclear threats, prison camps, executions", category: Category.AUTHORITARIANS, pinataType: "Nuclear Missile", pinataEmoji: "🚀" },
  { id: "mugabe", name: "Robert Mugabe", description: "Decades of brutal authoritarian rule", category: Category.AUTHORITARIANS, pinataType: "Hyper-inflated Bill", pinataEmoji: "💵" },

  // WAR CRIMINALS
  { id: "putin", name: "Vladimir Putin", description: "War crimes, invasion of Ukraine", category: Category.WAR_CRIMINALS, pinataType: "Gas Pipe", pinataEmoji: "⛽" },
  { id: "xi", name: "Xi Jinping", description: "Uyghur genocide, Hong Kong crackdown", category: Category.WAR_CRIMINALS, pinataType: "Surveillance Camera", pinataEmoji: "📹" },
  { id: "netanyahu", name: "Benjamin Netanyahu", description: "ICC arrest warrant, Gaza war crimes", category: Category.WAR_CRIMINALS, pinataType: "Concrete Wall", pinataEmoji: "🧱" },
  { id: "assad", name: "Bashar al-Assad", description: "Chemical weapons on civilians", category: Category.WAR_CRIMINALS, pinataType: "Gas Canister", pinataEmoji: "🧪" },
  { id: "mbs", name: "Mohammed bin Salman", description: "Ordered Khashoggi murder", category: Category.WAR_CRIMINALS, pinataType: "Bone Saw", pinataEmoji: "🪚" },
  { id: "milosevic", name: "Slobodan Milošević", description: "Architect of ethnic cleansing", category: Category.WAR_CRIMINALS, pinataType: "Gravel Pit", pinataEmoji: "🪨" },
  { id: "kissinger", name: "Henry Kissinger", description: "Architect of secret bombings, millions dead", category: Category.WAR_CRIMINALS, pinataType: "Cluster Bomb", pinataEmoji: "💣" },
  { id: "cheney", name: "Dick Cheney", description: "Iraq War architect, profited from war", category: Category.WAR_CRIMINALS, pinataType: "Oil Barrel", pinataEmoji: "🛢️" },

  // CORPORATE GHOULS
  { id: "shkreli", name: "Martin Shkreli", description: "Price-gouged life-saving medication 5,000%", category: Category.CORPORATE, pinataType: "Pill Bottle", pinataEmoji: "💊" },
  { id: "sackler", name: "The Sackler Family", description: "Fueled the opioid crisis for profit", category: Category.CORPORATE, pinataType: "OxyContin Bottle", pinataEmoji: "💊" },
  { id: "murdoch", name: "Rupert Murdoch", description: "Decades of weaponized misinformation", category: Category.CORPORATE, pinataType: "Satellite Dish", pinataEmoji: "📡" },
  { id: "madoff", name: "Bernie Madoff", description: "Largest Ponzi scheme in history", category: Category.CORPORATE, pinataType: "Empty Safe", pinataEmoji: "🗄️" },
  { id: "holmes", name: "Elizabeth Holmes", description: "Theranos fraud, endangered patients", category: Category.CORPORATE, pinataType: "Blood Vial", pinataEmoji: "🩸" },
  { id: "sbf", name: "Sam Bankman-Fried", description: "FTX fraud, stole billions", category: Category.CORPORATE, pinataType: "Crypto Coin", pinataEmoji: "🪙" },
  { id: "zuckerberg", name: "Mark Zuckerberg", description: "Sold democracy", category: Category.CORPORATE, pinataType: "Data Server", pinataEmoji: "🖥️" },
  { id: "bezos", name: "Jeff Bezos", description: "Union-busting, worker exploitation", category: Category.CORPORATE, pinataType: "Amazon Package", pinataEmoji: "📦" },
  { id: "thiel", name: "Peter Thiel", description: "Bankrolled attacks on press freedom", category: Category.CORPORATE, pinataType: "Vampire Blood", pinataEmoji: "🧛" },
  { id: "koch", name: "Koch Brothers", description: "Funded climate denial for decades", category: Category.CORPORATE, pinataType: "Coal Lump", pinataEmoji: "🌑" },
  { id: "musk", name: "Elon Musk", description: "Platforming extremists, dismantling institutions", category: Category.CORPORATE, pinataType: "Rocket", pinataEmoji: "🚀" },

  // MENACES
  { id: "jones", name: "Alex Jones", description: "Harassed families of murdered children", category: Category.MENACES, pinataType: "Bullhorn", pinataEmoji: "📢" },
  { id: "trump", name: "Donald Trump", description: "Convicted felon, incited insurrection", category: Category.MENACES, pinataType: "MAGA Hat", pinataEmoji: "🧢" },
  { id: "carlson", name: "Tucker Carlson", description: "Mainstreamed white supremacist talking points", category: Category.MENACES, pinataType: "Bowtie", pinataEmoji: "👔" },
  { id: "bannon", name: "Steve Bannon", description: "Architect of white nationalist politics", category: Category.MENACES, pinataType: "Whiskey Bottle", pinataEmoji: "🥃" },
  { id: "giuliani", name: "Rudy Giuliani", description: "Election lies, hair dye meltdown", category: Category.MENACES, pinataType: "Dripping Hair Dye", pinataEmoji: "💧" },
  { id: "desantis", name: "Ron DeSantis", description: "Book bans, attacks on LGBTQ+ rights", category: Category.MENACES, pinataType: "Banned Book", pinataEmoji: "📚" },
  { id: "mtg", name: "Marjorie Taylor Greene", description: "Conspiracy theorist, harassed shooting survivors", category: Category.MENACES, pinataType: "Laser Beam", pinataEmoji: "🛰️" },
  { id: "arpaio", name: "Joe Arpaio", description: "Ran concentration camp conditions for inmates", category: Category.MENACES, pinataType: "Pink Underwear", pinataEmoji: "🩲" },
  { id: "limbaugh", name: "Rush Limbaugh", description: "Decades of racist, sexist broadcasting", category: Category.MENACES, pinataType: "Cigar", pinataEmoji: "🚬" },
  { id: "coulter", name: "Ann Coulter", description: "Profited from bigotry as brand", category: Category.MENACES, pinataType: "Poison Pen", pinataEmoji: "🖋️" },
  { id: "kavanaugh", name: "Brett Kavanaugh", description: "Credible sexual assault allegations, confirmed anyway", category: Category.MENACES, pinataType: "Beer Keg", pinataEmoji: "🛢️" },
];

export const AFFIRMATIONS = [
  "That one can't hurt anyone anymore.",
  "You're doing important work.",
  "The world just got 0.0001% better.",
  "Your ancestors are proud. Probably.",
  "Somewhere, a golden retriever just wagged its tail for you.",
  "You turned a bastard into confetti. That's a full day.",
  "One less. You're not done, but you can rest.",
  "That was for everyone who couldn't swing first.",
  "Consider that a public service.",
  "The confetti remembers, even if the world forgets.",
  "thank u for ur service 🫡",
  "go drink some water. you earned it.",
  "take a breath. you're doing important work.",
  "one less. you did that.",
  "rest now. or pick another. your call."
];
