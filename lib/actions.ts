"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  name: z.string().min(6),
  phone: z.string().min(12),
});
export const saveContact = async (prevState: any, formData: FormData) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const { name, phone } = validatedFields.data;
    const data = await prisma.contact.create({
      data: {
        name: name,
        phone: phone,
      },
    });
  } catch (error) {
    return { message: "Failed to save contact" };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};
export const updateContact = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const { name, phone } = validatedFields.data;
    const data = await prisma.contact.update({
      data: {
        name: name,
        phone: phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update contact" };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};
export const deleteContact = async (id: string) => {
  try {
    const data = await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete contact" };
  }
  revalidatePath("/contacts");
};
