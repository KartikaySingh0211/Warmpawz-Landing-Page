import { AppLink } from "@/components/shared/AppLink";

const LegalBar = () => {
	return (
		<div className="w-full bg-[#f69052] py-4 pb-6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
					<p className="text-sm text-white">
						© 2025 Warmpawz All rights reserved.
					</p>
					<div className="flex space-x-6">
						<AppLink
							href="/about"
							className="text-sm text-white hover:text-gray-200 transition-colors"
						>
							Terms of Service
						</AppLink>
						<AppLink
							href="/about"
							className="text-sm text-white hover:text-gray-200 transition-colors"
						>
							Privacy Policy
						</AppLink>
						<AppLink
							href="/about"
							className="text-sm text-white hover:text-gray-200 transition-colors"
						>
							Cookies
						</AppLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LegalBar;
