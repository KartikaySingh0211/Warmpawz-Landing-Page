"use client";

import { useState, useEffect, useRef } from "react";
import petTrainingImage from "@/public/images/pet-training.png";
import { BREAKPOINTS, ANIMATIONS, VIDEOS } from "@/config/constants";

interface LoadingScreenProps {
	onComplete: () => void;
}

interface VideoSize {
	width: string;
	height: string;
	scale: number;
}

// Dynamic function to calculate video dimensions that fill viewport without black bars
const calculateVideoSize = (isMobile: boolean): VideoSize => {
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;
	const viewportRatio = viewportWidth / viewportHeight;

	// Video aspect ratios (approximate)
	const videoRatio = isMobile ? 9 / 16 : 16 / 9;

	let scale = 1;
	let width = "100vw";
	let height = "100vh";

	// Calculate scale to ensure video fills entire viewport
	if (viewportRatio > videoRatio) {
		// Viewport is wider than video - scale to width and add extra height
		scale = 1.15;
		height = "120vh";
	} else {
		// Viewport is taller than video - scale to height and add extra width
		scale = 1.15;
		width = "120vw";
	}

	// Add extra scale for mobile devices to account for browser chrome
	if (isMobile) {
		scale += 0.1;
	}

	return { width, height, scale };
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
	const [videoOpacity, setVideoOpacity] = useState(1);
	const [isMobile, setIsMobile] = useState(false);
	const [videoSize, setVideoSize] = useState<VideoSize>({
		width: "100vw",
		height: "100vh",
		scale: 1.15,
	});
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		// Lock scroll when loading screen is active
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.width = "100%";
		document.body.style.height = "100%";
		document.documentElement.style.overflow = "hidden";

		// Preload landing page images
		const preloadImages = () => {
			const imagesToPreload = [
				petTrainingImage, // Pet Parent image
				"/images/service_provider.png", // Service Provider image
			];

			imagesToPreload.forEach((src) => {
				const img = new Image();
				img.src = typeof src === "string" ? src : src.src;
			});
		};

		preloadImages();

		// Detect if device is mobile
		const checkMobile = () => {
			const userAgent = navigator.userAgent.toLowerCase();
			const mobileKeywords = [
				"mobile",
				"android",
				"iphone",
				"ipad",
				"ipod",
				"blackberry",
				"windows phone",
			];
			const isMobileUserAgent = mobileKeywords.some((keyword) =>
				userAgent.includes(keyword),
			);
			const isMobileScreen = window.innerWidth <= BREAKPOINTS.mobile;

			return isMobileUserAgent || isMobileScreen;
		};

		const updateVideoSize = () => {
			const mobile = checkMobile();
			setIsMobile(mobile);
			setVideoSize(calculateVideoSize(mobile));
		};

		updateVideoSize();

		// Listen for resize events to handle orientation changes
		const handleResize = () => {
			updateVideoSize();
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("orientationchange", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("orientationchange", handleResize);
			// Unlock scroll when component unmounts
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.width = "";
			document.body.style.height = "";
			document.documentElement.style.overflow = "";
		};
	}, []);

	const handleVideoEnd = () => {
		// Start dissolving the video immediately
		setVideoOpacity(0);

		// After video dissolve completes, call onComplete
		setTimeout(() => {
			onComplete();
		}, ANIMATIONS.loadingDissolution);
	};

	// Choose video source based on device type
	const videoSource = isMobile ? VIDEOS.loading.mobile : VIDEOS.loading.desktop;

	return (
		<div
			className="fixed z-9999 bg-white"
			style={{
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				width: "100vw",
				height: "100dvh",
				overflow: "hidden",
				margin: 0,
				padding: 0,
			}}
		>
			<video
				ref={videoRef}
				key={videoSource}
				autoPlay
				muted
				playsInline
				webkit-playsinline="true"
				onEnded={handleVideoEnd}
				className="transition-opacity duration-300 ease-out"
				style={{
					opacity: videoOpacity,
					position: "absolute",
					top: "50%",
					left: "50%",
					width: videoSize.width,
					height: videoSize.height,
					minWidth: "100vw",
					minHeight: "100dvh",
					objectFit: "cover",
					objectPosition: "center center",
					transform: `translate(-50%, -50%) scale(${videoSize.scale})`,
					margin: 0,
					padding: 0,
					display: "block",
				}}
			>
				<source src={videoSource} type="video/quicktime" />
				<source src={videoSource} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default LoadingScreen;
