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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTransferContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let AssetTransferContract = class AssetTransferContract extends fabric_contract_api_1.Contract {
    InitLedger(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const assets = [
                {
                    id: 'asset1',
                    color: 'blue',
                    size: 5,
                    owner: 'Tomoko',
                    appraisedValue: 300,
                },
                {
                    id: 'asset2',
                    color: 'red',
                    size: 5,
                    owner: 'Brad',
                    appraisedValue: 400,
                },
                {
                    id: 'asset3',
                    color: 'green',
                    size: 10,
                    owner: 'Jin Soo',
                    appraisedValue: 500,
                },
                {
                    id: 'asset4',
                    color: 'yellow',
                    size: 10,
                    owner: 'Max',
                    appraisedValue: 600,
                },
                {
                    id: 'asset5',
                    color: 'black',
                    size: 15,
                    owner: 'Adriana',
                    appraisedValue: 700,
                },
                {
                    id: 'asset6',
                    color: 'white',
                    size: 15,
                    owner: 'Michel',
                    appraisedValue: 800,
                },
            ];
            for (const asset of assets) {
                asset.docType = 'asset';
                yield ctx.stub.putState(asset.id, Buffer.from(JSON.stringify(asset)));
                console.info(`Asset ${asset.id} initialized`);
            }
        });
    }
    CreateAsset(ctx, id, color, size, owner, appraisedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const asset = {
                id: id,
                color: color,
                size: size,
                owner: owner,
                appraisedValue: appraisedValue,
            };
            yield ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        });
    }
    ReadAsset(ctx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetJSON = yield ctx.stub.getState(id);
            if (!assetJSON || assetJSON.length === 0) {
                throw new Error(`The asset ${id} does not exist`);
            }
            return assetJSON.toString();
        });
    }
    UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.AssetExists(ctx, id);
            if (!exists) {
                throw new Error(`The asset ${id} does not exist`);
            }
            const updatedAsset = {
                id: id,
                color: color,
                size: size,
                owner: owner,
                appraisedValue: appraisedValue,
            };
            return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedAsset)));
        });
    }
    DeleteAsset(ctx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.AssetExists(ctx, id);
            if (!exists) {
                throw new Error(`The asset ${id} does not exist`);
            }
            return ctx.stub.deleteState(id);
        });
    }
    AssetExists(ctx, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetJSON = yield ctx.stub.getState(id);
            return assetJSON && assetJSON.length > 0;
        });
    }
    TransferAsset(ctx, id, newowner) {
        return __awaiter(this, void 0, void 0, function* () {
            const assetString = yield this.ReadAsset(ctx, id);
            const asset = JSON.parse(assetString);
            asset.owner = newowner;
            yield ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
        });
    }
    GetAllAssets(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const allResults = [];
            const iterator = yield ctx.stub.getStateByRange('', '');
            let result = yield iterator.next();
            while (!result.done) {
                const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
                let record;
                try {
                    record = JSON.parse(strValue);
                }
                catch (err) {
                    console.log(err);
                    record = strValue;
                }
                allResults.push({ Key: result.value.key, Record: record });
                result = yield iterator.next();
            }
            return JSON.stringify(allResults);
        });
    }
};
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Number, String, Number]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "CreateAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "ReadAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Number, String, Number]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "UpdateAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "DeleteAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "AssetExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "TransferAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], AssetTransferContract.prototype, "GetAllAssets", null);
AssetTransferContract = __decorate([
    fabric_contract_api_1.Info({ title: 'AssetTransfer', description: 'Smart contract for trading assets' })
], AssetTransferContract);
exports.AssetTransferContract = AssetTransferContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRUcmFuc2Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3NldFRyYW5zZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLDZEQUFvRjtBQUlwRixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLDhCQUFRO0lBRWxDLFVBQVUsQ0FBQyxHQUFZOztZQUNoQyxNQUFNLE1BQU0sR0FBWTtnQkFDcEI7b0JBQ0ksRUFBRSxFQUFFLFFBQVE7b0JBQ1osS0FBSyxFQUFFLE1BQU07b0JBQ2IsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsY0FBYyxFQUFFLEdBQUc7aUJBQ3RCO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxNQUFNO29CQUNiLGNBQWMsRUFBRSxHQUFHO2lCQUN0QjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixLQUFLLEVBQUUsT0FBTztvQkFDZCxJQUFJLEVBQUUsRUFBRTtvQkFDUixLQUFLLEVBQUUsU0FBUztvQkFDaEIsY0FBYyxFQUFFLEdBQUc7aUJBQ3RCO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLEtBQUssRUFBRSxRQUFRO29CQUNmLElBQUksRUFBRSxFQUFFO29CQUNSLEtBQUssRUFBRSxLQUFLO29CQUNaLGNBQWMsRUFBRSxHQUFHO2lCQUN0QjtnQkFDRDtvQkFDSSxFQUFFLEVBQUUsUUFBUTtvQkFDWixLQUFLLEVBQUUsT0FBTztvQkFDZCxJQUFJLEVBQUUsRUFBRTtvQkFDUixLQUFLLEVBQUUsU0FBUztvQkFDaEIsY0FBYyxFQUFFLEdBQUc7aUJBQ3RCO2dCQUNEO29CQUNJLEVBQUUsRUFBRSxRQUFRO29CQUNaLEtBQUssRUFBRSxPQUFPO29CQUNkLElBQUksRUFBRSxFQUFF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QUM7b0JBQ2pCLE1BQU0sR0FBRyxRQUFRLENBQUM7aUJBQ3JCO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7Q0FDSixDQUFBO0FBOUpHO0lBREMsaUNBQVcsRUFBRTs7cUNBQ2UsNkJBQU87O3VEQW1EbkM7QUFJRDtJQURDLGlDQUFXLEVBQUU7O3FDQUVMLDZCQUFPOzt3REFlZjtBQUlEO0lBREMsaUNBQVcsQ0FBQyxLQUFLLENBQUM7O3FDQUNTLDZCQUFPOztzREFNbEM7QUFJRDtJQURDLGlDQUFXLEVBQUU7O3FDQUVMLDZCQUFPOzt3REFxQmY7QUFJRDtJQURDLGlDQUFXLEVBQUU7O3FDQUNnQiw2QkFBTzs7d0RBTXBDO0FBS0Q7SUFGQyxpQ0FBVyxDQUFDLEtBQUssQ0FBQztJQUNsQiw2QkFBTyxDQUFDLFNBQVMsQ0FBQzs7cUNBQ1csNkJBQU87O3dEQUdwQztBQUlEO0lBREMsaUNBQVcsRUFBRTs7cUNBQ2tCLDZCQUFPOzswREFLdEM7QUFLRDtJQUZDLGlDQUFXLENBQUMsS0FBSyxDQUFDO0lBQ2xCLDZCQUFPLENBQUMsUUFBUSxDQUFDOztxQ0FDYSw2QkFBTzs7eURBa0JyQztBQS9KUSxxQkFBcUI7SUFEakMsMEJBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLG1DQUFtQyxFQUFFLENBQUM7R0FDdEUscUJBQXFCLENBZ0tqQztBQWhLWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb250ZXh0LCBDb250cmFjdCwgSW5mbywgUmV0dXJucywgVHJhbnNhY3Rpb24gfSBmcm9tICdmYWJyaWMtY29udHJhY3QtYXBpJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi9hc3NldCc7XG5cbkBJbmZvKHsgdGl0bGU6ICdBc3NldFRyYW5zZmVyJywgZGVzY3JpcHRpb246ICdTbWFydCBjb250cmFjdCBmb3IgdHJhZGluZyBhc3NldHMnIH0pXG5leHBvcnQgY2xhc3MgQXNzZXRUcmFuc2ZlckNvbnRyYWN0IGV4dGVuZHMgQ29udHJhY3Qge1xuICAgIEBUcmFuc2FjdGlvbigpXG4gICAgcHVibGljIGFzeW5jIEluaXRMZWRnZXIoY3R4OiBDb250ZXh0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGFzc2V0czogQXNzZXRbXSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0MScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibHVlJyxcbiAgICAgICAgICAgICAgICBzaXplOiA1LFxuICAgICAgICAgICAgICAgIG93bmVyOiAnVG9tb2tvJyxcbiAgICAgICAgICAgICAgICBhcHByYWlzZWRWYWx1ZTogMzAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0MicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgIHNpemU6IDUsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdCcmFkJyxcbiAgICAgICAgICAgICAgICBhcHByYWlzZWRWYWx1ZTogNDAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0MycsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdncmVlbicsXG4gICAgICAgICAgICAgICAgc2l6ZTogMTAsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdKaW4gU29vJyxcbiAgICAgICAgICAgICAgICBhcHByYWlzZWRWYWx1ZTogNTAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0NCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnLFxuICAgICAgICAgICAgICAgIHNpemU6IDEwLFxuICAgICAgICAgICAgICAgIG93bmVyOiAnTWF4JyxcbiAgICAgICAgICAgICAgICBhcHByYWlzZWRWYWx1ZTogNjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0NScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgc2l6ZTogMTUsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdBZHJpYW5hJyxcbiAgICAgICAgICAgICAgICBhcHByYWlzZWRWYWx1ZTogNzAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJ2Fzc2V0NicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgc2l6ZTogMTUsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdNaWNoZWwnLFxuICAgICAgICAgICAgICAgIGFwcHJhaXNlZFZhbHVlOiA4MDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAoY29uc3QgYXNzZXQgb2YgYXNzZXRzKSB7XG4gICAgICAgICAgICBhc3NldC5kb2NUeXBlID0gJ2Fzc2V0JztcbiAgICAgICAgICAgIGF3YWl0IGN0eC5zdHViLnB1dFN0YXRlKGFzc2V0LmlkLCBCdWZmZXIuZnJvbShKU09OLnN0cmluZ2lmeShhc3NldCkpKTtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgQXNzZXQgJHthc3NldC5pZH0gaW5pdGlhbGl6ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZUFzc2V0IGlzc3VlcyBhIG5ldyBhc3NldCB0byB0aGUgd29ybGQgc3RhdGUgd2l0aCBnaXZlbiBkZXRhaWxzLlxuICAgIEBUcmFuc2FjdGlvbigpXG4gICAgcHVibGljIGFzeW5jIENyZWF0ZUFzc2V0KFxuICAgICAgICBjdHg6IENvbnRleHQsXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHNpemU6IG51bWJlcixcbiAgICAgICAgb3duZXI6IHN0cmluZyxcbiAgICAgICAgYXBwcmFpc2VkVmFsdWU6IG51bWJlcixcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYXNzZXQgPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgYXBwcmFpc2VkVmFsdWU6IGFwcHJhaXNlZFZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCBjdHguc3R1Yi5wdXRTdGF0ZShpZCwgQnVmZmVyLmZyb20oSlNPTi5zdHJpbmdpZnkoYXNzZXQpKSk7XG4gICAgfVxuXG4gICAgLy8gUmVhZEFzc2V0IHJldHVybnMgdGhlIGFzc2V0IHN0b3JlZCBpbiB0aGUgd29ybGQgc3RhdGUgd2l0aCBnaXZlbiBpZC5cbiAgICBAVHJhbnNhY3Rpb24oZmFsc2UpXG4gICAgcHVibGljIGFzeW5jIFJlYWRBc3NldChjdHg6IENvbnRleHQsIGlkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBhc3NldEpTT04gPSBhd2FpdCBjdHguc3R1Yi5nZXRTdGF0ZShpZCk7IC8vIGdldCB0aGUgYXNzZXQgZnJvbSBjaGFpbmNvZGUgc3RhdGVcbiAgICAgICAgaWYgKCFhc3NldEpTT04gfHwgYXNzZXRKU09OLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXNzZXQgJHtpZH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXNzZXRKU09OLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlQXNzZXQgdXBkYXRlcyBhbiBleGlzdGluZyBhc3NldCBpbiB0aGUgd29ybGQgc3RhdGUgd2l0aCBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgIEBUcmFuc2FjdGlvbigpXG4gICAgcHVibGljIGFzeW5jIFVwZGF0ZUFzc2V0KFxuICAgICAgICBjdHg6IENvbnRleHQsXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHNpemU6IG51bWJlcixcbiAgICAgICAgb3duZXI6IHN0cmluZyxcbiAgICAgICAgYXBwcmFpc2VkVmFsdWU6IG51bWJlcixcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5Bc3NldEV4aXN0cyhjdHgsIGlkKTtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGFzc2V0ICR7aWR9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdmVyd3JpdGluZyBvcmlnaW5hbCBhc3NldCB3aXRoIG5ldyBhc3NldFxuICAgICAgICBjb25zdCB1cGRhdGVkQXNzZXQgPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgb3duZXI6IG93bmVyLFxuICAgICAgICAgICAgYXBwcmFpc2VkVmFsdWU6IGFwcHJhaXNlZFZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY3R4LnN0dWIucHV0U3RhdGUoaWQsIEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRBc3NldCkpKTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGVBc3NldCBkZWxldGVzIGFuIGdpdmVuIGFzc2V0IGZyb20gdGhlIHdvcmxkIHN0YXRlLlxuICAgIEBUcmFuc2FjdGlvbigpXG4gICAgcHVibGljIGFzeW5jIERlbGV0ZUFzc2V0KGN0eDogQ29udGV4dCwgaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkFzc2V0RXhpc3RzKGN0eCwgaWQpO1xuICAgICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXNzZXQgJHtpZH0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3R4LnN0dWIuZGVsZXRlU3RhdGUoaWQpO1xuICAgIH1cblxuICAgIC8vIEFzc2V0RXhpc3RzIHJldHVybnMgdHJ1ZSB3aGVuIGFzc2V0IHdpdGggZ2l2ZW4gaWQgZXhpc3RzIGluIHdvcmxkIHN0YXRlLlxuICAgIEBUcmFuc2FjdGlvbihmYWxzZSlcbiAgICBAUmV0dXJucygnYm9vbGVhbicpXG4gICAgcHVibGljIGFzeW5jIEFzc2V0RXhpc3RzKGN0eDogQ29udGV4dCwgaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBhc3NldEpTT04gPSBhd2FpdCBjdHguc3R1Yi5nZXRTdGF0ZShpZCk7XG4gICAgICAgIHJldHVybiBhc3NldEpTT04gJiYgYXNzZXRKU09OLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmZXJBc3NldCB1cGRhdGVzIHRoZSBvd25lciBmaWVsZCBvZiBhc3NldCB3aXRoIGdpdmVuIGlkIGluIHRoZSB3b3JsZCBzdGF0ZS5cbiAgICBAVHJhbnNhY3Rpb24oKVxuICAgIHB1YmxpYyBhc3luYyBUcmFuc2ZlckFzc2V0KGN0eDogQ29udGV4dCwgaWQ6IHN0cmluZywgbmV3b3duZXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBhc3NldFN0cmluZyA9IGF3YWl0IHRoaXMuUmVhZEFzc2V0KGN0eCwgaWQpO1xuICAgICAgICBjb25zdCBhc3NldCA9IEpTT04ucGFyc2UoYXNzZXRTdHJpbmcpO1xuICAgICAgICBhc3NldC5vd25lciA9IG5ld293bmVyO1xuICAgICAgICBhd2FpdCBjdHguc3R1Yi5wdXRTdGF0ZShpZCwgQnVmZmVyLmZyb20oSlNPTi5zdHJpbmdpZnkoYXNzZXQpKSk7XG4gICAgfVxuXG4gICAgLy8gR2V0QWxsQXNzZXRzIHJldHVybnMgYWxsIGFzc2V0cyBmb3VuZCBpbiB0aGUgd29ybGQgc3RhdGUuXG4gICAgQFRyYW5zYWN0aW9uKGZhbHNlKVxuICAgIEBSZXR1cm5zKCdzdHJpbmcnKVxuICAgIHB1YmxpYyBhc3luYyBHZXRBbGxBc3NldHMoY3R4OiBDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgYWxsUmVzdWx0cyA9IFtdO1xuICAgICAgICAvLyByYW5nZSBxdWVyeSB3aXRoIGVtcHR5IHN0cmluZyBmb3Igc3RhcnRLZXkgYW5kIGVuZEtleSBkb2VzIGFuIG9wZW4tZW5kZWQgcXVlcnkgb2YgYWxsIGFzc2V0cyBpbiB0aGUgY2hhaW5jb2RlIG5hbWVzcGFjZS5cbiAgICAgICAgY29uc3QgaXRlcmF0b3IgPSBhd2FpdCBjdHguc3R1Yi5nZXRTdGF0ZUJ5UmFuZ2UoJycsICcnKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgd2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyVmFsdWUgPSBCdWZmZXIuZnJvbShyZXN1bHQudmFsdWUudmFsdWUudG9TdHJpbmcoKSkudG9TdHJpbmcoJ3V0ZjgnKTtcbiAgICAgICAgICAgIGxldCByZWNvcmQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlY29yZCA9IEpTT04ucGFyc2Uoc3RyVmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICByZWNvcmQgPSBzdHJWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFsbFJlc3VsdHMucHVzaCh7IEtleTogcmVzdWx0LnZhbHVlLmtleSwgUmVjb3JkOiByZWNvcmQgfSk7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFsbFJlc3VsdHMpO1xuICAgIH1cbn1cbiJdfQ==