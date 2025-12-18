import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key || !key.startsWith("sk_")) {
    throw new Error(
      "Missing/invalid STRIPE_SECRET_KEY. Check ~/fitqr/.env.local (must start with sk_test_ or sk_live_)."
    );
  }

  return new Stripe(key, {
    apiVersion: "2024-06-20",
  });
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = await req.json();

    const { planId, customerName, customerEmail, notes } = body as {
      planId: string;
      customerName?: string;
      customerEmail?: string;
      notes?: string;
    };

    const plans: Record<string, { title: string; price: number }> = {
      gym: { title: "Gym Confidence Plan", price: 18 },
      home: { title: "At-Home Reset", price: 15 },
      ny14: { title: "14-Day New Year Jumpstart", price: 12 },
      custom: { title: "Fully Custom Plan", price: 22 },
    };

    const chosen = plans[planId];
    if (!chosen) {
      return NextResponse.json({ error: "Invalid planId" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(chosen.price * 100),
            product_data: {
              name: chosen.title,
              description: "Digital fitness plan delivery",
            },
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        planId,
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        notes: notes || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
