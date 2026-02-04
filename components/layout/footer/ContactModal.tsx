"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		userType: "",
		query: "",
	});

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
			document.body.style.overflow = "hidden";

			// GSAP animation for opening - use requestAnimationFrame to ensure DOM is ready
			requestAnimationFrame(() => {
				if (backdropRef.current && modalContentRef.current) {
					gsap.set(backdropRef.current, { opacity: 0 });
					gsap.set(modalContentRef.current, {
						scale: 0.7,
						opacity: 0,
						y: 50,
					});

					const tl = gsap.timeline();
					tl.to(backdropRef.current, {
						opacity: 1,
						duration: 0.3,
						ease: "power2.out",
					}).to(
						modalContentRef.current,
						{
							scale: 1,
							opacity: 1,
							y: 0,
							duration: 0.4,
							ease: "back.out(1.7)",
						},
						"-=0.1",
					);
				}
			});
		}
	}, [isOpen]);

	useEffect(() => {
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	const handleClose = () => {
		if (backdropRef.current && modalContentRef.current) {
			const tl = gsap.timeline({
				onComplete: () => {
					setIsVisible(false);
					document.body.style.overflow = "";
					onClose();
				},
			});

			tl.to(modalContentRef.current, {
				scale: 0.8,
				opacity: 0,
				y: -30,
				duration: 0.25,
				ease: "power2.in",
			}).to(
				backdropRef.current,
				{
					opacity: 0,
					duration: 0.2,
					ease: "power2.in",
				},
				"-=0.1",
			);
		} else {
			setIsVisible(false);
			document.body.style.overflow = "";
			onClose();
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate form
		if (!formData.fullName || !formData.email || !formData.query) {
			setSubmitStatus({
				type: "error",
				message: "Please fill in all required fields.",
			});
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			// EmailJS configuration
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

			// Validate env vars are present
			if (!serviceId || !templateId || !publicKey) {
				throw new Error(
					`Missing EmailJS configuration. Please restart dev server. Missing: ${
						!serviceId ? "SERVICE_ID " : ""
					}${!templateId ? "TEMPLATE_ID " : ""}${!publicKey ? "PUBLIC_KEY" : ""}`,
				);
			}

			// Template parameters - must match your EmailJS template exactly
			const templateParams = {
				// REQUIRED by EmailJS template - hardcoded sender
				from_name: "Warmpawz Platform",
				from_email: "platform@warmpawz.com",
				// YOUR FORM DATA
				phone: formData.phone || "Not provided",
				user_type: formData.userType || "Not specified",
				message: `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\nUser Type: ${formData.userType || "Not specified"}\n\nMessage:\n${formData.query}`,
				// HARD SET RECEIVER
				to_email: "vikrambellurv@gmail.com",
			};

			// Send email using EmailJS
			const result = await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				publicKey,
			);

			if (result.status === 200) {
				setSubmitStatus({
					type: "success",
					message: "Thank you! Your message has been sent successfully.",
				});

				// Reset form
				setFormData({
					fullName: "",
					email: "",
					phone: "",
					userType: "",
					query: "",
				});

				// Close modal after 2 seconds
				setTimeout(() => {
					handleClose();
				}, 2000);
			}
		} catch (error: any) {
			let errorMessage =
				"Failed to send message. Please try again or email us directly at contact@warmpawz.com";

			if (error.text) {
				errorMessage = `Error: ${error.text}. Please contact us at contact@warmpawz.com`;
			}

			setSubmitStatus({
				type: "error",
				message: errorMessage,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isVisible) return null;

	return (
		<div ref={modalRef} className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				ref={backdropRef}
				className="fixed inset-0 bg-black/30 backdrop-blur-sm"
				onClick={handleClose}
			/>

			{/* Modal Content */}
			<div className="flex min-h-full items-center justify-center p-4">
				<div
					ref={modalContentRef}
					className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Modal Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
						<button
							onClick={handleClose}
							className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:ring-offset-1"
							aria-label="Close modal"
						>
							<svg
								className="w-5 h-5 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
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

					{/* Modal Body */}
					<div className="p-6">
						<p className="text-sm text-gray-600 mb-6 leading-relaxed">
							Have questions or need support? We&apos;re here to help you and
							your furry friends.
						</p>

						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Status Message */}
							{submitStatus.type && (
								<div
									className={`p-4 rounded-lg text-sm ${
										submitStatus.type === "success"
											? "bg-green-50 text-green-800 border border-green-200"
											: "bg-red-50 text-red-800 border border-red-200"
									}`}
								>
									{submitStatus.message}
								</div>
							)}

							<div>
								<label
									htmlFor="modalFullName"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Full Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="modalFullName"
									name="fullName"
									value={formData.fullName}
									onChange={handleInputChange}
									placeholder="Ex: Sparky Singh"
									required
									disabled={isSubmitting}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								/>
							</div>

							<div>
								<label
									htmlFor="modalEmail"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Email Address <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="modalEmail"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Sparky@gmail.com"
									required
									disabled={isSubmitting}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								/>
							</div>

							<div>
								<label
									htmlFor="modalPhone"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="modalPhone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									placeholder="+91 9876 54321"
									disabled={isSubmitting}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								/>
							</div>

							<div>
								<label
									htmlFor="modalUserType"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Choose User
								</label>
								<select
									id="modalUserType"
									name="userType"
									value={formData.userType}
									onChange={handleInputChange}
									disabled={isSubmitting}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								>
									<option value="">Select user type</option>
									<option value="pet-parent">Pet Parent</option>
									<option value="service-provider">Service Provider</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="modalQuery"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Query? <span className="text-red-500">*</span>
								</label>
								<textarea
									id="modalQuery"
									name="query"
									value={formData.query}
									onChange={handleInputChange}
									placeholder="Type your query"
									rows={3}
									required
									disabled={isSubmitting}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:border-transparent resize-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
									style={{ minHeight: "80px" }}
								/>
							</div>

							{/* Modal Footer */}
							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={handleClose}
									disabled={isSubmitting}
									className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="flex-1 bg-[#f69052] text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#E09642] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f69052] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
									style={{ minHeight: "48px" }}
								>
									{isSubmitting ? "Sending..." : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactModal;
