import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { getContact } from "@/lib/actions/contact-actions";

export const metadata: Metadata = {
  title: "Contact - Get in Touch",
  description: "Contact Clement for graphic design projects, collaborations, or inquiries.",
};

export default async function ContactPage() {
  const contact = await getContact();
  return (
    <>
      <HeaderPage
        title="Get In Touch"
        subtitle="Let's discuss your project or just say hello!"
        color="accent"
      />
      <main className="flex-1">
        <ContactInfo contact={contact} />
      </main>
    </>
  );
} 