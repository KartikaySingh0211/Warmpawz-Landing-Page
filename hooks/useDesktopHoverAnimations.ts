import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface UseDesktopHoverAnimationsProps {
	hoveredSection: number | null;
	petParentImageRef: RefObject<HTMLDivElement>;
	serviceProviderImageRef: RefObject<HTMLDivElement>;
	petParentButtonRef: RefObject<HTMLButtonElement>;
	serviceProviderButtonRef: RefObject<HTMLButtonElement>;
	centerPhoneRef: RefObject<HTMLDivElement>;
}

export const useDesktopHoverAnimations = ({
	hoveredSection,
	petParentImageRef,
	serviceProviderImageRef,
	petParentButtonRef,
	serviceProviderButtonRef,
	centerPhoneRef,
}: UseDesktopHoverAnimationsProps) => {
	useEffect(() => {
		if (hoveredSection === 0) {
			// Pet Parent section hovered
			gsap.to(petParentImageRef.current, {
				scale: 1.4,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(petParentButtonRef.current, {
				y: 20,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(centerPhoneRef.current, {
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
			});
		} else if (hoveredSection === 1) {
			// Service Provider section hovered
			gsap.to(serviceProviderImageRef.current, {
				scale: 1.4,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(serviceProviderButtonRef.current, {
				y: 20,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(centerPhoneRef.current, {
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
			});
		} else if (hoveredSection === 2) {
			// Center phone hovered - reset sections and scale phone
			gsap.to([petParentImageRef.current, serviceProviderImageRef.current], {
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to([petParentButtonRef.current, serviceProviderButtonRef.current], {
				y: 0,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(centerPhoneRef.current, {
				scale: 1.15,
				duration: 0.4,
				ease: "power2.out",
			});
		} else {
			// No section hovered - reset all
			gsap.to([petParentImageRef.current, serviceProviderImageRef.current], {
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to([petParentButtonRef.current, serviceProviderButtonRef.current], {
				y: 0,
				duration: 0.4,
				ease: "power2.out",
			});
			gsap.to(centerPhoneRef.current, {
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
			});
		}
	}, [
		hoveredSection,
		petParentImageRef,
		serviceProviderImageRef,
		petParentButtonRef,
		serviceProviderButtonRef,
		centerPhoneRef,
	]);
};
