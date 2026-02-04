import {
	FoundersStory,
	Mission,
	Vision,
	Values,
	MeetTheTeam,
} from "@/components/about";

const AboutUsPage = () => {
	return (
		<div className="mt-28">
			<FoundersStory />
			<Mission />
			<Vision />
			<Values />
			<MeetTheTeam />
		</div>
	);
};

export default AboutUsPage;
