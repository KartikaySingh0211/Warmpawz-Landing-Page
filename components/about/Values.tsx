"use client";

import { useRef } from "react";
import { CardStack } from "@/components/ui/card-stack";
import Image from "next/image";

const Values = () => {
	const sectionRef = useRef<HTMLElement>(null);

	const values = [
		{
			title: "Compassion",
			description:
				"We place the wellbeing of pets at the heart of every decision we make.",
			icon: "/images/Compassion.png",
		},
		{
			title: "Trust",
			description:
				"We build confidence through verified partners, transparent choices, and accountable care.",
			icon: "/images/Trust.png",
		},
		{
			title: "Convenience",
			description:
				"We simplify pet care by bringing trusted services together in one connected experience.",
			icon: "/images/Convenience.png",
		},
		{
			title: "Community",
			description:
				"We grow stronger by supporting a shared ecosystem of pet parents and care professionals.",
			icon: "/images/Community.png",
		},
		{
			title: "Warmth",
			description:
				"We lead with empathy, care, and a human touch in every interaction.",
			icon: "/images/Warmth.png",
		},
	];

	// Card stack items for both mobile and desktop
	const cardStackItems = values.map((value, index) => ({
		id: index,
		name: "",
		designation: "",
		content: (
			<div className="text-center h-full flex flex-col items-center justify-center px-4">
				<div className="mb-4 lg:mb-4 w-40 h-40 md:w-36 md:h-36 lg:w-56 lg:h-56 mx-auto relative shrink-0">
					<Image
						src={value.icon}
						alt={value.title}
						fill
						className="object-cover"
						loading="eager"
					/>
				</div>
				<h3 className="text-3xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-3">
					{value.title}
				</h3>
				<p className="text-xl md:text-lg lg:text-base text-gray-700 leading-relaxed font-medium">
					{value.description}
				</p>
			</div>
		),
	}));

	return (
		<section
			id="values"
			ref={sectionRef}
			className="py-16 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-6xl mx-auto">
				{/* Header outside the card stack */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Our Values
					</h2>
					<div className="w-24 h-1 bg-[#F5A855] mx-auto rounded-full"></div>
				</div>

				{/* Card Stack for all screen sizes */}
				<div className="flex items-center justify-center px-4">
					<div className="w-full max-w-xl">
						<CardStack items={cardStackItems} offset={10} scaleFactor={0.06} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Values;
