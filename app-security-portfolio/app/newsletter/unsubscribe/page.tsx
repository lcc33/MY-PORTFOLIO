import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <>
      <h1>Unsubscribe</h1>
      <p className="lede">
        The production route will verify the token hash and turn off newsletter
        mail while keeping the reader account, comments, and likes intact.
      </p>
    </>
  );
}
