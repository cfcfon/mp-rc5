"use strict";
var auth_component_1 = require('./auth.component');
var auth_register_component_1 = require("./auth-register.component");
var auth_forgot_password_component_1 = require("./auth-forgot-password.component");
var auth_reset_password_component_1 = require("./auth-reset-password.component");
var auth_register_vendor_component_1 = require("./auth-register-vendor.component");
exports.AUTH_ROUTES = [
    {
        path: '',
        component: auth_component_1.AuthComponent,
        children: [
            { path: '', redirectTo: 'register', pathMatch: 'full' },
            { path: 'register', component: auth_register_component_1.AuthRegisterComponent },
            { path: 'register-vendor', component: auth_register_vendor_component_1.AuthRegisterVendorComponent },
            { path: 'forgot-password', component: auth_forgot_password_component_1.AuthForgotPasswordComponent },
            { path: 'reset-password', component: auth_reset_password_component_1.AuthResetPasswordComponent }
        ]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgvYXV0aC5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSwrQkFBa0Msa0JBQWtCLENBQUMsQ0FBQTtBQUNyRCx3Q0FBb0MsMkJBQTJCLENBQUMsQ0FBQTtBQUNoRSwrQ0FBMEMsa0NBQWtDLENBQUMsQ0FBQTtBQUM3RSw4Q0FBeUMsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRSwrQ0FBMEMsa0NBQWtDLENBQUMsQ0FBQTtBQUVoRSxtQkFBVyxHQUFXO0lBQ2pDO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsOEJBQWE7UUFDeEIsUUFBUSxFQUFFO1lBQ1IsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQztZQUNyRCxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLCtDQUFxQixFQUFDO1lBQ3BELEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSw0REFBMkIsRUFBQztZQUNqRSxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsNERBQTJCLEVBQUM7WUFDakUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDBEQUEwQixFQUFDO1NBQ2hFO0tBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6ImF1dGgvYXV0aC5yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUm91dGVzLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQge0F1dGhDb21wb25lbnR9ICAgICAgIGZyb20gJy4vYXV0aC5jb21wb25lbnQnO1xuaW1wb3J0IHtBdXRoUmVnaXN0ZXJDb21wb25lbnR9IGZyb20gXCIuL2F1dGgtcmVnaXN0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhGb3Jnb3RQYXNzd29yZENvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC1mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhSZXNldFBhc3N3b3JkQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoLXJlc2V0LXBhc3N3b3JkLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoUmVnaXN0ZXJWZW5kb3JDb21wb25lbnR9IGZyb20gXCIuL2F1dGgtcmVnaXN0ZXItdmVuZG9yLmNvbXBvbmVudFwiO1xuXG5leHBvcnQgY29uc3QgQVVUSF9ST1VURVM6IFJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6ICcnLFxuICAgIGNvbXBvbmVudDogQXV0aENvbXBvbmVudCxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge3BhdGg6ICcnLCByZWRpcmVjdFRvOiAncmVnaXN0ZXInLCBwYXRoTWF0Y2g6ICdmdWxsJ30sXG4gICAgICB7cGF0aDogJ3JlZ2lzdGVyJywgY29tcG9uZW50OiBBdXRoUmVnaXN0ZXJDb21wb25lbnR9LFxuICAgICAge3BhdGg6ICdyZWdpc3Rlci12ZW5kb3InLCBjb21wb25lbnQ6IEF1dGhSZWdpc3RlclZlbmRvckNvbXBvbmVudH0sXG4gICAgICB7cGF0aDogJ2ZvcmdvdC1wYXNzd29yZCcsIGNvbXBvbmVudDogQXV0aEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50fSxcbiAgICAgIHtwYXRoOiAncmVzZXQtcGFzc3dvcmQnLCBjb21wb25lbnQ6IEF1dGhSZXNldFBhc3N3b3JkQ29tcG9uZW50fVxuICAgIF1cbiAgfVxuXTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
