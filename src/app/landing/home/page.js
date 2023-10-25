"use client";

import Link from "next/link";
import { getPatientList } from "@/app/data/patients";
import { getProfile } from "@/app/data/profile";
import moment from "moment";

export default function Home() {
  const patients = getPatientList();

  const newestPatients = patients.filter((item) => item.new);

  const appointmentToday = patients.filter((item) => {
    return (
      moment(item.appointmentDate).startOf("day").toString() ===
      moment().startOf("day").toString()
    );
  }).length;

  const newPatientsThisWeek = patients.filter((item) => {
    return (
      item.new &&
      moment(item.signupDate).isBetween(
        moment().startOf("week"),
        moment().endOf("week")
      )
    );
  }).length;

  const userInfo = getProfile();
  return (
    <div className="px-6 pt-12 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="basis-2/3 bg-green30 rounded-2xl py-10 px-10">
          <h1 className="font-semibold text-2xl mb-5">Overflow</h1>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 text-center">
              <h2 className="text-main leading-10 text-xl">
                Appointment Today
              </h2>
              <span className="font-semibold text-2xl">{appointmentToday}</span>
            </div>
            <div className="flex-1 text-center">
              <h2 className="text-main leading-10 text-xl">
                New Patients This Week
              </h2>
              <span className="font-semibold text-2xl">
                {newPatientsThisWeek}
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/3 bg-lightgreen rounded-2xl py-10 px-10">
          <h1 className="font-semibold text-2xl mb-2">FAQs</h1>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-main text-lg text-center">
              Learn about frequently asked questions here
            </h2>
            <Link href={"/landing/faqs"} className="btn-main-inverse mt-4">
              View FAQ
            </Link>
          </div>
        </div>
      </div>

      <h1 className="font-semibold text-2xl ml-4 my-12">Newest Patients</h1>

      <div className="mt-12 mx-6">
        <table className="w-full text-left">
          <thead className="w-full">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Signup Date</th>
              <th className="p-2">Appointment Date</th>
              <th className="p-2">Health Profile Flags</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {newestPatients.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.signupDate}</td>
                  <td className="p-2">{item.appointmentDate}</td>
                  <td className="p-2">
                    <div className="flex gap-3 items-center">
                      <Link href="#" className="flex-1 text-orange">
                        {item.likes || 0} likely
                      </Link>
                      <Link href="#" className="flex-1 text-main">
                        {item.unlikes || 0} unlikely
                      </Link>
                      <Link
                        href={`/landing/patients/${item.id}`}
                        className="btn-main-inverse ml-4"
                      >
                        View Profile
                      </Link>
                      <div className="flex-1"></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
