"use client";

import { useRef, useState } from "react";
import { OPTIONS } from "@/lib/constants";
import Option from "@/components/Option";

export default function Home() {
  const promptRef = useRef();
  const [renderedImages, setRenderedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const appendPrompt = (word) => {
    promptRef.current.value = promptRef.current.value.concat(", ", word);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptRef.current.value }),
      });

      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();
      console.log(data);

      setRenderedImages(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container max-w-4xl mx-auto">
      <section className="flex items-center gap-2 px-6 py-6">
        <h2>Prompt</h2>
        <input
          type="text"
          className="w-full outline-none py-2 px-6 bg-gray-600 rounded-3xl text-sm"
          placeholder="a woman walking her dog, a ballerina dancing, a dog with glasses, etc"
          defaultValue="a dog playing with a ball"
          ref={promptRef}
        />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {/* LEFT */}
        <div className="flex flex-col gap-6 px-6 py-6">
          <button
            disabled={loading}
            onClick={handleGenerateImage}
            className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
          >
            {loading ? "Generating, please wait" : "Generate"}
          </button>

          {renderedImages.length === 0 && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Image will show up here
            </div>
          )}

          {renderedImages.map((image) => {
            return <img key={image.url} src={image.url} />;
          })}
        </div>

        {/* RIGHT */}
        <div className="py-6">
          <h2>Other Options</h2>

          {OPTIONS.map((option) => {
            return (
              <Option
                key={option.title}
                title={option.title}
                values={option.values}
                onAppend={appendPrompt}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
