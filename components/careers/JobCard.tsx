"use client";

import { FC, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";
import { Job } from "./types";

interface JobCardProps {
	job: Job;
	isExpanded: boolean;
	onToggle: () => void;
}

const JobCard: FC<JobCardProps> = ({ job, isExpanded, onToggle }) => {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isExpanded && cardRef.current) {
			// Scroll to the top of the card when it expands
			cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [isExpanded]);

	return (
		<div
			ref={cardRef}
			className="bg-white rounded-2xl shadow-lg border-2 border-[#F5A855] overflow-hidden transition-all duration-300 hover:shadow-xl"
		>
			{/* Job Card Header */}
			<div className="p-6">
				{/* Tags */}
				<div className="flex flex-wrap gap-2 mb-4">
					{job.tags.map((tag, index) => (
						<span
							key={index}
							className="px-3 py-1 bg-[#FFE8D6] text-gray-700 text-sm rounded-full font-medium"
						>
							{tag}
						</span>
					))}
				</div>

				{/* Title */}
				<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
					{job.title} <span className="text-gray-600">{job.subtitle}</span>
				</h3>

				{/* Meta Info */}
				<div className="flex flex-wrap gap-4 text-gray-600 mb-4">
					<div className="flex items-center gap-2">
						<MapPin className="w-4 h-4" />
						<span>{job.location}</span>
					</div>
					<div className="flex items-center gap-2">
						<Briefcase className="w-4 h-4" />
						<span>{job.type}</span>
					</div>
				</div>

				{/* Summary */}
				<p className="text-gray-700 mb-4">{job.summary}</p>

				{/* Expand Button */}
				<button
					onClick={onToggle}
					className="flex items-center gap-2 text-[#F5A855] font-semibold hover:text-[#E09642] transition-colors"
				>
					{isExpanded ? "Hide Details" : "View Role"}
					<ChevronDown
						className={`w-5 h-5 transition-transform ${
							isExpanded ? "rotate-180" : ""
						}`}
					/>
				</button>
			</div>

			{/* Expanded Content */}
			{isExpanded && (
				<div className="border-t-2 border-[#F5A855] p-6 bg-gradient-to-b from-[#FFE8D6] to-white">
					<div className="grid md:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="md:col-span-2 space-y-6">
							{job.techStack && (
								<div>
									<h4 className="text-xl font-bold text-gray-900 mb-3">
										Tech Stack:
									</h4>
									<div className="flex flex-wrap gap-2">
										{job.techStack.map((tech, index) => (
											<span
												key={index}
												className="px-3 py-1 bg-white border-2 border-[#F5A855] text-gray-700 text-sm rounded-lg font-medium"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							)}

							{job.sections.map((section, index) => (
								<div key={index}>
									<h4 className="text-xl font-bold text-gray-900 mb-3">
										{section.title}
									</h4>
									<ul className="space-y-2">
										{section.content.map((item, idx) => (
											<li
												key={idx}
												className="flex items-start gap-2 text-gray-700"
											>
												<span className="text-[#F5A855] mt-1">•</span>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							))}

							<div>
								<h4 className="text-xl font-bold text-gray-900 mb-3">
									What&apos;s in it for you?
								</h4>
								<ul className="space-y-2">
									{job.benefits.map((benefit, idx) => (
										<li
											key={idx}
											className="flex items-start gap-2 text-gray-700"
										>
											<span className="text-[#F5A855] mt-1">•</span>
											<span>{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Sticky Info Panel */}
						<div className="md:col-span-1">
							<div className="bg-white rounded-2xl p-6 border-2 border-[#F5A855] sticky top-32">
								<h4 className="font-bold text-gray-900 mb-4">Role Details</h4>
								<div className="space-y-3 text-sm mb-6">
									<div>
										<span className="text-gray-600">Type:</span>
										<p className="font-semibold text-gray-900">{job.type}</p>
									</div>
									<div>
										<span className="text-gray-600">Location:</span>
										<p className="font-semibold text-gray-900">
											{job.location}
										</p>
									</div>
								</div>
								<a
									href={`mailto:${job.email}`}
									className="block w-full bg-[#F5A855] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#E09642] transition-colors"
								>
									Apply Now →
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobCard;
