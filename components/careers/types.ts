export interface JobSection {
	title: string;
	content: string[];
}

export interface Job {
	id: number;
	title: string;
	subtitle: string;
	company: string;
	location: string;
	type: string;
	tags: string[];
	summary: string;
	email: string;
	techStack?: string[];
	sections: JobSection[];
	benefits: string[];
}
