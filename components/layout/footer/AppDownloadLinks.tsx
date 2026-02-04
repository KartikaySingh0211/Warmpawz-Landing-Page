interface AppDownloadLinksProps {
	onNavigate: (path: string) => void;
}

const AppDownloadLinks = ({ onNavigate }: AppDownloadLinksProps) => {
	return (
		<div className="flex flex-col space-y-2 items-center">
			<img
				src="/images/apple.png"
				alt="Download on the App Store"
				className="w-[190px] h-auto"
				loading="eager"
			/>
			<img
				src="/images/google.png"
				alt="Get it on Google Play"
				className="w-[130px] h-auto"
				loading="eager"
			/>
		</div>
	);
};

export default AppDownloadLinks;
