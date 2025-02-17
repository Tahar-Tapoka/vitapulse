"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, getExPatient } from "@/lib/actions/patient.actions";
import { encryptKey } from "@/lib/utils";

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const exUser = await getExPatient(phone);
      if (exUser) {
        const encryptedKey = encryptKey(phone);
        localStorage.setItem("patient", encryptedKey);
        router.push(`/patients/${exUser.userId}/new-appointment`);
        setIsLoading(false);
        return;
      }
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4 mb-12">
          <h1 className="header">Bonjour 👋</h1>
          <p className="text-dark-700">Programmez votre premier rendez-vous</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nom d'utilisateur Complet"
          placeholder="Votre nom d'utilisateur"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Address email"
          placeholder="Simoh@tapoka.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Numéro de téléphone"
        />
        <SubmitButton isLoading={isLoading}>Commencez</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
