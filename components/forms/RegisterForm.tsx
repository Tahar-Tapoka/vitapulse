"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { PatientFormValidation } from "@/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  // async function onSubmit(
  //   values: //{ name,
  //   // email,
  //   // phone,
  //   // birthDate,
  //   // gender,
  //   // address,
  //   // occupation,
  //   // emergencyContactName,
  //   // emergencyContactNumber,
  //   // primaryPhysician,
  //   // insuranceProvider,
  //   // insurancePolicyNumber,
  //   // allergies,
  //   // currentMedication,
  //   // familyMedicalHistory,
  //   // pastMedicalHistory,
  //   // identificationType,
  //   // identificationNumber,
  //   // identificationDocument,
  //   // treatmentConsent,
  //   // disclosureConsent,
  //   // privacyConsent,}
  //   z.infer<typeof PatientFormValidation>
  // ) {
  //   setIsLoading(true);
  //   let formData;
  //   if (
  //     values.identificationDocument &&
  //     values.identificationDocument.length > 0
  //   ) {
  //     const blobFile = new Blob([values.identificationDocument[0]], {
  //       type: values.identificationDocument[0].type,
  //     });
  //     formData = new FormData();
  //     formData.append("blobFile", blobFile);
  //     formData.append("fileName", values.identificationDocument[0].name);
  //   }

  //   try {
  //     const patientData = {
  //       ...values,
  //       userId: user.$id,
  //       birthDate: new Date(values.birthDate),
  //       idetificationDocument: formData,
  //     };
  //     //@ts-ignore
  //     const patient = await registerPatient(patientData);
  //     console.log(patient);
  //     if (patient) router.push(`/patients/${user.$id}/new-appointment`);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log(values);
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4 ">
          <h1 className="header">Bienvenue ! 😊</h1>
          <p className="text-dark-700">Faites-nous en savoir plus sur vous !</p>
        </section>
        <section className="space-y-6 ">
          <div className="space-y-1 mb-9 ">
            <h2 className="sub-header">Informations personnelles </h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            // disabled
            name="name"
            label="Nom Complet"
            placeholder={user.name}
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              // disabled
              name="email"
              label="Adresse email"
              placeholder={user.email}
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            {/* <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled
              name="phone"
              label="Numéro de téléphone"
              placeholder={user.phone}
              iconSrc="/assets/icons/phone.png"
              iconAlt="phone"
            /> */}
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Numéro de téléphone"
              placeholder="666666666"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date de naissance"
              placeholder={user.email}
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Sexe"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Adresse"
              placeholder="12; Rue 1er Novembre, Cheraga, Alger "
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Profession"
              placeholder="Ingenieur"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Nom du contact d'urgence"
              placeholder="Nom du garde malade"
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Numéro de contact d'urgence"
              placeholder="666666666"
            />
          </div>
        </section>
        <section className="space-y-4">
          <div className="space-y-1 mb-9 ">
            <h2 className="sub-header">Informations médicales</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhisician"
            label="Médecin traitant"
            placeholder="Sélectionner un médecin"
          >
            {Doctors.map((dr) => (
              <SelectItem key={dr.name} value={dr.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={dr.image}
                    alt="dr"
                    height={32}
                    width={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{dr.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Fournisseur d'assurance"
              placeholder="Ex: CNAS"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Numéro d'assurance"
              placeholder="123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (le cas échéant)"
              placeholder="Ex: Penicillin, Lactose..."
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedications"
              label="Médications en cours"
              placeholder="Ex: Levotherox, Amoxecilline..."
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Antécédents médicaux"
              placeholder="Ex: Asthme dans l'enfance..."
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Antécédents médicaux familiaux"
              placeholder="Ex: Mon père est diabètique..."
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1 mb-9 ">
            <h2 className="sub-header">Identification et vérification</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Type d'identification"
            placeholder="Ex: Permis de conduire"
          >
            {IdentificationTypes.map((id) => (
              <SelectItem key={id} value={id}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{id}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Numéro d'identification"
            placeholder="123456789"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Copie scannée du document d'identification"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Je consens à recevoir un traitement pour ma condition de santé"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="diclosureConsent"
          label="Je consens à l'utilisation et à la divulgation de mes informations médicales à des fins de traitement"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Je reconnais avoir pris connaissance et accepté la politique de confidentialité."
        />
        <SubmitButton isLoading={isLoading}>
          Soumettre et continuer
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
