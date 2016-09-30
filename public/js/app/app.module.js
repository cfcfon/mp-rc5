"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var error_service_1 = require("./errors/error.service");
var error_component_1 = require("./errors/error.component");
var home_module_1 = require('./home/home.module');
var router_1 = require("@angular/router");
var shared_module_1 = require("./shared/shared.module");
var auth_component_1 = require("./auth/auth.component");
var auth_forgot_password_component_1 = require("./auth/auth-forgot-password.component");
var auth_register_component_1 = require("./auth/auth-register.component");
var auth_reset_password_component_1 = require("./auth/auth-reset-password.component");
var product_component_1 = require("./product/product.component");
var product_detail_component_1 = require("./product/product-detail.component");
var product_list_component_1 = require("./product/product-list.component");
var vendor_component_1 = require("./vendor/vendor.component");
var vendor_listing_component_1 = require("./vendor/vendor-listing.component");
var vendor_add_product_component_1 = require("./vendor/vendor-add-product.component");
var vendor_edit_product_component_1 = require("./vendor/vendor-edit-product.component");
var vendor_profile_component_1 = require("./vendor/vendor-profile.component");
var vendor_dashboard_component_1 = require("./vendor/vendor-dashboard.component");
var admin_component_1 = require("./admin/admin.component");
var admin_dashboard_component_1 = require("./admin/admin-dashboard.component");
var admin_listing_component_1 = require("./admin/admin-listing.component");
var admin_product_component_1 = require("./admin/admin-product.component");
var admin_vendors_component_1 = require("./admin/admin-vendors.component");
var browse_page_component_1 = require("./product/browse-page.component");
var admin_setting_component_1 = require("./admin/admin-setting.component");
var auth_register_vendor_component_1 = require("./auth/auth-register-vendor.component");
var customer_component_1 = require("./customer/customer.component");
var customer_dashboard_component_1 = require("./customer/customer-dashboard.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                error_component_1.ErrorComponent,
                auth_component_1.AuthComponent,
                auth_forgot_password_component_1.AuthForgotPasswordComponent,
                auth_register_component_1.AuthRegisterComponent,
                auth_reset_password_component_1.AuthResetPasswordComponent,
                auth_register_vendor_component_1.AuthRegisterVendorComponent,
                product_component_1.ProductComponent,
                product_detail_component_1.ProductDetailComponent,
                product_list_component_1.ProductListComponent,
                browse_page_component_1.BrowsePageComponent,
                customer_component_1.CustomerComponent,
                customer_dashboard_component_1.CustomerDashboardComponent,
                vendor_component_1.VendorComponent,
                vendor_listing_component_1.VendorListingComponent,
                vendor_add_product_component_1.VendorAddProductComponent,
                vendor_edit_product_component_1.VendorEditProductComponent,
                vendor_profile_component_1.VendorProfileComponent,
                vendor_dashboard_component_1.VendorDashboardComponent,
                admin_component_1.AdminComponent,
                admin_dashboard_component_1.AdminDashboardComponent,
                admin_listing_component_1.AdminLisitingComponent,
                admin_product_component_1.AdminProductComponent,
                admin_vendors_component_1.AdminVendorsComponent,
                admin_setting_component_1.AdminSettingComponent
            ],
            imports: [
                platform_browser_1.BrowserModule, app_routing_1.ROUTING, router_1.RouterModule.forRoot(app_routing_1.APP_ROUTES),
                forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule,
                shared_module_1.SharedModule.forRoot(),
                home_module_1.HomeModule
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                error_service_1.ErrorService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;base64,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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRk9STV9ESVJFQ1RJVkVTfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SHR0cE1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7Uk9VVElORywgQVBQX1JPVVRFU30gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcblxuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7RXJyb3JTZXJ2aWNlfSBmcm9tIFwiLi9lcnJvcnMvZXJyb3Iuc2VydmljZVwiO1xuaW1wb3J0IHtFcnJvckNvbXBvbmVudH0gZnJvbSBcIi4vZXJyb3JzL2Vycm9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtIb21lTW9kdWxlfSBmcm9tICcuL2hvbWUvaG9tZS5tb2R1bGUnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tIFwiLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHtBdXRoQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGguY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhGb3Jnb3RQYXNzd29yZENvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9hdXRoLWZvcmdvdC1wYXNzd29yZC5jb21wb25lbnRcIjtcbmltcG9ydCB7QXV0aFJlZ2lzdGVyQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGgtcmVnaXN0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhSZXNldFBhc3N3b3JkQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGgtcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50XCI7XG5pbXBvcnQge1Byb2R1Y3RDb21wb25lbnR9IGZyb20gXCIuL3Byb2R1Y3QvcHJvZHVjdC5jb21wb25lbnRcIjtcbmltcG9ydCB7UHJvZHVjdERldGFpbENvbXBvbmVudH0gZnJvbSBcIi4vcHJvZHVjdC9wcm9kdWN0LWRldGFpbC5jb21wb25lbnRcIjtcbmltcG9ydCB7UHJvZHVjdExpc3RDb21wb25lbnR9IGZyb20gXCIuL3Byb2R1Y3QvcHJvZHVjdC1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtWZW5kb3JDb21wb25lbnR9IGZyb20gXCIuL3ZlbmRvci92ZW5kb3IuY29tcG9uZW50XCI7XG5pbXBvcnQge1ZlbmRvckxpc3RpbmdDb21wb25lbnR9IGZyb20gXCIuL3ZlbmRvci92ZW5kb3ItbGlzdGluZy5jb21wb25lbnRcIjtcbmltcG9ydCB7VmVuZG9yQWRkUHJvZHVjdENvbXBvbmVudH0gZnJvbSBcIi4vdmVuZG9yL3ZlbmRvci1hZGQtcHJvZHVjdC5jb21wb25lbnRcIjtcbmltcG9ydCB7VmVuZG9yRWRpdFByb2R1Y3RDb21wb25lbnR9IGZyb20gXCIuL3ZlbmRvci92ZW5kb3ItZWRpdC1wcm9kdWN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtWZW5kb3JQcm9maWxlQ29tcG9uZW50fSBmcm9tIFwiLi92ZW5kb3IvdmVuZG9yLXByb2ZpbGUuY29tcG9uZW50XCI7XG5pbXBvcnQge1ZlbmRvckRhc2hib2FyZENvbXBvbmVudH0gZnJvbSBcIi4vdmVuZG9yL3ZlbmRvci1kYXNoYm9hcmQuY29tcG9uZW50XCI7XG5pbXBvcnQge0FkbWluQ29tcG9uZW50fSBmcm9tIFwiLi9hZG1pbi9hZG1pbi5jb21wb25lbnRcIjtcbmltcG9ydCB7QWRtaW5EYXNoYm9hcmRDb21wb25lbnR9IGZyb20gXCIuL2FkbWluL2FkbWluLWRhc2hib2FyZC5jb21wb25lbnRcIjtcbmltcG9ydCB7QWRtaW5MaXNpdGluZ0NvbXBvbmVudH0gZnJvbSBcIi4vYWRtaW4vYWRtaW4tbGlzdGluZy5jb21wb25lbnRcIjtcbmltcG9ydCB7QWRtaW5Qcm9kdWN0Q29tcG9uZW50fSBmcm9tIFwiLi9hZG1pbi9hZG1pbi1wcm9kdWN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBZG1pblZlbmRvcnNDb21wb25lbnR9IGZyb20gXCIuL2FkbWluL2FkbWluLXZlbmRvcnMuY29tcG9uZW50XCI7XG5pbXBvcnQge0Jyb3dzZVBhZ2VDb21wb25lbnR9IGZyb20gXCIuL3Byb2R1Y3QvYnJvd3NlLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge0FkbWluU2V0dGluZ0NvbXBvbmVudH0gZnJvbSBcIi4vYWRtaW4vYWRtaW4tc2V0dGluZy5jb21wb25lbnRcIjtcbmltcG9ydCB7QXV0aFJlZ2lzdGVyVmVuZG9yQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL2F1dGgtcmVnaXN0ZXItdmVuZG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDdXN0b21lck1vZHVsZX0gZnJvbSBcIi4vY3VzdG9tZXIvY3VzdG9tZXIubW9kdWxlXCI7XG5pbXBvcnQge0N1c3RvbWVyQ29tcG9uZW50fSBmcm9tIFwiLi9jdXN0b21lci9jdXN0b21lci5jb21wb25lbnRcIjtcbmltcG9ydCB7Q3VzdG9tZXJEYXNoYm9hcmRDb21wb25lbnR9IGZyb20gXCIuL2N1c3RvbWVyL2N1c3RvbWVyLWRhc2hib2FyZC5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBFcnJvckNvbXBvbmVudCxcbiAgICAgICAgQXV0aENvbXBvbmVudCxcbiAgICAgICAgQXV0aEZvcmdvdFBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBBdXRoUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIEF1dGhSZXNldFBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBBdXRoUmVnaXN0ZXJWZW5kb3JDb21wb25lbnQsXG5cbiAgICAgICAgUHJvZHVjdENvbXBvbmVudCxcbiAgICAgICAgUHJvZHVjdERldGFpbENvbXBvbmVudCxcbiAgICAgICAgUHJvZHVjdExpc3RDb21wb25lbnQsXG4gICAgICAgIEJyb3dzZVBhZ2VDb21wb25lbnQsXG5cbiAgICAgICAgQ3VzdG9tZXJDb21wb25lbnQsXG4gICAgICAgIEN1c3RvbWVyRGFzaGJvYXJkQ29tcG9uZW50LFxuXG4gICAgICAgIFZlbmRvckNvbXBvbmVudCxcbiAgICAgICAgVmVuZG9yTGlzdGluZ0NvbXBvbmVudCxcbiAgICAgICAgVmVuZG9yQWRkUHJvZHVjdENvbXBvbmVudCxcbiAgICAgICAgVmVuZG9yRWRpdFByb2R1Y3RDb21wb25lbnQsXG4gICAgICAgIFZlbmRvclByb2ZpbGVDb21wb25lbnQsXG4gICAgICAgIFZlbmRvckRhc2hib2FyZENvbXBvbmVudCxcblxuICAgICAgICBBZG1pbkNvbXBvbmVudCxcbiAgICAgICAgQWRtaW5EYXNoYm9hcmRDb21wb25lbnQsXG4gICAgICAgIEFkbWluTGlzaXRpbmdDb21wb25lbnQsXG4gICAgICAgIEFkbWluUHJvZHVjdENvbXBvbmVudCxcbiAgICAgICAgQWRtaW5WZW5kb3JzQ29tcG9uZW50LFxuICAgICAgICBBZG1pblNldHRpbmdDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnJvd3Nlck1vZHVsZSwgUk9VVElORywgUm91dGVyTW9kdWxlLmZvclJvb3QoQVBQX1JPVVRFUyksXG4gICAgICAgIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBIdHRwTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUuZm9yUm9vdCgpLFxuICAgICAgICBIb21lTW9kdWxlXG4gICAgXSxcbiAgICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFcnJvclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
