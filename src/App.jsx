export default function App() {
  return (
    <div className="overflow-x-hidden antialiased text-neutral-200 selection:bg-neutral-200 selection:text-neutral-800">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center py-24 bg-background"></div>
      </div>
      <div className="container mx-auto px-5"></div>
    </div>
  );
}
