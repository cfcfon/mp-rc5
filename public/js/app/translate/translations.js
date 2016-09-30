// app/translate/translation.ts
"use strict";
var core_1 = require('@angular/core');
// import translations
var lang_en_1 = require('./lang-en');
var lnag_th_1 = require("./lnag-th");
// translation token
exports.TRANSLATIONS = new core_1.OpaqueToken('translations');
// all traslations
var dictionary = (_a = {},
    _a[lang_en_1.LANG_EN_NAME] = lang_en_1.LANG_EN_TRANS,
    _a[lnag_th_1.LANG_TH_NAME] = lnag_th_1.LANG_TH_TRANS,
    _a
);
// providers
exports.TRANSLATION_PROVIDERS = [
    core_1.provide(exports.TRANSLATIONS, { useValue: dictionary }),
];
var _a;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zbGF0ZS90cmFuc2xhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCOztBQUUvQixxQkFBcUMsZUFBZSxDQUFDLENBQUE7QUFFckQsc0JBQXNCO0FBQ3RCLHdCQUE0QyxXQUFXLENBQUMsQ0FBQTtBQUN4RCx3QkFBMEMsV0FBVyxDQUFDLENBQUE7QUFFdEQsb0JBQW9CO0FBQ1Asb0JBQVksR0FBRyxJQUFJLGtCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFNUQsa0JBQWtCO0FBQ2xCLElBQU0sVUFBVSxHQUFHO0lBQ2YsR0FBQyxzQkFBWSxDQUFDLEdBQUUsdUJBQWE7SUFDN0IsR0FBQyxzQkFBWSxDQUFDLEdBQUUsdUJBQWE7O0NBQ2hDLENBQUM7QUFFRixZQUFZO0FBQ0MsNkJBQXFCLEdBQUc7SUFDakMsY0FBTyxDQUFDLG9CQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7Q0FDbEQsQ0FBQyIsImZpbGUiOiJ0cmFuc2xhdGUvdHJhbnNsYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL3RyYW5zbGF0ZS90cmFuc2xhdGlvbi50c1xuXG5pbXBvcnQgeyBPcGFxdWVUb2tlbiwgcHJvdmlkZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBpbXBvcnQgdHJhbnNsYXRpb25zXG5pbXBvcnQgeyBMQU5HX0VOX05BTUUsIExBTkdfRU5fVFJBTlMgfSBmcm9tICcuL2xhbmctZW4nO1xuaW1wb3J0IHtMQU5HX1RIX05BTUUsIExBTkdfVEhfVFJBTlN9IGZyb20gXCIuL2xuYWctdGhcIjtcblxuLy8gdHJhbnNsYXRpb24gdG9rZW5cbmV4cG9ydCBjb25zdCBUUkFOU0xBVElPTlMgPSBuZXcgT3BhcXVlVG9rZW4oJ3RyYW5zbGF0aW9ucycpO1xuXG4vLyBhbGwgdHJhc2xhdGlvbnNcbmNvbnN0IGRpY3Rpb25hcnkgPSB7XG4gICAgW0xBTkdfRU5fTkFNRV06IExBTkdfRU5fVFJBTlMsXG4gICAgW0xBTkdfVEhfTkFNRV06IExBTkdfVEhfVFJBTlNcbn07XG5cbi8vIHByb3ZpZGVyc1xuZXhwb3J0IGNvbnN0IFRSQU5TTEFUSU9OX1BST1ZJREVSUyA9IFtcbiAgICBwcm92aWRlKFRSQU5TTEFUSU9OUywgeyB1c2VWYWx1ZTogZGljdGlvbmFyeSB9KSxcbl07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
