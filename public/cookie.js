var config = {
  //test key and product type - change before going live
  // apiKey: "592b99ebdf88c091dad9b556b6d8de236ac97687",
  // product: "PRO_MULTISITE",

  //production key linked to treetops.tech
  apiKey: "4153d1360fba91f35447d9683780224125883891",
  //production product type
  product: "COMMUNITY",

  text: {
    title: "This site uses cookies",
    intro: "Some of these cookies are essential, while others help us to improve your experience."
  },

  optionalCookies: [
    {
      name: "analytics",
      label: "Analytics",
      description: "Analytical cookies help us to improve our website by collecting and reporting information on its usage.",
      cookies: ["_ga", "_gid", "_gat"],
      logConsent: false,
      recommendedState: true,
      onAccept: function() {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "UA-142712964-1");
        // End Google Analytics
      },
      onRevoke: function() {
        // Disable Google Analytics
        window["ga-disable-UA-142712964-1"] = true;
        // End Google Analytics
      }
    }

    /*,{
      name: "marketing",
      label: "Marketing",
      description: "We use marketing cookies to help us improve the relevancy of advertising campaigns you receive.",
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
    }*/
  ],

  statement: {
    description: "For more information visit our ",
    name: "Privacy Statement",
    url: "https://treetops.tech/privacy",
    updated: "31/08/2019"
  },

  position: "LEFT",
  theme: "LIGHT"
};

CookieControl.load(config);
