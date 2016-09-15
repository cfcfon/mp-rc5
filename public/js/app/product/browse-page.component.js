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
var router_1 = require('@angular/router');
var product_service_1 = require("../shared/api-service/product/product.service");
/**
 * This class represents the lazy loaded HomeComponent.
 */
var BrowsePageComponent = (function () {
    function BrowsePageComponent(route, _router, _productService) {
        this.route = route;
        this._router = _router;
        this._productService = _productService;
        this.status = {
            isFirstOpen: true,
            isFirstDisabled: false,
            category: false
        };
        this.loading = true;
        this.readonly = true;
        /*variable for filter function*/
        this.options = [];
        this.temp_products = [];
        this.products_filter = [];
        this.all_tag = [];
        this.languagesTag = [];
        this.departmentsTag = [];
        this.industriesTag = [];
        this.categoriesTag = [];
        this.checkedFirst = false;
        //Show Category Link
        this.enable = false;
        this.all_industry = false;
        this.all_category = false;
        this.all_language = false;
        this.all_department = false;
    }
    BrowsePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.all_product$ = this._productService.getProduct();
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.service_id = +params['id'];
            _this.all_product$.subscribe(function (products) {
                _this.products = products;
                _this.loading = false;
                //Reset all_tag when user click link navbar
                _this.all_tag = [];
                _this.temp_products = [];
                _this.checkedFirst = false;
                _this.getProductTags();
            });
        });
    };
    BrowsePageComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    BrowsePageComponent.prototype.getProductTags = function () {
        var _this = this;
        this.products_filter = this.products;
        this._productService.getProductTags()
            .subscribe(function (product_tags) {
            console.log(product_tags);
            _this.languagesTag = product_tags.languages;
            _this.departmentsTag = product_tags.departments;
            _this.categoriesTag = product_tags.categories;
            _this.industriesTag = product_tags.industries;
            if (_this.languagesTag != [] && _this.departmentsTag != [] && _this.categoriesTag != [] && _this.industriesTag != []) {
                (_a = _this.all_tag).push.apply(_a, _this.industriesTag.concat(_this.categoriesTag, _this.languagesTag, _this.departmentsTag));
                _this.setFilter();
                _this.onAutoCheckboxFilterTag(_this.service_id);
            }
            //Service Id Plus 1 because service_id start index at 0 but alltag start 1
            for (var i = 0; i < _this.all_tag.length; i++) {
                if (_this.all_tag[i].id === _this.service_id) {
                    _this.status_type = _this.all_tag[i].type;
                }
            }
            console.log(_this.status_type);
            var _a;
        }),
            function (error) { return _this.errorMessage = error; };
    };
    BrowsePageComponent.prototype.setFilter = function () {
        for (var i = 0; i < this.all_tag.length; i++) {
            this.options[i] = [];
            for (var j = 0; j < this.products.length; j++) {
                for (var k = 0; k < this.products[j].tag.length; k++) {
                    if (this.products[j].tag[k] == this.all_tag[i].name) {
                        this.options[i].push({
                            optionId: i,
                            id: this.products[j].id,
                            name: this.products[j].name,
                            shortdescription: this.products[j].shortdescription,
                            logo: this.products[j].logo
                        });
                    }
                }
            }
        }
    };
    BrowsePageComponent.prototype.onCheckAllIndustry = function (event) {
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_industry = true;
        }
        else {
            this.all_industry = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'industry') {
                this.onCheckboxFilterTag(this.all_tag[i].id, event);
            }
        }
    };
    BrowsePageComponent.prototype.onCheckAllCategory = function (event) {
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_category = true;
        }
        else {
            this.all_category = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'category') {
                this.onCheckboxFilterTag(this.all_tag[i].id, event);
            }
        }
    };
    BrowsePageComponent.prototype.onCheckAllLanguage = function (event) {
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_language = true;
        }
        else {
            this.all_language = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'language') {
                this.onCheckboxFilterTag(this.all_tag[i].id, event);
            }
        }
    };
    BrowsePageComponent.prototype.onCheckAllDepartment = function (event) {
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_department = true;
        }
        else {
            this.all_department = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'department') {
                this.onCheckboxFilterTag(this.all_tag[i].id, event);
            }
        }
    };
    BrowsePageComponent.prototype.onAutoCheckboxFilterTag = function (value) {
        this.checkedFirst = true;
        for (var i = 0; i < this.options.length; i++) {
            if ((value - 1) == i) {
                (_a = this.temp_products).push.apply(_a, this.options[i]);
            }
        }
        this.products_filter = _.uniqBy(this.temp_products, 'id');
        this.product_length = this.products_filter.length;
        var _a;
    };
    BrowsePageComponent.prototype.onCheckboxFilterTag = function (value, event) {
        if (event.currentTarget.checked == true) {
            for (var i = 0; i < this.options.length; i++) {
                if ((value - 1) == i) {
                    (_a = this.temp_products).push.apply(_a, this.options[i]);
                }
            }
            this.products_filter = _.uniqBy(this.temp_products, 'name');
        }
        if (event.currentTarget.checked == false) {
            this.temp_products = _.filter(this.temp_products, function (temp_products) {
                return temp_products.optionId !== (value - 1);
            });
            if (_.isEmpty(this.temp_products)) {
                this.products_filter = this.products;
            }
            else {
                this.products_filter = _.uniqBy(this.temp_products, 'name');
            }
        }
        console.log(this.products_filter);
        this.product_length = this.products_filter.length;
        var _a;
    };
    BrowsePageComponent.prototype.goToProductDetail = function (productId) {
        this._router.navigate([("product/" + productId + "/detail")]);
    };
    BrowsePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-product',
            templateUrl: 'templates/browse-page.component.html',
            styleUrls: ['styles/product-list.component.css'],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
    ], BrowsePageComponent);
    return BrowsePageComponent;
}());
exports.BrowsePageComponent = BrowsePageComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3QvYnJvd3NlLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFHMUQsZ0NBQTZCLCtDQUErQyxDQUFDLENBQUE7QUFLN0U7O0dBRUc7QUFRSDtJQTBDSSw2QkFBb0IsS0FBcUIsRUFDckIsT0FBYyxFQUNkLGVBQStCO1FBRi9CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQU87UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUF6QzVDLFdBQU0sR0FBVTtZQUNuQixXQUFXLEVBQUUsSUFBSTtZQUNqQixlQUFlLEVBQUUsS0FBSztZQUN0QixRQUFRLEVBQUMsS0FBSztTQUNqQixDQUFDO1FBT0YsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBVTFCLGdDQUFnQztRQUNoQyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBRzFCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBRWxDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLG9CQUFvQjtRQUNwQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBd0Z4QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQW1COUIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFvQjlCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBb0I5QixtQkFBYyxHQUFZLEtBQUssQ0FBQztJQTdJaEMsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFB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SUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoRSxDQUFDO1FBRUwsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7O0lBQ3RELENBQUM7SUFFRCwrQ0FBaUIsR0FBakIsVUFBa0IsU0FBZ0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFXLFNBQVMsYUFBUyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBaFFMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ25ELENBQUM7OzJCQUFBO0lBNlBGLDBCQUFDO0FBQUQsQ0EzUEEsQUEyUEMsSUFBQTtBQTNQWSwyQkFBbUIsc0JBMlAvQixDQUFBIiwiZmlsZSI6InByb2R1Y3QvYnJvd3NlLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gICAgZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtQcm9kdWN0fSBmcm9tIFwiLi4vc2hhcmVkL21vZGVscy9wcm9kdWN0Lm1vZGVsXCI7XG5pbXBvcnQge1Byb2R1Y3RTZXJ2aWNlfSBmcm9tIFwiLi4vc2hhcmVkL2FwaS1zZXJ2aWNlL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlXCI7XG5pbXBvcnQge1Byb2R1Y3RUYWdzfSBmcm9tIFwiLi4vc2hhcmVkL21vZGVscy9wcm9kdWN0LXRhZy5tb2RlbFwiO1xuXG5kZWNsYXJlIHZhciBfOiBhbnk7XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIHRoZSBsYXp5IGxvYWRlZCBIb21lQ29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnc2QtcHJvZHVjdCcsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYnJvd3NlLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdHlsZXMvcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBCcm93c2VQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG5cbiAgICBwdWJsaWMgc3RhdHVzOk9iamVjdCA9IHtcbiAgICAgICAgaXNGaXJzdE9wZW46IHRydWUsXG4gICAgICAgIGlzRmlyc3REaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIGNhdGVnb3J5OmZhbHNlXG4gICAgfTtcblxuXG4gICAgc3RhdHVzX3R5cGU6c3RyaW5nO1xuXG5cbiAgICBlcnJvck1lc3NhZ2U6IGFueTtcbiAgICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICByZWFkb25seSA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgICBhbGxfcHJvZHVjdCQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBwcm9kdWN0czogYW55W107XG5cbiAgICAvKkF1dG8gRmlsdGVyKi9cbiAgICBzZXJ2aWNlX2lkOiBudW1iZXI7XG5cbiAgICAvKnZhcmlhYmxlIGZvciBmaWx0ZXIgZnVuY3Rpb24qL1xuICAgIG9wdGlvbnM6IGFueSA9IFtdO1xuICAgIHRlbXBfcHJvZHVjdHM6IGFueSA9IFtdO1xuICAgIHByb2R1Y3RzX2ZpbHRlcjogYW55ID0gW107XG4gICAgcHJvZHVjdF9sZW5ndGg6IG51bWJlcjtcblxuICAgIGFsbF90YWc6IGFueVtdID0gW107XG4gICAgbGFuZ3VhZ2VzVGFnOiBQcm9kdWN0VGFnc1tdID0gW107XG4gICAgZGVwYXJ0bWVudHNUYWc6IFByb2R1Y3RUYWdzW10gPSBbXTtcbiAgICBpbmR1c3RyaWVzVGFnOiBQcm9kdWN0VGFnc1tdID0gW107XG4gICAgY2F0ZWdvcmllc1RhZzogUHJvZHVjdFRhZ3NbXSA9IFtdO1xuXG4gICAgY2hlY2tlZEZpcnN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL1Nob3cgQ2F0ZWdvcnkgTGlua1xuICAgIGVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVyOlJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFsbF9wcm9kdWN0JCA9IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3QoKTtcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlXG4gICAgICAgICAgICAucGFyYW1zXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlX2lkID0gK3BhcmFtc1snaWQnXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYWxsX3Byb2R1Y3QkLnN1YnNjcmliZSgocHJvZHVjdHM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vUmVzZXQgYWxsX3RhZyB3aGVuIHVzZXIgY2xpY2sgbGluayBuYXZiYXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxfdGFnID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcF9wcm9kdWN0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRGaXJzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UHJvZHVjdFRhZ3MoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViKSB7XG4gICAgICAgICAgICB0aGlzLnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRQcm9kdWN0VGFncygpIHtcblxuICAgICAgICB0aGlzLnByb2R1Y3RzX2ZpbHRlciA9IHRoaXMucHJvZHVjdHM7XG4gICAgICAgIHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmdldFByb2R1Y3RUYWdzKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgcHJvZHVjdF90YWdzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdF90YWdzKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhbmd1YWdlc1RhZyA9IHByb2R1Y3RfdGFncy5sYW5ndWFnZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVwYXJ0bWVudHNUYWcgPSBwcm9kdWN0X3RhZ3MuZGVwYXJ0bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllc1RhZyA9IHByb2R1Y3RfdGFncy5jYXRlZ29yaWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZHVzdHJpZXNUYWcgPSBwcm9kdWN0X3RhZ3MuaW5kdXN0cmllcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYW5ndWFnZXNUYWcgIT0gW10gJiYgdGhpcy5kZXBhcnRtZW50c1RhZyAhPSBbXSAmJiB0aGlzLmNhdGVnb3JpZXNUYWcgIT0gW10gJiYgdGhpcy5pbmR1c3RyaWVzVGFnICE9IFtdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF90YWcucHVzaCguLi50aGlzLmluZHVzdHJpZXNUYWcsIC4uLnRoaXMuY2F0ZWdvcmllc1RhZywgLi4udGhpcy5sYW5ndWFnZXNUYWcsIC4uLnRoaXMuZGVwYXJ0bWVudHNUYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRGaWx0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25BdXRvQ2hlY2tib3hGaWx0ZXJUYWcodGhpcy5zZXJ2aWNlX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vU2VydmljZSBJZCBQbHVzIDEgYmVjYXVzZSBzZXJ2aWNlX2lkIHN0YXJ0IGluZGV4IGF0IDAgYnV0IGFsbHRhZyBzdGFydCAxXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmFsbF90YWcubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hbGxfdGFnW2ldLmlkID09PSB0aGlzLnNlcnZpY2VfaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNfdHlwZSA9IHRoaXMuYWxsX3RhZ1tpXS50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0dXNfdHlwZSk7XG5cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiB0aGlzLmVycm9yTWVzc2FnZSA9IDxhbnk+ZXJyb3JcbiAgICB9XG5cbiAgICBzZXRGaWx0ZXIoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxfdGFnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5wcm9kdWN0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5wcm9kdWN0c1tqXS50YWcubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZHVjdHNbal0udGFnW2tdID09IHRoaXMuYWxsX3RhZ1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uSWQ6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvZHVjdHNbal0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9kdWN0c1tqXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0ZGVzY3JpcHRpb246IHRoaXMucHJvZHVjdHNbal0uc2hvcnRkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvOiB0aGlzLnByb2R1Y3RzW2pdLmxvZ29cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsX2luZHVzdHJ5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkNoZWNrQWxsSW5kdXN0cnkoZXZlbnQ6YW55KXtcblxuICAgICAgICB0aGlzLnNlcnZpY2VfaWQgPSBudWxsO1xuXG4gICAgICAgICBpZihldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgdGhpcy5hbGxfaW5kdXN0cnkgPSB0cnVlO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgdGhpcy5hbGxfaW5kdXN0cnkgPSBmYWxzZTtcbiAgICAgICAgIH1cblxuICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuYWxsX3RhZy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgIGlmKHRoaXMuYWxsX3RhZ1tpXS50eXBlID09PSAnaW5kdXN0cnknKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hlY2tib3hGaWx0ZXJUYWcodGhpcy5hbGxfdGFnW2ldLmlkLGV2ZW50KTtcbiAgICAgICAgICAgfVxuICAgICAgIH1cblxuICAgIH1cbiAgICBhbGxfY2F0ZWdvcnk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uQ2hlY2tBbGxDYXRlZ29yeShldmVudDphbnkpe1xuXG4gICAgICAgIHRoaXMuc2VydmljZV9pZCA9IG51bGw7XG5cbiAgICAgICAgaWYoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkID09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5hbGxfY2F0ZWdvcnkgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWxsX2NhdGVnb3J5ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCB0aGlzLmFsbF90YWcubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYodGhpcy5hbGxfdGFnW2ldLnR5cGUgPT09ICdjYXRlZ29yeScpe1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGVja2JveEZpbHRlclRhZyh0aGlzLmFsbF90YWdbaV0uaWQsZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhbGxfbGFuZ3VhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uQ2hlY2tBbGxMYW5ndWFnZShldmVudDphbnkpe1xuXG4gICAgICAgIHRoaXMuc2VydmljZV9pZCA9IG51bGw7XG5cbiAgICAgICAgaWYoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkID09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5hbGxfbGFuZ3VhZ2UgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWxsX2xhbmd1YWdlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPTA7IGkgPCB0aGlzLmFsbF90YWcubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYodGhpcy5hbGxfdGFnW2ldLnR5cGUgPT09ICdsYW5ndWFnZScpe1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGVja2JveEZpbHRlclRhZyh0aGlzLmFsbF90YWdbaV0uaWQsZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhbGxfZGVwYXJ0bWVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25DaGVja0FsbERlcGFydG1lbnQoZXZlbnQ6YW55KXtcblxuICAgICAgICB0aGlzLnNlcnZpY2VfaWQgPSBudWxsO1xuXG4gICAgICAgIGlmKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCA9PSB0cnVlKXtcbiAgICAgICAgICAgIHRoaXMuYWxsX2RlcGFydG1lbnQgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYWxsX2RlcGFydG1lbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuYWxsX3RhZy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZih0aGlzLmFsbF90YWdbaV0udHlwZSA9PT0gJ2RlcGFydG1lbnQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hlY2tib3hGaWx0ZXJUYWcodGhpcy5hbGxfdGFnW2ldLmlkLGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25BdXRvQ2hlY2tib3hGaWx0ZXJUYWcodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoZWNrZWRGaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKHZhbHVlIC0gMSkgPT0gaSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVtcF9wcm9kdWN0cy5wdXNoKC4uLnRoaXMub3B0aW9uc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9kdWN0c19maWx0ZXIgPSBfLnVuaXFCeSh0aGlzLnRlbXBfcHJvZHVjdHMsICdpZCcpO1xuICAgICAgICB0aGlzLnByb2R1Y3RfbGVuZ3RoID0gdGhpcy5wcm9kdWN0c19maWx0ZXIubGVuZ3RoO1xuXG4gICAgfVxuXG4gICAgb25DaGVja2JveEZpbHRlclRhZyh2YWx1ZTogYW55LCBldmVudDogYW55KSB7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgodmFsdWUgLSAxKSA9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBfcHJvZHVjdHMucHVzaCguLi50aGlzLm9wdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdHNfZmlsdGVyID0gXy51bmlxQnkodGhpcy50ZW1wX3Byb2R1Y3RzLCAnbmFtZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wX3Byb2R1Y3RzID0gXy5maWx0ZXIodGhpcy50ZW1wX3Byb2R1Y3RzLCAodGVtcF9wcm9kdWN0czogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wX3Byb2R1Y3RzLm9wdGlvbklkICE9PSAodmFsdWUgLSAxKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRW1wdHkodGhpcy50ZW1wX3Byb2R1Y3RzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzX2ZpbHRlciA9IHRoaXMucHJvZHVjdHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0c19maWx0ZXIgPSBfLnVuaXFCeSh0aGlzLnRlbXBfcHJvZHVjdHMsICduYW1lJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdHNfZmlsdGVyKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3RfbGVuZ3RoID0gdGhpcy5wcm9kdWN0c19maWx0ZXIubGVuZ3RoO1xuICAgIH1cblxuICAgIGdvVG9Qcm9kdWN0RGV0YWlsKHByb2R1Y3RJZDpudW1iZXIpe1xuICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW2Bwcm9kdWN0LyR7cHJvZHVjdElkfS9kZXRhaWxgXSk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
