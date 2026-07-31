function getCorsHeaders(request) {
	const origin = request.headers.get('Origin');
	const allowedOrigin = (origin === 'http://localhost:4321' || origin === 'http://127.0.0.1:4321') ? origin : 'https://fastfoodguides.com';
	return {
		'Access-Control-Allow-Origin': allowedOrigin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
}

export async function onRequestPost({ request, env }) {
	const corsHeaders = getCorsHeaders(request);

	try {
		const db = env.newsletter_db;
		if (!db) {
			return new Response(JSON.stringify({ error: "Database configuration error" }), {
				status: 500,
				headers: { 'Content-Type': 'application/json', ...corsHeaders }
			});
		}

		let email = "";
		const contentType = request.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			try {
				const body = await request.json();
				email = body.email ? String(body.email) : "";
			} catch (e) {
				return new Response(JSON.stringify({ error: "Malformed JSON payload" }), {
					status: 400,
					headers: { 'Content-Type': 'application/json', ...corsHeaders }
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

		try {
			await db.prepare("INSERT INTO Subscribers (email) VALUES (?)").bind(email).run();
			return new Response(JSON.stringify({ success: true, message: "Successfully subscribed!" }), {
				status: 200,
				headers: { 'Content-Type': 'application/json', ...corsHeaders }
			});
		} catch (dbError) {
			const errMsg = dbError.message || String(dbError);
			if (errMsg.includes('UNIQUE constraint failed')) {
				return new Response(JSON.stringify({ error: "This email is already subscribed!" }), {
					status: 409,
					headers: { 'Content-Type': 'application/json', ...corsHeaders }
				});
			}
			throw dbError;
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
			status: 500,
			headers: { 'Content-Type': 'application/json', ...corsHeaders }
		});
	}
}

export async function onRequestOptions({ request }) {
	return new Response(null, {
		headers: getCorsHeaders(request)
	});
}

