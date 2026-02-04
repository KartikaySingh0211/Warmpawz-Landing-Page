import { forwardRef } from "react";

interface PhoneMockupCenterProps {
	variant?: "mobile" | "desktop";
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const PhoneMockupCenter = forwardRef<HTMLDivElement, PhoneMockupCenterProps>(
	({ variant = "mobile", onMouseEnter, onMouseLeave }, ref) => {
		const isMobile = variant === "mobile";

		return (
			<div
				className={
					isMobile
						? "relative w-40 sm:w-44 md:w-48 aspect-[9/19.5] bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl z-10"
						: "relative w-36 xl:w-40 2xl:w-44 aspect-[9/19.5] bg-gray-900 rounded-[1.5rem] xl:rounded-[2rem] p-1 xl:p-1.5 shadow-2xl"
				}
				ref={ref}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{/* Phone inner bezel */}
				<div
					className={
						isMobile
							? "relative bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden w-full h-full flex items-center justify-center"
							: "relative bg-white rounded-[1rem] xl:rounded-[1.5rem] overflow-hidden w-full h-full flex items-center justify-center"
					}
				>
					{/* Dynamic Island / Notch */}
					<div
						className={
							isMobile
								? "absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-14 sm:w-18 md:w-20 h-3 sm:h-4 md:h-5 bg-gray-900 rounded-full z-10"
								: "absolute top-1.5 xl:top-2 left-1/2 -translate-x-1/2 w-12 xl:w-16 2xl:w-18 h-3 xl:h-4 bg-gray-900 rounded-full z-10"
						}
					/>

					{/* Warmpawz Heading Inside Phone */}
					<div
						className={
							isMobile
								? "flex flex-col items-center justify-center text-center px-3 sm:px-4"
								: "flex flex-col items-center justify-center text-center px-2 xl:px-3"
						}
					>
						<h1
							className={
								isMobile
									? "text-xl sm:text-2xl md:text-3xl font-bold text-black font-display mb-1 sm:mb-2"
									: "text-lg xl:text-xl 2xl:text-2xl font-bold text-black font-display mb-1"
							}
						>
							Warmpawz
						</h1>
						<p
							className={
								isMobile
									? "text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-1"
									: "text-xs xl:text-xs 2xl:text-sm text-gray-600 font-medium mb-1"
							}
						>
							Pet Care. Reimagined.
						</p>
						<p
							className={
								isMobile
									? "text-xs sm:text-sm font-semibold text-[#f69052]"
									: "text-[10px] xl:text-xs font-semibold text-[#f69052]"
							}
						>
							Download Now
						</p>
					</div>
				</div>

				{/* Side buttons */}
				{isMobile ? (
					<>
						<div className="absolute top-14 sm:top-16 md:top-18 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-5 sm:h-6 bg-gray-900 rounded-l-sm" />
						<div className="absolute top-20 sm:top-24 md:top-28 -left-0.5 sm:-left-1 w-0.5 sm:w-1 h-7 sm:h-10 bg-gray-900 rounded-l-sm" />
						<div className="absolute top-20 sm:top-24 md:top-28 -right-0.5 sm:-right-1 w-0.5 sm:w-1 h-9 sm:h-12 bg-gray-900 rounded-r-sm" />
					</>
				) : (
					<>
						<div className="absolute top-12 xl:top-14 2xl:top-16 -left-0.5 w-0.5 h-4 xl:h-6 bg-gray-900 rounded-l-sm" />
						<div className="absolute top-16 xl:top-20 2xl:top-24 -left-0.5 w-0.5 h-6 xl:h-8 bg-gray-900 rounded-l-sm" />
						<div className="absolute top-16 xl:top-20 2xl:top-24 -right-0.5 w-0.5 h-8 xl:h-10 bg-gray-900 rounded-r-sm" />
					</>
				)}
			</div>
		);
	}
);

PhoneMockupCenter.displayName = "PhoneMockupCenter";

export default PhoneMockupCenter;
