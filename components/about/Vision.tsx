"use client";

import { useRef } from "react";

const Vision = () => {
	const sectionRef = useRef<HTMLElement>(null);

	return (
		<section
			id="vision"
			ref={sectionRef}
			className="py-16 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center">
					<div>
						<div className="bg-white rounded-3xl p-12 md:p-16 shadow-lg border-2 border-[#F5A855]">
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
								Our Vision
							</h2>
							<div className="w-24 h-1 bg-[#F5A855] mx-auto rounded-full mb-12"></div>
							<p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
								A future where pet care is trusted, connected, and
								community-driven — enriching the lives of pets, their families,
								and the people who care for them.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Vision;
