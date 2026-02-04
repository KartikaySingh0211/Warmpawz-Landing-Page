import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseMobileScrollAnimationsProps {
	mobileParentImageRef: RefObject<HTMLDivElement>;
	mobileParentButtonRef: RefObject<HTMLButtonElement>;
	mobileProviderImageRef: RefObject<HTMLDivElement>;
	mobilePhoneRef: RefObject<HTMLDivElement>;
}

export const useMobileScrollAnimations = ({
	mobileParentImageRef,
	mobileParentButtonRef,
	mobileProviderImageRef,
	mobilePhoneRef,
}: UseMobileScrollAnimationsProps) => {
	useEffect(() => {
		// Register ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		const mm = gsap.matchMedia();

		// Only apply on mobile/tablet (below lg breakpoint)
		mm.add("(max-width: 1023px)", () => {
			// Pet Parent Section - START big at top, scale DOWN as you scroll away
			if (mobileParentImageRef.current) {
				gsap.fromTo(
					mobileParentImageRef.current,
					{ scale: 1.3 }, // Start big
					{
						scale: 0.8, // End small
						scrollTrigger: {
							trigger: mobileParentImageRef.current,
							start: "top top", // Start when element reaches top
							end: "bottom top", // End when bottom of element reaches top
							scrub: true,
							// markers: true, // Uncomment for debugging
						},
					}
				);
			}

			// Pet Parent Button - Synced with image animation
			if (mobileParentButtonRef.current) {
				gsap.fromTo(
					mobileParentButtonRef.current,
					{ scale: 1.15 },
					{
						scale: 0.85,
						scrollTrigger: {
							trigger: mobileParentImageRef.current,
							start: "top top",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			// Phone Section - Scale UP when scrolling into view (like before)
			if (mobilePhoneRef.current) {
				gsap.fromTo(
					mobilePhoneRef.current,
					{ scale: 0.9, opacity: 0.7 },
					{
						scale: 1.1,
						opacity: 1,
						scrollTrigger: {
							trigger: mobilePhoneRef.current,
							start: "top 70%",
							end: "center center",
							scrub: 1,
						},
					}
				);
			}

			// Service Provider Section - Scale UP when scrolling into view (like before)
			if (mobileProviderImageRef.current) {
				gsap.fromTo(
					mobileProviderImageRef.current,
					{ scale: 0.8, opacity: 0.6 },
					{
						scale: 1.2,
						opacity: 1,
						scrollTrigger: {
							trigger: mobileProviderImageRef.current,
							start: "top 80%",
							end: "center center",
							scrub: 1,
						},
					}
				);
			}
		});

		return () => {
			mm.revert();
		};
	}, [mobileParentImageRef, mobileParentButtonRef, mobileProviderImageRef, mobilePhoneRef]);
};
