"use client";

import { useRef } from "react";

const FoundersStory = () => {
	const sectionRef = useRef<HTMLElement>(null);

	return (
		<section
			id="story"
			ref={sectionRef}
			className="pt-16 pb-16 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Our Story
					</h2>
					<div className="w-24 h-1 bg-[#F5A855] mx-auto rounded-full"></div>
				</div>

				<div>
					<div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-[#F5A855]">
						<div className="prose prose-lg max-w-none">
							<p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
								Warmpawz began on a cold winter night, during a quiet
								conversation among family friends — mostly pet parents. What
								started as casual discussion soon turned into shared anxiety
								about one thing: how hard it was to access reliable emergency
								care for their furry family members.
							</p>
							<p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
								As we began exploring what existed in the public domain for pet
								parents, a deeper truth emerged — a significant gap. Not just in
								emergency care, but across the entire journey of pet parenthood.
							</p>
							<p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
								We also asked ourselves another important question: If this
								journey felt overwhelming for pet parents, how difficult must it
								be for genuine pet care providers trying to reach the families
								who need them most?
							</p>
							<p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
								That question led to the idea of a Connected Ecosystem — a
								trusted pet services marketplace. A platform where pet parents
								can access verified service providers with trust, clarity and
								confidence.
							</p>
						</div>
					</div>
				</div>

				<div className="mt-32 p-8 md:p-12 bg-white rounded-2xl border-2 border-[#F5A855] text-center">
					<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
						Why Warmpawz Exists
					</h3>
					<div className="w-24 h-1 bg-[#F5A855] mx-auto rounded-full mb-8"></div>
					<p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-4">
						Pet care in India has grown but services remain fragmented.
						Knowledge is unevenly distributed, and trust is often built through
						personal networks rather than transparent systems.
					</p>
					<p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
						Warmpawz exists to bring structure without rigidity, standards
						without exclusion, and choice without confusion. We believe
						meaningful care emerges when service providers are supported to
						innovate responsibly and pet parents are guided to make informed,
						compassionate choices.
					</p>
				</div>
			</div>
		</section>
	);
};

export default FoundersStory;
