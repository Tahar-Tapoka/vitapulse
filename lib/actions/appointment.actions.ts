"use server";
import { ID, Query } from "node-appwrite";
import {
  APPOINTEMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTEMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTEMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTEMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCounts = {
      sheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        acc.sheduledCount += appointment.status === "scheduled" ? 1 : 0;
        acc.pendingCount += appointment.status === "pending" ? 1 : 0;
        acc.cancelledCount += appointment.status === "cancelled" ? 1 : 0;
        return acc;
      },
      initialCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  userId,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTEMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) throw new Error("Appointment Not Found");
    // TODO: SMS notification
    const sms = `
    Boujoure, c'est VitaPulse
    Votre rendez-vous a été ${
      type === "schedule"
        ? `planifié pour le ${
            formatDateTime(appointment.schedule).dateTime
          } avec Dr. ${appointment.primaryPhysician}`
        : `annulé a cause de: ${appointment.cancellationReason}`
    }`;
    console.log(sms);
    // await sendSMSNotification(userId, sms);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = messaging.createSms(ID.unique(), content, [], [userId]);
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
