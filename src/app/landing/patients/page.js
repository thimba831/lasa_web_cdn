"use client";

import Link from "next/link";
import { getPatientList } from "@/app/data/patients";
import PatientCreateModal from "@/app/components/patients/create-modal";
import { useMemo, useState } from "react";
import moment from "moment";
import ThSort from "@/app/components/ThSort";
import { getAppointmentRange } from "@/app/utils/dateUtil";

export default function Patients() {
  const [creatModalVisible, setCreateModalVisible] = useState(false);
  const [filter, setFilter] = useState();
  const [sorter, setSorter] = useState({ field: "name", direction: 1 });
  const [patientList, setPatientList] = useState(getPatientList());
  const onNewPatientCreated = (newPatient) => {
    setPatientList((draft) => [...draft, newPatient]);
  };
  const onFilterChange = (e) => {
    setFilter((draft) => ({ ...draft, [e.target.name]: e.target.value }));
  };

  const filteredPatientList = useMemo(() => {
    let result = patientList;
    if (filter) {
      if (filter.name && filter.name !== "") {
        result = result.filter((item) => item.name.includes(filter.name));
      }
      if (filter.startSignUpDate) {
        result = result.filter((item) =>
          moment(item.signupDate).isAfter(
            moment(filter.startSignUpDate).startOf("day")
          )
        );
      }
      if (filter.endSignUpDate) {
        result = result.filter((item) =>
          moment(item.signupDate).isBefore(
            moment(filter.endSignUpDate).startOf("day")
          )
        );
      }
      if (filter.startAppointmentDate) {
        result = result.filter((item) =>
          moment(item.appointmentDate).isAfter(
            moment(filter.startAppointmentDate).startOf("day")
          )
        );
      }
      if (filter.endAppointmentDate) {
        result = result.filter((item) =>
          moment(item.appointmentDate).isBefore(
            moment(filter.endAppointmentDate).startOf("day")
          )
        );
      }
      if (filter.likely) {
        result = result.filter((item) => item.likes == filter.likely);
      }
      if (filter.unlikely) {
        result = result.filter((item) => item.unlikes == filter.unlikely);
      }
    }
    if (sorter) {
      if (sorter.field === "name") {
        result = result.sort((a, b) => {
          const firstCharA = a["name"].charAt(0).toLowerCase();
          const firstCharB = b["name"].charAt(0).toLowerCase();

          if (firstCharA < firstCharB) {
            return sorter.direction ? 1 : -1;
          }
          if (firstCharA > firstCharB) {
            return sorter.direction ? -1 : 1;
          }
          return 0;
        });
      }
      if (sorter.field === "signupDate" || sorter.field === "appointmentDate") {
        result = result.sort((a, b) => {
          const tsA = moment(a[sorter.field]).valueOf();
          const tsB = moment(b[sorter.field]).valueOf();

          if (tsA < tsB) {
            return sorter.direction ? 1 : -1;
          }
          if (tsA > tsB) {
            return sorter.direction ? -1 : 1;
          }
          return 0;
        });
      }
    }
    return result;
  }, [filter, sorter, patientList]);

  const onClickHeader = (field) => {
    if (sorter.field === field) {
      setSorter((draft) => ({ ...draft, direction: !draft.direction }));
    } else {
      setSorter(() => ({ field, direction: 1 }));
    }
  };
  return (
    <div className="px-6 pt-12 lg:px-8 text-black">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl m-12">Patients</h1>
      </div>

      <div className="mx-6">
        <button
          className="btn-main mb-4"
          onClick={() => setCreateModalVisible(true)}
        >
          Add New Patient
        </button>
        <table className="w-full text-left">
          <thead className="w-full">
            <tr>
              <th className="p-2">
                <ThSort
                  sorter={sorter}
                  field={"name"}
                  label={"Name"}
                  onClick={onClickHeader}
                />
              </th>
              <th className="p-2">
                <ThSort
                  sorter={sorter}
                  field={"signupDate"}
                  label={"Signup Date"}
                  onClick={onClickHeader}
                />
              </th>
              <th className="p-2">
                <ThSort
                  sorter={sorter}
                  field={"appointmentDate"}
                  label={"Appointment Date"}
                  onClick={onClickHeader}
                />
              </th>
              <th colSpan={3} className="p-2">
                Health Profile Flags
              </th>
            </tr>

            <tr className="align-baseline">
              <th className="pr-2">
                <input
                  className="form-control-mat w-full"
                  placeholder="Search Name"
                  name="name"
                  type="text"
                  onChange={onFilterChange}
                />
              </th>
              <th className="pr-2">
                <input
                  type="date"
                  className="form-control-mat w-full"
                  name="startSignUpDate"
                  onChange={onFilterChange}
                />
                <input
                  type="date"
                  className="form-control-mat w-full"
                  name="endSignUpDate"
                  onChange={onFilterChange}
                />
              </th>
              <th className="pr-2">
                <input
                  type="date"
                  className="form-control-mat w-full"
                  name="startAppointmentDate"
                  onChange={onFilterChange}
                />
                <input
                  type="date"
                  className="form-control-mat w-full"
                  name="endAppointmentDate"
                  onChange={onFilterChange}
                />
              </th>
              <th className="pr-2">
                <input
                  type="number"
                  className="form-control-mat w-full"
                  placeholder="Likely"
                  name="likely"
                  onChange={onFilterChange}
                />
              </th>
              <th className="pr-2">
                <input
                  type="number"
                  className="form-control-mat w-full"
                  placeholder="Unlikely"
                  name="unlikely"
                  onChange={onFilterChange}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredPatientList.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.signupDate}</td>
                  <td className="p-2">{getAppointmentRange(item)}</td>
                  <td className="p-2">
                    <Link href="#" className="flex-1 text-orange">
                      {item.likes || 0} likely
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link href="#" className="flex-1 text-main">
                      {item.unlikes || 0} unlikely
                    </Link>
                  </td>
                  <td className="p-2">
                    <div className="flex">
                      <Link
                        href={`/landing/patients/${item.id}`}
                        className="btn-main-inverse shrink-0"
                      >
                        View Profile
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PatientCreateModal
        visible={creatModalVisible}
        setVisible={setCreateModalVisible}
        onCreated={onNewPatientCreated}
      />
    </div>
  );
}
