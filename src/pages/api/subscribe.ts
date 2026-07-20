import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
	try {
		// Ensure we have D1 binding
		if (!env || !env.newsletter_db) {
			console.error("D1 Database binding 'newsletter_db' not found.");
			return new Response(JSON.stringify({ error: "Database configuration error" }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Parse the form data or JSON
		let email = "";
		const contentType = request.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			try {
				const body = await request.json();
				email = body.email ? String(body.email) : "";
			} catch (e) {
				return new Response(JSON.stringify({ error: "Malformed JSON payload" }), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			try {
				const formData = await request.formData();
				email = formData.get("email")?.toString() || "";
			} catch (e) {
				return new Response(JSON.stringify({ error: "Malformed form data" }), {
					status: 400,
					headers: { 'Content-Type': 'application/json', ...corsHeaders }
				});
			}
		} else {
			return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
				status: 400,
				headers: { 'Content-Type': 'application/json', ...corsHeaders }
			});
		}

		email = email.trim();
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return new Response(JSON.stringify({ error: "Valid email is required" }), {
				status: 400,
				headers: { 'Content-Type': 'application/json', ...corsHeaders }
			});
		}

		// Insert into D1
		const db = env.newsletter_db;
		try {
			await db.prepare("INSERT INTO Subscribers (email) VALUES (?)").bind(email).run();
			
			return new Response(JSON.stringify({ success: true, message: "Successfully subscribed!" }), {
				status: 200,
				headers: { 'Content-Type': 'application/json', ...corsHeaders }
			});
		} catch (dbError: any) {
			// Check for UNIQUE constraint failure
			if (dbError.message && dbError.message.includes('UNIQUE constraint failed')) {
				return new Response(JSON.stringify({ error: "This email is already subscribed!" }), {
					status: 409,
					headers: { 'Content-Type': 'application/json', ...corsHeaders }
				});
			}
			console.error("D1 Insert Error:", dbError);
			throw dbError;
		}
	} catch (error) {
		console.error("Subscribe API Error:", error);
		return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
			status: 500,
			headers: { 'Content-Type': 'application/json', ...corsHeaders }
		});
	}
};
