export const getUserTag = (user) =>
  user?.first_name.toUpperCase()[0] + "" + user?.last_name.toUpperCase()[0];
