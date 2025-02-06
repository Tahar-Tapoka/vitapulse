import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;
  const appointmentId = (resolvedSearchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find((dr) => dr.name === appointment.primaryPhysician);
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="VitaPulse"
            className="mb-12 h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="succès"
            unoptimized
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Votre <span className="text-green-500">demande de rendez-vous</span>{" "}
            a été soumise avec succès !
          </h2>
          <p>Nous vous contacterons prochainement pour confirmation.</p>
        </section>
        <section className="request-details">
          <p>Détails du rendez-vous demandé:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="dr"
              height={100}
              width={100}
              className="size-6 rounded-full"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              className=""
              width="24"
              height="24"
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Prendre un nouveau rendez-vous!
          </Link>
        </Button>
        <p className="copyright mt-10 py-12">© 2024 VitaPulse</p>
      </div>
    </div>
  );
};

export default Success;
