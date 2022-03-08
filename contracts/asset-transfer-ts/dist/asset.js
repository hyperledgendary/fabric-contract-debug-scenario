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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let Asset = class Asset {
    constructor(id, color, size, owner, appraisedValue) {
        this.docType = 'Asset';
        this.id = id;
        this.color = color;
        this.size = size;
        this.owner = owner;
        this.appraisedValue = appraisedValue;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Asset.prototype, "docType", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Asset.prototype, "id", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Asset.prototype, "color", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Asset.prototype, "size", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Asset.prototype, "owner", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Number)
], Asset.prototype, "appraisedValue", void 0);
Asset = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, Number, String, Number])
], Asset);
exports.Asset = Asset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUEsNkRBQXVEO0FBR3ZELElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFtQmQsWUFBbUIsRUFBVSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLGNBQXNCO1FBQzdGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztDQUNKLENBQUE7QUF6Qkc7SUFEQyw4QkFBUSxFQUFFOztzQ0FDYTtBQUd4QjtJQURDLDhCQUFRLEVBQUU7O2lDQUNPO0FBR2xCO0lBREMsOEJBQVEsRUFBRTs7b0NBQ1U7QUFHckI7SUFEQyw4QkFBUSxFQUFFOzttQ0FDUztBQUdwQjtJQURDLDhCQUFRLEVBQUU7O29DQUNVO0FBR3JCO0lBREMsOEJBQVEsRUFBRTs7NkNBQ21CO0FBakJyQixLQUFLO0lBRGpCLDRCQUFNLEVBQUU7O0dBQ0ksS0FBSyxDQTJCakI7QUEzQlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuKi9cblxuaW1wb3J0IHsgT2JqZWN0LCBQcm9wZXJ0eSB9IGZyb20gJ2ZhYnJpYy1jb250cmFjdC1hcGknO1xuXG5AT2JqZWN0KClcbmV4cG9ydCBjbGFzcyBBc3NldCB7XG4gICAgQFByb3BlcnR5KClcbiAgICBwdWJsaWMgZG9jVHlwZT86IHN0cmluZztcblxuICAgIEBQcm9wZXJ0eSgpXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG5cbiAgICBAUHJvcGVydHkoKVxuICAgIHB1YmxpYyBjb2xvcjogc3RyaW5nO1xuXG4gICAgQFByb3BlcnR5KClcbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xuXG4gICAgQFByb3BlcnR5KClcbiAgICBwdWJsaWMgb3duZXI6IHN0cmluZztcblxuICAgIEBQcm9wZXJ0eSgpXG4gICAgcHVibGljIGFwcHJhaXNlZFZhbHVlOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgY29sb3I6IHN0cmluZywgc2l6ZTogbnVtYmVyLCBvd25lcjogc3RyaW5nLCBhcHByYWlzZWRWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZG9jVHlwZSA9ICdBc3NldCc7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMuYXBwcmFpc2VkVmFsdWUgPSBhcHByYWlzZWRWYWx1ZTtcbiAgICB9XG59XG4iXX0=