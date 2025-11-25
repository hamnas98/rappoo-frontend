import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="section-container section-padding">
        <div className="text-center">
          <h1 className="heading-xl mb-6">
            Welcome to <span className="text-gradient">Rappoo</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Your AI Health Coach - Coming Soon
          </p>
          <div className="mt-8">
            <div className="inline-block px-6 py-3 bg-primary text-white rounded-xl">
              Frontend Setup Complete ✓
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}