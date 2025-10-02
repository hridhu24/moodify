import React from "react";

export default function AnimeCard({ item }) {
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow">
      <img src={item.image} alt={item.title} className="w-full h-44 object-cover rounded-lg" />
      <h4 className="mt-3 font-semibold text-lg text-slate-800">{item.title}</h4>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-2 text-sm text-indigo-600 hover:underline"
      >
        View on AniList
      </a>
    </article>
  );
}
