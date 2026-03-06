
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
  { id: "weinstein", name: "Harvey Weinstein", description: "Serial predator who used the Oscars as a hunting ground.", category: Category.PREDATORS, pinataType: "Movie Reel", pinataEmoji: "🎞️" },
  { id: "epstein", name: "Jeffrey Epstein", description: "Billionaire pimp who definitely didn't kill himself.", category: Category.PREDATORS, pinataType: "Private Jet", pinataEmoji: "🛩️" },
  { id: "maxwell", name: "Ghislaine Maxwell", description: "The world's most high-profile recruiter for a pedophile ring.", category: Category.PREDATORS, pinataType: "Submarine", pinataEmoji: "🛥️" },
  { id: "rkelly", name: "R. Kelly", description: "Turned 'I Believe I Can Fly' into a soundtrack for sex trafficking.", category: Category.PREDATORS, pinataType: "Gold Record", pinataEmoji: "📀" },
  { id: "cosby", name: "Bill Cosby", description: "America's Dad, if your dad was a serial rapist with a penchant for Quaaludes.", category: Category.PREDATORS, pinataType: "Pudding Cup", pinataEmoji: "🍮" },
  { id: "tate", name: "Andrew Tate", description: "The final boss of fragile masculinity and human trafficking.", category: Category.PREDATORS, pinataType: "Bugatti", pinataEmoji: "🏎️" },
  { id: "nassar", name: "Larry Nassar", description: "Used the medical profession to hide a decades-long child molestation spree.", category: Category.PREDATORS, pinataType: "Gymnastics Mat", pinataEmoji: "🤸" },
  { id: "spacey", name: "Kevin Spacey", description: "Method actor who took his 'villain' roles a little too literally off-screen.", category: Category.PREDATORS, pinataType: "Oscar Statue", pinataEmoji: "🏆" },
  { id: "masterson", name: "Danny Masterson", description: "Rapist who thought Scientology would help him hide the bodies.", category: Category.PREDATORS, pinataType: "Scientology E-Meter", pinataEmoji: "📡" },
  { id: "andrew", name: "Prince Andrew", description: "The royal family's favorite sweat-free Epstein associate.", category: Category.PREDATORS, pinataType: "Teddy Bear", pinataEmoji: "🧸" },
  
  // AUTHORITARIANS
  { id: "orban", name: "Viktor Orbán", description: "Turning Hungary into a democracy-free zone, one iron fence at a time.", category: Category.AUTHORITARIANS, pinataType: "Iron Fence", pinataEmoji: "🚧" },
  { id: "duterte", name: "Rodrigo Duterte", description: "The man who turned 'War on Drugs' into a state-sponsored murder spree.", category: Category.AUTHORITARIANS, pinataType: "Police Badge", pinataEmoji: "👮" },
  { id: "erdogan", name: "Recep Tayyip Erdoğan", description: "Sultan of the surveillance state and professional jailer of journalists.", category: Category.AUTHORITARIANS, pinataType: "Prison Key", pinataEmoji: "🔑" },
  { id: "lukashenko", name: "Alexander Lukashenko", description: "The only man in Europe who still thinks the USSR is a great idea.", category: Category.AUTHORITARIANS, pinataType: "Potato Sack", pinataEmoji: "🥔" },
  { id: "modi", name: "Narendra Modi", description: "Hindu nationalist who treats secularism like a personal insult.", category: Category.AUTHORITARIANS, pinataType: "Bulldozer", pinataEmoji: "🚜" },
  { id: "kim", name: "Kim Jong-un", description: "A third-generation nepo baby with nuclear launch codes and a bad haircut.", category: Category.AUTHORITARIANS, pinataType: "Nuclear Missile", pinataEmoji: "🚀" },
  { id: "mugabe", name: "Robert Mugabe", description: "Ruined a country for 30 years and called it 'liberation'.", category: Category.AUTHORITARIANS, pinataType: "Hyper-inflated Bill", pinataEmoji: "💵" },

  // WAR CRIMINALS
  { id: "putin", name: "Vladimir Putin", description: "Invading neighbors and poisoning rivals because he's insecure about his height.", category: Category.WAR_CRIMINALS, pinataType: "Gas Pipe", pinataEmoji: "⛽" },
  { id: "xi", name: "Xi Jinping", description: "The architect of modern genocide and the world's most expensive firewall.", category: Category.WAR_CRIMINALS, pinataType: "Surveillance Camera", pinataEmoji: "📹" },
  { id: "netanyahu", name: "Benjamin Netanyahu", description: "ICC's most wanted, currently turning Gaza into a graveyard.", category: Category.WAR_CRIMINALS, pinataType: "Concrete Wall", pinataEmoji: "🧱" },
  { id: "assad", name: "Bashar al-Assad", description: "Chemical weapons enthusiast who gassed his own people for fun and profit.", category: Category.WAR_CRIMINALS, pinataType: "Gas Canister", pinataEmoji: "🧪" },
  { id: "mbs", name: "Mohammed bin Salman", description: "Crown Prince of the bone saw and the dismembered journalist.", category: Category.WAR_CRIMINALS, pinataType: "Bone Saw", pinataEmoji: "🪚" },
  { id: "milosevic", name: "Slobodan Milošević", description: "The man who made 'ethnic cleansing' a household term.", category: Category.WAR_CRIMINALS, pinataType: "Gravel Pit", pinataEmoji: "🪨" },
  { id: "kissinger", name: "Henry Kissinger", description: "The Nobel Peace Prize winner who bombed more countries than most people have visited.", category: Category.WAR_CRIMINALS, pinataType: "Cluster Bomb", pinataEmoji: "💣" },
  { id: "cheney", name: "Dick Cheney", description: "The man who shot his friend in the face and made the world pay for it.", category: Category.WAR_CRIMINALS, pinataType: "Oil Barrel", pinataEmoji: "🛢️" },

  // CORPORATE GHOULS
  { id: "shkreli", name: "Martin Shkreli", description: "The 'Pharma Bro' who thought 5,000% markups on life-saving drugs was 'just business'.", category: Category.CORPORATE, pinataType: "Pill Bottle", pinataEmoji: "💊" },
  { id: "sackler", name: "The Sackler Family", description: "The family that turned the American dream into an opioid nightmare for profit.", category: Category.CORPORATE, pinataType: "OxyContin Bottle", pinataEmoji: "💊" },
  { id: "murdoch", name: "Rupert Murdoch", description: "The man who broke the world's brain for a few extra ratings points.", category: Category.CORPORATE, pinataType: "Satellite Dish", pinataEmoji: "📡" },
  { id: "madoff", name: "Bernie Madoff", description: "The gold standard for stealing from your friends and calling it an investment.", category: Category.CORPORATE, pinataType: "Empty Safe", pinataEmoji: "🗄️" },
  { id: "holmes", name: "Elizabeth Holmes", description: "Sold a drop of blood and a mountain of lies to the world's smartest idiots.", category: Category.CORPORATE, pinataType: "Blood Vial", pinataEmoji: "🩸" },
  { id: "sbf", name: "Sam Bankman-Fried", description: "The effective altruist who effectively stole billions in cargo shorts.", category: Category.CORPORATE, pinataType: "Crypto Coin", pinataEmoji: "🪙" },
  { id: "zuckerberg", name: "Mark Zuckerberg", description: "The man who sold your privacy and democracy for a 'Like' button.", category: Category.CORPORATE, pinataType: "Data Server", pinataEmoji: "🖥️" },
  { id: "bezos", name: "Jeff Bezos", description: "The world's richest union-buster who thinks bathroom breaks are optional.", category: Category.CORPORATE, pinataType: "Amazon Package", pinataEmoji: "📦" },
  { id: "thiel", name: "Peter Thiel", description: "Billionaire vampire who bankrolled the death of Gawker because they hurt his feelings.", category: Category.CORPORATE, pinataType: "Vampire Blood", pinataEmoji: "🧛" },
  { id: "koch", name: "Koch Brothers", description: "The brothers who spent billions making sure the planet burns for their bottom line.", category: Category.CORPORATE, pinataType: "Coal Lump", pinataEmoji: "🌑" },
  { id: "musk", name: "Elon Musk", description: "The world's richest internet troll, currently speed-running the destruction of free speech.", category: Category.CORPORATE, pinataType: "Rocket", pinataEmoji: "🚀" },

  // MENACES
  { id: "jones", name: "Alex Jones", description: "Conspiracy pundit who said a school massacre was a hoax.", category: Category.MENACES, pinataType: "Bullhorn", pinataEmoji: "📢" },
  { id: "trump", name: "Donald Trump", description: "34-time convicted felon who thinks the Constitution is a suggestion.", category: Category.MENACES, pinataType: "MAGA Hat", pinataEmoji: "🧢" },
  { id: "carlson", name: "Tucker Carlson", description: "The human equivalent of a white supremacist dog whistle.", category: Category.MENACES, pinataType: "Bowtie", pinataEmoji: "👔" },
  { id: "bannon", name: "Steve Bannon", description: "The disheveled architect of the global far-right and three-shirt enthusiast.", category: Category.MENACES, pinataType: "Whiskey Bottle", pinataEmoji: "🥃" },
  { id: "giuliani", name: "Rudy Giuliani", description: "From 'America's Mayor' to a dripping hair-dye mess at Four Seasons Total Landscaping.", category: Category.MENACES, pinataType: "Dripping Hair Dye", pinataEmoji: "💧" },
  { id: "desantis", name: "Ron DeSantis", description: "The man who thinks 'Don't Say Gay' is a substitute for a personality.", category: Category.MENACES, pinataType: "Banned Book", pinataEmoji: "📚" },
  { id: "mtg", name: "Marjorie Taylor Greene", description: "Jewish space lasers, QAnon, and the general decline of Western civilization.", category: Category.MENACES, pinataType: "Laser Beam", pinataEmoji: "🛰️" },
  { id: "arpaio", name: "Joe Arpaio", description: "The 'Toughest Sheriff' who ran a desert concentration camp for fun.", category: Category.MENACES, pinataType: "Pink Underwear", pinataEmoji: "🩲" },
  { id: "limbaugh", name: "Rush Limbaugh", description: "The man who spent decades making hate speech sound like common sense.", category: Category.MENACES, pinataType: "Cigar", pinataEmoji: "🚬" },
  { id: "coulter", name: "Ann Coulter", description: "A professional bigot who realized that being awful is a very lucrative brand.", category: Category.MENACES, pinataType: "Poison Pen", pinataEmoji: "🖋️" },
  { id: "kavanaugh", name: "Brett Kavanaugh", description: "The Supreme Court justice who really, really likes beer and credible allegations.", category: Category.MENACES, pinataType: "Beer Keg", pinataEmoji: "🛢️" },
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
