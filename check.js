const AppsListArray = [
  {
    appId: "OA03",
    appName: "Account",
    appUrl: "/account",
    appDescription:
      "Account app is used to manage user authentication and authorization.",
    forms: [
      {
        formId: "AF04",
        privilegeId: "RP04",
        formName: "Manage User",
        formUrl: "/account/user",
        formModule: "account",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
      {
        formId: "AF05",
        privilegeId: "RP05",
        formName: "Manage Group",
        formUrl: "/account/group",
        formModule: "account",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
      {
        formId: "AF06",
        privilegeId: "RP06",
        formName: "Manage User Group",
        formUrl: "/account/user-group",
        formModule: "account",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
      {
        formId: "AF07",
        privilegeId: "RP07",
        formName: "Manage Role",
        formUrl: "/account/role",
        formModule: "account",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
    ],
  },
  {
    appId: "OA0002",
    appName: "Assessment Application",
    appUrl: "/assessment",
    appDescription:
      "Assessment Application will be available for all the instructors",
    forms: [
      {
        formId: "AF01",
        privilegeId: "RP01",
        formName: "Create Assessment",
        formUrl: "/assessment/create",
        formModule: "assessment",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
      {
        formId: "AF02",
        privilegeId: "RP02",
        formName: "Enter Marks",
        formUrl: "/assessment/marks/saveMarks",
        formModule: "assessment",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
      {
        formId: "AF03",
        privilegeId: "RP03",
        formName: "Enter OverAll Grade",
        formUrl: "/assessment/marks/saveOverAllGrade",
        formModule: "assessment",
        createPermission: true,
        deletePermission: true,
        readPermission: true,
        updatePermission: true,
      },
    ],
  },
];

for (let i = 0; i < AppsListArray.length; i++) {
    AppsListArray[i].icon = `${i} icon`;
    AppsListArray[i].text = AppsListArray[i].appName;
    AppsListArray[i].subMenu = AppsListArray[i].forms;
    delete AppsListArray[i].forms;

    const subMenu = AppsListArray[i].subMenu;
    for (let j = 0; j < subMenu.length; j++) {
        subMenu[j].icon = `${i} icon`;
        subMenu[j].text = subMenu[j].formName;
    }
}

console.log("Response Apps List: ", AppsListArray);

