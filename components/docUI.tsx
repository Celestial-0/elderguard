"use client";

import React, { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import CardUI from "./cardUI";

export default function DocUI() {
  interface DocData {
    title: string;
    introduction: {
      text: string;
    };
    problem_statement: {
      text: string;
    };
    solution_overview: {
      text: string;
    };
    key_features: {
      name: string;
      description: string;
    }[];
    technical_architecture: {
      hardware_components: {
        name: string;
        description: string;
      }[];
      tech_stack: {
        web_stack: string[];
        web_tools: string[];
        deployment: string;
        database: string;
        ide: string;
      };
      working_mechanism: string[];
    };
    unique_selling_points: {
      name: string;
      description: string;
    }[];
    market_potential_and_impact: {
      market_potential: string[];
      impact: string[];
    };
    future_enhancements: string[];
    conclusion: {
      text: string;
    };
  }

  const [data, setData] = useState<DocData | null>(null);

  useEffect(() => {
    fetch("/api/doc")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <section className="m-8 gap-12">
        <h1 className={title()}>Docs : </h1>
        <span className="text-5xl font-bold  mb-4">{data.title}</span>
        <p className="text-lg text-left mt-6">{data.introduction.text}</p>
      </section>

      <section className="m-8 gap-12">
        <h2 className="text-3xl font-semibold mb-4">Problem Statement</h2>
        <p className="text-lg text-left mt-6">{data.problem_statement.text}</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Solution Overview</h2>
        <p className="text-lg text-left mt-6">{data.solution_overview.text}</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-6">
          {data.key_features.map((feature, index) => (
            <CardUI
              key={index}
              title={feature.name}
              content={feature.description} description={""}/>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold ">Technical Architecture</h2>
        <h3 className="text-xl font-semibold text-blue-200">
          Hardware Components
        </h3>
        <ul className="space-y-3 mt-2">
          {data.technical_architecture.hardware_components.map(
            (component, index) => (
              <li key={index} className="">
                <span className="font-bold text-white">{component.name}:</span>{" "}
                {component.description}
              </li>
            )
          )}
        </ul>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-200">Tech Stack</h3>
          <p>
            <span className="font-bold text-white">Web Stack:</span>{" "}
            {data.technical_architecture.tech_stack.web_stack.join(", ")}
          </p>
          <p>
            <span className="font-bold text-white">Web Tools:</span>{" "}
            {data.technical_architecture.tech_stack.web_tools.join(", ")}
          </p>
          <p>
            <span className="font-bold text-white">Deployment:</span>{" "}
            {data.technical_architecture.tech_stack.deployment}
          </p>
          <p>
            <span className="font-bold text-white">Database:</span>{" "}
            {data.technical_architecture.tech_stack.database}
          </p>
          <p>
            <span className="font-bold text-white">IDE:</span>{" "}
            {data.technical_architecture.tech_stack.ide}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-200">
            Working Mechanism
          </h3>
          <ol className="list-decimal list-inside  space-y-1">
            {data.technical_architecture.working_mechanism.map(
              (step, index) => (
                <li key={index}>{step}</li>
              )
            )}
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold ">Unique Selling Points</h2>
        <ul className="space-y-3">
          {data.unique_selling_points.map((usp, index) => (
            <li key={index} className="">
              <span className="font-bold text-white">{usp.name}:</span>{" "}
              {usp.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold ">Market Potential & Impact</h2>
        <div>
          <h3 className="text-xl font-semibold text-blue-200">
            Market Potential
          </h3>
          <ul className="list-disc list-inside  space-y-1">
            {data.market_potential_and_impact.market_potential.map(
              (point, index) => (
                <li key={index}>{point}</li>
              )
            )}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-blue-200">Impact</h3>
          <ul className="list-disc list-inside  space-y-1">
            {data.market_potential_and_impact.impact.map((impact, index) => (
              <li key={index}>{impact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold ">Future Enhancements</h2>
        <ul className="list-disc list-inside  space-y-1">
          {data.future_enhancements.map((enhancement, index) => (
            <li key={index}>{enhancement}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold ">Conclusion</h2>
        <p className="">{data.conclusion.text}</p>
      </section>
    </>
  );
}
