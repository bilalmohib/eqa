const readAPI = {
  Users:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUsers",
  Apps: "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchAppDetails",
  Groups:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchGroups",
  Roles:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchRoles",
  AppForm:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchAppForm",
  RoleApp:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchPrivileges",
  GroupRole:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchGroupRoles",
  UserGroup:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUserGroups",
  College: "https://eqa.datadimens.com:8443/EQACORE-SERVICE/colleges",
  getAllCampusesByCollegeId:
    "https://eqa.datadimens.com:8443/EQACORE-SERVICE/getAllCampusesByCollegeId/",
  Department: "https://eqa.datadimens.com:8443/EQACORE-SERVICE/department",
  University:"https://eqa.datadimens.com:8443/EQACORE-SERVICE/university",
};

export default readAPI;
