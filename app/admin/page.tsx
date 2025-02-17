import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { columns } from "@/components/table/columns";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="VitaPulse"
            width={162}
            height={32}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Tableu de bord Administrateur</p>
      </header>
      <main className="admin-main">
        <section className="h-full space-y-6">
          <h1 className="header">Bonjour 👋</h1>
          <p className="text-dark-700">
            Commencez la journée en gérant les nouveaux rendez-vous.
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointment"
            count={appointments.sheduledCount}
            label="Rendez-vous"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="En attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Annulé"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
