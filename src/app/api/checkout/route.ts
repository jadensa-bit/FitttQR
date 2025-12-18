import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, customerEmail } = body;

    const priceMap: Record<string, string> = {
      gym: process.env.STRIPE_PRICE_GYM!,
      home: process.env.STRIPE_PRICE_HOME!,
      ny14: process.env.STRIPE_PRICE_NY14!,
      custom: process.env.STRIPE_PRICE_CUSTOM!,
    };

    const price = priceMap[planId];
    if (!price) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
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
