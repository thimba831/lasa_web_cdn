"use client";

import { getProfile, updateProfile } from "@/app/data/profile";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const router = useRouter();
  const profile = getProfile();
  const [newProfile, setNewProfile] = useState(profile);
  const onInputChange = (e) =>
    setNewProfile((draft) => ({ ...draft, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(newProfile);
    router.refresh();
  };
  return (
    <div className="px-6 pt-12 lg:px-8 text-black">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl m-12">Settings</h1>
      </div>

      <form className="mx-6" onSubmit={onSubmit}>
        <div className="flex items-center my-4">
          <label className="basis-1/3 text-right">Name</label>
          <input
            type="text"
            className="form-control-mat"
            name="name"
            value={newProfile ? newProfile.name : ""}
            onChange={onInputChange}
          />
        </div>
        <div className="flex items-center my-4">
          <label className="basis-1/3 text-right">Degree</label>
          <input
            type="text"
            className="form-control-mat"
            name="degree"
            value={newProfile ? newProfile.degree : ""}
            onChange={onInputChange}
          />
        </div>
        <div className="flex items-center my-4">
          <label className="basis-1/3 text-right">Clinic</label>
          <input
            type="text"
            className="form-control-mat"
            name="clinic"
            value={newProfile ? newProfile.clinic : ""}
            onChange={onInputChange}
          />
        </div>
        <div className="flex items-center mt-8 mb-4">
          <label className="basis-1/3"></label>
          <button type="submit" className="btn-main">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
