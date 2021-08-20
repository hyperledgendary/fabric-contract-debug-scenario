/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Asset {
    @Property()
    public docType?: string;

    @Property()
    public id: string;

    @Property()
    public color: string;

    @Property()
    public size: number;

    @Property()
    public owner: string;

    @Property()
    public appraisedValue: number;

    public constructor(id: string, color: string, size: number, owner: string, appraisedValue: number) {
        this.docType = 'Asset';
        this.id = id;
        this.color = color;
        this.size = size;
        this.owner = owner;
        this.appraisedValue = appraisedValue;
    }
}
