import React from "react";

export default function NewsletterForm({
  email,
  setEmail,
  subscribed,
  handleSubscribe,
}) {
  return (
    <>
      <form onSubmit={handleSubscribe} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#2E7D32] outline-none transition-all"
          required
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-[#2E7D32] text-white px-4 rounded-lg hover:bg-[#1B5E20] transition-colors"
        >
          <span className="material-icons-outlined">arrow_forward</span>
        </button>
      </form>

      {subscribed && (
        <div className="mt-4 p-3 bg-[#E8F5E9] text-[#2E7D32] rounded-lg text-xs font-bold animate-fade-in flex items-center">
          <span className="material-icons-outlined text-sm mr-2">
            check_circle
          </span>
          Successfully subscribed!
        </div>
      )}
    </>
  );
}
