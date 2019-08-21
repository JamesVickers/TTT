var config = {
  //test key and product type - change before going live
  apiKey: "592b99ebdf88c091dad9b556b6d8de236ac97687",
  product: "PRO_MULTISITE",
  //production key linked to treetops.tech
  //apiKey: "4153d1360fba91f35447d9683780224125883891",
  //production product type
  //product: "COMMUNITY",
  optionalCookies: [
    {
      name: "analytics",
      label: "Analytics",
      description: "",
      cookies: [],
      logConsent: false,
      onAccept: function() {},
      onRevoke: function() {}
    },
    {
      name: "marketing",
      label: "Marketing",
      description: "",
      cookies: [],
      logConsent: false,
      onAccept: function() {},
      onRevoke: function() {}
    },
    {
      name: "preferences",
      label: "Preferences",
      description: "",
      cookies: [],
      logConsent: false,
      onAccept: function() {},
      onRevoke: function() {}
    }
  ],

  position: "RIGHT",
  theme: "DARK"
};

CookieControl.load(config);
