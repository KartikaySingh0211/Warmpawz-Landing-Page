"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: NodeJS.Timeout | null = null;

type Card = {
	id: number;
	name: string;
	designation: string;
	content: React.ReactNode;
};

export const CardStack = ({
	items,
	offset,
	scaleFactor,
}: {
	items: Card[];
	offset?: number;
	scaleFactor?: number;
}) => {
	const CARD_OFFSET = offset || 10;
	const SCALE_FACTOR = scaleFactor || 0.06;
	const [cards, setCards] = useState<Card[]>(items);

	useEffect(() => {
		startFlipping();

		return () => clearInterval(interval);
	}, []);
	const startFlipping = () => {
		interval = setInterval(() => {
			setCards((prevCards: Card[]) => {
				const newArray = [...prevCards]; // create a copy of the array
				newArray.unshift(newArray.pop()!); // move the last element to the front
				return newArray;
			});
		}, 5000);
	};

	return (
		<div className="relative h-[450px] md:h-[400px] lg:h-[420px] w-full">
			{cards.map((card, index) => {
				return (
					<motion.div
						key={card.id}
						className="absolute bg-white h-[450px] md:h-[400px] lg:h-[420px] w-full rounded-3xl p-6 lg:p-8 shadow-xl border-2 border-[#F5A855] overflow-hidden flex flex-col"
						style={{
							transformOrigin: "top center",
						}}
						animate={{
							top: index * -CARD_OFFSET,
							scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
							zIndex: cards.length - index, //  decrease z-index for the cards that are behind
						}}
					>
						<div className="font-normal text-neutral-700 dark:text-neutral-200">
							{card.content}
						</div>
					</motion.div>
				);
			})}
		</div>
	);
};
