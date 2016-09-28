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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var storage_1 = require('../../helpers/storage');
var request_1 = require('../../helpers/request');
var config = require('../../config/api.config');
require('rxjs/add/operator/cache');
var ProductService = (function () {
    function ProductService(_http) {
        this._http = _http;
        this.product = [];
    }
    ProductService.prototype.getProductName = function () {
        return this._http.get(config.apiUrl + "product/name?token=" + storage_1.storage.getAuthToken())
            .cache()
            .map(function (response) {
            var data = response.json().data;
            return data;
        })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductTags = function () {
        return this._http.get(config.apiUrl + "product/tags?token=" + storage_1.storage.getAuthToken())
            .cache()
            .map(function (response) {
            var data = response.json().data;
            return data;
        })
            .catch(this.handleError);
    };
    //NOT REQUIRED PERMISSTION
    ProductService.prototype.getProduct = function () {
        return this._http.get(config.apiUrl + "product?token=" + storage_1.storage.getAuthToken())
            .cache()
            .map(function (response) {
            var data = response.json().data;
            return data;
        })
            .catch(this.handleError);
    };
    //PRODUCT OF ONE DEVELOPER [REQUIRED PERMISSION]
    ProductService.prototype.getProductOfDeveloper = function () {
        return this._http.get(config.apiUrl + "product/developer?token=" + storage_1.storage.getAuthToken())
            .cache()
            .map(function (response) {
            var data = response.json().data;
            return data;
        })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductId = function (id) {
        return this._http.get(config.apiUrl + "product/" + id + "?token=" + storage_1.storage.getAuthToken())
            .cache()
            .map(function (response) {
            var data = response.json();
            return data;
        })
            .catch(this.handleError);
    };
    ProductService.prototype.addProduct = function (product) {
        var body = JSON.stringify(product);
        return this._http.post(config.apiUrl + "product?token=" + storage_1.storage.getAuthToken(), body, { headers: request_1.request.getJsonHeaders() }).cache()
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.updateProduct = function (id, product) {
        var body = JSON.stringify(product);
        return this._http.put(config.apiUrl + "product/" + id + "?token=" + storage_1.storage.getAuthToken(), body, { headers: request_1.request.getJsonHeaders() }).cache()
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (id) {
        return this._http.delete(config.apiUrl + "product/" + id + "?token=" + storage_1.storage.getAuthToken())
            .cache()
            .catch(this.handleError);
    };
    //Get Product Status For Admin
    ProductService.prototype.getProductStatus = function (status) {
        return this._http.get(config.apiUrl + "product/list/" + status)
            .cache()
            .map(function (response) {
            var data = response.json();
            return data;
        })
            .catch(this.handleError);
    };
    ProductService.prototype.updateProductStatus = function (id, status, comment) {
        if (comment === void 0) { comment = ""; }
        var body = JSON.stringify(comment);
        return this._http.post(config.apiUrl + "product/" + id + "/" + status + "?token=" + storage_1.storage.getAuthToken(), body, { headers: request_1.request.getJsonHeaders() }).cache()
            .map(this.extractData)
            .catch(this.handleError);
    };
    //GetLogProducts
    ProductService.prototype.getLogProduct = function (id) {
        return this._http.get(config.apiUrl + "product/log/" + id)
            .cache()
            .map(function (response) {
            var data = response.json();
            return data;
        })
            .catch(this.handleError);
    };
    //UpdateTagProduct
    ProductService.prototype.updateTagProducts = function (value) {
        var body = JSON.stringify(value);
        return this._http.post(config.apiUrl + "tag?token=" + storage_1.storage.getAuthToken(), body, { headers: request_1.request.getJsonHeaders() }).cache()
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ProductService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9hcGktc2VydmljZS9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBRTNDLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQywyQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUc3Qyx3QkFBd0IsdUJBQXVCLENBQUMsQ0FBQTtBQUNoRCx3QkFBd0IsdUJBQXVCLENBQUMsQ0FBQTtBQUNoRCxJQUFPLE1BQU0sV0FBVyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ25ELFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQUlqQztJQUlFLHdCQUFxQixLQUFXO1FBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUZoQyxZQUFPLEdBQWMsRUFBRSxDQUFDO0lBR3hCLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLE1BQU0sQ0FBQyxNQUFNLDJCQUFzQixpQkFBTyxDQUFDLFlBQVksRUFBSSxDQUFDO2FBQ2xGLEtBQUssRUFBRTthQUNQLEdBQUcsQ0FBQyxVQUFBLFFBQVE7WUFDWCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFHRCx1Q0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFJLE1BQU0sQ0FBQyxNQUFNLDJCQUFzQixpQkFBTyxDQUFDLFlBQVksRUFBSSxDQUFDO2FBQ2xGLEtBQUssRUFBRTthQUNQLEdBQUcsQ0FBQyxVQUFBLFFBQVE7WUFDWCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxD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QUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQXZJSDtRQUFDLGlCQUFVLEVBQUU7O3NCQUFBO0lBd0liLHFCQUFDO0FBQUQsQ0F2SUEsQUF1SUMsSUFBQTtBQXZJWSxzQkFBYyxpQkF1STFCLENBQUEiLCJmaWxlIjoic2hhcmVkL2FwaS1zZXJ2aWNlL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gICAgICBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc3RvcmFnZSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vLi4vaGVscGVycy9yZXF1ZXN0JztcbmltcG9ydCBjb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcvYXBpLmNvbmZpZycpO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYWNoZSc7XG5pbXBvcnQgQW55ID0gamFzbWluZS5Bbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZSB7XG5cbiAgcHJvZHVjdDogUHJvZHVjdFtdID0gW107XG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgX2h0dHA6IEh0dHApIHtcbiAgfVxuXG4gIGdldFByb2R1Y3ROYW1lKCl7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke2NvbmZpZy5hcGlVcmx9cHJvZHVjdC9uYW1lP3Rva2VuPSR7c3RvcmFnZS5nZXRBdXRoVG9rZW4oKX1gKVxuICAgICAgLmNhY2hlKClcbiAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLmRhdGE7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG5cbiAgZ2V0UHJvZHVjdFRhZ3MoKXtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7Y29uZmlnLmFwaVVybH1wcm9kdWN0L3RhZ3M/dG9rZW49JHtzdG9yYWdlLmdldEF1dGhUb2tlbigpfWApXG4gICAgICAuY2FjaGUoKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkuZGF0YTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG5cbiAgLy9OT1QgUkVRVUlSRUQgUEVSTUlTU1RJT05cbiAgZ2V0UHJvZHVjdCgpe1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtjb25maWcuYXBpVXJsfXByb2R1Y3Q/dG9rZW49JHtzdG9yYWdlLmdldEF1dGhUb2tlbigpfWApXG4gICAgICAuY2FjaGUoKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkuZGF0YTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG5cbiAgLy9QUk9EVUNUIE9GIE9ORSBERVZFTE9QRVIgW1JFUVVJUkVEIFBFUk1JU1NJT05dXG4gIGdldFByb2R1Y3RPZkRldmVsb3Blcigpe1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtjb25maWcuYXBpVXJsfXByb2R1Y3QvZGV2ZWxvcGVyP3Rva2VuPSR7c3RvcmFnZS5nZXRBdXRoVG9rZW4oKX1gKVxuICAgICAgLmNhY2hlKClcbiAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLmRhdGE7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIGdldFByb2R1Y3RJZChpZDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke2NvbmZpZy5hcGlVcmx9cHJvZHVjdC8ke2lkfT90b2tlbj0ke3N0b3JhZ2UuZ2V0QXV0aFRva2VuKCl9YClcbiAgICAgIC5jYWNoZSgpXG4gICAgICAubWFwKHJlc3BvbnNlID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG5cbiAgYWRkUHJvZHVjdChwcm9kdWN0OiBhbnkpIHtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocHJvZHVjdCk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdChgJHtjb25maWcuYXBpVXJsfXByb2R1Y3Q/dG9rZW49JHtzdG9yYWdlLmdldEF1dGhUb2tlbigpfWAsXG4gICAgICBib2R5LCB7IGhlYWRlcnM6IHJlcXVlc3QuZ2V0SnNvbkhlYWRlcnMoKSB9KS5jYWNoZSgpXG4gICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cblxuICB1cGRhdGVQcm9kdWN0KGlkOmFueSwgcHJvZHVjdDogYW55KXtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocHJvZHVjdCk7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAucHV0KGAke2NvbmZpZy5hcGlVcmx9cHJvZHVjdC8ke2lkfT90b2tlbj0ke3N0b3JhZ2UuZ2V0QXV0aFRva2VuKCl9YCxcbiAgICAgIGJvZHksIHsgaGVhZGVyczogcmVxdWVzdC5nZXRKc29uSGVhZGVycygpIH0pLmNhY2hlKClcbiAgICAgIC5tYXAodGhpcy5leHRyYWN0RGF0YSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIGRlbGV0ZVByb2R1Y3QoaWQ6YW55KXtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaVVybH1wcm9kdWN0LyR7aWR9P3Rva2VuPSR7c3RvcmFnZS5nZXRBdXRoVG9rZW4oKX1gKVxuICAgICAgLmNhY2hlKClcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG5cbiAgLy9HZXQgUHJvZHVjdCBTdGF0dXMgRm9yIEFkbWluXG4gIGdldFByb2R1Y3RTdGF0dXMoc3RhdHVzOmFueSl7XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KGAke2NvbmZpZy5hcGlVcmx9cHJvZHVjdC9saXN0LyR7c3RhdHVzfWApXG4gICAgICAuY2FjaGUoKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG5cbiAgdXBkYXRlUHJvZHVjdFN0YXR1cyhpZDphbnksc3RhdHVzOmFueSxjb21tZW50OmFueSA9IFwiXCIpe1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeShjb21tZW50KTtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KGAke2NvbmZpZy5hcGlVcmx9cHJvZHVjdC8ke2lkfS8ke3N0YXR1c30/dG9rZW49JHtzdG9yYWdlLmdldEF1dGhUb2tlbigpfWAsXG4gICAgICBib2R5LCB7IGhlYWRlcnM6IHJlcXVlc3QuZ2V0SnNvbkhlYWRlcnMoKSB9KS5jYWNoZSgpXG4gICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cblxuICAvL0dldExvZ1Byb2R1Y3RzXG4gIGdldExvZ1Byb2R1Y3QoaWQ6YW55KXtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7Y29uZmlnLmFwaVVybH1wcm9kdWN0L2xvZy8ke2lkfWApXG4gICAgICAuY2FjaGUoKVxuICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcbiAgfVxuXG4gIC8vVXBkYXRlVGFnUHJvZHVjdFxuICAgIHVwZGF0ZVRhZ1Byb2R1Y3RzKHZhbHVlOmFueSl7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoYCR7Y29uZmlnLmFwaVVybH10YWc/dG9rZW49JHtzdG9yYWdlLmdldEF1dGhUb2tlbigpfWAsXG4gICAgICAgICAgICBib2R5LCB7IGhlYWRlcnM6IHJlcXVlc3QuZ2V0SnNvbkhlYWRlcnMoKSB9KS5jYWNoZSgpXG4gICAgICAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG5cbiAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XG4gICAgbGV0IGJvZHkgPSByZXMuanNvbigpO1xuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IGFueSkge1xuICAgIGxldCBlcnJNc2cgPSAoZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDpcbiAgICAgIGVycm9yLnN0YXR1cyA/IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHR9YCA6ICdTZXJ2ZXIgZXJyb3InO1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVyck1zZyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
