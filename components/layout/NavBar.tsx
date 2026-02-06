"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import warmpawzLogo from "@/public/images/warmpawz-logo.svg";
import { SCROLL, STORAGE_KEYS } from "@/config/constants";
import { AppLink } from "../shared/AppLink";
import Image from "next/image";

const Navbar = () => {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	
	// Initialize loading state based on pathname and sessionStorage
	const [isLoading, setIsLoading] = useState(() => {
		if (typeof window === "undefined") return false;
		if (pathname === "/") {
			const hasShownLoading = sessionStorage.getItem(
				STORAGE_KEYS.hasShownLoading,
			);
			return hasShownLoading !== "true";
		}
		return false;
	});

	const isActive = (path: string) => {
		return pathname === path;
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	// Check if loading animation is active (only on home page)
	useEffect(() => {
		if (pathname === "/" && isLoading) {
			// Check periodically if loading is done
			const interval = setInterval(() => {
				const updatedValue = sessionStorage.getItem(
					STORAGE_KEYS.hasShownLoading,
				);
				if (updatedValue === "true") {
					setIsLoading(false);
					clearInterval(interval);
				}
			}, 100);
			return () => clearInterval(interval);
		}
	}, [pathname, isLoading]);

	// Handle scroll to show/hide navbar
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY < SCROLL.navbarShowThreshold) {
				// Always show at top with larger threshold
				setIsVisible(true);
			} else if (
				currentScrollY > lastScrollY &&
				currentScrollY > SCROLL.navbarHideThreshold
			) {
				// Scrolling down - hide navbar (only after scrolling past threshold)
				setIsVisible(false);
			} else if (currentScrollY < lastScrollY) {
				// Scrolling up - show navbar
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		// Debounce scroll events for smoother performance
		let ticking = false;
		const debouncedHandleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", debouncedHandleScroll);
		};
	}, [lastScrollY]);

	// Handle body scroll when menu opens/closes
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	// Don't render navbar during loading animation
	if (isLoading) {
		return null;
	}

	return (
		<>
			<nav
				className={`fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-40 bg-white rounded-full shadow-lg border border-gray-100 transition-all duration-300 ease-in-out ${
					isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
				}`}
			>
				<div className="px-6">
					<div className="flex justify-start items-center gap-12 h-20">
						{/* Logo */}
						<div className="shrink-0">
							<AppLink
								href="/"
								className="flex items-center hover:opacity-80 h-16 w-16 transition-opacity relative shrink-0"
							>
								<Image
									src={warmpawzLogo}
									alt="Warmpawz"
									loading="eager"
									fill
									className="object-cover"
								/>
								<span className="absolute -top-1 -right-3 text-[10px] font-bold">
									TM
								</span>
							</AppLink>
						</div>

						{/* Center Navigation Links */}
						<div className="hidden md:flex items-center space-x-8">
							<AppLink
								href="/services"
								className={`px-4 py-2 text-sm font-semibold transition-colors ${
									isActive("/services")
										? "text-[#f69052]"
										: "text-gray-700 hover:text-[#f69052]"
								}`}
							>
								SERVICES
							</AppLink>
							<AppLink
								href="/blog"
								className={`px-4 py-2 text-sm font-semibold transition-colors ${
									isActive("/blog")
										? "text-[#f69052]"
										: "text-gray-700 hover:text-[#f69052]"
								}`}
							>
								BLOG
							</AppLink>
							<AppLink
								href="/news-events"
								className={`px-4 py-2 text-sm font-semibold transition-colors ${
									isActive("/news-events")
										? "text-[#f69052]"
										: "text-gray-700 hover:text-[#f69052]"
								}`}
							>
								NEWS & EVENTS
							</AppLink>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden ml-auto">
							<button
								type="button"
								onClick={toggleMobileMenu}
								className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F5A855] transition-colors"
								aria-expanded={isMobileMenuOpen}
							>
								<span className="sr-only">
									{isMobileMenuOpen ? "Close main menu" : "Open main menu"}
								</span>
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Fixed Overlay Drawer - Always rendered, never unmounted */}
			<div className="md:hidden">
				{/* Backdrop */}
				<div
					className="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-200 ease-out"
					style={{
						opacity: isMobileMenuOpen ? 1 : 0,
						pointerEvents: isMobileMenuOpen ? "auto" : "none",
					}}
					onClick={closeMobileMenu}
				/>

				{/* Drawer Panel */}
				<div
					className="fixed top-0 right-0 h-screen bg-white shadow-xl z-50"
					style={{
						width: "80vw",
						maxWidth: "360px",
						transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
						opacity: isMobileMenuOpen ? 1 : 0,
						pointerEvents: isMobileMenuOpen ? "auto" : "none",
						transition:
							"transform 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease-out",
					}}
					role="navigation"
					aria-label="Mobile navigation menu"
				>
					{/* Close Button */}
					<div className="flex justify-end p-4">
						<button
							onClick={closeMobileMenu}
							className="p-2 rounded-full hover:bg-gray-100 transition-colors"
							aria-label="Close menu"
						>
							<svg
								className="h-6 w-6 text-gray-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Navigation Items */}
					<div className="px-6 py-4 space-y-4">
						<AppLink
							href="/services"
							className={`block w-full text-left px-4 py-4 rounded-lg text-lg font-semibold transition-colors ${
								isActive("/services")
									? "text-[#f69052] bg-[#F5A855]/10"
									: "text-gray-700 hover:text-[#f69052] hover:bg-gray-50"
							}`}
						>
							SERVICES
						</AppLink>
						<AppLink
							href="/blog"
							className={`block w-full text-left px-4 py-4 rounded-lg text-lg font-semibold transition-colors ${
								isActive("/blog")
									? "text-[#f69052] bg-[#F5A855]/10"
									: "text-gray-700 hover:text-[#f69052] hover:bg-gray-50"
							}`}
						>
							BLOG
						</AppLink>
						<AppLink
							href="/news-events"
							className={`block w-full text-left px-4 py-4 rounded-lg text-lg font-semibold transition-colors ${
								isActive("/news-events")
									? "text-[#f69052] bg-[#F5A855]/10"
									: "text-gray-700 hover:text-[#f69052] hover:bg-gray-50"
							}`}
						>
							NEWS & EVENTS
						</AppLink>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
