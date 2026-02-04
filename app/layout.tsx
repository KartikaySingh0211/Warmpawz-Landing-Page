import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { GRADIENTS } from "@/config/constants";
import { Baloo_2 } from "next/font/google";

const baloo2 = Baloo_2({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"], // Select weights you need
	variable: "--font-baloo-2", // Define a CSS variable for Tailwind or CSS
});

export const metadata: Metadata = {
	title: "WarmPawz - Your Trusted Pet Care Partner",
	description:
		"WarmPawz is your trusted pet care partner, offering reliable and loving services to keep your furry friends happy and healthy. From dog walking to pet sitting, we provide personalized care tailored to your pet's needs. Join our community of pet lovers and give your pets the care they deserve with WarmPawz.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={baloo2.className}
				style={{
					background: GRADIENTS.warm,
					backgroundAttachment: "fixed",
					backgroundSize: "100% 100vh",
					minHeight: "100vh",
				}}
			>
				<NavBar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
