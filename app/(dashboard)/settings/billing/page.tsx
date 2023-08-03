"use client";

import { Switch } from "@/components/ui/switch";
import { cn, fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";

type BillingInterval = "year" | "month";

type Name = "Starter" | "Basic" | "Standard" | "Premium";

// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export interface Plan {
  name: string;
  desc: string;
  price: number | string;
  priceAnnual: number | string;
  isMostPop: boolean;
  priceIdMonth: string;
  priceIdYear: string;
  features: string[];
}

const plans: Plan[] = [
  // {
  //   name: "Free",
  //   desc: "Everything you need to start.",
  //   price: 0,
  //   priceAnnual: 0,
  //   priceIdMonth: "",
  //   priceIdYear: "",
  //   isMostPop: false,
  //   features: [
  //     "10,000 logs / month",
  //     "Track multiple API keys",
  //     "1 member",
  //     "1 project",
  //   ],
  // },
  {
    name: "Developer",
    desc: "Perfect for small projects.",
    price: 20,
    priceAnnual: 15,
    priceIdMonth: "price_1NaV0jB24wj8TkEzdNo0HXp7",
    priceIdYear: "price_1NaV0jB24wj8TkEzGVbNRFHf",
    isMostPop: false,
    features: [
      "100,000 logs / month",
      "Detailed User Analytics",
      "Track multiple API keys (soon)",
      "Data Exports (soon)",
      "Email / Slack Alerts (soon)",
      "1 member",
      "2 projects",
    ],
  },
  {
    name: "Startup",
    desc: "Everything you need for a growing startup.",
    price: 60,
    priceAnnual: 40,
    priceIdMonth: "price_1NaV0kB24wj8TkEzB3kgrtuz",
    priceIdYear: "price_1NaV0kB24wj8TkEziIqZXW3j",
    isMostPop: true,
    features: [
      "1,000,000 logs / month",
      "Detailed User Analytics",
      "Track multiple API keys (soon)",
      "Data Exports (soon)",
      "Email / Slack Alerts (soon)",
      "Weekly / Monthly Reports (soon)",
      "3 members (soon)",
      "3 projects (soon)",
    ],
  },
  {
    name: "Team",
    desc: "For teams of all sizes.",
    price: 500,
    priceAnnual: 400,
    priceIdMonth: "price_1NaV0kB24wj8TkEzpoXWRwEB",
    priceIdYear: "price_1NaV0kB24wj8TkEz8nuJ68Xq",
    isMostPop: false,
    features: [
      "Unlimited logs",
      "Detailed User Analytics",
      "Track multiple API keys (soon)",
      "Data Exports (soon)",
      "Email / Slack Alerts (soon)",
      "Weekly / Monthly Reports (soon)",
      "Unlimited team members (soon)",
      "Unlimited projects (soon)",
    ],
  },
];

const enterprisePlan: Plan = {
  name: "Enterprise",
  desc: "For large-scale applications managing serious workloads. Let us know what you need and we'll make it happen.",
  price: "Contact Us",
  priceAnnual: "Contact Us",
  priceIdMonth: "",
  priceIdYear: "",
  isMostPop: false,
  features: [
    // "Unlimited logs",
    // "Track multiple API keys",
    // "Detailed User Analytics",
    // "Data Exports (soon)",
    // "Email / Slack Alerts (soon)",
    // "Weekly / Monthly Reports (soon)",
    // "Unlimited team members (soon)",
    // "Unlimited projects (soon)",
    "SOC 2",
    "24/7/365 Priority Support",
    "Priority Feature Requests",
    "Private Slack channel",
  ],
};

const Billing = () => {
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const { data, isLoading } = useSWR("/api/v1/me", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCheckout = (a: any, b: any) => {
    return;
  };

  return (
    <section className="container h-full w-full flex flex-col gap-4">
      <div className="relative flex items-center justify-center">
        <label className="mr-3 min-w-[3.5rem] text-sm text-gray-500 dark:text-gray-400">
          Monthly
        </label>
        <Switch
          id="billing-interval"
          checked={billingInterval === "year"}
          onCheckedChange={(checked) =>
            setBillingInterval(checked ? "year" : "month")
          }
        />
        <label className="relative ml-3 min-w-[3.5rem] text-sm text-gray-500 dark:text-gray-400">
          Annual
        </label>
      </div>
      <div className="grid mt-8 items-start gap-4 sm:grid-cols-3 sm:space-y-0 xl:grid-cols-3">
        {plans.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              `relative mt-6 grid grid-rows-5 h-full rounded-xl border divide-y sm:mt-0`,
              {
                "border-2 border-primary shadow-xl": item.isMostPop,
              }
            )}
          >
            <div className="flex flex-col gap-4 p-4 justify-between row-span-2">
              {item.isMostPop && (
                <>
                  <div
                    aria-hidden="true"
                    className="left-1/2 top-0 w-full user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0)_0%,rgba(143,143,143,0.67)_50%,rgba(0,0,0,0)_100%)]"
                  />
                  <span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-md">
                    Most popular
                  </span>
                </>
              )}
              <span className="font-medium text-primary">{item.name}</span>
              <div className="flex flex-col justify-between">
                <div className={`text-4xl font-semibold text-gray-800`}>
                  {billingInterval === "month"
                    ? item.price === "Contact Us"
                      ? item.price
                      : formatter.format(item.price as number)
                    : item.price === "Contact Us"
                    ? item.price
                    : formatter.format(item.priceAnnual as number)}

                  <span className="text-xl font-normal text-gray-600">
                    {item.price === "Contact Us" ? "" : "/mo"}
                  </span>
                </div>
              </div>
              <p className="flex text-xs">{item.desc}</p>

              {/* {data?.user.stripeSubscriptionStatus && ( */}
              {/* <StripePortalButton customerId={data?.user?.stripe_customer_id}>
                Manage Billing
              </StripePortalButton> */}
              {/* )} */}
              <button
                onClick={() => handleCheckout(item.name as Name, item.price)}
                className={`group relative  w-full overflow-hidden rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2 `}
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-60"></span>
                {item.price === "Contact Us" ? "Contact Us" : "Choose Plan"}
              </button>
            </div>
            <ul className="flex flex-col gap-2 p-4 row-span-3">
              <li className="pb-2 font-medium text-gray-800">
                <p>Features</p>
              </li>
              {item.features.map((featureItem, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {featureItem}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`relative mt-6 grid rounded-xl border grid-cols-2 divide-x`}
      >
        <div className="flex flex-col gap-4 p-4 justify-between">
          {enterprisePlan.isMostPop && (
            <>
              <div
                aria-hidden="true"
                className="left-1/2 top-0 w-full user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0)_0%,rgba(143,143,143,0.67)_50%,rgba(0,0,0,0)_100%)]"
              />
              <span className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full border bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-md">
                Most popular
              </span>
            </>
          )}
          <span className="font-medium text-primary">
            {enterprisePlan.name}
          </span>
          {/* <div className="flex flex-col justify-between">
            <div className={`text-4xl font-semibold text-gray-800`}>
              {billingInterval === "month"
                ? enterprisePlan.price === "Contact Us"
                  ? enterprisePlan.price
                  : formatter.format(enterprisePlan.price as number)
                : enterprisePlan.price === "Contact Us"
                ? enterprisePlan.price
                : formatter.format(enterprisePlan.priceAnnual as number)}

              <span className="text-xl font-normal text-gray-600">
                {enterprisePlan.price === "Contact Us" ? "" : "/mo"}
              </span>
            </div>
          </div> */}
          <p className="flex text-xs">{enterprisePlan.desc}</p>
          <button
            onClick={() =>
              handleCheckout(enterprisePlan.name as Name, enterprisePlan.price)
            }
            className={`group relative  w-full overflow-hidden rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2 `}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-60"></span>
            {enterprisePlan.price === "Contact Us"
              ? "Contact Us"
              : "Choose Plan"}
          </button>
        </div>
        {/* <hr className="flex flex-1" /> */}
        <ul className="flex flex-col gap-2 p-4 row-span-2">
          <li className="pb-2 font-medium text-gray-800">
            <p>Features</p>
          </li>
          {enterprisePlan.features.map((featureItem, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {featureItem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Billing;
