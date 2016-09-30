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
var ProductSearchComponent = (function () {
    function ProductSearchComponent(route, _router, _productService) {
        this.route = route;
        this._router = _router;
        this._productService = _productService;
        this.loading = true;
        this.readonly = true;
        this.products = [];
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
        this.tempAllTag = [];
        this.tempDepartment = [];
        this.tempIndustry = [];
        this.tempLanguage = [];
    }
    ProductSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.all_product$ = this._productService.getProduct();
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.service_id = +params['id'];
            _this.all_product$.subscribe(function (products) {
                _this.loading = false;
                _this.getProductTags();
            });
        });
    };
    ProductSearchComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    ProductSearchComponent.prototype.getProductTags = function () {
        var _this = this;
        this.products_filter = this.products;
        this._productService.getProductTags()
            .subscribe(function (product_tags) {
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
                    _this.title_category_name = _this.all_tag[i].name;
                    _this.sendFilter();
                }
            }
            var _a;
        }),
            function (error) { return _this.errorMessage = error; };
    };
    ProductSearchComponent.prototype.setFilter = function () {
        for (var i = 0; i < this.all_tag.length; i++) {
            this.options[i] = [];
            for (var j = 0; j < this.products.length; j++) {
                for (var k = 0; k < this.products[j].tag.length; k++) {
                    if (this.products[j].tag[k].name == this.all_tag[i].name) {
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
    ProductSearchComponent.prototype.onCheckAllIndustry = function (event) {
        this.tempIndustry;
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_industry = true;
        }
        else {
            this.all_industry = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'industry') {
                this.onCheckboxFilterTag(this.all_tag[i].dbid, this.all_tag[i].type, event);
            }
        }
    };
    ProductSearchComponent.prototype.onCheckAllCategory = function (event) {
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_category = true;
        }
        else {
            this.all_category = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'category') {
                this.onCheckboxFilterTag(this.all_tag[i].dbid, this.all_tag[i].type, event);
            }
        }
    };
    ProductSearchComponent.prototype.onCheckAllLanguage = function (event) {
        this.tempLanguage;
        this.service_id = null;
        if (event.currentTarget.checked == true) {
            this.all_language = true;
        }
        else {
            this.all_language = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'language') {
                this.onCheckboxFilterTag(this.all_tag[i].dbid, this.all_tag[i].type, event);
            }
        }
    };
    ProductSearchComponent.prototype.onCheckAllDepartment = function (event) {
        this.service_id = null;
        this.tempDepartment;
        if (event.currentTarget.checked == true) {
            this.all_department = true;
        }
        else {
            this.all_department = false;
        }
        for (var i = 0; i < this.all_tag.length; i++) {
            if (this.all_tag[i].type === 'department') {
                this.onCheckboxFilterTag(this.all_tag[i].dbid, this.all_tag[i].type, event);
            }
        }
    };
    ProductSearchComponent.prototype.onAutoCheckboxFilterTag = function (value) {
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
    ProductSearchComponent.prototype.onCheckboxFilterTag = function (value, type, event) {
        this.tempAllTag = [];
        if (event.currentTarget.checked == true) {
            switch (type) {
                case 'department':
                    this.tempDepartment.push(value);
                    break;
                case 'industry':
                    this.tempIndustry.push(value);
                    break;
                case 'language':
                    this.tempLanguage.push(value);
                    break;
            }
            this.sendFilter();
        }
        if (event.currentTarget.checked == false) {
            switch (type) {
                case 'department':
                    var i = _.findIndex(this.tempDepartment, (value));
                    this.tempDepartment.splice(i, 1);
                    break;
                case 'industry':
                    var j = _.findIndex(this.tempIndustry, (value));
                    this.tempIndustry.splice(j, 1);
                    break;
                case 'language':
                    var k = _.findIndex(this.tempLanguage, (value));
                    this.tempLanguage.splice(k, 1);
                    break;
            }
            this.sendFilter();
        }
        this.product_length = this.products_filter.length;
    };
    ProductSearchComponent.prototype.getStyle = function (categoryId) {
        return (this.service_id == categoryId) ? '#f5f5f5' : '#ffffff';
    };
    ProductSearchComponent.prototype.goToProductList = function (categoryId) {
        if (this.service_id != categoryId) {
            this._router.navigate([("/product/" + categoryId)]);
            //Reset all_tag when user click link navbar
            this.products = [];
            this.all_tag = [];
            this.temp_products = [];
            this.checkedFirst = false;
        }
    };
    ProductSearchComponent.prototype.goToProductDetail = function (productId) {
        this._router.navigate([("product/" + productId + "/detail")]);
    };
    ProductSearchComponent.prototype.sendFilter = function () {
        this.tempAllTag = [];
        var category = this.title_category_name;
        this.tempAllTag.push(category, {
            'type': 'department',
            'value': this.tempDepartment
        }, {
            'type': 'industry',
            'value': this.tempIndustry
        }, {
            'type': 'language',
            'value': this.tempLanguage
        });
        // console.log(this.tempAllTag);
    };
    ProductSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-product',
            templateUrl: 'templates/product-list.component.html',
            styleUrls: ['styles/product-list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
    ], ProductSearchComponent);
    return ProductSearchComponent;
}());
exports.ProductSearchComponent = ProductSearchComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3QvcHJvZHVjdC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsdUJBQXdDLGlCQUFpQixDQUFDLENBQUE7QUFHMUQsZ0NBQTZCLCtDQUErQyxDQUFDLENBQUE7QUFLN0U7O0dBRUc7QUFRSDtJQXlDSSxnQ0FBb0IsS0FBcUIsRUFDckIsT0FBZSxFQUNmLGVBQStCO1FBRi9CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUE5Qm5ELFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUt6QixhQUFRLEdBQVUsRUFBRSxDQUFDO1FBS3JCLGdDQUFnQztRQUNoQyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBRzFCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBRWxDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLG9CQUFvQjtRQUNwQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBcUZ4QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQXFCOUIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFxQjlCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBc0I5QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQWtDaEMsZUFBVSxHQUFTLEVBQUUsQ0FBQztRQUN0QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUN2QixpQkFB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b25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSAgICBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIE9ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1Byb2R1Y3R9IGZyb20gXCIuLi9zaGFyZWQvbW9kZWxzL3Byb2R1Y3QubW9kZWxcIjtcbmltcG9ydCB7UHJvZHVjdFNlcnZpY2V9IGZyb20gXCIuLi9zaGFyZWQvYXBpLXNlcnZpY2UvcHJvZHVjdC9wcm9kdWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7UHJvZHVjdFRhZ3N9IGZyb20gXCIuLi9zaGFyZWQvbW9kZWxzL3Byb2R1Y3QtdGFnLm1vZGVsXCI7XG5cbmRlY2xhcmUgdmFyIF86IGFueTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGxhenkgbG9hZGVkIEhvbWVDb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdzZC1wcm9kdWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzdHlsZXMvcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvLyBwdWJsaWMgc3RhdHVzOiBPYmplY3QgPSB7XG4gICAgLy8gICAgIGlzRmlyc3RPcGVuOiB0cnVlLFxuICAgIC8vICAgICBpc0ZpcnN0RGlzYWJsZWQ6IGZhbHNlLFxuICAgIC8vICAgICBjYXRlZ29yeTogZmFsc2VcbiAgICAvLyB9O1xuXG5cbiAgICBzdGF0dXNfdHlwZTogc3RyaW5nO1xuICAgIHRpdGxlX2NhdGVnb3J5X25hbWU6IHN0cmluZztcblxuICAgIGVycm9yTWVzc2FnZTogYW55O1xuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHJlYWRvbmx5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHN1YjogU3Vic2NyaXB0aW9uO1xuXG4gICAgYWxsX3Byb2R1Y3QkOiBPYnNlcnZhYmxlPGFueT47XG4gICAgcHJvZHVjdHM6IGFueVtdID0gW107XG5cbiAgICAvKkF1dG8gRmlsdGVyKi9cbiAgICBzZXJ2aWNlX2lkOiBudW1iZXI7XG5cbiAgICAvKnZhcmlhYmxlIGZvciBmaWx0ZXIgZnVuY3Rpb24qL1xuICAgIG9wdGlvbnM6IGFueSA9IFtdO1xuICAgIHRlbXBfcHJvZHVjdHM6IGFueSA9IFtdO1xuICAgIHByb2R1Y3RzX2ZpbHRlcjogYW55ID0gW107XG4gICAgcHJvZHVjdF9sZW5ndGg6IG51bWJlcjtcblxuICAgIGFsbF90YWc6IGFueVtdID0gW107XG4gICAgbGFuZ3VhZ2VzVGFnOiBQcm9kdWN0VGFnc1tdID0gW107XG4gICAgZGVwYXJ0bWVudHNUYWc6IFByb2R1Y3RUYWdzW10gPSBbXTtcbiAgICBpbmR1c3RyaWVzVGFnOiBQcm9kdWN0VGFnc1tdID0gW107XG4gICAgY2F0ZWdvcmllc1RhZzogUHJvZHVjdFRhZ3NbXSA9IFtdO1xuXG4gICAgY2hlY2tlZEZpcnN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvL1Nob3cgQ2F0ZWdvcnkgTGlua1xuICAgIGVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hbGxfcHJvZHVjdCQgPSB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0KCk7XG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZVxuICAgICAgICAgICAgLnBhcmFtc1xuICAgICAgICAgICAgLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZV9pZCA9ICtwYXJhbXNbJ2lkJ107XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9wcm9kdWN0JC5zdWJzY3JpYmUoKHByb2R1Y3RzOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByb2R1Y3RUYWdzKCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0UHJvZHVjdFRhZ3MoKSB7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0c19maWx0ZXIgPSB0aGlzLnByb2R1Y3RzO1xuICAgICAgICB0aGlzLl9wcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0VGFncygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIHByb2R1Y3RfdGFncyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZXNUYWcgPSBwcm9kdWN0X3RhZ3MubGFuZ3VhZ2VzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlcGFydG1lbnRzVGFnID0gcHJvZHVjdF90YWdzLmRlcGFydG1lbnRzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNUYWcgPSBwcm9kdWN0X3RhZ3MuY2F0ZWdvcmllcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmR1c3RyaWVzVGFnID0gcHJvZHVjdF90YWdzLmluZHVzdHJpZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2VzVGFnICE9IFtdICYmIHRoaXMuZGVwYXJ0bWVudHNUYWcgIT0gW10gJiYgdGhpcy5jYXRlZ29yaWVzVGFnICE9IFtdICYmIHRoaXMuaW5kdXN0cmllc1RhZyAhPSBbXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxfdGFnLnB1c2goLi4udGhpcy5pbmR1c3RyaWVzVGFnLCAuLi50aGlzLmNhdGVnb3JpZXNUYWcsIC4uLnRoaXMubGFuZ3VhZ2VzVGFnLCAuLi50aGlzLmRlcGFydG1lbnRzVGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQXV0b0NoZWNrYm94RmlsdGVyVGFnKHRoaXMuc2VydmljZV9pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIC8vU2VydmljZSBJZCBQbHVzIDEgYmVjYXVzZSBzZXJ2aWNlX2lkIHN0YXJ0IGluZGV4IGF0IDAgYnV0IGFsbHRhZyBzdGFydCAxXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxfdGFnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbGxfdGFnW2ldLmlkID09PSB0aGlzLnNlcnZpY2VfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c190eXBlID0gdGhpcy5hbGxfdGFnW2ldLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZV9jYXRlZ29yeV9uYW1lID0gdGhpcy5hbGxfdGFnW2ldLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRGaWx0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gdGhpcy5lcnJvck1lc3NhZ2UgPSA8YW55PmVycm9yXG4gICAgfVxuXG4gICAgc2V0RmlsdGVyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWxsX3RhZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucHJvZHVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMucHJvZHVjdHNbal0udGFnLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2R1Y3RzW2pdLnRhZ1trXS5uYW1lID09IHRoaXMuYWxsX3RhZ1tpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uSWQ6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMucHJvZHVjdHNbal0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wcm9kdWN0c1tqXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0ZGVzY3JpcHRpb246IHRoaXMucHJvZHVjdHNbal0uc2hvcnRkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvOiB0aGlzLnByb2R1Y3RzW2pdLmxvZ29cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsX2luZHVzdHJ5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkNoZWNrQWxsSW5kdXN0cnkoZXZlbnQ6IGFueSkge1xuXG4gICAgICAgIHRoaXMudGVtcEluZHVzdHJ5O1xuICAgICAgICB0aGlzLnNlcnZpY2VfaWQgPSBudWxsO1xuXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbGxfaW5kdXN0cnkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbGxfaW5kdXN0cnkgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxfdGFnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxfdGFnW2ldLnR5cGUgPT09ICdpbmR1c3RyeScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hlY2tib3hGaWx0ZXJUYWcodGhpcy5hbGxfdGFnW2ldLmRiaWQsIHRoaXMuYWxsX3RhZ1tpXS50eXBlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFsbF9jYXRlZ29yeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25DaGVja0FsbENhdGVnb3J5KGV2ZW50OiBhbnkpIHtcblxuXG4gICAgICAgIHRoaXMuc2VydmljZV9pZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmFsbF9jYXRlZ29yeSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsbF9jYXRlZ29yeSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFsbF90YWcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbF90YWdbaV0udHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGVja2JveEZpbHRlclRhZyh0aGlzLmFsbF90YWdbaV0uZGJpZCwgdGhpcy5hbGxfdGFnW2ldLnR5cGUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYWxsX2xhbmd1YWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkNoZWNrQWxsTGFuZ3VhZ2UoZXZlbnQ6IGFueSkge1xuXG4gICAgICAgIHRoaXMudGVtcExhbmd1YWdlO1xuXG4gICAgICAgIHRoaXMuc2VydmljZV9pZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmFsbF9sYW5ndWFnZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsbF9sYW5ndWFnZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFsbF90YWcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbF90YWdbaV0udHlwZSA9PT0gJ2xhbmd1YWdlJykge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGVja2JveEZpbHRlclRhZyh0aGlzLmFsbF90YWdbaV0uZGJpZCwgdGhpcy5hbGxfdGFnW2ldLnR5cGUsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYWxsX2RlcGFydG1lbnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uQ2hlY2tBbGxEZXBhcnRtZW50KGV2ZW50OiBhbnkpIHtcblxuICAgICAgICB0aGlzLnNlcnZpY2VfaWQgPSBudWxsO1xuICAgICAgICB0aGlzLnRlbXBEZXBhcnRtZW50O1xuXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbGxfZGVwYXJ0bWVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFsbF9kZXBhcnRtZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWxsX3RhZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsX3RhZ1tpXS50eXBlID09PSAnZGVwYXJ0bWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hlY2tib3hGaWx0ZXJUYWcodGhpcy5hbGxfdGFnW2ldLmRiaWQsIHRoaXMuYWxsX3RhZ1tpXS50eXBlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uQXV0b0NoZWNrYm94RmlsdGVyVGFnKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkRmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCh2YWx1ZSAtIDEpID09IGkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBfcHJvZHVjdHMucHVzaCguLi50aGlzLm9wdGlvbnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvZHVjdHNfZmlsdGVyID0gXy51bmlxQnkodGhpcy50ZW1wX3Byb2R1Y3RzLCAnaWQnKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3RfbGVuZ3RoID0gdGhpcy5wcm9kdWN0c19maWx0ZXIubGVuZ3RoO1xuXG4gICAgfVxuXG4gICAgdGVtcEFsbFRhZyA6IGFueSA9IFtdO1xuICAgIHRlbXBEZXBhcnRtZW50OiBhbnkgPSBbXTtcbiAgICB0ZW1wSW5kdXN0cnk6IGFueSA9IFtdO1xuICAgIHRlbXBMYW5ndWFnZTogYW55ID0gW107XG5cbiAgICBvbkNoZWNrYm94RmlsdGVyVGFnKHZhbHVlOiBhbnksIHR5cGU6IHN0cmluZywgZXZlbnQ6IGFueSkge1xuXG4gICAgICAgIHRoaXMudGVtcEFsbFRhZyA9IFtdO1xuXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQgPT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkZXBhcnRtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wRGVwYXJ0bWVudC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kdXN0cnknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBJbmR1c3RyeS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMYW5ndWFnZS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VuZEZpbHRlcigpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkID09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlcGFydG1lbnQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IF8uZmluZEluZGV4KHRoaXMudGVtcERlcGFydG1lbnQsICh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBEZXBhcnRtZW50LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kdXN0cnknOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaiA9IF8uZmluZEluZGV4KHRoaXMudGVtcEluZHVzdHJ5LCAodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wSW5kdXN0cnkuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBrID0gXy5maW5kSW5kZXgodGhpcy50ZW1wTGFuZ3VhZ2UsICh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMYW5ndWFnZS5zcGxpY2UoaywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbmRGaWx0ZXIoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0X2xlbmd0aCA9IHRoaXMucHJvZHVjdHNfZmlsdGVyLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRTdHlsZShjYXRlZ29yeUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNlcnZpY2VfaWQgPT0gY2F0ZWdvcnlJZCkgPyAnI2Y1ZjVmNScgOiAnI2ZmZmZmZic7XG4gICAgfVxuXG5cbiAgICBnb1RvUHJvZHVjdExpc3QoY2F0ZWdvcnlJZDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2VfaWQgIT0gY2F0ZWdvcnlJZCkge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtgL3Byb2R1Y3QvJHtjYXRlZ29yeUlkfWBdKTtcbiAgICAgICAgICAgIC8vUmVzZXQgYWxsX3RhZyB3aGVuIHVzZXIgY2xpY2sgbGluayBuYXZiYXJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYWxsX3RhZyA9IFtdO1xuICAgICAgICAgICAgdGhpcy50ZW1wX3Byb2R1Y3RzID0gW107XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRGaXJzdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ29Ub1Byb2R1Y3REZXRhaWwocHJvZHVjdElkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFtgcHJvZHVjdC8ke3Byb2R1Y3RJZH0vZGV0YWlsYF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy50ZW1wQWxsVGFnID0gW107XG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXMudGl0bGVfY2F0ZWdvcnlfbmFtZTtcbiAgICAgICAgdGhpcy50ZW1wQWxsVGFnLnB1c2goXG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdkZXBhcnRtZW50JyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiB0aGlzLnRlbXBEZXBhcnRtZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICd0eXBlJzogJ2luZHVzdHJ5JyxcbiAgICAgICAgICAgICAgICAndmFsdWUnOiB0aGlzLnRlbXBJbmR1c3RyeVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdsYW5ndWFnZScsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogdGhpcy50ZW1wTGFuZ3VhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRlbXBBbGxUYWcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==