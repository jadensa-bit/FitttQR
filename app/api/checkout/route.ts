import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET is only for testing in the browser.
 * Visiting /api/checkout should return JSON.
 */
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/checkout is live" });
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  try {
    // 1) Validate env vars
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return jsonError("Missing STRIPE_SECRET_KEY on server", 500);
    }

    const priceMap: Record<string, string | undefined> = {
      gym: process.env.STRIPE_PRICE_GYM,
      home: process.env.STRIPE_PRICE_HOME,
      ny14: process.env.STRIPE_PRICE_NY14,
      custom: process.env.STRIPE_PRICE_CUSTOM,
    };

    // 2) Parse request body safely
    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return jsonError("Invalid JSON body sent to /api/checkout", 400);
    }

    const planId = body?.planId;
    const customerEmail = body?.customerEmail;

    if (!planId || typeof planId !== "string") {
      return jsonError("Missing or invalid planId", 400);
    }

    const price = priceMap[planId];
    if (!price) {
      return jsonError(
        `No Stripe price configured for planId="${planId}". Check Vercel env vars.`,
        400
      );
    }

    // 3) Create Stripe client INSIDE handler
    const stripe = new Stripe(secret);

    const origin =
      req.headers.get("origin") || "https://fittt-qr-vmof.vercel.app";

    // 4) Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email:
        typeof customerEmail === "string" ? customerEmail : undefined,
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
