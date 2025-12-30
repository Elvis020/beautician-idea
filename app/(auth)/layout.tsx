export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-pink-50 to-white flex flex-col">
      {children}
    </div>
  );
}
