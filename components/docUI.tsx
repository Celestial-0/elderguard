"use client";

import React from "react";
import { title } from "@/components/primitives";
import CardUI from "./cardUI";
import { DocData } from "@/types/docData";
import { docData } from "@/constants/docData";

export default function DocUI() {
  const data = docData as DocData;

  if (!data) return <p className="p-4 text-left">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 text-left">
      <section className="mb-12">
        <h1 className={`${title()}`}>Docs : </h1>
        <span className="text-5xl font-bold mb-4 text-cyan-500">
          {data.title}
        </span>
        <p className="text-lg mt-6">{data.introduction.text}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Problem Statement</h2>
        <p className="text-lg">{data.problem_statement.text}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Solution Overview</h2>
        <p className="text-lg">{data.solution_overview.text}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="flex flex-auto gap-3 justify-center">
          <CardUI {...data.key_features} />
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Technical Architecture</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Hardware Components</h3>
          <ul className="space-y-3">
            {data.technical_architecture.hardware_components.map(
              (component, index) => (
                <div key={index}>
                  <span className="font-bold">
                    {component.name}:
                  </span>{" "}
                  {component.description}
                </div>
              )
            )}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Tech Stack</h3>
          <p className="mb-2">
            <span className="font-bold">Web Stack:</span>{" "}
            {data.technical_architecture.tech_stack.web_stack.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-bold">Web Tools:</span>{" "}
            {data.technical_architecture.tech_stack.web_tools.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-bold">Deployment:</span>{" "}
            {data.technical_architecture.tech_stack.deployment}
          </p>
          <p className="mb-2">
            <span className="font-bold">Database:</span>{" "}
            {data.technical_architecture.tech_stack.database}
          </p>
          <p className="mb-2">
            <span className="font-bold">Authentication:</span>{" "}
            {data.technical_architecture.tech_stack.auth}
          </p>
          <p className="mb-2">
            <span className="font-bold">IDE:</span>{" "}
            {data.technical_architecture.tech_stack.ide}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Working Mechanism</h3>
          <ol className="list-decimal list-inside space-y-1">
            {data.technical_architecture.working_mechanism.map(
              (step, index) => (
                <li key={index}>{step}</li>
              )
            )}
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Unique Selling Points</h2>
        <ul className="space-y-3">
          {data.unique_selling_points.map((usp, index) => (
            <li key={index}>
              <span className="font-bold ">{usp.name}:</span>{" "}
              {usp.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Market Potential & Impact
        </h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Market Potential</h3>
          <ul className="list-disc list-inside space-y-1">
            {data.market_potential_and_impact.market_potential.map(
              (point, index) => (
                <li key={index}>{point}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Impact</h3>
          <ul className="list-disc list-inside space-y-1">
            {data.market_potential_and_impact.impact.map((impact, index) => (
              <li key={index}>{impact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Future Enhancements</h2>
        <ul className="list-disc list-inside space-y-1">
          {data.future_enhancements.map((enhancement, index) => (
            <li key={index}>{enhancement}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
        <p className="text-lg">{data.conclusion.text}</p>
      </section>
    </div>
  );
}
