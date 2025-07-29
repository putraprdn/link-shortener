import { useState } from "react";
import axios from "axios";

import { API_URL } from "./utils/config";

const App = () => {
	const [loading, setLoading] = useState(false);
	const [link, setLink] = useState("");
	const [shortenedLink, setShortenedLink] = useState("");

	const handleShorten = async () => {
		try {
			setLoading(true);
			setShortenedLink("");
			const cleanUrl = link.trim();
			if (!cleanUrl) {
				alert("Please enter a link to shorten.");
				return;
			}
			if (
				!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w.-](?:\/[\w.-]*)*$/gi.test(
					cleanUrl
				)
			) {
				alert("Invalid URL format.");
				return;
			}

			const response = await axios.post(`${API_URL}/shorten`, { link });
			setShortenedLink(response.data.data.link);
			setLink("");
		} catch (error) {
			console.log("Failed to generate shortened link");
			alert(
				error.response.data.data.message ||
					"Failed to generate shortened link"
			);
		} finally {
			setLoading(false);
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortenedLink);
			alert("Copied to clipboard!");
		} catch {
			alert("Failed to copy");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="p-6 shadow-sm bg-white">
				<h1 className="text-2xl font-bold text-gray-800 tracking-tight">
					Link Shortener
				</h1>
			</header>

			{/* Main Content */}
			<main className="flex flex-1 items-center justify-center p-6">
				<div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
					<h2 className="text-xl font-semibold text-gray-800 mb-2">
						Paste your link
					</h2>
					<p className="text-sm text-gray-500 mb-6">
						Enter a long URL and get a clean, short link instantly.
					</p>

					<div className="space-y-4">
						<input
							type="text"
							placeholder="https://example.com/very/long/link"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
						/>
						<button
							disabled={loading}
							onClick={handleShorten}
							className="w-full py-3 bg-indigo-600 text-white disabled:bg-indigo-400 font-medium rounded-lg shadow hover:bg-indigo-700 transition"
						>
							{loading ? "Processing..." : "Shorten"}
						</button>
					</div>

					{shortenedLink && (
						<div className="mt-8 border-t pt-6">
							<p className="text-gray-700 mb-3">
								Shortened link:
							</p>
							<div className="flex items-center gap-3">
								<span className="px-3 py-2 bg-gray-100 rounded-lg font-mono text-indigo-700">
									{shortenedLink}
								</span>
								<button
									onClick={handleCopy}
									className="cursor-pointer px-4 py-2 rounded-lg border border-black hover:border-indigo-600 transition"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="w-5 h-5 transition-colors duration-200 hover:text-indigo-600"
									>
										<rect
											x="9"
											y="9"
											width="13"
											height="13"
											rx="2"
											ry="2"
										></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								</button>
							</div>
						</div>
					)}
				</div>
			</main>

			{/* Footer */}
			<footer className="p-6 text-center text-gray-400 text-sm flex justify-center">
				<a
					href="https://github.com/putraprdn"
					target="_blank"
				>
					<svg
						role="img"
						className="w-5 h-5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>GitHub</title>
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
					</svg>
				</a>
			</footer>
		</div>
	);
};

export default App;
