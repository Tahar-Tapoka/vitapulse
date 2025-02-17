"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

const AppointmentForm = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  const router = useRouter();
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      schedule: appointment?.schedule
        ? new Date(appointment.schedule)
        : new Date(),
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case "cancel":
        status = "cancelled";
        break;
      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            cancellationReason: values?.cancellationReason!,
            status: status as Status,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel";
      break;
    case "create":
      buttonLabel = "Crée le Rendz-vous";
      break;
    case "schedule":
      buttonLabel = "Programmer le Rendz-vous";
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="space-y-4 mb-12">
            <h1 className="header">Bonjour 👋</h1>
            <p className="text-dark-700">
              Demander un nouveau rendez-vous dans 10 secondes.
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Docteur"
              placeholder="Choisisez votre Médecin traitant"
            >
              {Doctors.map((dr) => (
                <SelectItem key={dr.image} value={dr.name}>
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
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Raisons du rendez-vous."
                placeholder="Ex: Bilan annuel, bilan mensuel..."
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Commentaires / notes supplémentaires."
                placeholder="Ex: Préférer des rendez-vous l'après-midi si possible..."
              />
            </div>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Date de rendez-vous prévue."
              placeholder="Sellectionnez la date de votre Rendez-vous"
              iconSrc="/assets/icons/calendar.svg"
              iconAlt="date de Rendez-vous"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Raisons d'annulation."
            placeholder="Ex: raisons personnels..."
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
