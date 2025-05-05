"use client";

import { useEffect, useState, useTransition } from "react";
import { getContact, updateContact, createContact, ContactData } from "@/lib/actions/contact-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const socialSchema = z.object({
  type: z.string().min(1, "Type required"),
  url: z.string().url("Valid URL required"),
});

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  socials: z.array(socialSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AdminContactForm() {
  const [contact, setContact] = useState<(ContactData & { id?: string }) | null>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      socials: [{ type: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  useEffect(() => {
    getContact().then(data => {
      const normalized = data
        ? {
            ...data,
            phone: data.phone ?? undefined,
            address: data.address ?? undefined,
            socials: data.socials ?? undefined,
          }
        : null;
      setContact(normalized);
      reset({
        email: normalized?.email || "",
        phone: normalized?.phone || "",
        address: normalized?.address || "",
        socials: normalized?.socials?.length ? normalized.socials : [{ type: "", url: "" }],
      });
    });
  }, [reset]);

  const onSubmit = (values: FormValues) => {
    setSuccess("");
    setError("");
    startTransition(async () => {
      try {
        let result;
        if (contact?.id) {
          result = await updateContact(contact.id, values);
        } else {
          result = await createContact(values);
        }
        const normalized = result
          ? {
              ...result,
              phone: result.phone ?? undefined,
              address: result.address ?? undefined,
              socials: result.socials ?? undefined,
            }
          : null;
        setContact(normalized);
        setSuccess("Contact info saved!");
        toast.success("Contact info saved!");
      } catch (err) {
        console.error(err);
        setError("Failed to save.");
        toast.error("Failed to save.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Email</label>
        <Input {...register("email")} required />
        {errors.email && <div className="text-destructive text-xs">{errors.email.message}</div>}
      </div>
      <div>
        <label className="block font-medium mb-1">Phone</label>
        <Input {...register("phone")} />
        {errors.phone && <div className="text-destructive text-xs">{errors.phone.message as string}</div>}
      </div>
      <div>
        <label className="block font-medium mb-1">Address</label>
        <Textarea {...register("address")} rows={2} />
        {errors.address && <div className="text-destructive text-xs">{errors.address.message as string}</div>}
      </div>
      <div>
        <label className="block font-medium mb-2">Social Links</label>
        <div className="space-y-4">
          {fields.map((field, idx) => (
            <div key={field.id} className="grid grid-cols-5 gap-2 items-end bg-muted/40 p-4 rounded-lg border">
              <Input
                className="md:col-span-2"
                placeholder="Type (e.g. LinkedIn)"
                {...register(`socials.${idx}.type` as const)}
                required
              />
              <Input
                className="md:col-span-3"
                placeholder="URL"
                {...register(`socials.${idx}.url` as const)}
                required
              />
              <Button type="button" variant="destructive" size="icon" onClick={() => remove(idx)} title="Remove social">
                &times;
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ type: "", url: "" })} className="mt-2">+ Add Social</Button>
        </div>
      </div>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-destructive text-sm">{error}</div>}
      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</Button>
    </form>
  );
} 