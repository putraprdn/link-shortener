require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = 8080;
const ACCESS_KEY = process.env.BITLY_ACCESS_TOKEN;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
	res.status(200).json({
		success: true,
		data: { message: "Server is up and running" },
	});
});

app.post("/api/shorten", (req, res) => {
	const bitlyToken = ACCESS_KEY;
	const headers = {
		Authorization: `Bearer ${bitlyToken}`,
		"Content-Type": "application/json",
	};

	const shortenLink = async () => {
		try {
			const response = await fetch(
				"https://api-ssl.bitly.com/v4/shorten",
				{
					method: "POST",
					headers: headers,
					body: JSON.stringify({
						long_url: req.body.link,
						domain: "bit.ly",
					}),
				}
			);
			const data = await response.json();
			if (response.ok) {
				res.status(200).json({
					success: true,
					data: {
						link: data.link,
						message: "Link generated",
					},
				});
			} else {
				res.status(500).json({
					success: false,
					data: {
						message: "Failed to shorten link",
					},
				});
			}
		} catch (error) {
			console.error("Error shortening link:", error);
			res.status(500).json({
				success: false,
				data: {
					message: "Internal server error",
				},
			});
		}
	};

	shortenLink();
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		success: false,
		data: {
			message: "endpoint not found",
		},
	});
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
