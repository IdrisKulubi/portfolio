import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { ContactInfo } from "@/components/sections/contact/contact-info";

export const metadata: Metadata = {
  title: "Contact - Get in Touch",
  description: "Contact Clement for graphic design projects, collaborations, or inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <HeaderPage
        title="Get In Touch"
        subtitle="Let's discuss your project or just say hello!"
        color="accent"
      />
      <main className="flex-1">
        <ContactInfo />
      </main>
    </>
  );
} 