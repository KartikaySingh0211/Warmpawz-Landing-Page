import { Job } from "./types";

export const jobs: Job[] = [
	{
		id: 1,
		title: "Operations & Growth Intern",
		subtitle: "(Yes, That's a Real Job)",
		company: "Whistlefetch Technologies Private Limited",
		location: "Bengaluru",
		type: "Internship",
		tags: ["Internship", "Bengaluru", "Field + Ops"],
		summary:
			"Learn how a real startup runs — not from slides, but from the ground.",
		email: "vikramb@warmpawz.com",
		sections: [
			{
				title: "Who are we looking for?",
				content: [
					"Love being out and about",
					"Are comfortable around animals (fur, slobber, paws — all included)",
					"Can speak and write confidently in English",
					"Enjoy meeting people and figuring things out on the fly",
					"Are okay wearing many hats (observer today, doer tomorrow)",
				],
			},
			{
				title: "What will you learn & do?",
				content: [
					"Accompany the team to meet pet service providers across the city",
					"Support onboarding of vets, groomers, walkers, and other pet professionals",
					"Assist with basic admin tasks and documentation",
					"Shadow sales and partnership conversations",
					"Coordinate with CAs and lawyers (licenses, paperwork, compliance basics)",
					"Learn how operations, growth, and partnerships work in an early-stage startup",
				],
			},
			{
				title: "What you must have?",
				content: [
					"Willingness to travel locally (two-wheeler preferred)",
					"Comfort working around animals",
					"Clear spoken & written English",
					"Basic organisational and coordination skills",
					"A strong 'I'm here to learn' mindset",
				],
			},
		],
		benefits: [
			"Stipend per month (based on duration & involvement)",
			"Exposure to operations, sales, compliance & partnerships",
			"Strong chance to convert into a full-time role",
			"Work with a purpose-driven pet services platform",
		],
	},
	{
		id: 2,
		title: "Full Stack Software Developer",
		subtitle: "(AWS Serverless)",
		company: "Whistlefetch Technologies Pvt. Ltd.",
		location: "Bengaluru / Hybrid",
		type: "Full Time",
		tags: ["Full Time", "Bengaluru", "Tech"],
		summary:
			"Build scalable features and own products end-to-end in our serverless stack.",
		email: "ketanh@warmpawz.com",
		techStack: ["React.js", "Node.js", "AWS Lambda", "Aurora DB", "Supabase"],
		sections: [
			{
				title: "What you'll do:",
				content: [
					"Build scalable frontend and backend features (Node + React)",
					"Develop AWS Lambda APIs and serverless workflows",
					"Integrate databases, auth, payments, and third-party services",
					"Own features end-to-end — build, deploy, and improve",
					"Work closely with product and design teams",
				],
			},
			{
				title: "What are we looking for?",
				content: [
					"3–7 years full-stack development experience",
					"Strong hands-on AWS serverless experience",
					"Proficiency in Node.js, React, and modern frontend practices",
					"Experience with payments, deployments, and integrations",
					"Startup mindset with a bias for ownership",
				],
			},
		],
		benefits: [
			"High ownership",
			"Clean tech stack",
			"Fast shipping",
			"Real impact in a growing pet-care ecosystem",
		],
	},
];
