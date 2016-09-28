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
var router_1 = require("@angular/router");
var product_service_1 = require("../shared/api-service/product/product.service");
var forms_1 = require("@angular/forms");
var status_log_model_1 = require("../shared/models/status-log.model");
var platform_browser_1 = require('@angular/platform-browser');
/**
 * This class represents the lazy loaded HomeComponent.
 */
var AdminProductComponent = (function () {
    function AdminProductComponent(_fb, route, _router, _sanitizer, _productService) {
        this._fb = _fb;
        this.route = route;
        this._router = _router;
        this._sanitizer = _sanitizer;
        this._productService = _productService;
        this.loading = true;
        this.products = [];
        this.apps = [];
        this.apps_th = [];
        this.languagesTag = [];
        this.categoriesTag = [];
        this.departmentsTag = [];
        this.industriesTag = [];
        this.features = [];
        this.features_th = [];
        this.updated = true;
        this.reviewed = false;
        /*Set thumbnail and Screenshot*/
        this.screenshots = [];
        this.thumbnail = [];
        this.count = 0;
        this.max = 4;
        this.index = 0;
        this.selected = '';
        this.logs = [];
        this.video = false;
        this.thaiInput = false;
        this.myFormAdminReview = this._fb.group({
            id: [''],
            status: [''],
            comment: [''],
        });
    }
    AdminProductComponent.prototype.ngOnInit = function () {
        this.getProductId();
    };
    AdminProductComponent.prototype.onRefresh = function () {
        this.logs = [];
        this.languagesTag = [];
        this.departmentsTag = [];
        this.categoriesTag = [];
        this.industriesTag = [];
        this.features = [];
        this.features_th = [];
        this.screenshots = [];
        this.getProductId();
    };
    AdminProductComponent.prototype.ngOnDestroy = function () {
        if (this.sub_updateStatus) {
            this.sub_updateStatus.unsubscribe();
        }
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.sub_delete) {
            this.sub_delete.unsubscribe();
        }
    };
    AdminProductComponent.prototype.getProductId = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this._productService.getProductId(_this.id)
                .subscribe(function (products) {
                _this.products = products.data['en'];
                _this.apps = products.data['en'];
                _this.apps_th = products.data['th'];
                _this.embedYoutube(_this.apps.youtube);
                for (var i = 0; i < _this.products.languages.length; i++) {
                    _this.languagesTag.push(_this.products.languages[i]);
                }
                for (var i = 0; i < _this.products.departments.length; i++) {
                    _this.departmentsTag.push(_this.products.departments[i]);
                }
                for (var i = 0; i < _this.products.categories.length; i++) {
                    _this.categoriesTag.push(_this.products.categories[i]);
                }
                for (var i = 0; i < _this.products.industries.length; i++) {
                    _this.industriesTag.push(_this.products.industries[i]);
                }
                for (var i = 0; i < _this.products.features.length; i++) {
                    _this.features.push(_this.products.features[i]);
                }
                for (var i = 0; i < _this.apps_th.features.length; i++) {
                    _this.features_th.push(_this.apps_th.features[i]);
                }
                for (var i = 0; i < _this.products.screenshots.length; i++) {
                    _this.screenshots.push(_this.products.screenshots[i]);
                }
                _this.setThumbnail();
                _this.selected = _this.screenshots[0].url;
                _this.loading = false;
            });
            //After get param Id
            _this.getLogProduct();
        });
    };
    //For Needs Review
    AdminProductComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.updated = false;
        this.reviewed = false;
        var statusLog = new status_log_model_1.StatusLog(this.myFormAdminReview.value.comment);
        this.updateStatus$ = this._productService.updateProductStatus(this.id, 'deny', statusLog);
        this.sub_updateStatus = this.updateStatus$.subscribe(function (res) {
            _this.updated = true;
            _this.reviewed = true;
            _this.onRefresh();
            _this.myFormAdminReview.reset();
        }, function (error) { return _this.errorMessage = error; });
    };
    AdminProductComponent.prototype.updateProductStatus = function (id, status) {
        var _this = this;
        this.updated = false;
        this.updateStatus$ = this._productService.updateProductStatus(id, status);
        this.sub_updateStatus = this.updateStatus$.subscribe(function () {
            _this.updated = true;
            _this.onRefresh();
        }, function (error) { return _this.errorMessage = error; });
    };
    /*Screenshot*/
    AdminProductComponent.prototype.onSelect = function (_screenshot, i, j) {
        this.selected = _screenshot;
        if (i != 0) {
            this.index = ((j + 1) + (4 * i) - 1);
        }
        else {
            this.index = j;
        }
    };
    AdminProductComponent.prototype.onControl = function (condition) {
        if (condition == 'plus') {
            if (this.index < this.screenshots.length - 1) {
                this.index++;
            }
            else {
                this.index = 0;
            }
        }
        else {
            if (this.index != 0) {
                this.index--;
            }
            else {
                this.index = this.screenshots.length - 1;
            }
        }
        this.selected = this.screenshots[this.index].url;
    };
    AdminProductComponent.prototype.setThumbnail = function () {
        for (var i = 0; i < Math.ceil((this.screenshots.length / 4)); i++) {
            this.thumbnail[i] = [];
            for (var j = 0; j < 4; j++) {
                if (this.count < this.screenshots.length) {
                    this.thumbnail[i][j] = this.screenshots[this.count].url;
                    this.count++;
                }
            }
        }
    };
    AdminProductComponent.prototype.embedYoutube = function (url) {
        if (url !== '') {
            this.video = true;
            var id = url.split('=', 2)[1];
            this.embedUrl = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id);
        }
    };
    AdminProductComponent.prototype.goToListing = function () {
        this._router.navigate(["admin/listing"]);
    };
    AdminProductComponent.prototype.getLogProduct = function () {
        var _this = this;
        this.logs$ = this._productService.getLogProduct(this.id);
        this.sub_logs = this.logs$.subscribe(function (logs) {
            _this.logs = logs.data;
            _this.loading = false;
        }), function (err) { return _this.errorMessage = err; };
    };
    AdminProductComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        this.deleteProduct$ = this._productService.deleteProduct(id);
        this.sub_delete = this.deleteProduct$.subscribe(function () {
            _this._router.navigate(["admin/listing"]);
        });
    };
    AdminProductComponent.prototype.onChangeLanguaeFrom = function (lang) {
        switch (lang) {
            case 'th':
                this.thaiInput = true;
                break;
            case 'en':
                this.thaiInput = false;
                break;
            default:
                this.thaiInput = false;
        }
    };
    AdminProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-admin-product',
            templateUrl: 'templates/admin-product.component.html',
            styleUrls: ['styles/admin-product.component.css'],
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, platform_browser_1.DomSanitizationService, product_service_1.ProductService])
    ], AdminProductComponent);
    return AdminProductComponent;
}());
exports.AdminProductComponent = AdminProductComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluL2FkbWluLXByb2R1Y3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFNM0QsdUJBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkQsZ0NBQTZCLCtDQUErQyxDQUFDLENBQUE7QUFDN0Usc0JBQWdELGdCQUFnQixDQUFDLENBQUE7QUFDakUsaUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQsaUNBQStELDJCQUEyQixDQUFDLENBQUE7QUFFM0Y7O0dBRUc7QUFRSDtJQThDSSwrQkFBb0IsR0FBZ0IsRUFDaEIsS0FBcUIsRUFDckIsT0FBZSxFQUNoQixVQUFrQyxFQUNqQyxlQUErQjtRQUovQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQ2hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBL0NuRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBS2YsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUVuQixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ2YsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUVsQixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUN2QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUV4QixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLGdCQUFXLEdBQU8sRUFBRSxDQUFDO1FBTXJCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixnQ0FBZ0M7UUFDaEMsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xC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Q0FBQztTQUNwRCxDQUFDOzs2QkFBQTtJQTZRRiw0QkFBQztBQUFELENBM1FBLEFBMlFDLElBQUE7QUEzUVksNkJBQXFCLHdCQTJRakMsQ0FBQSIsImZpbGUiOiJhZG1pbi9hZG1pbi1wcm9kdWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ZlbmRvcn0gZnJvbSBcIi4uL3NoYXJlZC9tb2RlbHMvdmVuZG9yLm1vZGVsXCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VmVuZG9yU2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9hcGktc2VydmljZS92ZW5kb3IvdmVuZG9yLnNlcnZpY2VcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zaGFyZWQvYXBpLXNlcnZpY2UvYXV0aC9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7c3RvcmFnZX0gZnJvbSBcIi4uL3NoYXJlZC9oZWxwZXJzL3N0b3JhZ2VcIjtcbmltcG9ydCB7Um91dGVyLCBBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtQcm9kdWN0U2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9hcGktc2VydmljZS9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZVwiO1xuaW1wb3J0IHtGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3J9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtTdGF0dXNMb2d9IGZyb20gXCIuLi9zaGFyZWQvbW9kZWxzL3N0YXR1cy1sb2cubW9kZWxcIjtcbmltcG9ydCB7RG9tU2FuaXRpemF0aW9uU2VydmljZSwgU2FmZVJlc291cmNlVXJsLCBTYWZlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGxhenkgbG9hZGVkIEhvbWVDb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZC1hZG1pbi1wcm9kdWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9hZG1pbi1wcm9kdWN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnc3R5bGVzL2FkbWluLXByb2R1Y3QuY29tcG9uZW50LmNzcyddLFxufSlcblxuZXhwb3J0IGNsYXNzIEFkbWluUHJvZHVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGlkOiBhbnk7XG4gICAgbG9hZGluZyA9IHRydWU7XG4gICAgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgICBlcnJvck1lc3NhZ2U6IHN0cmluZztcblxuICAgIHByb2R1Y3RzOiBhbnkgPSBbXTtcblxuICAgIGFwcHM6IGFueSA9IFtdO1xuICAgIGFwcHNfdGggOmFueSA9IFtdO1xuXG4gICAgbGFuZ3VhZ2VzVGFnOiBhbnkgPSBbXTtcbiAgICBjYXRlZ29yaWVzVGFnOiBhbnkgPSBbXTtcbiAgICBkZXBhcnRtZW50c1RhZzogYW55ID0gW107XG4gICAgaW5kdXN0cmllc1RhZzogYW55ID0gW107XG5cbiAgICBmZWF0dXJlczogYW55ID0gW107XG4gICAgZmVhdHVyZXNfdGg6YW55ID0gW107XG5cblxuICAgIG15Rm9ybUFkbWluUmV2aWV3OiBGb3JtR3JvdXA7XG4gICAgc3ViX3VwZGF0ZVN0YXR1czogU3Vic2NyaXB0aW9uO1xuICAgIHVwZGF0ZVN0YXR1cyQ6IE9ic2VydmFibGU8YW55PjtcbiAgICB1cGRhdGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICByZXZpZXdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLypTZXQgdGh1bWJuYWlsIGFuZCBTY3JlZW5zaG90Ki9cbiAgICBzY3JlZW5zaG90czogYW55ID0gW107XG4gICAgdGh1bWJuYWlsOiBhbnkgPSBbXTtcbiAgICBjb3VudDogbnVtYmVyID0gMDtcbiAgICBtYXg6IG51bWJlciA9IDQ7XG4gICAgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQ6IGFueSA9ICcnO1xuXG5cbiAgICAvKkxvZyBTZXJ2aWNlKi9cbiAgICBsb2dzJDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIHN1Yl9sb2dzOiBTdWJzY3JpcHRpb247XG4gICAgbG9nczogYW55ID0gW107XG5cblxuICAgIC8vTWVkaWFcbiAgICBlbWJlZFVybDogU2FmZVJlc291cmNlVXJsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBfc2FuaXRpemVyOiBEb21TYW5pdGl6YXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSkge1xuICAgICAgICB0aGlzLm15Rm9ybUFkbWluUmV2aWV3ID0gdGhpcy5fZmIuZ3JvdXAoe1xuICAgICAgICAgICAgaWQ6IFsnJ10sXG4gICAgICAgICAgICBzdGF0dXM6IFsnJ10sXG4gICAgICAgICAgICBjb21tZW50OiBbJyddLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRQcm9kdWN0SWQoKTtcbiAgICB9XG5cbiAgICBvblJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubG9ncyA9IFtdO1xuICAgICAgICB0aGlzLmxhbmd1YWdlc1RhZyA9IFtdO1xuICAgICAgICB0aGlzLmRlcGFydG1lbnRzVGFnID0gW107XG4gICAgICAgIHRoaXMuY2F0ZWdvcmllc1RhZyA9IFtdO1xuICAgICAgICB0aGlzLmluZHVzdHJpZXNUYWcgPSBbXTtcbiAgICAgICAgdGhpcy5mZWF0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLmZlYXR1cmVzX3RoID0gW107XG4gICAgICAgIHRoaXMuc2NyZWVuc2hvdHMgPSBbXTtcblxuICAgICAgICB0aGlzLmdldFByb2R1Y3RJZCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJfdXBkYXRlU3RhdHVzKXt0aGlzLnN1Yl91cGRhdGVTdGF0dXMudW5zdWJzY3JpYmUoKTt9XG4gICAgICAgIGlmICh0aGlzLnN1Yil7dGhpcy5zdWIudW5zdWJzY3JpYmUoKTt9XG4gICAgICAgIGlmICh0aGlzLnN1Yl9kZWxldGUpe3RoaXMuc3ViX2RlbGV0ZS51bnN1YnNjcmliZSgpO31cbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0SWQoKSB7XG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKChwYXJhbXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pZCA9ICtwYXJhbXNbJ2lkJ107XG4gICAgICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0SWQodGhpcy5pZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChwcm9kdWN0czogYW55KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHByb2R1Y3RzLmRhdGFbJ2VuJ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwcyA9IHByb2R1Y3RzLmRhdGFbJ2VuJ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwc190aCA9IHByb2R1Y3RzLmRhdGFbJ3RoJ107XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWJlZFlvdXR1YmUodGhpcy5hcHBzLnlvdXR1YmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0cy5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VzVGFnLnB1c2godGhpcy5wcm9kdWN0cy5sYW5ndWFnZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0cy5kZXBhcnRtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXBhcnRtZW50c1RhZy5wdXNoKHRoaXMucHJvZHVjdHMuZGVwYXJ0bWVudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0cy5jYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNUYWcucHVzaCh0aGlzLnByb2R1Y3RzLmNhdGVnb3JpZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0cy5pbmR1c3RyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZHVzdHJpZXNUYWcucHVzaCh0aGlzLnByb2R1Y3RzLmluZHVzdHJpZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2R1Y3RzLmZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmVzLnB1c2godGhpcy5wcm9kdWN0cy5mZWF0dXJlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5hcHBzX3RoLmZlYXR1cmVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZXNfdGgucHVzaCh0aGlzLmFwcHNfdGguZmVhdHVyZXNbaV0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvZHVjdHMuc2NyZWVuc2hvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuc2hvdHMucHVzaCh0aGlzLnByb2R1Y3RzLnNjcmVlbnNob3RzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRodW1ibmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zY3JlZW5zaG90c1swXS51cmw7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vQWZ0ZXIgZ2V0IHBhcmFtIElkXG4gICAgICAgICAgICB0aGlzLmdldExvZ1Byb2R1Y3QoKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0ZvciBOZWVkcyBSZXZpZXdcbiAgICBvblN1Ym1pdCh2YWx1ZTogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJldmlld2VkID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzTG9nID0gbmV3IFN0YXR1c0xvZyhcbiAgICAgICAgICAgIHRoaXMubXlGb3JtQWRtaW5SZXZpZXcudmFsdWUuY29tbWVudFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdHVzJCA9IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLnVwZGF0ZVByb2R1Y3RTdGF0dXMoXG4gICAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgICAgJ2RlbnknLFxuICAgICAgICAgICAgc3RhdHVzTG9nXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zdWJfdXBkYXRlU3RhdHVzID0gdGhpcy51cGRhdGVTdGF0dXMkLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXZpZXdlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUmVmcmVzaCgpO1xuICAgICAgICAgICAgdGhpcy5teUZvcm1BZG1pblJldmlldy5yZXNldCgpO1xuICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3IpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlUHJvZHVjdFN0YXR1cyhpZDogYW55LCBzdGF0dXM6IGFueSkge1xuICAgICAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMkID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlUHJvZHVjdFN0YXR1cyhpZCwgc3RhdHVzKTtcbiAgICAgICAgdGhpcy5zdWJfdXBkYXRlU3RhdHVzID0gdGhpcy51cGRhdGVTdGF0dXMkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJlZnJlc2goKTtcblxuICAgICAgICB9LCBlcnJvciA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3IpO1xuICAgIH1cblxuXG4gICAgLypTY3JlZW5zaG90Ki9cbiAgICBvblNlbGVjdChfc2NyZWVuc2hvdDogc3RyaW5nLCBpOiBudW1iZXIsIGo6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gX3NjcmVlbnNob3Q7XG5cbiAgICAgICAgaWYgKGkgIT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9ICgoaiArIDEpICsgKDQgKiBpKSAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbnRyb2woY29uZGl0aW9uOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoY29uZGl0aW9uID09ICdwbHVzJykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA8IHRoaXMuc2NyZWVuc2hvdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuc2NyZWVuc2hvdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2NyZWVuc2hvdHNbdGhpcy5pbmRleF0udXJsO1xuICAgIH1cblxuXG4gICAgc2V0VGh1bWJuYWlsKCkge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgTWF0aC5jZWlsKCh0aGlzLnNjcmVlbnNob3RzLmxlbmd0aCAvIDQpKTsgaSsrKSB7XG5cbiAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsW2ldID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGo6IG51bWJlciA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudCA8IHRoaXMuc2NyZWVuc2hvdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsW2ldW2pdID0gdGhpcy5zY3JlZW5zaG90c1t0aGlzLmNvdW50XS51cmw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHZpZGVvOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBlbWJlZFlvdXR1YmUodXJsOiBhbnkpIHtcblxuICAgICAgICBpZiAodXJsICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy52aWRlbyA9IHRydWU7XG4gICAgICAgICAgICBsZXQgaWQgPSB1cmwuc3BsaXQoJz0nLCAyKVsxXTtcbiAgICAgICAgICAgIHRoaXMuZW1iZWRVcmwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2lkfWApO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdvVG9MaXN0aW5nKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW2BhZG1pbi9saXN0aW5nYF0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBnZXRMb2dQcm9kdWN0KCkge1xuICAgICAgICB0aGlzLmxvZ3MkID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UuZ2V0TG9nUHJvZHVjdCh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5zdWJfbG9ncyA9IHRoaXMubG9ncyQuc3Vic2NyaWJlKChsb2dzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9ncyA9IGxvZ3MuZGF0YTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KSwgKGVycjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IGVycjtcbiAgICB9XG5cbiAgICBzdWJfZGVsZXRlOiBTdWJzY3JpcHRpb247XG4gICAgZGVsZXRlUHJvZHVjdCQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIGRlbGV0ZVByb2R1Y3QoaWQ6IGFueSkge1xuICAgICAgICB0aGlzLmRlbGV0ZVByb2R1Y3QkID0gdGhpcy5fcHJvZHVjdFNlcnZpY2UuZGVsZXRlUHJvZHVjdChpZCk7XG4gICAgICAgIHRoaXMuc3ViX2RlbGV0ZSA9IHRoaXMuZGVsZXRlUHJvZHVjdCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbYGFkbWluL2xpc3RpbmdgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoYWlJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25DaGFuZ2VMYW5ndWFlRnJvbShsYW5nOiBzdHJpbmcpIHtcblxuICAgICAgICBzd2l0Y2ggKGxhbmcpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RoJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRoYWlJbnB1dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgdGhpcy50aGFpSW5wdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy50aGFpSW5wdXQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==