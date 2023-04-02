const createAPI = {
  Users:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createUser",
  Apps: "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveAppDetails",
  Groups:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveGroup",
  Roles:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createRole",
  AppForm:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveAppForm",
  RoleApp:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/savePrivilege",
  GroupRole:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveGroupRole",
  UserGroup:
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createUserGroup",
  Login: "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/login/permissions",
  Logout: "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/user/logout",
};

export default createAPI;
