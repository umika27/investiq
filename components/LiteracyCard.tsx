"use client";

import { useState } from "react";

export default function LiteracyCard() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState("");

  const explain = async () => {
  const res = await fetch("/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ term }),
  });

  if (!res.ok) {
    setResult("Error fetching explanation.");
    return;
  }

  if (!res.ok) {
  setResult("Error fetching explanation.");
  return;
}

const data = await res.json();

  setResult(data.explanation);
};


  return (
    <div className="p-6 rounded-xl shadow bg-white">
      <input
        className="border p-2 w-full"
        placeholder="Enter finance term"
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={explain}
      >
        Explain
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}
