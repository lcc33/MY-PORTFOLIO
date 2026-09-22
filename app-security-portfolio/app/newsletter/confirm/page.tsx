import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Newsletter",
  robots: { index: false, follow: false },
};

export default function ConfirmNewsletterPage() {
  return (
    <>
      <h1>Confirm</h1>
      <p className="lede">
        The production route will verify a signed token, confirm the subscriber,
        and sign the reader in before returning them to the post they came from.
      </p>
    </>
  );
}
