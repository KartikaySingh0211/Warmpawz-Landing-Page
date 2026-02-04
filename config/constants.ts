// Design System Constants

// Colors
export const COLORS = {
	primary: "#F5A855",
	primaryHover: "#E09642",
	white: "#FFFFFF",
	black: "#000000",
	textMuted: "rgba(0, 0, 0, 0.8)",
	border: "#F5A855",
} as const;

// Gradient Backgrounds
export const GRADIENTS = {
	warm: "linear-gradient(180deg, #F69052 0%, #FAD3B5 60%, #FFF2E6 100%)",
	brandTinted: "linear-gradient(180deg, #FFF1E6 0%, #FFF8D6 45%, #FFFFFF 100%)",
	white: "#FFFFFF",
} as const;

// Breakpoints (in pixels)
export const BREAKPOINTS = {
	mobile: 768,
	tablet: 1024,
	desktop: 1280,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
	fast: 150,
	normal: 300,
	slow: 500,
	loadingDissolution: 300,
	fadeIn: 700,
	scrollDebounce: 16, // ~60fps
} as const;

// Layout Constants
export const LAYOUT = {
	navbarHeight: "pt-32",
	navbarTop: "top-4",
	navbarZIndex: "z-40",
	footerZIndex: "z-10",
} as const;

// Routes
export const ROUTES = {
	home: "/",
	about: "/about",
	services: "/services",
	blog: "/blog",
	blogArticle: "/blog/:articleId",
	newsEvents: "/news-events",
	careers: "/careers",
	policies: "/policies",
	userWalkthrough: "/user-walkthrough",
	vendorOnboarding: "/vendor-onboarding",
	notFound: "*",
} as const;

//Team Members
export const teamMembers = [
	{
		name: "Vikram Bellur",
		role: "Leader of the Pack • Chief Executive Officer",
		avatar: "VB",
		description:
			"Part strategist, part storyteller, and full-time believer in building things with heart. Vikram founded Warmpawz to reimagine pet care as something warmer, more human, and deeply responsible — bringing together pet parents and care providers into one trusted ecosystem. When he's not shaping the vision, he's usually thinking about how technology, empathy, and good design can make life better for pets and the people who love them. Vikram Bellur is an experienced business leader with a strong track record over 28 years driving growth and strategic impact across global technology and digital services.",
	},
	{
		name: "Ketan Hirani",
		role: "Architect of the Pack • Chief Product Officer",
		avatar: "KH",
		description:
			"Ketan Hirani is the architect behind the Warmpawz platform — shaping the technology that thoughtfully connects pet parents with trusted care providers. With a strong product and engineering mindset developed over 20 years, he leads the design and development of systems that prioritise reliability, ease of use, and real-world empathy. At Warmpawz, Ketan translates complex needs into simple, human-centred experiences — ensuring that every interaction between a pet parent and a provider feels seamless, secure, and intuitive. A leader who relies on his Animal Instincts (AI) to build robust scalable systems.",
	},
	{
		name: "Niranjan Delavictoire",
		role: "Voice of the Pack • Chief Marketing Officer",
		avatar: "ND",
		description:
			"Niranjan Delavictoire is a seasoned marketing and business leader with over 30 years of deep experience in shaping strategic brand narratives and driving growth across technology and services sectors. He has led direct and indirect sales, major accounts, business development and integrated marketing initiatives throughout his career. A passionate communicator with a knack for building meaningful connections, Niranjan brings this same spirit to Warmpawz — where every pet story and every service deserves thoughtful expression and trust. Outside his professional life, he's also been a devoted pet parent to a golden retriever, bringing first-hand insight into the joys and responsibilities of pet care.",
	},
	{
		name: "Sidharth Rozario",
		role: "Guardian of the Pack • The Angel",
		avatar: "SR",
		description:
			"A trusted guide behind Warmpawz, Sidharth brings strategic perspective, industry experience, and a pet parent's heart to the journey. As an angel investor, he supports the platform's vision of building a thoughtful, dependable ecosystem where pet parents and care providers connect with confidence and care.",
	},
	{
		name: "Khushee Singhal",
		role: "Shaper of the Journey • UI/UX Developer",
		avatar: "KS",
		description:
			"The one obsessed with how everything feels. Khushee designs the Warmpawz experience so pet parents move through the platform with ease, clarity, and a little delight along the way. A pet parent herself, she brings empathy into every screen, flow, and interaction — making sure good design always puts paws first.",
	},
	{
		name: "Shivang Tiwari",
		role: "Crafter of the Code • Software Engineer",
		avatar: "ST",
		description:
			"Turning ideas into reliable, working reality. Shivang writes the code that powers Warmpawz behind the scenes — building systems that are clean, dependable, and built to scale. If something just works the way it should, chances are Shivang had a hand in it.",
	},
	{
		name: "Kartikay Singh",
		role: "Builder at the Front • Platform Engineering Intern",
		avatar: "KS",
		description:
			"Focused on what users see, click, and experience. Kartikay works on the front-end code that brings designs to life — making sure the platform looks good, feels smooth, and behaves exactly as intended across screens and devices.",
	},
	{
		name: "Abhayankar",
		role: "Logic Tamer • Platform Engineering Intern",
		avatar: "AB",
		description:
			"The one making sure everything adds up. Abhayankar builds and tests the business logic that keeps the platform honest and reliable — quietly ensuring that what happens behind the scenes is just as thoughtful as what users experience up front.",
	},
	{
		name: "Shreesha",
		role: "Guardian of Quality • Software Engineer",
		avatar: "SH",
		description:
			"The final line of defence (and the calm voice of reason). Shreesha tests the code, finds the cracks, and helps smooth the rough edges — making sure Warmpawz is stable, trustworthy, and ready for the real world before it ever reaches pet parents.",
	},
];

// Video URLs
export const VIDEOS = {
	user: {
		adoption: "/videos/adoption-v2.mp4",
		veterinary: "/videos/petsVET_1.mp4",
		training: "/videos/pet-training.mp4",
		boarding: "/videos/pet-boarding-new.mp4",
		products: "/videos/pawsome-mart.mp4",
		sunset: "/videos/pet-sunset.mp4",
	},
	vendor: {
		step1: "/videos/step1.mov",
		step2: "/videos/step2.mov",
		step3: "/videos/step3.mov",
		step4: "/videos/step4.mov",
		step5: "/videos/step5.mov",
		step6: "/videos/step6.mov",
		step7: "/videos/step7.mov",
	},
	loading: {
		desktop: "/videos/loading.mov",
		mobile: "/videos/loading phone.mov",
	},
} as const;

// Scroll Thresholds
export const SCROLL = {
	navbarShowThreshold: 50,
	navbarHideThreshold: 100,
} as const;

// Session Storage Keys
export const STORAGE_KEYS = {
	hasShownLoading: "hasShownLoading",
} as const;

export const NavLinks = [
	{ name: "Home", link: "/", icon: "home" },
	{ name: "Services", link: "/services" },
	{ name: "Blog", link: "/blog" },
	{ name: "News & Events", link: "/news-events" },
];
