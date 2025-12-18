"use client";

import { useMemo, useState } from "react";

type PlanId = "gym" | "home" | "custom" | "ny14";

const PLANS = [
  {
    id: "gym" as PlanId,
    title: "Gym Confidence Plan",
    tag: "Most chosen",
    desc: "A clear, structured gym routine so you’re not guessing what to do.",
    includes: ["3–4 day split", "Simple progression", "Exercise swaps included"],
    price: 18,
  },
  {
    id: "home" as PlanId,
    title: "At-Home Reset",
    tag: "Low pressure",
    desc: "Short workouts you can do anywhere — especially during busy weeks.",
    includes: ["20–30 min sessions", "No equipment", "Flexible weekly layout"],
    price: 15,
  },
  {
    id: "ny14" as PlanId,
    title: "14-Day New Year Jumpstart",
    tag: "Seasonal",
    desc: "A simple two-week structure to build momentum before January.",
    includes: ["Daily check-ins", "Short workouts", "Habit + movement focus"],
    price: 12,
  },
  {
    id: "custom" as PlanId,
    title: "Fully Custom Plan",
    tag: "Most tailored",
    desc: "Built around your goals, schedule, and preferences from the ground up.",
    includes: [
      "Goal-specific design",
      "Schedule-based planning",
      "Adjustments included",
    ],
    price: 22,
  },
];

export default function Page() {
  const [selected, setSelected] = useState<PlanId>("gym");
  const [notes, setNotes] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const chosen = useMemo(
    () => PLANS.find((p) => p.id === selected)!,
    [selected]
  );

  // simple validation for a more legit checkout flow
  const canCheckout = customerEmail.includes("@") && customerEmail.includes(".");

  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selected,
          customerName,
          customerEmail,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      if (data?.url) window.location.href = data.url;
    } catch (e: any) {
      alert(e?.message || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-800">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-900 px-8 py-5 text-stone-100">
          <p className="text-sm text-stone-200">
            Personalized fitness plans built with real exercise science — not
            guesswork.
          </p>
          <h2 className="font-display text-xl font-semibold">
            Personalized plans built from Exercise Science + Exercise Physiology
            principles
          </h2>
        </div>

        <div className="p-8 md:p-12">
          {/* HERO */}
          <section className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-stone-900">
              A workout plan that makes sense for{" "}
              <span className="text-red-900">your life</span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-stone-700">
              I’m an <strong>Exercise Science senior</strong> at{" "}
              <strong>Winston-Salem State University</strong> with a concentration
              in <strong>Exercise Physiology</strong> and a minor in{" "}
              <strong>Public Health</strong>.
              <br />
              I built this because most workout plans online don’t consider real
              schedules, real stress, or real people.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("plans")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-full font-semibold bg-red-900 text-white hover:bg-red-950 transition"
              >
                See the plans ↓
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("customize")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-full font-semibold bg-white border border-stone-300 hover:bg-stone-100 transition"
              >
                Tell me what you want
              </button>
            </div>
          </section>

          {/* WHY THIS EXISTS */}
          <section className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="border rounded-2xl p-6 bg-stone-100">
              <p className="text-sm text-stone-500 mb-1">Why I made this</p>
              <p className="font-semibold">Most plans aren’t realistic</p>
              <p className="text-sm text-stone-600">
                They ignore time, access, stress, and consistency.
              </p>
            </div>
            <div className="border rounded-2xl p-6">
              <p className="text-sm text-stone-500 mb-1">What I focus on</p>
              <p className="font-semibold">Structure you can stick to</p>
              <p className="text-sm text-stone-600">
                Clear workouts beat perfect workouts.
              </p>
            </div>
            <div className="border rounded-2xl p-6">
              <p className="text-sm text-stone-500 mb-1">Where this starts</p>
              <p className="font-semibold">Winston-Salem & the Triad</p>
              <p className="text-sm text-stone-600">
                Built local. Growing from here.
              </p>
            </div>
          </section>

          {/* WHY THIS WORKS */}
          <section className="max-w-4xl mx-auto mb-14">
            <h3 className="font-display text-2xl font-bold mb-3 text-stone-900">
              Why this approach works
            </h3>

            <p className="text-stone-700 leading-relaxed mb-4">
              Results aren’t about extreme routines — they come from applying the
              right <strong>dose</strong> of movement consistently. Major
              guidelines emphasize regular aerobic activity paired with strength
              training as a foundation for long-term health.
            </p>

            <p className="text-stone-700 leading-relaxed mb-4">
              Strength training at least <strong>two days per week</strong>{" "}
              supports muscular strength and function, while moderate aerobic
              activity across the week supports cardiovascular health. The key
              variable isn’t perfection — it’s <strong>adherence</strong>.
            </p>

            <p className="text-sm text-stone-500 mt-4">
              Frameworks informed by ACSM-style guidance + federal physical
              activity recommendations. References available upon request.
            </p>
          </section>

          {/* TRUST BAR + HOW IT WORKS */}
          <section className="mb-14">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500 mb-1">Turnaround</p>
                <p className="font-semibold text-stone-900">Fast delivery</p>
                <p className="text-sm text-stone-600">
                  Most plans delivered within <strong>24 hours</strong> (often
                  sooner).
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500 mb-1">Checkout</p>
                <p className="font-semibold text-stone-900">Secure payment</p>
                <p className="text-sm text-stone-600">
                  Your payment is handled by a secure checkout provider.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm text-stone-500 mb-1">Local</p>
                <p className="font-semibold text-stone-900">Built in the Triad</p>
                <p className="text-sm text-stone-600">
                  Based in Winston-Salem and growing from here.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
                How it works
              </h3>
              <ol className="grid md:grid-cols-3 gap-4 text-sm text-stone-700">
                <li className="rounded-xl bg-white border border-stone-200 p-4">
                  <p className="font-semibold text-stone-900 mb-1">1) Pick a plan</p>
                  <p>Choose gym, home, jumpstart, or fully custom.</p>
                </li>
                <li className="rounded-xl bg-white border border-stone-200 p-4">
                  <p className="font-semibold text-stone-900 mb-1">
                    2) Tell me your needs
                  </p>
                  <p>Drop your schedule + preferences in the box.</p>
                </li>
                <li className="rounded-xl bg-white border border-stone-200 p-4">
                  <p className="font-semibold text-stone-900 mb-1">3) Get your plan</p>
                  <p>You’ll receive a clean plan you can actually follow.</p>
                </li>
              </ol>
            </div>
          </section>

          {/* PLANS */}
          <section id="plans" className="mb-14">
            <h2 className="font-display text-3xl font-bold mb-6">
              Choose what fits you best
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan) => {
                const active =
                  plan.id === selected
                    ? "border-red-900 bg-red-50 ring-1 ring-red-900/20"
                    : "border-stone-300 hover:bg-stone-50";

                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelected(plan.id)}
                    className={`text-left rounded-2xl p-6 border transition ${active}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold">{plan.title}</h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                        {plan.tag}
                      </span>
                    </div>

                    <p className="text-sm text-stone-600 mb-4">{plan.desc}</p>

                    <ul className="space-y-2 text-sm mb-4">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-center">
                      <p className="font-bold">${plan.price}</p>
                      <span className="text-sm">
                        {plan.id === selected ? "Selected" : "Select →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* CUSTOM */}
          <section
            id="customize"
            className="bg-stone-100 border border-stone-300 rounded-2xl p-8 mb-12"
          >
            <h2 className="font-display text-2xl font-bold mb-2">
              Tell me what you actually need
            </h2>
            <p className="text-stone-600 mb-4">
              Schedule, goals, injuries, stress, gym access — put it all here.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-stone-600 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jaden"
                  className="w-full p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-900"
                />
              </div>

              <div>
                <label className="block text-sm text-stone-600 mb-1">
                  Email to send your plan
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Example: I work nights, only have 30 minutes, want fat loss and toned arms…"
              className="w-full h-32 p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-4 text-stone-900">
              Quick questions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-semibold text-stone-900 mb-2">
                  What do I receive?
                </p>
                <p className="text-sm text-stone-600">
                  A clear workout plan (and simple progression) based on your
                  selection. If you choose custom, it’s built around your notes.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-semibold text-stone-900 mb-2">
                  How fast is delivery?
                </p>
                <p className="text-sm text-stone-600">
                  Most plans go out within <strong>24 hours</strong>. During peak
                  times (holidays/weekends), it may take a bit longer.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-semibold text-stone-900 mb-2">
                  Is this 1-on-1 training?
                </p>
                <p className="text-sm text-stone-600">
                  Not live coaching or in-person training. This is personalized
                  program design based on your goals, access, and preferences.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-semibold text-stone-900 mb-2">
                  Medical or rehab?
                </p>
                <p className="text-sm text-stone-600">
                  No diagnosis or treatment. If you have injuries/conditions,
                  please check with a clinician and tell me your limitations so
                  your plan stays safe.
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-500 mt-4">
              Note: This site shares exercise information and program design
              support. It’s not medical advice.
            </p>
          </section>

          {/* CTA */}
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-stone-500">Selected</p>
              <p className="font-display text-2xl font-bold">{chosen.title}</p>
              <p className="text-stone-600">
                Built with intention. Backed by science. Local roots.
              </p>
            </div>

            <div className="md:w-[320px] rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm text-stone-500 mb-2">Order summary</p>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-stone-900">{chosen.title}</p>
                  <p className="text-sm text-stone-600 mt-1">
                    Digital plan delivery
                  </p>
                </div>
                <p className="font-bold text-stone-900">${chosen.price}</p>
              </div>

              <div className="mt-4 space-y-2 text-sm text-stone-700">
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Clear routine + progression</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Swaps for equipment/access</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Designed around your notes</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 mt-4">
                Most plans delivered within 24 hours.
              </p>

              {customerEmail ? (
                <p className="text-xs text-stone-500 mt-3">
                  Sending to:{" "}
                  <span className="font-medium text-stone-700">
                    {customerEmail}
                  </span>
                </p>
              ) : (
                <p className="text-xs text-stone-500 mt-3">
                  Add your email above so I know where to send your plan.
                </p>
              )}
            </div>

            <div className="md:text-right">
              <p className="text-sm text-stone-500 mb-1">Price</p>
              <p className="text-3xl font-extrabold mb-3">${chosen.price}</p>

              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition ${
                  canCheckout
                    ? "bg-red-900 text-white hover:bg-red-950"
                    : "bg-stone-300 text-stone-600 cursor-not-allowed"
                }`}
              >
                Continue to Checkout →
              </button>

              <p className="text-xs text-stone-500 mt-3">
                After checkout, you’ll get a confirmation and I’ll email your plan
                to you.
              </p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p>© {new Date().getFullYear()} FitQR • Winston-Salem, NC</p>
              <p className="text-stone-500">
                Questions? Add your email capture next (recommended).
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
