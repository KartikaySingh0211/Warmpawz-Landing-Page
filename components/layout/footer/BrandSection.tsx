import warmpawzLogo from "@/public/images/warmpawz-logo.svg";
import { AppLink } from "@/components/shared/AppLink";
import Image from "next/image";

const BrandSection = () => {
	return (
		<div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center lg:items-start">
			<AppLink
				href="/"
				className="flex items-center mb-2 cursor-pointer hover:opacity-80 transition-opacity"
				aria-label="Navigate to home page"
			>
				<div className="relative shrink-0 w-16 h-16">
					<Image
						src={warmpawzLogo}
						alt="Warmpawz"
						fill
						className="object-cover"
						loading="eager"
					/>
					<span className="absolute -top-1 -right-3 text-[10px] font-bold">
						TM
					</span>
				</div>
			</AppLink>
			<h3 className="text-sm font-bold text-gray-900 mb-2 text-center lg:text-left">
				Pet Care. Reimagined.
			</h3>
			<p className="text-xs text-gray-600 text-center lg:text-left">
				Warmpawz, 2025
			</p>
		</div>
	);
};

export default BrandSection;
