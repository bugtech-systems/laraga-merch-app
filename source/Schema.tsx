import Realm, {BSON} from 'realm';

export class Item extends Realm.Object<Item> {
  _id!: BSON.ObjectId;
  isComplete!: boolean;
  summary!: string;
  owner_id!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      isComplete: {type: 'bool', default: false},
      summary: 'string',
      owner_id: 'string',
    },
  };
}


export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  role!: string;
  branch_id!: Realm.BSON.ObjectId;
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'user',
    properties: {
      _id: 'objectId',
      name: 'string',
      email: 'string',
      role: 'string',
      branch_id: 'objectId',
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Batch extends Realm.Object<Batch> {
  _id!: Realm.BSON.ObjectId;
  batch_number!: string;
  purchase_date!: Date;
  supplier!: string;
  total_items!: number;
  branch_id!: Realm.BSON.ObjectId;
  created_by!: Realm.BSON.ObjectId;
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'batch',
    properties: {
      _id: 'objectId',
      batch_number: 'string',
      purchase_date: 'date',
      supplier: 'string',
      total_items: 'int',
      branch_id: 'objectId',
      created_by: 'objectId',
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Branch extends Realm.Object<Branch> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  location!: string;
  contact_number!: string;
  configuration?: Configuration[];
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'branch',
    properties: {
      _id: 'objectId',
      name: 'string',
      location: 'string',
      contact_number: 'string',
      configuration: { type: 'list', objectType: 'configuration' },
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Peddler extends Realm.Object<Peddler> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  branch_id!: Realm.BSON.ObjectId;
  created_by!: Realm.BSON.ObjectId;
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'peddler',
    properties: {
      _id: 'objectId',
      name: 'string',
      branch_id: 'objectId',
      created_by: 'objectId',
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Order extends Realm.Object<Order> {
  _id!: Realm.BSON.ObjectId;
  order_number!: string;
  order_type!: string;
  new_can_quantity!: number;
  new_can_total_amount!: number;
  refill_quantity!: number;
  refill_total_amount!: number;
  can_returned!: boolean;
  branch_id!: Realm.BSON.ObjectId;
  peddler_id?: Realm.BSON.ObjectId;
  batch_id!: Realm.BSON.ObjectId;
  bad_order_reason?: string;
  total_amount!: number;
  created_by!: Realm.BSON.ObjectId;
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'order',
    properties: {
      _id: 'objectId',
      order_number: 'string',
      order_type: 'string',
      new_can_quantity: { type: 'int', default: 0 },
      new_can_total_amount: { type: 'double', default: 0 },
      refill_quantity: { type: 'int', default: 0 },
      refill_total_amount: { type: 'double', default: 0 },
      can_returned: { type: 'bool', default: false },
      branch_id: 'objectId',
      peddler_id: 'objectId?',
      batch_id: 'objectId',
      bad_order_reason: 'string?',
      total_amount: 'double',
      created_by: 'objectId',
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Expense extends Realm.Object<Expense> {
  _id!: Realm.BSON.ObjectId;
  expense_type!: string;
  amount!: number;
  branch_id!: Realm.BSON.ObjectId;
  batch_id!: Realm.BSON.ObjectId;
  description?: string;
  created_by!: Realm.BSON.ObjectId;
  created_at!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'expense',
    properties: {
      _id: 'objectId',
      expense_type: 'string',
      amount: 'double',
      branch_id: 'objectId',
      batch_id: 'objectId',
      description: 'string?',
      created_by: 'objectId',
      created_at: 'date',
    },
    primaryKey: '_id',
  };
}


export class Configuration extends Realm.Object<Configuration> {
  title!: string;
  isCheck?: boolean;
  value?: string;

  static schema: Realm.ObjectSchema = {
    name: 'configuration',
    embedded: true,
    properties: {
      title: 'string',
      isCheck: { type: 'bool', default: false },
      value: 'string?',
    }
  };
}