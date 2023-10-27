let profile = {
  username: "anne",
  name: "Anne",
  degree: "Dr",
  clinic: "Centerville Clinic",
};

export const getProfile = () => profile;
export const updateProfile = (item) => {
  profile = { ...profile, ...item };
};
