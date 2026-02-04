import Image, { StaticImageData } from "next/image";
import { forwardRef } from "react";

interface MobileSectionProps {
	title: string;
	image: StaticImageData | string;
	navigateTo: string;
	onNavigate: (path: string) => void;
	imageRef?: React.RefObject<HTMLDivElement>;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	className?: string;
}

const MobileSection = forwardRef<HTMLDivElement, MobileSectionProps>(
	(
		{
			title,
			image,
			navigateTo,
			onNavigate,
			imageRef,
			buttonRef,
			className = "",
		},
		ref,
	) => {
		return (
			<div
				className={`flex flex-col items-center relative ${className}`}
				ref={ref}
			>
				{/* Decorative Image */}
				<div
					ref={imageRef}
					className="relative shrink-0 z-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-end justify-center mb-4"
				>
					<Image
						src={image}
						alt="Warmpawz Feature"
						className="w-full h-full object-contain object-bottom"
						aria-hidden="true"
						loading="eager"
					/>
				</div>
				{/* Button */}
				<button
					ref={buttonRef}
					onClick={() => onNavigate(navigateTo)}
					className="px-10 py-5 sm:px-12 sm:py-6 md:px-14 md:py-7 bg-[#f69052] text-black rounded-full text-lg sm:text-xl md:text-2xl font-bold font-display shadow-lg whitespace-nowrap hover:bg-[#E09642] transition-colors"
				>
					{title}
				</button>
			</div>
		);
	},
);

MobileSection.displayName = "MobileSection";

export default MobileSection;
