"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { teamMembers } from "@/config/constants";

const MeetTheTeam = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Initialize mockup positions on mount
	useEffect(() => {
		mockupRefs.current.forEach((mockup, index) => {
			if (!mockup) return;

			if (index === currentIndex) {
				// ACTIVE (CENTER / FRONT)
				gsap.set(mockup, {
					x: 0,
					scale: 1,
					opacity: 1,
					z: 0,
					filter: "blur(0px)",
					force3D: true,
				});
			} else {
				// INACTIVE (BEHIND FRAME)
				gsap.set(mockup, {
					x: index > currentIndex ? 120 : -120,
					scale: 0.9,
					opacity: 0,
					z: -200,
					filter: "blur(2px)",
					force3D: true,
				});
			}
		});
	}, [currentIndex]);

	// Depth-swap phone mockup carousel with behind-frame replacement animation
	const transitionToIndex = (
		nextIndex: number,
		forceDirection?: "next" | "prev",
	) => {
		if (isAnimating || nextIndex === currentIndex) return;
		if (nextIndex < 0 || nextIndex >= teamMembers.length) return;

		setIsAnimating(true);
		setExpandedIndex(null);

		const currentMockup = mockupRefs.current[currentIndex];
		const nextMockup = mockupRefs.current[nextIndex];

		if (!currentMockup || !nextMockup) return;

		// Force direction based on button clicked, not index comparison
		const isNext = forceDirection === "next";
		const timeline = gsap.timeline({
			onComplete: () => {
				setCurrentIndex(nextIndex);
				setIsAnimating(false);
			},
		});

		// Stage next mockup in incoming position (behind frame)
		gsap.set(nextMockup, {
			x: isNext ? 120 : -120,
			scale: 0.9,
			opacity: 0,
			z: -200,
			filter: "blur(2px)",
			force3D: true,
		});

		// Animate current mockup → outgoing (behind frame)
		timeline.to(
			currentMockup,
			{
				x: isNext ? -120 : 120,
				scale: 0.9,
				opacity: 0,
				z: -200,
				filter: "blur(2px)",
				duration: 0.9,
				ease: "power3.inOut",
				force3D: true,
			},
			0,
		);

		// Animate next mockup → active (center, front)
		timeline.to(
			nextMockup,
			{
				x: 0,
				scale: 1,
				opacity: 1,
				z: 0,
				filter: "blur(0px)",
				duration: 0.9,
				ease: "power3.inOut",
				force3D: true,
			},
			0,
		);
	};

	const nextSlide = () => {
		const nextIndex = (currentIndex + 1) % teamMembers.length;
		transitionToIndex(nextIndex, "next");
	};

	const prevSlide = () => {
		const prevIndex =
			(currentIndex - 1 + teamMembers.length) % teamMembers.length;
		transitionToIndex(prevIndex, "prev");
	};

	const goToSlide = (index: number) => {
		// Determine direction based on shortest path
		const direction = index > currentIndex ? "next" : "prev";
		transitionToIndex(index, direction);
	};

	return (
		<section id="team" className="py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Meet Our Team
					</h2>
					<div className="w-24 h-1 bg-[#F5A855] mx-auto rounded-full mb-6"></div>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Together, they're building Warmpawz the way a pack should — with
						trust, warmth, and a whole lot of heart!
					</p>
				</div>

				{/* Depth-Swap Phone Mockup Carousel */}
				<div className="flex flex-col items-center">
					{/* Mockup Stage with External Navigation */}
					<div className="flex items-center gap-4 sm:gap-6 md:gap-8">
						{/* Left Arrow - External */}
						<button
							onClick={prevSlide}
							disabled={isAnimating}
							className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#F5A855]"
							aria-label="Previous team member"
						>
							<svg
								className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#F5A855]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						{/* Phone Frame */}
						<div
							className="relative w-60 sm:w-65 md:w-70 lg:w-[320px]"
							style={{
								perspective: "1200px",
								transformStyle: "preserve-3d",
							}}
						>
							{/* Phone Frame (Static) */}
							<div className="relative bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-1.5 sm:p-2 shadow-2xl z-10">
								<div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
									{/* Dynamic Island / Notch */}
									<div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-gray-900 rounded-full z-20" />

									{/* Mockup Layer (All mockups rendered at once) */}
									<div
										className="absolute inset-0"
										style={{
											transformStyle: "preserve-3d",
										}}
									>
										{teamMembers.map((member, index) => (
											<div
												key={index}
												ref={(el) => (mockupRefs.current[index] = el)}
												data-index={index}
												className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8"
												style={{
													transformStyle: "preserve-3d",
												}}
											>
												{/* Default View: Avatar, Name, Role, Read More */}
												{expandedIndex !== index && (
													<div className="flex flex-col items-center justify-center h-full">
														{/* Avatar */}
														<div className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full bg-[#F5A855] flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 shadow-lg">
															{member.avatar}
														</div>

														{/* Name and Role - Centered */}
														<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 text-center px-2">
															{member.name}
														</h3>
														<p className="text-[#F5A855] font-semibold text-sm sm:text-base md:text-lg mb-6 text-center px-2">
															{member.role}
														</p>

														{/* Read More Button - Left aligned below designation */}
														<button
															onClick={() => setExpandedIndex(index)}
															className="text-[#F5A855] text-sm font-semibold hover:text-[#E09642] transition-colors flex items-center gap-1"
														>
															Read More
															<svg
																className="w-4 h-4"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 5l7 7-7 7"
																/>
															</svg>
														</button>
													</div>
												)}
											</div>
										))}
									</div>

									{/* Full Screen Overlay for Expanded Content */}
									<AnimatePresence>
										{expandedIndex !== null && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.4, ease: "easeInOut" }}
												className="absolute inset-0 bg-white z-30 flex flex-col p-6 sm:p-8"
											>
												{/* View Less Arrow - Top Left */}
												<button
													onClick={() => setExpandedIndex(null)}
													className="absolute top-4 left-4 text-[#F5A855] hover:text-[#E09642] transition-colors"
													aria-label="Close details"
												>
													<svg
														className="w-6 h-6"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15 19l-7-7 7-7"
														/>
													</svg>
												</button>

												{/* Scrollable Content */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 10 }}
													transition={{ duration: 0.3, delay: 0.1 }}
													className="flex-1 overflow-y-auto scrollbar-hide pt-8"
												>
													{/* Avatar */}
													<div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#F5A855] flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-3 shadow-lg mx-auto">
														{teamMembers[expandedIndex].avatar}
													</div>

													{/* Name */}
													<h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 text-center">
														{teamMembers[expandedIndex].name}
													</h3>

													{/* Role */}
													<p className="text-[#F5A855] font-semibold text-xs sm:text-sm mb-4 text-center">
														{teamMembers[expandedIndex].role}
													</p>

													{/* Description */}
													<p className="text-gray-700 text-left leading-relaxed text-xs sm:text-sm px-2">
														{teamMembers[expandedIndex].description}
													</p>
												</motion.div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>

							{/* Side buttons */}
							<div className="absolute top-20 sm:top-24 md:top-28 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-6 sm:h-8 bg-gray-900 rounded-l-sm z-10" />
							<div className="absolute top-32 sm:top-36 md:top-44 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-8 sm:h-12 bg-gray-900 rounded-l-sm z-10" />
							<div className="absolute top-32 sm:top-36 md:top-44 -right-0.5 sm:-right-1 w-0.5 sm:w-1 h-10 sm:h-16 bg-gray-900 rounded-r-sm z-10" />
						</div>

						{/* Right Arrow - External */}
						<button
							onClick={nextSlide}
							disabled={isAnimating}
							className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#F5A855]"
							aria-label="Next team member"
						>
							<svg
								className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-[#F5A855]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					{/* Dots Indicator */}
					<div className="flex gap-2 mt-8">
						{teamMembers.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								disabled={isAnimating}
								className={`h-3 rounded-full transition-all disabled:cursor-not-allowed ${
									currentIndex === index
										? "bg-[#F5A855] w-8"
										: "bg-gray-300 hover:bg-gray-400 w-3"
								}`}
								aria-label={`Go to team member ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MeetTheTeam;
