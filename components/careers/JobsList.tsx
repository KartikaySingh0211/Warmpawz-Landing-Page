"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import { jobs } from "./jobsData";

const JobsList = () => {
	const [expandedJob, setExpandedJob] = useState<number | null>(null);

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Open Roles
					</h2>
					<p className="text-gray-600">
						We hire for mindset first, skills second.
					</p>
				</div>

				<div className="space-y-6 max-w-4xl mx-auto">
					{jobs.map((job) => (
						<JobCard
							key={job.id}
							job={job}
							isExpanded={expandedJob === job.id}
							onToggle={() =>
								setExpandedJob(expandedJob === job.id ? null : job.id)
							}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default JobsList;
