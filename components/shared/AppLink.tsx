// components/AppLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AppLinkProps extends LinkProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	target?: string;
}

export function AppLink({
	href,
	children,
	className = "",
	style,
	target,
	...props
}: AppLinkProps) {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	// Reset loading state when route changes
	useEffect(() => {
		setLoading(false);
	}, [pathname]);

	const handleClick = () => {
		const hrefString = typeof href === "string" ? href : href.pathname || "";
		// Don't show loader if clicking the same page
		if (hrefString !== pathname) {
			setLoading(true);
		}
	};

	return (
		<Link
			{...props}
			href={href}
			target={target}
			style={style}
			onClick={handleClick}
			className={`relative ${className} ${
				loading ? "pointer-events-none opacity-60" : ""
			}`}
		>
			{children}

			{/* Spinner overlay */}
			{loading && (
				<span className="absolute inset-0 flex items-center justify-center">
					<span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
				</span>
			)}
		</Link>
	);
}
