import type { ReactNode } from "react";


interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <header className="bg-white border-b shadow-sm">
  <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

    <div>
      <h1 className="text-4xl font-extrabold text-indigo-600">
        Wobb Influencer Search
      </h1>

      <p className="text-gray-500 text-sm mt-1">
        AI-powered influencer discovery platform
      </p>
    </div>

    <div className="bg-indigo-50 px-5 py-3 rounded-full text-indigo-600 font-semibold">
      ✨ AI Influencer Search
    </div>

  </div>
</header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {title && (
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-3">
            {title}
          </h1>
        )}

        {children}
      </main>
    </div>
  );
}