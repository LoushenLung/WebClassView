
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DuesPeriod
 * 
 */
export type DuesPeriod = $Result.DefaultSelection<Prisma.$DuesPeriodPayload>
/**
 * Model DuesPayment
 * 
 */
export type DuesPayment = $Result.DefaultSelection<Prisma.$DuesPaymentPayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model PhotoGallery
 * 
 */
export type PhotoGallery = $Result.DefaultSelection<Prisma.$PhotoGalleryPayload>
/**
 * Model Photo
 * 
 */
export type Photo = $Result.DefaultSelection<Prisma.$PhotoPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model Material
 * 
 */
export type Material = $Result.DefaultSelection<Prisma.$MaterialPayload>
/**
 * Model ForumPost
 * 
 */
export type ForumPost = $Result.DefaultSelection<Prisma.$ForumPostPayload>
/**
 * Model ForumComment
 * 
 */
export type ForumComment = $Result.DefaultSelection<Prisma.$ForumCommentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.duesPeriod`: Exposes CRUD operations for the **DuesPeriod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DuesPeriods
    * const duesPeriods = await prisma.duesPeriod.findMany()
    * ```
    */
  get duesPeriod(): Prisma.DuesPeriodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.duesPayment`: Exposes CRUD operations for the **DuesPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DuesPayments
    * const duesPayments = await prisma.duesPayment.findMany()
    * ```
    */
  get duesPayment(): Prisma.DuesPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.photoGallery`: Exposes CRUD operations for the **PhotoGallery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhotoGalleries
    * const photoGalleries = await prisma.photoGallery.findMany()
    * ```
    */
  get photoGallery(): Prisma.PhotoGalleryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.photo`: Exposes CRUD operations for the **Photo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Photos
    * const photos = await prisma.photo.findMany()
    * ```
    */
  get photo(): Prisma.PhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.material`: Exposes CRUD operations for the **Material** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Materials
    * const materials = await prisma.material.findMany()
    * ```
    */
  get material(): Prisma.MaterialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forumPost`: Exposes CRUD operations for the **ForumPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForumPosts
    * const forumPosts = await prisma.forumPost.findMany()
    * ```
    */
  get forumPost(): Prisma.ForumPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.forumComment`: Exposes CRUD operations for the **ForumComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ForumComments
    * const forumComments = await prisma.forumComment.findMany()
    * ```
    */
  get forumComment(): Prisma.ForumCommentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DuesPeriod: 'DuesPeriod',
    DuesPayment: 'DuesPayment',
    Announcement: 'Announcement',
    Schedule: 'Schedule',
    PhotoGallery: 'PhotoGallery',
    Photo: 'Photo',
    AuditLog: 'AuditLog',
    Attendance: 'Attendance',
    Material: 'Material',
    ForumPost: 'ForumPost',
    ForumComment: 'ForumComment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "duesPeriod" | "duesPayment" | "announcement" | "schedule" | "photoGallery" | "photo" | "auditLog" | "attendance" | "material" | "forumPost" | "forumComment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DuesPeriod: {
        payload: Prisma.$DuesPeriodPayload<ExtArgs>
        fields: Prisma.DuesPeriodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DuesPeriodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DuesPeriodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          findFirst: {
            args: Prisma.DuesPeriodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DuesPeriodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          findMany: {
            args: Prisma.DuesPeriodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>[]
          }
          create: {
            args: Prisma.DuesPeriodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          createMany: {
            args: Prisma.DuesPeriodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DuesPeriodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>[]
          }
          delete: {
            args: Prisma.DuesPeriodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          update: {
            args: Prisma.DuesPeriodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          deleteMany: {
            args: Prisma.DuesPeriodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DuesPeriodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DuesPeriodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>[]
          }
          upsert: {
            args: Prisma.DuesPeriodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPeriodPayload>
          }
          aggregate: {
            args: Prisma.DuesPeriodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDuesPeriod>
          }
          groupBy: {
            args: Prisma.DuesPeriodGroupByArgs<ExtArgs>
            result: $Utils.Optional<DuesPeriodGroupByOutputType>[]
          }
          count: {
            args: Prisma.DuesPeriodCountArgs<ExtArgs>
            result: $Utils.Optional<DuesPeriodCountAggregateOutputType> | number
          }
        }
      }
      DuesPayment: {
        payload: Prisma.$DuesPaymentPayload<ExtArgs>
        fields: Prisma.DuesPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DuesPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DuesPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          findFirst: {
            args: Prisma.DuesPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DuesPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          findMany: {
            args: Prisma.DuesPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>[]
          }
          create: {
            args: Prisma.DuesPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          createMany: {
            args: Prisma.DuesPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DuesPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>[]
          }
          delete: {
            args: Prisma.DuesPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          update: {
            args: Prisma.DuesPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          deleteMany: {
            args: Prisma.DuesPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DuesPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DuesPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>[]
          }
          upsert: {
            args: Prisma.DuesPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DuesPaymentPayload>
          }
          aggregate: {
            args: Prisma.DuesPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDuesPayment>
          }
          groupBy: {
            args: Prisma.DuesPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DuesPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DuesPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<DuesPaymentCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      PhotoGallery: {
        payload: Prisma.$PhotoGalleryPayload<ExtArgs>
        fields: Prisma.PhotoGalleryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoGalleryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoGalleryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          findFirst: {
            args: Prisma.PhotoGalleryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoGalleryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          findMany: {
            args: Prisma.PhotoGalleryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>[]
          }
          create: {
            args: Prisma.PhotoGalleryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          createMany: {
            args: Prisma.PhotoGalleryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoGalleryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>[]
          }
          delete: {
            args: Prisma.PhotoGalleryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          update: {
            args: Prisma.PhotoGalleryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          deleteMany: {
            args: Prisma.PhotoGalleryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoGalleryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhotoGalleryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>[]
          }
          upsert: {
            args: Prisma.PhotoGalleryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoGalleryPayload>
          }
          aggregate: {
            args: Prisma.PhotoGalleryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhotoGallery>
          }
          groupBy: {
            args: Prisma.PhotoGalleryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoGalleryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoGalleryCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoGalleryCountAggregateOutputType> | number
          }
        }
      }
      Photo: {
        payload: Prisma.$PhotoPayload<ExtArgs>
        fields: Prisma.PhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findFirst: {
            args: Prisma.PhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findMany: {
            args: Prisma.PhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          create: {
            args: Prisma.PhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          createMany: {
            args: Prisma.PhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          delete: {
            args: Prisma.PhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          update: {
            args: Prisma.PhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          deleteMany: {
            args: Prisma.PhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          upsert: {
            args: Prisma.PhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          aggregate: {
            args: Prisma.PhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhoto>
          }
          groupBy: {
            args: Prisma.PhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      Material: {
        payload: Prisma.$MaterialPayload<ExtArgs>
        fields: Prisma.MaterialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaterialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaterialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findFirst: {
            args: Prisma.MaterialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaterialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          findMany: {
            args: Prisma.MaterialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          create: {
            args: Prisma.MaterialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          createMany: {
            args: Prisma.MaterialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaterialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          delete: {
            args: Prisma.MaterialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          update: {
            args: Prisma.MaterialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          deleteMany: {
            args: Prisma.MaterialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaterialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaterialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>[]
          }
          upsert: {
            args: Prisma.MaterialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaterialPayload>
          }
          aggregate: {
            args: Prisma.MaterialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterial>
          }
          groupBy: {
            args: Prisma.MaterialGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaterialGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaterialCountArgs<ExtArgs>
            result: $Utils.Optional<MaterialCountAggregateOutputType> | number
          }
        }
      }
      ForumPost: {
        payload: Prisma.$ForumPostPayload<ExtArgs>
        fields: Prisma.ForumPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForumPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForumPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          findFirst: {
            args: Prisma.ForumPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForumPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          findMany: {
            args: Prisma.ForumPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          create: {
            args: Prisma.ForumPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          createMany: {
            args: Prisma.ForumPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForumPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          delete: {
            args: Prisma.ForumPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          update: {
            args: Prisma.ForumPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          deleteMany: {
            args: Prisma.ForumPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForumPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForumPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>[]
          }
          upsert: {
            args: Prisma.ForumPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumPostPayload>
          }
          aggregate: {
            args: Prisma.ForumPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForumPost>
          }
          groupBy: {
            args: Prisma.ForumPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForumPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForumPostCountArgs<ExtArgs>
            result: $Utils.Optional<ForumPostCountAggregateOutputType> | number
          }
        }
      }
      ForumComment: {
        payload: Prisma.$ForumCommentPayload<ExtArgs>
        fields: Prisma.ForumCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ForumCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ForumCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          findFirst: {
            args: Prisma.ForumCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ForumCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          findMany: {
            args: Prisma.ForumCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          create: {
            args: Prisma.ForumCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          createMany: {
            args: Prisma.ForumCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ForumCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          delete: {
            args: Prisma.ForumCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          update: {
            args: Prisma.ForumCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          deleteMany: {
            args: Prisma.ForumCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ForumCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ForumCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>[]
          }
          upsert: {
            args: Prisma.ForumCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ForumCommentPayload>
          }
          aggregate: {
            args: Prisma.ForumCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForumComment>
          }
          groupBy: {
            args: Prisma.ForumCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ForumCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ForumCommentCountArgs<ExtArgs>
            result: $Utils.Optional<ForumCommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    duesPeriod?: DuesPeriodOmit
    duesPayment?: DuesPaymentOmit
    announcement?: AnnouncementOmit
    schedule?: ScheduleOmit
    photoGallery?: PhotoGalleryOmit
    photo?: PhotoOmit
    auditLog?: AuditLogOmit
    attendance?: AttendanceOmit
    material?: MaterialOmit
    forumPost?: ForumPostOmit
    forumComment?: ForumCommentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    duesPayments: number
    announcements: number
    auditLogs: number
    attendances: number
    forumPosts: number
    forumComments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    duesPayments?: boolean | UserCountOutputTypeCountDuesPaymentsArgs
    announcements?: boolean | UserCountOutputTypeCountAnnouncementsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    attendances?: boolean | UserCountOutputTypeCountAttendancesArgs
    forumPosts?: boolean | UserCountOutputTypeCountForumPostsArgs
    forumComments?: boolean | UserCountOutputTypeCountForumCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDuesPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DuesPaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountForumPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumPostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountForumCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumCommentWhereInput
  }


  /**
   * Count Type DuesPeriodCountOutputType
   */

  export type DuesPeriodCountOutputType = {
    duesPayments: number
  }

  export type DuesPeriodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    duesPayments?: boolean | DuesPeriodCountOutputTypeCountDuesPaymentsArgs
  }

  // Custom InputTypes
  /**
   * DuesPeriodCountOutputType without action
   */
  export type DuesPeriodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriodCountOutputType
     */
    select?: DuesPeriodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DuesPeriodCountOutputType without action
   */
  export type DuesPeriodCountOutputTypeCountDuesPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DuesPaymentWhereInput
  }


  /**
   * Count Type PhotoGalleryCountOutputType
   */

  export type PhotoGalleryCountOutputType = {
    photos: number
  }

  export type PhotoGalleryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | PhotoGalleryCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * PhotoGalleryCountOutputType without action
   */
  export type PhotoGalleryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGalleryCountOutputType
     */
    select?: PhotoGalleryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PhotoGalleryCountOutputType without action
   */
  export type PhotoGalleryCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoWhereInput
  }


  /**
   * Count Type ForumPostCountOutputType
   */

  export type ForumPostCountOutputType = {
    comments: number
  }

  export type ForumPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ForumPostCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * ForumPostCountOutputType without action
   */
  export type ForumPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPostCountOutputType
     */
    select?: ForumPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ForumPostCountOutputType without action
   */
  export type ForumPostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    role: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    duesPayments?: boolean | User$duesPaymentsArgs<ExtArgs>
    announcements?: boolean | User$announcementsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    forumPosts?: boolean | User$forumPostsArgs<ExtArgs>
    forumComments?: boolean | User$forumCommentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    duesPayments?: boolean | User$duesPaymentsArgs<ExtArgs>
    announcements?: boolean | User$announcementsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    forumPosts?: boolean | User$forumPostsArgs<ExtArgs>
    forumComments?: boolean | User$forumCommentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      duesPayments: Prisma.$DuesPaymentPayload<ExtArgs>[]
      announcements: Prisma.$AnnouncementPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      attendances: Prisma.$AttendancePayload<ExtArgs>[]
      forumPosts: Prisma.$ForumPostPayload<ExtArgs>[]
      forumComments: Prisma.$ForumCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: string
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    duesPayments<T extends User$duesPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$duesPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcements<T extends User$announcementsArgs<ExtArgs> = {}>(args?: Subset<T, User$announcementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendances<T extends User$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, User$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    forumPosts<T extends User$forumPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$forumPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    forumComments<T extends User$forumCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$forumCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.duesPayments
   */
  export type User$duesPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    where?: DuesPaymentWhereInput
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    cursor?: DuesPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DuesPaymentScalarFieldEnum | DuesPaymentScalarFieldEnum[]
  }

  /**
   * User.announcements
   */
  export type User$announcementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.attendances
   */
  export type User$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * User.forumPosts
   */
  export type User$forumPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    where?: ForumPostWhereInput
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    cursor?: ForumPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * User.forumComments
   */
  export type User$forumCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    where?: ForumCommentWhereInput
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    cursor?: ForumCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DuesPeriod
   */

  export type AggregateDuesPeriod = {
    _count: DuesPeriodCountAggregateOutputType | null
    _avg: DuesPeriodAvgAggregateOutputType | null
    _sum: DuesPeriodSumAggregateOutputType | null
    _min: DuesPeriodMinAggregateOutputType | null
    _max: DuesPeriodMaxAggregateOutputType | null
  }

  export type DuesPeriodAvgAggregateOutputType = {
    amount: number | null
  }

  export type DuesPeriodSumAggregateOutputType = {
    amount: number | null
  }

  export type DuesPeriodMinAggregateOutputType = {
    id: string | null
    name: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DuesPeriodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    amount: number | null
    startDate: Date | null
    endDate: Date | null
    isArchived: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DuesPeriodCountAggregateOutputType = {
    id: number
    name: number
    amount: number
    startDate: number
    endDate: number
    isArchived: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DuesPeriodAvgAggregateInputType = {
    amount?: true
  }

  export type DuesPeriodSumAggregateInputType = {
    amount?: true
  }

  export type DuesPeriodMinAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    startDate?: true
    endDate?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DuesPeriodMaxAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    startDate?: true
    endDate?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DuesPeriodCountAggregateInputType = {
    id?: true
    name?: true
    amount?: true
    startDate?: true
    endDate?: true
    isArchived?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DuesPeriodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DuesPeriod to aggregate.
     */
    where?: DuesPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPeriods to fetch.
     */
    orderBy?: DuesPeriodOrderByWithRelationInput | DuesPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DuesPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DuesPeriods
    **/
    _count?: true | DuesPeriodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DuesPeriodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DuesPeriodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DuesPeriodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DuesPeriodMaxAggregateInputType
  }

  export type GetDuesPeriodAggregateType<T extends DuesPeriodAggregateArgs> = {
        [P in keyof T & keyof AggregateDuesPeriod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDuesPeriod[P]>
      : GetScalarType<T[P], AggregateDuesPeriod[P]>
  }




  export type DuesPeriodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DuesPeriodWhereInput
    orderBy?: DuesPeriodOrderByWithAggregationInput | DuesPeriodOrderByWithAggregationInput[]
    by: DuesPeriodScalarFieldEnum[] | DuesPeriodScalarFieldEnum
    having?: DuesPeriodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DuesPeriodCountAggregateInputType | true
    _avg?: DuesPeriodAvgAggregateInputType
    _sum?: DuesPeriodSumAggregateInputType
    _min?: DuesPeriodMinAggregateInputType
    _max?: DuesPeriodMaxAggregateInputType
  }

  export type DuesPeriodGroupByOutputType = {
    id: string
    name: string
    amount: number
    startDate: Date
    endDate: Date
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
    _count: DuesPeriodCountAggregateOutputType | null
    _avg: DuesPeriodAvgAggregateOutputType | null
    _sum: DuesPeriodSumAggregateOutputType | null
    _min: DuesPeriodMinAggregateOutputType | null
    _max: DuesPeriodMaxAggregateOutputType | null
  }

  type GetDuesPeriodGroupByPayload<T extends DuesPeriodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DuesPeriodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DuesPeriodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DuesPeriodGroupByOutputType[P]>
            : GetScalarType<T[P], DuesPeriodGroupByOutputType[P]>
        }
      >
    >


  export type DuesPeriodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    duesPayments?: boolean | DuesPeriod$duesPaymentsArgs<ExtArgs>
    _count?: boolean | DuesPeriodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["duesPeriod"]>

  export type DuesPeriodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["duesPeriod"]>

  export type DuesPeriodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["duesPeriod"]>

  export type DuesPeriodSelectScalar = {
    id?: boolean
    name?: boolean
    amount?: boolean
    startDate?: boolean
    endDate?: boolean
    isArchived?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DuesPeriodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "amount" | "startDate" | "endDate" | "isArchived" | "createdAt" | "updatedAt", ExtArgs["result"]["duesPeriod"]>
  export type DuesPeriodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    duesPayments?: boolean | DuesPeriod$duesPaymentsArgs<ExtArgs>
    _count?: boolean | DuesPeriodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DuesPeriodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DuesPeriodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DuesPeriodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DuesPeriod"
    objects: {
      duesPayments: Prisma.$DuesPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      amount: number
      startDate: Date
      endDate: Date
      isArchived: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["duesPeriod"]>
    composites: {}
  }

  type DuesPeriodGetPayload<S extends boolean | null | undefined | DuesPeriodDefaultArgs> = $Result.GetResult<Prisma.$DuesPeriodPayload, S>

  type DuesPeriodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DuesPeriodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DuesPeriodCountAggregateInputType | true
    }

  export interface DuesPeriodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DuesPeriod'], meta: { name: 'DuesPeriod' } }
    /**
     * Find zero or one DuesPeriod that matches the filter.
     * @param {DuesPeriodFindUniqueArgs} args - Arguments to find a DuesPeriod
     * @example
     * // Get one DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DuesPeriodFindUniqueArgs>(args: SelectSubset<T, DuesPeriodFindUniqueArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DuesPeriod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DuesPeriodFindUniqueOrThrowArgs} args - Arguments to find a DuesPeriod
     * @example
     * // Get one DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DuesPeriodFindUniqueOrThrowArgs>(args: SelectSubset<T, DuesPeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DuesPeriod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodFindFirstArgs} args - Arguments to find a DuesPeriod
     * @example
     * // Get one DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DuesPeriodFindFirstArgs>(args?: SelectSubset<T, DuesPeriodFindFirstArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DuesPeriod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodFindFirstOrThrowArgs} args - Arguments to find a DuesPeriod
     * @example
     * // Get one DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DuesPeriodFindFirstOrThrowArgs>(args?: SelectSubset<T, DuesPeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DuesPeriods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DuesPeriods
     * const duesPeriods = await prisma.duesPeriod.findMany()
     * 
     * // Get first 10 DuesPeriods
     * const duesPeriods = await prisma.duesPeriod.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const duesPeriodWithIdOnly = await prisma.duesPeriod.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DuesPeriodFindManyArgs>(args?: SelectSubset<T, DuesPeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DuesPeriod.
     * @param {DuesPeriodCreateArgs} args - Arguments to create a DuesPeriod.
     * @example
     * // Create one DuesPeriod
     * const DuesPeriod = await prisma.duesPeriod.create({
     *   data: {
     *     // ... data to create a DuesPeriod
     *   }
     * })
     * 
     */
    create<T extends DuesPeriodCreateArgs>(args: SelectSubset<T, DuesPeriodCreateArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DuesPeriods.
     * @param {DuesPeriodCreateManyArgs} args - Arguments to create many DuesPeriods.
     * @example
     * // Create many DuesPeriods
     * const duesPeriod = await prisma.duesPeriod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DuesPeriodCreateManyArgs>(args?: SelectSubset<T, DuesPeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DuesPeriods and returns the data saved in the database.
     * @param {DuesPeriodCreateManyAndReturnArgs} args - Arguments to create many DuesPeriods.
     * @example
     * // Create many DuesPeriods
     * const duesPeriod = await prisma.duesPeriod.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DuesPeriods and only return the `id`
     * const duesPeriodWithIdOnly = await prisma.duesPeriod.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DuesPeriodCreateManyAndReturnArgs>(args?: SelectSubset<T, DuesPeriodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DuesPeriod.
     * @param {DuesPeriodDeleteArgs} args - Arguments to delete one DuesPeriod.
     * @example
     * // Delete one DuesPeriod
     * const DuesPeriod = await prisma.duesPeriod.delete({
     *   where: {
     *     // ... filter to delete one DuesPeriod
     *   }
     * })
     * 
     */
    delete<T extends DuesPeriodDeleteArgs>(args: SelectSubset<T, DuesPeriodDeleteArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DuesPeriod.
     * @param {DuesPeriodUpdateArgs} args - Arguments to update one DuesPeriod.
     * @example
     * // Update one DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DuesPeriodUpdateArgs>(args: SelectSubset<T, DuesPeriodUpdateArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DuesPeriods.
     * @param {DuesPeriodDeleteManyArgs} args - Arguments to filter DuesPeriods to delete.
     * @example
     * // Delete a few DuesPeriods
     * const { count } = await prisma.duesPeriod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DuesPeriodDeleteManyArgs>(args?: SelectSubset<T, DuesPeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DuesPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DuesPeriods
     * const duesPeriod = await prisma.duesPeriod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DuesPeriodUpdateManyArgs>(args: SelectSubset<T, DuesPeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DuesPeriods and returns the data updated in the database.
     * @param {DuesPeriodUpdateManyAndReturnArgs} args - Arguments to update many DuesPeriods.
     * @example
     * // Update many DuesPeriods
     * const duesPeriod = await prisma.duesPeriod.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DuesPeriods and only return the `id`
     * const duesPeriodWithIdOnly = await prisma.duesPeriod.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DuesPeriodUpdateManyAndReturnArgs>(args: SelectSubset<T, DuesPeriodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DuesPeriod.
     * @param {DuesPeriodUpsertArgs} args - Arguments to update or create a DuesPeriod.
     * @example
     * // Update or create a DuesPeriod
     * const duesPeriod = await prisma.duesPeriod.upsert({
     *   create: {
     *     // ... data to create a DuesPeriod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DuesPeriod we want to update
     *   }
     * })
     */
    upsert<T extends DuesPeriodUpsertArgs>(args: SelectSubset<T, DuesPeriodUpsertArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DuesPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodCountArgs} args - Arguments to filter DuesPeriods to count.
     * @example
     * // Count the number of DuesPeriods
     * const count = await prisma.duesPeriod.count({
     *   where: {
     *     // ... the filter for the DuesPeriods we want to count
     *   }
     * })
    **/
    count<T extends DuesPeriodCountArgs>(
      args?: Subset<T, DuesPeriodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DuesPeriodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DuesPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DuesPeriodAggregateArgs>(args: Subset<T, DuesPeriodAggregateArgs>): Prisma.PrismaPromise<GetDuesPeriodAggregateType<T>>

    /**
     * Group by DuesPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPeriodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DuesPeriodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DuesPeriodGroupByArgs['orderBy'] }
        : { orderBy?: DuesPeriodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DuesPeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDuesPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DuesPeriod model
   */
  readonly fields: DuesPeriodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DuesPeriod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DuesPeriodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    duesPayments<T extends DuesPeriod$duesPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, DuesPeriod$duesPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DuesPeriod model
   */
  interface DuesPeriodFieldRefs {
    readonly id: FieldRef<"DuesPeriod", 'String'>
    readonly name: FieldRef<"DuesPeriod", 'String'>
    readonly amount: FieldRef<"DuesPeriod", 'Int'>
    readonly startDate: FieldRef<"DuesPeriod", 'DateTime'>
    readonly endDate: FieldRef<"DuesPeriod", 'DateTime'>
    readonly isArchived: FieldRef<"DuesPeriod", 'Boolean'>
    readonly createdAt: FieldRef<"DuesPeriod", 'DateTime'>
    readonly updatedAt: FieldRef<"DuesPeriod", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DuesPeriod findUnique
   */
  export type DuesPeriodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter, which DuesPeriod to fetch.
     */
    where: DuesPeriodWhereUniqueInput
  }

  /**
   * DuesPeriod findUniqueOrThrow
   */
  export type DuesPeriodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter, which DuesPeriod to fetch.
     */
    where: DuesPeriodWhereUniqueInput
  }

  /**
   * DuesPeriod findFirst
   */
  export type DuesPeriodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter, which DuesPeriod to fetch.
     */
    where?: DuesPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPeriods to fetch.
     */
    orderBy?: DuesPeriodOrderByWithRelationInput | DuesPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DuesPeriods.
     */
    cursor?: DuesPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPeriods.
     */
    distinct?: DuesPeriodScalarFieldEnum | DuesPeriodScalarFieldEnum[]
  }

  /**
   * DuesPeriod findFirstOrThrow
   */
  export type DuesPeriodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter, which DuesPeriod to fetch.
     */
    where?: DuesPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPeriods to fetch.
     */
    orderBy?: DuesPeriodOrderByWithRelationInput | DuesPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DuesPeriods.
     */
    cursor?: DuesPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPeriods.
     */
    distinct?: DuesPeriodScalarFieldEnum | DuesPeriodScalarFieldEnum[]
  }

  /**
   * DuesPeriod findMany
   */
  export type DuesPeriodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter, which DuesPeriods to fetch.
     */
    where?: DuesPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPeriods to fetch.
     */
    orderBy?: DuesPeriodOrderByWithRelationInput | DuesPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DuesPeriods.
     */
    cursor?: DuesPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPeriods.
     */
    distinct?: DuesPeriodScalarFieldEnum | DuesPeriodScalarFieldEnum[]
  }

  /**
   * DuesPeriod create
   */
  export type DuesPeriodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * The data needed to create a DuesPeriod.
     */
    data: XOR<DuesPeriodCreateInput, DuesPeriodUncheckedCreateInput>
  }

  /**
   * DuesPeriod createMany
   */
  export type DuesPeriodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DuesPeriods.
     */
    data: DuesPeriodCreateManyInput | DuesPeriodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DuesPeriod createManyAndReturn
   */
  export type DuesPeriodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * The data used to create many DuesPeriods.
     */
    data: DuesPeriodCreateManyInput | DuesPeriodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DuesPeriod update
   */
  export type DuesPeriodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * The data needed to update a DuesPeriod.
     */
    data: XOR<DuesPeriodUpdateInput, DuesPeriodUncheckedUpdateInput>
    /**
     * Choose, which DuesPeriod to update.
     */
    where: DuesPeriodWhereUniqueInput
  }

  /**
   * DuesPeriod updateMany
   */
  export type DuesPeriodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DuesPeriods.
     */
    data: XOR<DuesPeriodUpdateManyMutationInput, DuesPeriodUncheckedUpdateManyInput>
    /**
     * Filter which DuesPeriods to update
     */
    where?: DuesPeriodWhereInput
    /**
     * Limit how many DuesPeriods to update.
     */
    limit?: number
  }

  /**
   * DuesPeriod updateManyAndReturn
   */
  export type DuesPeriodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * The data used to update DuesPeriods.
     */
    data: XOR<DuesPeriodUpdateManyMutationInput, DuesPeriodUncheckedUpdateManyInput>
    /**
     * Filter which DuesPeriods to update
     */
    where?: DuesPeriodWhereInput
    /**
     * Limit how many DuesPeriods to update.
     */
    limit?: number
  }

  /**
   * DuesPeriod upsert
   */
  export type DuesPeriodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * The filter to search for the DuesPeriod to update in case it exists.
     */
    where: DuesPeriodWhereUniqueInput
    /**
     * In case the DuesPeriod found by the `where` argument doesn't exist, create a new DuesPeriod with this data.
     */
    create: XOR<DuesPeriodCreateInput, DuesPeriodUncheckedCreateInput>
    /**
     * In case the DuesPeriod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DuesPeriodUpdateInput, DuesPeriodUncheckedUpdateInput>
  }

  /**
   * DuesPeriod delete
   */
  export type DuesPeriodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
    /**
     * Filter which DuesPeriod to delete.
     */
    where: DuesPeriodWhereUniqueInput
  }

  /**
   * DuesPeriod deleteMany
   */
  export type DuesPeriodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DuesPeriods to delete
     */
    where?: DuesPeriodWhereInput
    /**
     * Limit how many DuesPeriods to delete.
     */
    limit?: number
  }

  /**
   * DuesPeriod.duesPayments
   */
  export type DuesPeriod$duesPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    where?: DuesPaymentWhereInput
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    cursor?: DuesPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DuesPaymentScalarFieldEnum | DuesPaymentScalarFieldEnum[]
  }

  /**
   * DuesPeriod without action
   */
  export type DuesPeriodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPeriod
     */
    select?: DuesPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPeriod
     */
    omit?: DuesPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPeriodInclude<ExtArgs> | null
  }


  /**
   * Model DuesPayment
   */

  export type AggregateDuesPayment = {
    _count: DuesPaymentCountAggregateOutputType | null
    _min: DuesPaymentMinAggregateOutputType | null
    _max: DuesPaymentMaxAggregateOutputType | null
  }

  export type DuesPaymentMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    duePeriodId: string | null
    status: string | null
    proofImageUrl: string | null
    proofImageCloudinaryId: string | null
    paidAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DuesPaymentMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    duePeriodId: string | null
    status: string | null
    proofImageUrl: string | null
    proofImageCloudinaryId: string | null
    paidAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DuesPaymentCountAggregateOutputType = {
    id: number
    studentId: number
    duePeriodId: number
    status: number
    proofImageUrl: number
    proofImageCloudinaryId: number
    paidAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DuesPaymentMinAggregateInputType = {
    id?: true
    studentId?: true
    duePeriodId?: true
    status?: true
    proofImageUrl?: true
    proofImageCloudinaryId?: true
    paidAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DuesPaymentMaxAggregateInputType = {
    id?: true
    studentId?: true
    duePeriodId?: true
    status?: true
    proofImageUrl?: true
    proofImageCloudinaryId?: true
    paidAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DuesPaymentCountAggregateInputType = {
    id?: true
    studentId?: true
    duePeriodId?: true
    status?: true
    proofImageUrl?: true
    proofImageCloudinaryId?: true
    paidAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DuesPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DuesPayment to aggregate.
     */
    where?: DuesPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPayments to fetch.
     */
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DuesPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DuesPayments
    **/
    _count?: true | DuesPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DuesPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DuesPaymentMaxAggregateInputType
  }

  export type GetDuesPaymentAggregateType<T extends DuesPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateDuesPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDuesPayment[P]>
      : GetScalarType<T[P], AggregateDuesPayment[P]>
  }




  export type DuesPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DuesPaymentWhereInput
    orderBy?: DuesPaymentOrderByWithAggregationInput | DuesPaymentOrderByWithAggregationInput[]
    by: DuesPaymentScalarFieldEnum[] | DuesPaymentScalarFieldEnum
    having?: DuesPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DuesPaymentCountAggregateInputType | true
    _min?: DuesPaymentMinAggregateInputType
    _max?: DuesPaymentMaxAggregateInputType
  }

  export type DuesPaymentGroupByOutputType = {
    id: string
    studentId: string
    duePeriodId: string
    status: string
    proofImageUrl: string | null
    proofImageCloudinaryId: string | null
    paidAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DuesPaymentCountAggregateOutputType | null
    _min: DuesPaymentMinAggregateOutputType | null
    _max: DuesPaymentMaxAggregateOutputType | null
  }

  type GetDuesPaymentGroupByPayload<T extends DuesPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DuesPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DuesPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DuesPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], DuesPaymentGroupByOutputType[P]>
        }
      >
    >


  export type DuesPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    duePeriodId?: boolean
    status?: boolean
    proofImageUrl?: boolean
    proofImageCloudinaryId?: boolean
    paidAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["duesPayment"]>

  export type DuesPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    duePeriodId?: boolean
    status?: boolean
    proofImageUrl?: boolean
    proofImageCloudinaryId?: boolean
    paidAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["duesPayment"]>

  export type DuesPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    duePeriodId?: boolean
    status?: boolean
    proofImageUrl?: boolean
    proofImageCloudinaryId?: boolean
    paidAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["duesPayment"]>

  export type DuesPaymentSelectScalar = {
    id?: boolean
    studentId?: boolean
    duePeriodId?: boolean
    status?: boolean
    proofImageUrl?: boolean
    proofImageCloudinaryId?: boolean
    paidAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DuesPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "duePeriodId" | "status" | "proofImageUrl" | "proofImageCloudinaryId" | "paidAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["duesPayment"]>
  export type DuesPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }
  export type DuesPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }
  export type DuesPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    period?: boolean | DuesPeriodDefaultArgs<ExtArgs>
  }

  export type $DuesPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DuesPayment"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      period: Prisma.$DuesPeriodPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      duePeriodId: string
      status: string
      proofImageUrl: string | null
      proofImageCloudinaryId: string | null
      paidAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["duesPayment"]>
    composites: {}
  }

  type DuesPaymentGetPayload<S extends boolean | null | undefined | DuesPaymentDefaultArgs> = $Result.GetResult<Prisma.$DuesPaymentPayload, S>

  type DuesPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DuesPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DuesPaymentCountAggregateInputType | true
    }

  export interface DuesPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DuesPayment'], meta: { name: 'DuesPayment' } }
    /**
     * Find zero or one DuesPayment that matches the filter.
     * @param {DuesPaymentFindUniqueArgs} args - Arguments to find a DuesPayment
     * @example
     * // Get one DuesPayment
     * const duesPayment = await prisma.duesPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DuesPaymentFindUniqueArgs>(args: SelectSubset<T, DuesPaymentFindUniqueArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DuesPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DuesPaymentFindUniqueOrThrowArgs} args - Arguments to find a DuesPayment
     * @example
     * // Get one DuesPayment
     * const duesPayment = await prisma.duesPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DuesPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, DuesPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DuesPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentFindFirstArgs} args - Arguments to find a DuesPayment
     * @example
     * // Get one DuesPayment
     * const duesPayment = await prisma.duesPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DuesPaymentFindFirstArgs>(args?: SelectSubset<T, DuesPaymentFindFirstArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DuesPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentFindFirstOrThrowArgs} args - Arguments to find a DuesPayment
     * @example
     * // Get one DuesPayment
     * const duesPayment = await prisma.duesPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DuesPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, DuesPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DuesPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DuesPayments
     * const duesPayments = await prisma.duesPayment.findMany()
     * 
     * // Get first 10 DuesPayments
     * const duesPayments = await prisma.duesPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const duesPaymentWithIdOnly = await prisma.duesPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DuesPaymentFindManyArgs>(args?: SelectSubset<T, DuesPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DuesPayment.
     * @param {DuesPaymentCreateArgs} args - Arguments to create a DuesPayment.
     * @example
     * // Create one DuesPayment
     * const DuesPayment = await prisma.duesPayment.create({
     *   data: {
     *     // ... data to create a DuesPayment
     *   }
     * })
     * 
     */
    create<T extends DuesPaymentCreateArgs>(args: SelectSubset<T, DuesPaymentCreateArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DuesPayments.
     * @param {DuesPaymentCreateManyArgs} args - Arguments to create many DuesPayments.
     * @example
     * // Create many DuesPayments
     * const duesPayment = await prisma.duesPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DuesPaymentCreateManyArgs>(args?: SelectSubset<T, DuesPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DuesPayments and returns the data saved in the database.
     * @param {DuesPaymentCreateManyAndReturnArgs} args - Arguments to create many DuesPayments.
     * @example
     * // Create many DuesPayments
     * const duesPayment = await prisma.duesPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DuesPayments and only return the `id`
     * const duesPaymentWithIdOnly = await prisma.duesPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DuesPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, DuesPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DuesPayment.
     * @param {DuesPaymentDeleteArgs} args - Arguments to delete one DuesPayment.
     * @example
     * // Delete one DuesPayment
     * const DuesPayment = await prisma.duesPayment.delete({
     *   where: {
     *     // ... filter to delete one DuesPayment
     *   }
     * })
     * 
     */
    delete<T extends DuesPaymentDeleteArgs>(args: SelectSubset<T, DuesPaymentDeleteArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DuesPayment.
     * @param {DuesPaymentUpdateArgs} args - Arguments to update one DuesPayment.
     * @example
     * // Update one DuesPayment
     * const duesPayment = await prisma.duesPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DuesPaymentUpdateArgs>(args: SelectSubset<T, DuesPaymentUpdateArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DuesPayments.
     * @param {DuesPaymentDeleteManyArgs} args - Arguments to filter DuesPayments to delete.
     * @example
     * // Delete a few DuesPayments
     * const { count } = await prisma.duesPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DuesPaymentDeleteManyArgs>(args?: SelectSubset<T, DuesPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DuesPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DuesPayments
     * const duesPayment = await prisma.duesPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DuesPaymentUpdateManyArgs>(args: SelectSubset<T, DuesPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DuesPayments and returns the data updated in the database.
     * @param {DuesPaymentUpdateManyAndReturnArgs} args - Arguments to update many DuesPayments.
     * @example
     * // Update many DuesPayments
     * const duesPayment = await prisma.duesPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DuesPayments and only return the `id`
     * const duesPaymentWithIdOnly = await prisma.duesPayment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DuesPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, DuesPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DuesPayment.
     * @param {DuesPaymentUpsertArgs} args - Arguments to update or create a DuesPayment.
     * @example
     * // Update or create a DuesPayment
     * const duesPayment = await prisma.duesPayment.upsert({
     *   create: {
     *     // ... data to create a DuesPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DuesPayment we want to update
     *   }
     * })
     */
    upsert<T extends DuesPaymentUpsertArgs>(args: SelectSubset<T, DuesPaymentUpsertArgs<ExtArgs>>): Prisma__DuesPaymentClient<$Result.GetResult<Prisma.$DuesPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DuesPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentCountArgs} args - Arguments to filter DuesPayments to count.
     * @example
     * // Count the number of DuesPayments
     * const count = await prisma.duesPayment.count({
     *   where: {
     *     // ... the filter for the DuesPayments we want to count
     *   }
     * })
    **/
    count<T extends DuesPaymentCountArgs>(
      args?: Subset<T, DuesPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DuesPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DuesPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DuesPaymentAggregateArgs>(args: Subset<T, DuesPaymentAggregateArgs>): Prisma.PrismaPromise<GetDuesPaymentAggregateType<T>>

    /**
     * Group by DuesPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DuesPaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DuesPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DuesPaymentGroupByArgs['orderBy'] }
        : { orderBy?: DuesPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DuesPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDuesPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DuesPayment model
   */
  readonly fields: DuesPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DuesPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DuesPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    period<T extends DuesPeriodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DuesPeriodDefaultArgs<ExtArgs>>): Prisma__DuesPeriodClient<$Result.GetResult<Prisma.$DuesPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DuesPayment model
   */
  interface DuesPaymentFieldRefs {
    readonly id: FieldRef<"DuesPayment", 'String'>
    readonly studentId: FieldRef<"DuesPayment", 'String'>
    readonly duePeriodId: FieldRef<"DuesPayment", 'String'>
    readonly status: FieldRef<"DuesPayment", 'String'>
    readonly proofImageUrl: FieldRef<"DuesPayment", 'String'>
    readonly proofImageCloudinaryId: FieldRef<"DuesPayment", 'String'>
    readonly paidAt: FieldRef<"DuesPayment", 'DateTime'>
    readonly notes: FieldRef<"DuesPayment", 'String'>
    readonly createdAt: FieldRef<"DuesPayment", 'DateTime'>
    readonly updatedAt: FieldRef<"DuesPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DuesPayment findUnique
   */
  export type DuesPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter, which DuesPayment to fetch.
     */
    where: DuesPaymentWhereUniqueInput
  }

  /**
   * DuesPayment findUniqueOrThrow
   */
  export type DuesPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter, which DuesPayment to fetch.
     */
    where: DuesPaymentWhereUniqueInput
  }

  /**
   * DuesPayment findFirst
   */
  export type DuesPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter, which DuesPayment to fetch.
     */
    where?: DuesPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPayments to fetch.
     */
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DuesPayments.
     */
    cursor?: DuesPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPayments.
     */
    distinct?: DuesPaymentScalarFieldEnum | DuesPaymentScalarFieldEnum[]
  }

  /**
   * DuesPayment findFirstOrThrow
   */
  export type DuesPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter, which DuesPayment to fetch.
     */
    where?: DuesPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPayments to fetch.
     */
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DuesPayments.
     */
    cursor?: DuesPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPayments.
     */
    distinct?: DuesPaymentScalarFieldEnum | DuesPaymentScalarFieldEnum[]
  }

  /**
   * DuesPayment findMany
   */
  export type DuesPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter, which DuesPayments to fetch.
     */
    where?: DuesPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DuesPayments to fetch.
     */
    orderBy?: DuesPaymentOrderByWithRelationInput | DuesPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DuesPayments.
     */
    cursor?: DuesPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DuesPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DuesPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DuesPayments.
     */
    distinct?: DuesPaymentScalarFieldEnum | DuesPaymentScalarFieldEnum[]
  }

  /**
   * DuesPayment create
   */
  export type DuesPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a DuesPayment.
     */
    data: XOR<DuesPaymentCreateInput, DuesPaymentUncheckedCreateInput>
  }

  /**
   * DuesPayment createMany
   */
  export type DuesPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DuesPayments.
     */
    data: DuesPaymentCreateManyInput | DuesPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DuesPayment createManyAndReturn
   */
  export type DuesPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many DuesPayments.
     */
    data: DuesPaymentCreateManyInput | DuesPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DuesPayment update
   */
  export type DuesPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a DuesPayment.
     */
    data: XOR<DuesPaymentUpdateInput, DuesPaymentUncheckedUpdateInput>
    /**
     * Choose, which DuesPayment to update.
     */
    where: DuesPaymentWhereUniqueInput
  }

  /**
   * DuesPayment updateMany
   */
  export type DuesPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DuesPayments.
     */
    data: XOR<DuesPaymentUpdateManyMutationInput, DuesPaymentUncheckedUpdateManyInput>
    /**
     * Filter which DuesPayments to update
     */
    where?: DuesPaymentWhereInput
    /**
     * Limit how many DuesPayments to update.
     */
    limit?: number
  }

  /**
   * DuesPayment updateManyAndReturn
   */
  export type DuesPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * The data used to update DuesPayments.
     */
    data: XOR<DuesPaymentUpdateManyMutationInput, DuesPaymentUncheckedUpdateManyInput>
    /**
     * Filter which DuesPayments to update
     */
    where?: DuesPaymentWhereInput
    /**
     * Limit how many DuesPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DuesPayment upsert
   */
  export type DuesPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the DuesPayment to update in case it exists.
     */
    where: DuesPaymentWhereUniqueInput
    /**
     * In case the DuesPayment found by the `where` argument doesn't exist, create a new DuesPayment with this data.
     */
    create: XOR<DuesPaymentCreateInput, DuesPaymentUncheckedCreateInput>
    /**
     * In case the DuesPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DuesPaymentUpdateInput, DuesPaymentUncheckedUpdateInput>
  }

  /**
   * DuesPayment delete
   */
  export type DuesPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
    /**
     * Filter which DuesPayment to delete.
     */
    where: DuesPaymentWhereUniqueInput
  }

  /**
   * DuesPayment deleteMany
   */
  export type DuesPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DuesPayments to delete
     */
    where?: DuesPaymentWhereInput
    /**
     * Limit how many DuesPayments to delete.
     */
    limit?: number
  }

  /**
   * DuesPayment without action
   */
  export type DuesPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DuesPayment
     */
    select?: DuesPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DuesPayment
     */
    omit?: DuesPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DuesPaymentInclude<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    authorId: string | null
    status: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    authorId: string | null
    status: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    title: number
    content: number
    authorId: number
    status: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    authorId?: true
    status?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    authorId?: true
    status?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    authorId?: true
    status?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    title: string
    content: string
    authorId: string
    status: string
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    status?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    status?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    status?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    authorId?: boolean
    status?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "authorId" | "status" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["announcement"]>
  export type AnnouncementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      authorId: string
      status: string
      publishedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Announcements and returns the data saved in the database.
     * @param {AnnouncementCreateManyAndReturnArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements and returns the data updated in the database.
     * @param {AnnouncementUpdateManyAndReturnArgs} args - Arguments to update many Announcements.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly authorId: FieldRef<"Announcement", 'String'>
    readonly status: FieldRef<"Announcement", 'String'>
    readonly publishedAt: FieldRef<"Announcement", 'DateTime'>
    readonly createdAt: FieldRef<"Announcement", 'DateTime'>
    readonly updatedAt: FieldRef<"Announcement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement createManyAndReturn
   */
  export type AnnouncementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement updateManyAndReturn
   */
  export type AnnouncementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleAvgAggregateOutputType = {
    dayOfWeek: number | null
    periodOrder: number | null
  }

  export type ScheduleSumAggregateOutputType = {
    dayOfWeek: number | null
    periodOrder: number | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    dayOfWeek: number | null
    periodOrder: number | null
    periodLabel: string | null
    subject: string | null
    teacher: string | null
    room: string | null
    isBreak: boolean | null
    updatedAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    dayOfWeek: number | null
    periodOrder: number | null
    periodLabel: string | null
    subject: string | null
    teacher: string | null
    room: string | null
    isBreak: boolean | null
    updatedAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    dayOfWeek: number
    periodOrder: number
    periodLabel: number
    subject: number
    teacher: number
    room: number
    isBreak: number
    updatedAt: number
    _all: number
  }


  export type ScheduleAvgAggregateInputType = {
    dayOfWeek?: true
    periodOrder?: true
  }

  export type ScheduleSumAggregateInputType = {
    dayOfWeek?: true
    periodOrder?: true
  }

  export type ScheduleMinAggregateInputType = {
    id?: true
    dayOfWeek?: true
    periodOrder?: true
    periodLabel?: true
    subject?: true
    teacher?: true
    room?: true
    isBreak?: true
    updatedAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    dayOfWeek?: true
    periodOrder?: true
    periodLabel?: true
    subject?: true
    teacher?: true
    room?: true
    isBreak?: true
    updatedAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    dayOfWeek?: true
    periodOrder?: true
    periodLabel?: true
    subject?: true
    teacher?: true
    room?: true
    isBreak?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _avg?: ScheduleAvgAggregateInputType
    _sum?: ScheduleSumAggregateInputType
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    dayOfWeek: number
    periodOrder: number
    periodLabel: string
    subject: string | null
    teacher: string | null
    room: string | null
    isBreak: boolean
    updatedAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _avg: ScheduleAvgAggregateOutputType | null
    _sum: ScheduleSumAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayOfWeek?: boolean
    periodOrder?: boolean
    periodLabel?: boolean
    subject?: boolean
    teacher?: boolean
    room?: boolean
    isBreak?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayOfWeek?: boolean
    periodOrder?: boolean
    periodLabel?: boolean
    subject?: boolean
    teacher?: boolean
    room?: boolean
    isBreak?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dayOfWeek?: boolean
    periodOrder?: boolean
    periodLabel?: boolean
    subject?: boolean
    teacher?: boolean
    room?: boolean
    isBreak?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    dayOfWeek?: boolean
    periodOrder?: boolean
    periodLabel?: boolean
    subject?: boolean
    teacher?: boolean
    room?: boolean
    isBreak?: boolean
    updatedAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dayOfWeek" | "periodOrder" | "periodLabel" | "subject" | "teacher" | "room" | "isBreak" | "updatedAt", ExtArgs["result"]["schedule"]>

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dayOfWeek: number
      periodOrder: number
      periodLabel: string
      subject: string | null
      teacher: string | null
      room: string | null
      isBreak: boolean
      updatedAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly dayOfWeek: FieldRef<"Schedule", 'Int'>
    readonly periodOrder: FieldRef<"Schedule", 'Int'>
    readonly periodLabel: FieldRef<"Schedule", 'String'>
    readonly subject: FieldRef<"Schedule", 'String'>
    readonly teacher: FieldRef<"Schedule", 'String'>
    readonly room: FieldRef<"Schedule", 'String'>
    readonly isBreak: FieldRef<"Schedule", 'Boolean'>
    readonly updatedAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
  }


  /**
   * Model PhotoGallery
   */

  export type AggregatePhotoGallery = {
    _count: PhotoGalleryCountAggregateOutputType | null
    _min: PhotoGalleryMinAggregateOutputType | null
    _max: PhotoGalleryMaxAggregateOutputType | null
  }

  export type PhotoGalleryMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    eventDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhotoGalleryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    eventDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhotoGalleryCountAggregateOutputType = {
    id: number
    title: number
    description: number
    eventDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PhotoGalleryMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    eventDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhotoGalleryMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    eventDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhotoGalleryCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    eventDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PhotoGalleryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoGallery to aggregate.
     */
    where?: PhotoGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoGalleries to fetch.
     */
    orderBy?: PhotoGalleryOrderByWithRelationInput | PhotoGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhotoGalleries
    **/
    _count?: true | PhotoGalleryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoGalleryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoGalleryMaxAggregateInputType
  }

  export type GetPhotoGalleryAggregateType<T extends PhotoGalleryAggregateArgs> = {
        [P in keyof T & keyof AggregatePhotoGallery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhotoGallery[P]>
      : GetScalarType<T[P], AggregatePhotoGallery[P]>
  }




  export type PhotoGalleryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoGalleryWhereInput
    orderBy?: PhotoGalleryOrderByWithAggregationInput | PhotoGalleryOrderByWithAggregationInput[]
    by: PhotoGalleryScalarFieldEnum[] | PhotoGalleryScalarFieldEnum
    having?: PhotoGalleryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoGalleryCountAggregateInputType | true
    _min?: PhotoGalleryMinAggregateInputType
    _max?: PhotoGalleryMaxAggregateInputType
  }

  export type PhotoGalleryGroupByOutputType = {
    id: string
    title: string
    description: string | null
    eventDate: Date
    createdAt: Date
    updatedAt: Date
    _count: PhotoGalleryCountAggregateOutputType | null
    _min: PhotoGalleryMinAggregateOutputType | null
    _max: PhotoGalleryMaxAggregateOutputType | null
  }

  type GetPhotoGalleryGroupByPayload<T extends PhotoGalleryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoGalleryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoGalleryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoGalleryGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoGalleryGroupByOutputType[P]>
        }
      >
    >


  export type PhotoGallerySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    eventDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    photos?: boolean | PhotoGallery$photosArgs<ExtArgs>
    _count?: boolean | PhotoGalleryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photoGallery"]>

  export type PhotoGallerySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    eventDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["photoGallery"]>

  export type PhotoGallerySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    eventDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["photoGallery"]>

  export type PhotoGallerySelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    eventDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PhotoGalleryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "eventDate" | "createdAt" | "updatedAt", ExtArgs["result"]["photoGallery"]>
  export type PhotoGalleryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | PhotoGallery$photosArgs<ExtArgs>
    _count?: boolean | PhotoGalleryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PhotoGalleryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PhotoGalleryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PhotoGalleryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhotoGallery"
    objects: {
      photos: Prisma.$PhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      eventDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["photoGallery"]>
    composites: {}
  }

  type PhotoGalleryGetPayload<S extends boolean | null | undefined | PhotoGalleryDefaultArgs> = $Result.GetResult<Prisma.$PhotoGalleryPayload, S>

  type PhotoGalleryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhotoGalleryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhotoGalleryCountAggregateInputType | true
    }

  export interface PhotoGalleryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhotoGallery'], meta: { name: 'PhotoGallery' } }
    /**
     * Find zero or one PhotoGallery that matches the filter.
     * @param {PhotoGalleryFindUniqueArgs} args - Arguments to find a PhotoGallery
     * @example
     * // Get one PhotoGallery
     * const photoGallery = await prisma.photoGallery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoGalleryFindUniqueArgs>(args: SelectSubset<T, PhotoGalleryFindUniqueArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhotoGallery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhotoGalleryFindUniqueOrThrowArgs} args - Arguments to find a PhotoGallery
     * @example
     * // Get one PhotoGallery
     * const photoGallery = await prisma.photoGallery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoGalleryFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoGalleryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhotoGallery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryFindFirstArgs} args - Arguments to find a PhotoGallery
     * @example
     * // Get one PhotoGallery
     * const photoGallery = await prisma.photoGallery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoGalleryFindFirstArgs>(args?: SelectSubset<T, PhotoGalleryFindFirstArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhotoGallery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryFindFirstOrThrowArgs} args - Arguments to find a PhotoGallery
     * @example
     * // Get one PhotoGallery
     * const photoGallery = await prisma.photoGallery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoGalleryFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoGalleryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhotoGalleries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhotoGalleries
     * const photoGalleries = await prisma.photoGallery.findMany()
     * 
     * // Get first 10 PhotoGalleries
     * const photoGalleries = await prisma.photoGallery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const photoGalleryWithIdOnly = await prisma.photoGallery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhotoGalleryFindManyArgs>(args?: SelectSubset<T, PhotoGalleryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhotoGallery.
     * @param {PhotoGalleryCreateArgs} args - Arguments to create a PhotoGallery.
     * @example
     * // Create one PhotoGallery
     * const PhotoGallery = await prisma.photoGallery.create({
     *   data: {
     *     // ... data to create a PhotoGallery
     *   }
     * })
     * 
     */
    create<T extends PhotoGalleryCreateArgs>(args: SelectSubset<T, PhotoGalleryCreateArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhotoGalleries.
     * @param {PhotoGalleryCreateManyArgs} args - Arguments to create many PhotoGalleries.
     * @example
     * // Create many PhotoGalleries
     * const photoGallery = await prisma.photoGallery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoGalleryCreateManyArgs>(args?: SelectSubset<T, PhotoGalleryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhotoGalleries and returns the data saved in the database.
     * @param {PhotoGalleryCreateManyAndReturnArgs} args - Arguments to create many PhotoGalleries.
     * @example
     * // Create many PhotoGalleries
     * const photoGallery = await prisma.photoGallery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhotoGalleries and only return the `id`
     * const photoGalleryWithIdOnly = await prisma.photoGallery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoGalleryCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoGalleryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhotoGallery.
     * @param {PhotoGalleryDeleteArgs} args - Arguments to delete one PhotoGallery.
     * @example
     * // Delete one PhotoGallery
     * const PhotoGallery = await prisma.photoGallery.delete({
     *   where: {
     *     // ... filter to delete one PhotoGallery
     *   }
     * })
     * 
     */
    delete<T extends PhotoGalleryDeleteArgs>(args: SelectSubset<T, PhotoGalleryDeleteArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhotoGallery.
     * @param {PhotoGalleryUpdateArgs} args - Arguments to update one PhotoGallery.
     * @example
     * // Update one PhotoGallery
     * const photoGallery = await prisma.photoGallery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoGalleryUpdateArgs>(args: SelectSubset<T, PhotoGalleryUpdateArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhotoGalleries.
     * @param {PhotoGalleryDeleteManyArgs} args - Arguments to filter PhotoGalleries to delete.
     * @example
     * // Delete a few PhotoGalleries
     * const { count } = await prisma.photoGallery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoGalleryDeleteManyArgs>(args?: SelectSubset<T, PhotoGalleryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhotoGalleries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhotoGalleries
     * const photoGallery = await prisma.photoGallery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoGalleryUpdateManyArgs>(args: SelectSubset<T, PhotoGalleryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhotoGalleries and returns the data updated in the database.
     * @param {PhotoGalleryUpdateManyAndReturnArgs} args - Arguments to update many PhotoGalleries.
     * @example
     * // Update many PhotoGalleries
     * const photoGallery = await prisma.photoGallery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhotoGalleries and only return the `id`
     * const photoGalleryWithIdOnly = await prisma.photoGallery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhotoGalleryUpdateManyAndReturnArgs>(args: SelectSubset<T, PhotoGalleryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhotoGallery.
     * @param {PhotoGalleryUpsertArgs} args - Arguments to update or create a PhotoGallery.
     * @example
     * // Update or create a PhotoGallery
     * const photoGallery = await prisma.photoGallery.upsert({
     *   create: {
     *     // ... data to create a PhotoGallery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhotoGallery we want to update
     *   }
     * })
     */
    upsert<T extends PhotoGalleryUpsertArgs>(args: SelectSubset<T, PhotoGalleryUpsertArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhotoGalleries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryCountArgs} args - Arguments to filter PhotoGalleries to count.
     * @example
     * // Count the number of PhotoGalleries
     * const count = await prisma.photoGallery.count({
     *   where: {
     *     // ... the filter for the PhotoGalleries we want to count
     *   }
     * })
    **/
    count<T extends PhotoGalleryCountArgs>(
      args?: Subset<T, PhotoGalleryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoGalleryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhotoGallery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhotoGalleryAggregateArgs>(args: Subset<T, PhotoGalleryAggregateArgs>): Prisma.PrismaPromise<GetPhotoGalleryAggregateType<T>>

    /**
     * Group by PhotoGallery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGalleryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhotoGalleryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoGalleryGroupByArgs['orderBy'] }
        : { orderBy?: PhotoGalleryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhotoGalleryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGalleryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhotoGallery model
   */
  readonly fields: PhotoGalleryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhotoGallery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoGalleryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    photos<T extends PhotoGallery$photosArgs<ExtArgs> = {}>(args?: Subset<T, PhotoGallery$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PhotoGallery model
   */
  interface PhotoGalleryFieldRefs {
    readonly id: FieldRef<"PhotoGallery", 'String'>
    readonly title: FieldRef<"PhotoGallery", 'String'>
    readonly description: FieldRef<"PhotoGallery", 'String'>
    readonly eventDate: FieldRef<"PhotoGallery", 'DateTime'>
    readonly createdAt: FieldRef<"PhotoGallery", 'DateTime'>
    readonly updatedAt: FieldRef<"PhotoGallery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PhotoGallery findUnique
   */
  export type PhotoGalleryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoGallery to fetch.
     */
    where: PhotoGalleryWhereUniqueInput
  }

  /**
   * PhotoGallery findUniqueOrThrow
   */
  export type PhotoGalleryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoGallery to fetch.
     */
    where: PhotoGalleryWhereUniqueInput
  }

  /**
   * PhotoGallery findFirst
   */
  export type PhotoGalleryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoGallery to fetch.
     */
    where?: PhotoGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoGalleries to fetch.
     */
    orderBy?: PhotoGalleryOrderByWithRelationInput | PhotoGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoGalleries.
     */
    cursor?: PhotoGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoGalleries.
     */
    distinct?: PhotoGalleryScalarFieldEnum | PhotoGalleryScalarFieldEnum[]
  }

  /**
   * PhotoGallery findFirstOrThrow
   */
  export type PhotoGalleryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoGallery to fetch.
     */
    where?: PhotoGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoGalleries to fetch.
     */
    orderBy?: PhotoGalleryOrderByWithRelationInput | PhotoGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhotoGalleries.
     */
    cursor?: PhotoGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoGalleries.
     */
    distinct?: PhotoGalleryScalarFieldEnum | PhotoGalleryScalarFieldEnum[]
  }

  /**
   * PhotoGallery findMany
   */
  export type PhotoGalleryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter, which PhotoGalleries to fetch.
     */
    where?: PhotoGalleryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhotoGalleries to fetch.
     */
    orderBy?: PhotoGalleryOrderByWithRelationInput | PhotoGalleryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhotoGalleries.
     */
    cursor?: PhotoGalleryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhotoGalleries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhotoGalleries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhotoGalleries.
     */
    distinct?: PhotoGalleryScalarFieldEnum | PhotoGalleryScalarFieldEnum[]
  }

  /**
   * PhotoGallery create
   */
  export type PhotoGalleryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * The data needed to create a PhotoGallery.
     */
    data: XOR<PhotoGalleryCreateInput, PhotoGalleryUncheckedCreateInput>
  }

  /**
   * PhotoGallery createMany
   */
  export type PhotoGalleryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhotoGalleries.
     */
    data: PhotoGalleryCreateManyInput | PhotoGalleryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhotoGallery createManyAndReturn
   */
  export type PhotoGalleryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * The data used to create many PhotoGalleries.
     */
    data: PhotoGalleryCreateManyInput | PhotoGalleryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhotoGallery update
   */
  export type PhotoGalleryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * The data needed to update a PhotoGallery.
     */
    data: XOR<PhotoGalleryUpdateInput, PhotoGalleryUncheckedUpdateInput>
    /**
     * Choose, which PhotoGallery to update.
     */
    where: PhotoGalleryWhereUniqueInput
  }

  /**
   * PhotoGallery updateMany
   */
  export type PhotoGalleryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhotoGalleries.
     */
    data: XOR<PhotoGalleryUpdateManyMutationInput, PhotoGalleryUncheckedUpdateManyInput>
    /**
     * Filter which PhotoGalleries to update
     */
    where?: PhotoGalleryWhereInput
    /**
     * Limit how many PhotoGalleries to update.
     */
    limit?: number
  }

  /**
   * PhotoGallery updateManyAndReturn
   */
  export type PhotoGalleryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * The data used to update PhotoGalleries.
     */
    data: XOR<PhotoGalleryUpdateManyMutationInput, PhotoGalleryUncheckedUpdateManyInput>
    /**
     * Filter which PhotoGalleries to update
     */
    where?: PhotoGalleryWhereInput
    /**
     * Limit how many PhotoGalleries to update.
     */
    limit?: number
  }

  /**
   * PhotoGallery upsert
   */
  export type PhotoGalleryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * The filter to search for the PhotoGallery to update in case it exists.
     */
    where: PhotoGalleryWhereUniqueInput
    /**
     * In case the PhotoGallery found by the `where` argument doesn't exist, create a new PhotoGallery with this data.
     */
    create: XOR<PhotoGalleryCreateInput, PhotoGalleryUncheckedCreateInput>
    /**
     * In case the PhotoGallery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoGalleryUpdateInput, PhotoGalleryUncheckedUpdateInput>
  }

  /**
   * PhotoGallery delete
   */
  export type PhotoGalleryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
    /**
     * Filter which PhotoGallery to delete.
     */
    where: PhotoGalleryWhereUniqueInput
  }

  /**
   * PhotoGallery deleteMany
   */
  export type PhotoGalleryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhotoGalleries to delete
     */
    where?: PhotoGalleryWhereInput
    /**
     * Limit how many PhotoGalleries to delete.
     */
    limit?: number
  }

  /**
   * PhotoGallery.photos
   */
  export type PhotoGallery$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    where?: PhotoWhereInput
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    cursor?: PhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * PhotoGallery without action
   */
  export type PhotoGalleryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhotoGallery
     */
    select?: PhotoGallerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhotoGallery
     */
    omit?: PhotoGalleryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoGalleryInclude<ExtArgs> | null
  }


  /**
   * Model Photo
   */

  export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  export type PhotoMinAggregateOutputType = {
    id: string | null
    galleryId: string | null
    cloudinaryUrl: string | null
    cloudinaryId: string | null
    caption: string | null
    uploadedAt: Date | null
  }

  export type PhotoMaxAggregateOutputType = {
    id: string | null
    galleryId: string | null
    cloudinaryUrl: string | null
    cloudinaryId: string | null
    caption: string | null
    uploadedAt: Date | null
  }

  export type PhotoCountAggregateOutputType = {
    id: number
    galleryId: number
    cloudinaryUrl: number
    cloudinaryId: number
    caption: number
    uploadedAt: number
    _all: number
  }


  export type PhotoMinAggregateInputType = {
    id?: true
    galleryId?: true
    cloudinaryUrl?: true
    cloudinaryId?: true
    caption?: true
    uploadedAt?: true
  }

  export type PhotoMaxAggregateInputType = {
    id?: true
    galleryId?: true
    cloudinaryUrl?: true
    cloudinaryId?: true
    caption?: true
    uploadedAt?: true
  }

  export type PhotoCountAggregateInputType = {
    id?: true
    galleryId?: true
    cloudinaryUrl?: true
    cloudinaryId?: true
    caption?: true
    uploadedAt?: true
    _all?: true
  }

  export type PhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photo to aggregate.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Photos
    **/
    _count?: true | PhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoMaxAggregateInputType
  }

  export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoto[P]>
      : GetScalarType<T[P], AggregatePhoto[P]>
  }




  export type PhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoWhereInput
    orderBy?: PhotoOrderByWithAggregationInput | PhotoOrderByWithAggregationInput[]
    by: PhotoScalarFieldEnum[] | PhotoScalarFieldEnum
    having?: PhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoCountAggregateInputType | true
    _min?: PhotoMinAggregateInputType
    _max?: PhotoMaxAggregateInputType
  }

  export type PhotoGroupByOutputType = {
    id: string
    galleryId: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption: string | null
    uploadedAt: Date
    _count: PhotoCountAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  type GetPhotoGroupByPayload<T extends PhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoGroupByOutputType[P]>
        }
      >
    >


  export type PhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    galleryId?: boolean
    cloudinaryUrl?: boolean
    cloudinaryId?: boolean
    caption?: boolean
    uploadedAt?: boolean
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    galleryId?: boolean
    cloudinaryUrl?: boolean
    cloudinaryId?: boolean
    caption?: boolean
    uploadedAt?: boolean
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    galleryId?: boolean
    cloudinaryUrl?: boolean
    cloudinaryId?: boolean
    caption?: boolean
    uploadedAt?: boolean
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectScalar = {
    id?: boolean
    galleryId?: boolean
    cloudinaryUrl?: boolean
    cloudinaryId?: boolean
    caption?: boolean
    uploadedAt?: boolean
  }

  export type PhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "galleryId" | "cloudinaryUrl" | "cloudinaryId" | "caption" | "uploadedAt", ExtArgs["result"]["photo"]>
  export type PhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }
  export type PhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }
  export type PhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gallery?: boolean | PhotoGalleryDefaultArgs<ExtArgs>
  }

  export type $PhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Photo"
    objects: {
      gallery: Prisma.$PhotoGalleryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      galleryId: string
      cloudinaryUrl: string
      cloudinaryId: string
      caption: string | null
      uploadedAt: Date
    }, ExtArgs["result"]["photo"]>
    composites: {}
  }

  type PhotoGetPayload<S extends boolean | null | undefined | PhotoDefaultArgs> = $Result.GetResult<Prisma.$PhotoPayload, S>

  type PhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhotoCountAggregateInputType | true
    }

  export interface PhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Photo'], meta: { name: 'Photo' } }
    /**
     * Find zero or one Photo that matches the filter.
     * @param {PhotoFindUniqueArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoFindUniqueArgs>(args: SelectSubset<T, PhotoFindUniqueArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Photo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhotoFindUniqueOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoFindFirstArgs>(args?: SelectSubset<T, PhotoFindFirstArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Photos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Photos
     * const photos = await prisma.photo.findMany()
     * 
     * // Get first 10 Photos
     * const photos = await prisma.photo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const photoWithIdOnly = await prisma.photo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhotoFindManyArgs>(args?: SelectSubset<T, PhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Photo.
     * @param {PhotoCreateArgs} args - Arguments to create a Photo.
     * @example
     * // Create one Photo
     * const Photo = await prisma.photo.create({
     *   data: {
     *     // ... data to create a Photo
     *   }
     * })
     * 
     */
    create<T extends PhotoCreateArgs>(args: SelectSubset<T, PhotoCreateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Photos.
     * @param {PhotoCreateManyArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoCreateManyArgs>(args?: SelectSubset<T, PhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Photos and returns the data saved in the database.
     * @param {PhotoCreateManyAndReturnArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Photo.
     * @param {PhotoDeleteArgs} args - Arguments to delete one Photo.
     * @example
     * // Delete one Photo
     * const Photo = await prisma.photo.delete({
     *   where: {
     *     // ... filter to delete one Photo
     *   }
     * })
     * 
     */
    delete<T extends PhotoDeleteArgs>(args: SelectSubset<T, PhotoDeleteArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Photo.
     * @param {PhotoUpdateArgs} args - Arguments to update one Photo.
     * @example
     * // Update one Photo
     * const photo = await prisma.photo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoUpdateArgs>(args: SelectSubset<T, PhotoUpdateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Photos.
     * @param {PhotoDeleteManyArgs} args - Arguments to filter Photos to delete.
     * @example
     * // Delete a few Photos
     * const { count } = await prisma.photo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoDeleteManyArgs>(args?: SelectSubset<T, PhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoUpdateManyArgs>(args: SelectSubset<T, PhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos and returns the data updated in the database.
     * @param {PhotoUpdateManyAndReturnArgs} args - Arguments to update many Photos.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, PhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Photo.
     * @param {PhotoUpsertArgs} args - Arguments to update or create a Photo.
     * @example
     * // Update or create a Photo
     * const photo = await prisma.photo.upsert({
     *   create: {
     *     // ... data to create a Photo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Photo we want to update
     *   }
     * })
     */
    upsert<T extends PhotoUpsertArgs>(args: SelectSubset<T, PhotoUpsertArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCountArgs} args - Arguments to filter Photos to count.
     * @example
     * // Count the number of Photos
     * const count = await prisma.photo.count({
     *   where: {
     *     // ... the filter for the Photos we want to count
     *   }
     * })
    **/
    count<T extends PhotoCountArgs>(
      args?: Subset<T, PhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhotoAggregateArgs>(args: Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>

    /**
     * Group by Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoGroupByArgs['orderBy'] }
        : { orderBy?: PhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Photo model
   */
  readonly fields: PhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Photo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gallery<T extends PhotoGalleryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PhotoGalleryDefaultArgs<ExtArgs>>): Prisma__PhotoGalleryClient<$Result.GetResult<Prisma.$PhotoGalleryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Photo model
   */
  interface PhotoFieldRefs {
    readonly id: FieldRef<"Photo", 'String'>
    readonly galleryId: FieldRef<"Photo", 'String'>
    readonly cloudinaryUrl: FieldRef<"Photo", 'String'>
    readonly cloudinaryId: FieldRef<"Photo", 'String'>
    readonly caption: FieldRef<"Photo", 'String'>
    readonly uploadedAt: FieldRef<"Photo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Photo findUnique
   */
  export type PhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findUniqueOrThrow
   */
  export type PhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findFirst
   */
  export type PhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findFirstOrThrow
   */
  export type PhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findMany
   */
  export type PhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photos to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo create
   */
  export type PhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a Photo.
     */
    data: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
  }

  /**
   * Photo createMany
   */
  export type PhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Photo createManyAndReturn
   */
  export type PhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Photo update
   */
  export type PhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a Photo.
     */
    data: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
    /**
     * Choose, which Photo to update.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo updateMany
   */
  export type PhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
  }

  /**
   * Photo updateManyAndReturn
   */
  export type PhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Photo upsert
   */
  export type PhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the Photo to update in case it exists.
     */
    where: PhotoWhereUniqueInput
    /**
     * In case the Photo found by the `where` argument doesn't exist, create a new Photo with this data.
     */
    create: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
    /**
     * In case the Photo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
  }

  /**
   * Photo delete
   */
  export type PhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter which Photo to delete.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo deleteMany
   */
  export type PhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photos to delete
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to delete.
     */
    limit?: number
  }

  /**
   * Photo without action
   */
  export type PhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    tableName: string | null
    recordId: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    tableName: string | null
    recordId: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    tableName: number
    recordId: number
    oldValues: number
    newValues: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    tableName?: true
    recordId?: true
    oldValues?: true
    newValues?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    tableName: string
    recordId: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValues?: boolean
    newValues?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "tableName" | "recordId" | "oldValues" | "newValues" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      tableName: string
      recordId: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly tableName: FieldRef<"AuditLog", 'String'>
    readonly recordId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    date: Date | null
    status: string | null
    checkInTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    date: Date | null
    status: string | null
    checkInTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    studentId: number
    date: number
    status: number
    checkInTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttendanceMinAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    checkInTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    checkInTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    checkInTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: string
    studentId: string
    date: Date
    status: string
    checkInTime: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    checkInTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    checkInTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    checkInTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    checkInTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "date" | "status" | "checkInTime" | "createdAt" | "updatedAt", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      date: Date
      status: string
      checkInTime: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances and returns the data updated in the database.
     * @param {AttendanceUpdateManyAndReturnArgs} args - Arguments to update many Attendances.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendanceUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'String'>
    readonly studentId: FieldRef<"Attendance", 'String'>
    readonly date: FieldRef<"Attendance", 'DateTime'>
    readonly status: FieldRef<"Attendance", 'String'>
    readonly checkInTime: FieldRef<"Attendance", 'DateTime'>
    readonly createdAt: FieldRef<"Attendance", 'DateTime'>
    readonly updatedAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance updateManyAndReturn
   */
  export type AttendanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Material
   */

  export type AggregateMaterial = {
    _count: MaterialCountAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  export type MaterialMinAggregateOutputType = {
    id: string | null
    title: string | null
    subjectName: string | null
    description: string | null
    fileUrl: string | null
    cloudinaryId: string | null
    externalLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subjectName: string | null
    description: string | null
    fileUrl: string | null
    cloudinaryId: string | null
    externalLink: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MaterialCountAggregateOutputType = {
    id: number
    title: number
    subjectName: number
    description: number
    fileUrl: number
    cloudinaryId: number
    externalLink: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MaterialMinAggregateInputType = {
    id?: true
    title?: true
    subjectName?: true
    description?: true
    fileUrl?: true
    cloudinaryId?: true
    externalLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialMaxAggregateInputType = {
    id?: true
    title?: true
    subjectName?: true
    description?: true
    fileUrl?: true
    cloudinaryId?: true
    externalLink?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MaterialCountAggregateInputType = {
    id?: true
    title?: true
    subjectName?: true
    description?: true
    fileUrl?: true
    cloudinaryId?: true
    externalLink?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MaterialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Material to aggregate.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Materials
    **/
    _count?: true | MaterialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaterialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaterialMaxAggregateInputType
  }

  export type GetMaterialAggregateType<T extends MaterialAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterial[P]>
      : GetScalarType<T[P], AggregateMaterial[P]>
  }




  export type MaterialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaterialWhereInput
    orderBy?: MaterialOrderByWithAggregationInput | MaterialOrderByWithAggregationInput[]
    by: MaterialScalarFieldEnum[] | MaterialScalarFieldEnum
    having?: MaterialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaterialCountAggregateInputType | true
    _min?: MaterialMinAggregateInputType
    _max?: MaterialMaxAggregateInputType
  }

  export type MaterialGroupByOutputType = {
    id: string
    title: string
    subjectName: string
    description: string | null
    fileUrl: string | null
    cloudinaryId: string | null
    externalLink: string | null
    createdAt: Date
    updatedAt: Date
    _count: MaterialCountAggregateOutputType | null
    _min: MaterialMinAggregateOutputType | null
    _max: MaterialMaxAggregateOutputType | null
  }

  type GetMaterialGroupByPayload<T extends MaterialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaterialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaterialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaterialGroupByOutputType[P]>
            : GetScalarType<T[P], MaterialGroupByOutputType[P]>
        }
      >
    >


  export type MaterialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subjectName?: boolean
    description?: boolean
    fileUrl?: boolean
    cloudinaryId?: boolean
    externalLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subjectName?: boolean
    description?: boolean
    fileUrl?: boolean
    cloudinaryId?: boolean
    externalLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subjectName?: boolean
    description?: boolean
    fileUrl?: boolean
    cloudinaryId?: boolean
    externalLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["material"]>

  export type MaterialSelectScalar = {
    id?: boolean
    title?: boolean
    subjectName?: boolean
    description?: boolean
    fileUrl?: boolean
    cloudinaryId?: boolean
    externalLink?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MaterialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "subjectName" | "description" | "fileUrl" | "cloudinaryId" | "externalLink" | "createdAt" | "updatedAt", ExtArgs["result"]["material"]>

  export type $MaterialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Material"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subjectName: string
      description: string | null
      fileUrl: string | null
      cloudinaryId: string | null
      externalLink: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["material"]>
    composites: {}
  }

  type MaterialGetPayload<S extends boolean | null | undefined | MaterialDefaultArgs> = $Result.GetResult<Prisma.$MaterialPayload, S>

  type MaterialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaterialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaterialCountAggregateInputType | true
    }

  export interface MaterialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Material'], meta: { name: 'Material' } }
    /**
     * Find zero or one Material that matches the filter.
     * @param {MaterialFindUniqueArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaterialFindUniqueArgs>(args: SelectSubset<T, MaterialFindUniqueArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Material that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaterialFindUniqueOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaterialFindUniqueOrThrowArgs>(args: SelectSubset<T, MaterialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaterialFindFirstArgs>(args?: SelectSubset<T, MaterialFindFirstArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindFirstOrThrowArgs} args - Arguments to find a Material
     * @example
     * // Get one Material
     * const material = await prisma.material.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaterialFindFirstOrThrowArgs>(args?: SelectSubset<T, MaterialFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Materials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materials
     * const materials = await prisma.material.findMany()
     * 
     * // Get first 10 Materials
     * const materials = await prisma.material.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materialWithIdOnly = await prisma.material.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaterialFindManyArgs>(args?: SelectSubset<T, MaterialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Material.
     * @param {MaterialCreateArgs} args - Arguments to create a Material.
     * @example
     * // Create one Material
     * const Material = await prisma.material.create({
     *   data: {
     *     // ... data to create a Material
     *   }
     * })
     * 
     */
    create<T extends MaterialCreateArgs>(args: SelectSubset<T, MaterialCreateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Materials.
     * @param {MaterialCreateManyArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaterialCreateManyArgs>(args?: SelectSubset<T, MaterialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Materials and returns the data saved in the database.
     * @param {MaterialCreateManyAndReturnArgs} args - Arguments to create many Materials.
     * @example
     * // Create many Materials
     * const material = await prisma.material.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaterialCreateManyAndReturnArgs>(args?: SelectSubset<T, MaterialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Material.
     * @param {MaterialDeleteArgs} args - Arguments to delete one Material.
     * @example
     * // Delete one Material
     * const Material = await prisma.material.delete({
     *   where: {
     *     // ... filter to delete one Material
     *   }
     * })
     * 
     */
    delete<T extends MaterialDeleteArgs>(args: SelectSubset<T, MaterialDeleteArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Material.
     * @param {MaterialUpdateArgs} args - Arguments to update one Material.
     * @example
     * // Update one Material
     * const material = await prisma.material.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaterialUpdateArgs>(args: SelectSubset<T, MaterialUpdateArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Materials.
     * @param {MaterialDeleteManyArgs} args - Arguments to filter Materials to delete.
     * @example
     * // Delete a few Materials
     * const { count } = await prisma.material.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaterialDeleteManyArgs>(args?: SelectSubset<T, MaterialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaterialUpdateManyArgs>(args: SelectSubset<T, MaterialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materials and returns the data updated in the database.
     * @param {MaterialUpdateManyAndReturnArgs} args - Arguments to update many Materials.
     * @example
     * // Update many Materials
     * const material = await prisma.material.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Materials and only return the `id`
     * const materialWithIdOnly = await prisma.material.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaterialUpdateManyAndReturnArgs>(args: SelectSubset<T, MaterialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Material.
     * @param {MaterialUpsertArgs} args - Arguments to update or create a Material.
     * @example
     * // Update or create a Material
     * const material = await prisma.material.upsert({
     *   create: {
     *     // ... data to create a Material
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Material we want to update
     *   }
     * })
     */
    upsert<T extends MaterialUpsertArgs>(args: SelectSubset<T, MaterialUpsertArgs<ExtArgs>>): Prisma__MaterialClient<$Result.GetResult<Prisma.$MaterialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Materials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialCountArgs} args - Arguments to filter Materials to count.
     * @example
     * // Count the number of Materials
     * const count = await prisma.material.count({
     *   where: {
     *     // ... the filter for the Materials we want to count
     *   }
     * })
    **/
    count<T extends MaterialCountArgs>(
      args?: Subset<T, MaterialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaterialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaterialAggregateArgs>(args: Subset<T, MaterialAggregateArgs>): Prisma.PrismaPromise<GetMaterialAggregateType<T>>

    /**
     * Group by Material.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaterialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaterialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaterialGroupByArgs['orderBy'] }
        : { orderBy?: MaterialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaterialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Material model
   */
  readonly fields: MaterialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Material.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaterialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Material model
   */
  interface MaterialFieldRefs {
    readonly id: FieldRef<"Material", 'String'>
    readonly title: FieldRef<"Material", 'String'>
    readonly subjectName: FieldRef<"Material", 'String'>
    readonly description: FieldRef<"Material", 'String'>
    readonly fileUrl: FieldRef<"Material", 'String'>
    readonly cloudinaryId: FieldRef<"Material", 'String'>
    readonly externalLink: FieldRef<"Material", 'String'>
    readonly createdAt: FieldRef<"Material", 'DateTime'>
    readonly updatedAt: FieldRef<"Material", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Material findUnique
   */
  export type MaterialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findUniqueOrThrow
   */
  export type MaterialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material findFirst
   */
  export type MaterialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findFirstOrThrow
   */
  export type MaterialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter, which Material to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material findMany
   */
  export type MaterialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter, which Materials to fetch.
     */
    where?: MaterialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materials to fetch.
     */
    orderBy?: MaterialOrderByWithRelationInput | MaterialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Materials.
     */
    cursor?: MaterialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materials.
     */
    distinct?: MaterialScalarFieldEnum | MaterialScalarFieldEnum[]
  }

  /**
   * Material create
   */
  export type MaterialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data needed to create a Material.
     */
    data: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
  }

  /**
   * Material createMany
   */
  export type MaterialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Materials.
     */
    data: MaterialCreateManyInput | MaterialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Material createManyAndReturn
   */
  export type MaterialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data used to create many Materials.
     */
    data: MaterialCreateManyInput | MaterialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Material update
   */
  export type MaterialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data needed to update a Material.
     */
    data: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
    /**
     * Choose, which Material to update.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material updateMany
   */
  export type MaterialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Materials.
     */
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyInput>
    /**
     * Filter which Materials to update
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to update.
     */
    limit?: number
  }

  /**
   * Material updateManyAndReturn
   */
  export type MaterialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The data used to update Materials.
     */
    data: XOR<MaterialUpdateManyMutationInput, MaterialUncheckedUpdateManyInput>
    /**
     * Filter which Materials to update
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to update.
     */
    limit?: number
  }

  /**
   * Material upsert
   */
  export type MaterialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * The filter to search for the Material to update in case it exists.
     */
    where: MaterialWhereUniqueInput
    /**
     * In case the Material found by the `where` argument doesn't exist, create a new Material with this data.
     */
    create: XOR<MaterialCreateInput, MaterialUncheckedCreateInput>
    /**
     * In case the Material was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaterialUpdateInput, MaterialUncheckedUpdateInput>
  }

  /**
   * Material delete
   */
  export type MaterialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
    /**
     * Filter which Material to delete.
     */
    where: MaterialWhereUniqueInput
  }

  /**
   * Material deleteMany
   */
  export type MaterialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Materials to delete
     */
    where?: MaterialWhereInput
    /**
     * Limit how many Materials to delete.
     */
    limit?: number
  }

  /**
   * Material without action
   */
  export type MaterialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Material
     */
    select?: MaterialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Material
     */
    omit?: MaterialOmit<ExtArgs> | null
  }


  /**
   * Model ForumPost
   */

  export type AggregateForumPost = {
    _count: ForumPostCountAggregateOutputType | null
    _min: ForumPostMinAggregateOutputType | null
    _max: ForumPostMaxAggregateOutputType | null
  }

  export type ForumPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumPostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForumPostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumPostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumPostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForumPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumPost to aggregate.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForumPosts
    **/
    _count?: true | ForumPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForumPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForumPostMaxAggregateInputType
  }

  export type GetForumPostAggregateType<T extends ForumPostAggregateArgs> = {
        [P in keyof T & keyof AggregateForumPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForumPost[P]>
      : GetScalarType<T[P], AggregateForumPost[P]>
  }




  export type ForumPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumPostWhereInput
    orderBy?: ForumPostOrderByWithAggregationInput | ForumPostOrderByWithAggregationInput[]
    by: ForumPostScalarFieldEnum[] | ForumPostScalarFieldEnum
    having?: ForumPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForumPostCountAggregateInputType | true
    _min?: ForumPostMinAggregateInputType
    _max?: ForumPostMaxAggregateInputType
  }

  export type ForumPostGroupByOutputType = {
    id: string
    title: string
    content: string
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: ForumPostCountAggregateOutputType | null
    _min: ForumPostMinAggregateOutputType | null
    _max: ForumPostMaxAggregateOutputType | null
  }

  type GetForumPostGroupByPayload<T extends ForumPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForumPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForumPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForumPostGroupByOutputType[P]>
            : GetScalarType<T[P], ForumPostGroupByOutputType[P]>
        }
      >
    >


  export type ForumPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    comments?: boolean | ForumPost$commentsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ForumPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumPost"]>

  export type ForumPostSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ForumPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["forumPost"]>
  export type ForumPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ForumPost$commentsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ForumPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ForumPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ForumPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ForumPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForumPost"
    objects: {
      comments: Prisma.$ForumCommentPayload<ExtArgs>[]
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["forumPost"]>
    composites: {}
  }

  type ForumPostGetPayload<S extends boolean | null | undefined | ForumPostDefaultArgs> = $Result.GetResult<Prisma.$ForumPostPayload, S>

  type ForumPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForumPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForumPostCountAggregateInputType | true
    }

  export interface ForumPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForumPost'], meta: { name: 'ForumPost' } }
    /**
     * Find zero or one ForumPost that matches the filter.
     * @param {ForumPostFindUniqueArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForumPostFindUniqueArgs>(args: SelectSubset<T, ForumPostFindUniqueArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForumPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForumPostFindUniqueOrThrowArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForumPostFindUniqueOrThrowArgs>(args: SelectSubset<T, ForumPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindFirstArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForumPostFindFirstArgs>(args?: SelectSubset<T, ForumPostFindFirstArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindFirstOrThrowArgs} args - Arguments to find a ForumPost
     * @example
     * // Get one ForumPost
     * const forumPost = await prisma.forumPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForumPostFindFirstOrThrowArgs>(args?: SelectSubset<T, ForumPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForumPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForumPosts
     * const forumPosts = await prisma.forumPost.findMany()
     * 
     * // Get first 10 ForumPosts
     * const forumPosts = await prisma.forumPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForumPostFindManyArgs>(args?: SelectSubset<T, ForumPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForumPost.
     * @param {ForumPostCreateArgs} args - Arguments to create a ForumPost.
     * @example
     * // Create one ForumPost
     * const ForumPost = await prisma.forumPost.create({
     *   data: {
     *     // ... data to create a ForumPost
     *   }
     * })
     * 
     */
    create<T extends ForumPostCreateArgs>(args: SelectSubset<T, ForumPostCreateArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForumPosts.
     * @param {ForumPostCreateManyArgs} args - Arguments to create many ForumPosts.
     * @example
     * // Create many ForumPosts
     * const forumPost = await prisma.forumPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForumPostCreateManyArgs>(args?: SelectSubset<T, ForumPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForumPosts and returns the data saved in the database.
     * @param {ForumPostCreateManyAndReturnArgs} args - Arguments to create many ForumPosts.
     * @example
     * // Create many ForumPosts
     * const forumPost = await prisma.forumPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForumPosts and only return the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForumPostCreateManyAndReturnArgs>(args?: SelectSubset<T, ForumPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForumPost.
     * @param {ForumPostDeleteArgs} args - Arguments to delete one ForumPost.
     * @example
     * // Delete one ForumPost
     * const ForumPost = await prisma.forumPost.delete({
     *   where: {
     *     // ... filter to delete one ForumPost
     *   }
     * })
     * 
     */
    delete<T extends ForumPostDeleteArgs>(args: SelectSubset<T, ForumPostDeleteArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForumPost.
     * @param {ForumPostUpdateArgs} args - Arguments to update one ForumPost.
     * @example
     * // Update one ForumPost
     * const forumPost = await prisma.forumPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForumPostUpdateArgs>(args: SelectSubset<T, ForumPostUpdateArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForumPosts.
     * @param {ForumPostDeleteManyArgs} args - Arguments to filter ForumPosts to delete.
     * @example
     * // Delete a few ForumPosts
     * const { count } = await prisma.forumPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForumPostDeleteManyArgs>(args?: SelectSubset<T, ForumPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForumPosts
     * const forumPost = await prisma.forumPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForumPostUpdateManyArgs>(args: SelectSubset<T, ForumPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumPosts and returns the data updated in the database.
     * @param {ForumPostUpdateManyAndReturnArgs} args - Arguments to update many ForumPosts.
     * @example
     * // Update many ForumPosts
     * const forumPost = await prisma.forumPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForumPosts and only return the `id`
     * const forumPostWithIdOnly = await prisma.forumPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForumPostUpdateManyAndReturnArgs>(args: SelectSubset<T, ForumPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForumPost.
     * @param {ForumPostUpsertArgs} args - Arguments to update or create a ForumPost.
     * @example
     * // Update or create a ForumPost
     * const forumPost = await prisma.forumPost.upsert({
     *   create: {
     *     // ... data to create a ForumPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForumPost we want to update
     *   }
     * })
     */
    upsert<T extends ForumPostUpsertArgs>(args: SelectSubset<T, ForumPostUpsertArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForumPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostCountArgs} args - Arguments to filter ForumPosts to count.
     * @example
     * // Count the number of ForumPosts
     * const count = await prisma.forumPost.count({
     *   where: {
     *     // ... the filter for the ForumPosts we want to count
     *   }
     * })
    **/
    count<T extends ForumPostCountArgs>(
      args?: Subset<T, ForumPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForumPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForumPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForumPostAggregateArgs>(args: Subset<T, ForumPostAggregateArgs>): Prisma.PrismaPromise<GetForumPostAggregateType<T>>

    /**
     * Group by ForumPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForumPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForumPostGroupByArgs['orderBy'] }
        : { orderBy?: ForumPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForumPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForumPost model
   */
  readonly fields: ForumPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForumPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForumPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends ForumPost$commentsArgs<ExtArgs> = {}>(args?: Subset<T, ForumPost$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForumPost model
   */
  interface ForumPostFieldRefs {
    readonly id: FieldRef<"ForumPost", 'String'>
    readonly title: FieldRef<"ForumPost", 'String'>
    readonly content: FieldRef<"ForumPost", 'String'>
    readonly createdById: FieldRef<"ForumPost", 'String'>
    readonly createdAt: FieldRef<"ForumPost", 'DateTime'>
    readonly updatedAt: FieldRef<"ForumPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForumPost findUnique
   */
  export type ForumPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost findUniqueOrThrow
   */
  export type ForumPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost findFirst
   */
  export type ForumPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumPosts.
     */
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost findFirstOrThrow
   */
  export type ForumPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPost to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumPosts.
     */
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost findMany
   */
  export type ForumPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter, which ForumPosts to fetch.
     */
    where?: ForumPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumPosts to fetch.
     */
    orderBy?: ForumPostOrderByWithRelationInput | ForumPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForumPosts.
     */
    cursor?: ForumPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumPosts.
     */
    distinct?: ForumPostScalarFieldEnum | ForumPostScalarFieldEnum[]
  }

  /**
   * ForumPost create
   */
  export type ForumPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The data needed to create a ForumPost.
     */
    data: XOR<ForumPostCreateInput, ForumPostUncheckedCreateInput>
  }

  /**
   * ForumPost createMany
   */
  export type ForumPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForumPosts.
     */
    data: ForumPostCreateManyInput | ForumPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumPost createManyAndReturn
   */
  export type ForumPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * The data used to create many ForumPosts.
     */
    data: ForumPostCreateManyInput | ForumPostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumPost update
   */
  export type ForumPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The data needed to update a ForumPost.
     */
    data: XOR<ForumPostUpdateInput, ForumPostUncheckedUpdateInput>
    /**
     * Choose, which ForumPost to update.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost updateMany
   */
  export type ForumPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForumPosts.
     */
    data: XOR<ForumPostUpdateManyMutationInput, ForumPostUncheckedUpdateManyInput>
    /**
     * Filter which ForumPosts to update
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to update.
     */
    limit?: number
  }

  /**
   * ForumPost updateManyAndReturn
   */
  export type ForumPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * The data used to update ForumPosts.
     */
    data: XOR<ForumPostUpdateManyMutationInput, ForumPostUncheckedUpdateManyInput>
    /**
     * Filter which ForumPosts to update
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumPost upsert
   */
  export type ForumPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * The filter to search for the ForumPost to update in case it exists.
     */
    where: ForumPostWhereUniqueInput
    /**
     * In case the ForumPost found by the `where` argument doesn't exist, create a new ForumPost with this data.
     */
    create: XOR<ForumPostCreateInput, ForumPostUncheckedCreateInput>
    /**
     * In case the ForumPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForumPostUpdateInput, ForumPostUncheckedUpdateInput>
  }

  /**
   * ForumPost delete
   */
  export type ForumPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
    /**
     * Filter which ForumPost to delete.
     */
    where: ForumPostWhereUniqueInput
  }

  /**
   * ForumPost deleteMany
   */
  export type ForumPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumPosts to delete
     */
    where?: ForumPostWhereInput
    /**
     * Limit how many ForumPosts to delete.
     */
    limit?: number
  }

  /**
   * ForumPost.comments
   */
  export type ForumPost$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    where?: ForumCommentWhereInput
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    cursor?: ForumCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumPost without action
   */
  export type ForumPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumPost
     */
    select?: ForumPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumPost
     */
    omit?: ForumPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumPostInclude<ExtArgs> | null
  }


  /**
   * Model ForumComment
   */

  export type AggregateForumComment = {
    _count: ForumCommentCountAggregateOutputType | null
    _min: ForumCommentMinAggregateOutputType | null
    _max: ForumCommentMaxAggregateOutputType | null
  }

  export type ForumCommentMinAggregateOutputType = {
    id: string | null
    postId: string | null
    content: string | null
    createdById: string | null
    isAnswer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumCommentMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    content: string | null
    createdById: string | null
    isAnswer: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ForumCommentCountAggregateOutputType = {
    id: number
    postId: number
    content: number
    createdById: number
    isAnswer: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ForumCommentMinAggregateInputType = {
    id?: true
    postId?: true
    content?: true
    createdById?: true
    isAnswer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumCommentMaxAggregateInputType = {
    id?: true
    postId?: true
    content?: true
    createdById?: true
    isAnswer?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ForumCommentCountAggregateInputType = {
    id?: true
    postId?: true
    content?: true
    createdById?: true
    isAnswer?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ForumCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumComment to aggregate.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ForumComments
    **/
    _count?: true | ForumCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ForumCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ForumCommentMaxAggregateInputType
  }

  export type GetForumCommentAggregateType<T extends ForumCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateForumComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForumComment[P]>
      : GetScalarType<T[P], AggregateForumComment[P]>
  }




  export type ForumCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ForumCommentWhereInput
    orderBy?: ForumCommentOrderByWithAggregationInput | ForumCommentOrderByWithAggregationInput[]
    by: ForumCommentScalarFieldEnum[] | ForumCommentScalarFieldEnum
    having?: ForumCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ForumCommentCountAggregateInputType | true
    _min?: ForumCommentMinAggregateInputType
    _max?: ForumCommentMaxAggregateInputType
  }

  export type ForumCommentGroupByOutputType = {
    id: string
    postId: string
    content: string
    createdById: string
    isAnswer: boolean
    createdAt: Date
    updatedAt: Date
    _count: ForumCommentCountAggregateOutputType | null
    _min: ForumCommentMinAggregateOutputType | null
    _max: ForumCommentMaxAggregateOutputType | null
  }

  type GetForumCommentGroupByPayload<T extends ForumCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ForumCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ForumCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ForumCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ForumCommentGroupByOutputType[P]>
        }
      >
    >


  export type ForumCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    content?: boolean
    createdById?: boolean
    isAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    content?: boolean
    createdById?: boolean
    isAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    content?: boolean
    createdById?: boolean
    isAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["forumComment"]>

  export type ForumCommentSelectScalar = {
    id?: boolean
    postId?: boolean
    content?: boolean
    createdById?: boolean
    isAnswer?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ForumCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "content" | "createdById" | "isAnswer" | "createdAt" | "updatedAt", ExtArgs["result"]["forumComment"]>
  export type ForumCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ForumCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ForumCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ForumPostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ForumCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ForumComment"
    objects: {
      post: Prisma.$ForumPostPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      content: string
      createdById: string
      isAnswer: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["forumComment"]>
    composites: {}
  }

  type ForumCommentGetPayload<S extends boolean | null | undefined | ForumCommentDefaultArgs> = $Result.GetResult<Prisma.$ForumCommentPayload, S>

  type ForumCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ForumCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ForumCommentCountAggregateInputType | true
    }

  export interface ForumCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ForumComment'], meta: { name: 'ForumComment' } }
    /**
     * Find zero or one ForumComment that matches the filter.
     * @param {ForumCommentFindUniqueArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ForumCommentFindUniqueArgs>(args: SelectSubset<T, ForumCommentFindUniqueArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ForumComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ForumCommentFindUniqueOrThrowArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ForumCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, ForumCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindFirstArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ForumCommentFindFirstArgs>(args?: SelectSubset<T, ForumCommentFindFirstArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ForumComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindFirstOrThrowArgs} args - Arguments to find a ForumComment
     * @example
     * // Get one ForumComment
     * const forumComment = await prisma.forumComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ForumCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, ForumCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ForumComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ForumComments
     * const forumComments = await prisma.forumComment.findMany()
     * 
     * // Get first 10 ForumComments
     * const forumComments = await prisma.forumComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ForumCommentFindManyArgs>(args?: SelectSubset<T, ForumCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ForumComment.
     * @param {ForumCommentCreateArgs} args - Arguments to create a ForumComment.
     * @example
     * // Create one ForumComment
     * const ForumComment = await prisma.forumComment.create({
     *   data: {
     *     // ... data to create a ForumComment
     *   }
     * })
     * 
     */
    create<T extends ForumCommentCreateArgs>(args: SelectSubset<T, ForumCommentCreateArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ForumComments.
     * @param {ForumCommentCreateManyArgs} args - Arguments to create many ForumComments.
     * @example
     * // Create many ForumComments
     * const forumComment = await prisma.forumComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ForumCommentCreateManyArgs>(args?: SelectSubset<T, ForumCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ForumComments and returns the data saved in the database.
     * @param {ForumCommentCreateManyAndReturnArgs} args - Arguments to create many ForumComments.
     * @example
     * // Create many ForumComments
     * const forumComment = await prisma.forumComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ForumComments and only return the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ForumCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, ForumCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ForumComment.
     * @param {ForumCommentDeleteArgs} args - Arguments to delete one ForumComment.
     * @example
     * // Delete one ForumComment
     * const ForumComment = await prisma.forumComment.delete({
     *   where: {
     *     // ... filter to delete one ForumComment
     *   }
     * })
     * 
     */
    delete<T extends ForumCommentDeleteArgs>(args: SelectSubset<T, ForumCommentDeleteArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ForumComment.
     * @param {ForumCommentUpdateArgs} args - Arguments to update one ForumComment.
     * @example
     * // Update one ForumComment
     * const forumComment = await prisma.forumComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ForumCommentUpdateArgs>(args: SelectSubset<T, ForumCommentUpdateArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ForumComments.
     * @param {ForumCommentDeleteManyArgs} args - Arguments to filter ForumComments to delete.
     * @example
     * // Delete a few ForumComments
     * const { count } = await prisma.forumComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ForumCommentDeleteManyArgs>(args?: SelectSubset<T, ForumCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ForumComments
     * const forumComment = await prisma.forumComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ForumCommentUpdateManyArgs>(args: SelectSubset<T, ForumCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ForumComments and returns the data updated in the database.
     * @param {ForumCommentUpdateManyAndReturnArgs} args - Arguments to update many ForumComments.
     * @example
     * // Update many ForumComments
     * const forumComment = await prisma.forumComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ForumComments and only return the `id`
     * const forumCommentWithIdOnly = await prisma.forumComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ForumCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, ForumCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ForumComment.
     * @param {ForumCommentUpsertArgs} args - Arguments to update or create a ForumComment.
     * @example
     * // Update or create a ForumComment
     * const forumComment = await prisma.forumComment.upsert({
     *   create: {
     *     // ... data to create a ForumComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ForumComment we want to update
     *   }
     * })
     */
    upsert<T extends ForumCommentUpsertArgs>(args: SelectSubset<T, ForumCommentUpsertArgs<ExtArgs>>): Prisma__ForumCommentClient<$Result.GetResult<Prisma.$ForumCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ForumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentCountArgs} args - Arguments to filter ForumComments to count.
     * @example
     * // Count the number of ForumComments
     * const count = await prisma.forumComment.count({
     *   where: {
     *     // ... the filter for the ForumComments we want to count
     *   }
     * })
    **/
    count<T extends ForumCommentCountArgs>(
      args?: Subset<T, ForumCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ForumCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ForumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ForumCommentAggregateArgs>(args: Subset<T, ForumCommentAggregateArgs>): Prisma.PrismaPromise<GetForumCommentAggregateType<T>>

    /**
     * Group by ForumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ForumCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ForumCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ForumCommentGroupByArgs['orderBy'] }
        : { orderBy?: ForumCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ForumCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ForumComment model
   */
  readonly fields: ForumCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ForumComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ForumCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends ForumPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ForumPostDefaultArgs<ExtArgs>>): Prisma__ForumPostClient<$Result.GetResult<Prisma.$ForumPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ForumComment model
   */
  interface ForumCommentFieldRefs {
    readonly id: FieldRef<"ForumComment", 'String'>
    readonly postId: FieldRef<"ForumComment", 'String'>
    readonly content: FieldRef<"ForumComment", 'String'>
    readonly createdById: FieldRef<"ForumComment", 'String'>
    readonly isAnswer: FieldRef<"ForumComment", 'Boolean'>
    readonly createdAt: FieldRef<"ForumComment", 'DateTime'>
    readonly updatedAt: FieldRef<"ForumComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ForumComment findUnique
   */
  export type ForumCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment findUniqueOrThrow
   */
  export type ForumCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment findFirst
   */
  export type ForumCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumComments.
     */
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment findFirstOrThrow
   */
  export type ForumCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComment to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumComments.
     */
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment findMany
   */
  export type ForumCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter, which ForumComments to fetch.
     */
    where?: ForumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ForumComments to fetch.
     */
    orderBy?: ForumCommentOrderByWithRelationInput | ForumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ForumComments.
     */
    cursor?: ForumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ForumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ForumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ForumComments.
     */
    distinct?: ForumCommentScalarFieldEnum | ForumCommentScalarFieldEnum[]
  }

  /**
   * ForumComment create
   */
  export type ForumCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a ForumComment.
     */
    data: XOR<ForumCommentCreateInput, ForumCommentUncheckedCreateInput>
  }

  /**
   * ForumComment createMany
   */
  export type ForumCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ForumComments.
     */
    data: ForumCommentCreateManyInput | ForumCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ForumComment createManyAndReturn
   */
  export type ForumCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * The data used to create many ForumComments.
     */
    data: ForumCommentCreateManyInput | ForumCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumComment update
   */
  export type ForumCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a ForumComment.
     */
    data: XOR<ForumCommentUpdateInput, ForumCommentUncheckedUpdateInput>
    /**
     * Choose, which ForumComment to update.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment updateMany
   */
  export type ForumCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ForumComments.
     */
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyInput>
    /**
     * Filter which ForumComments to update
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to update.
     */
    limit?: number
  }

  /**
   * ForumComment updateManyAndReturn
   */
  export type ForumCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * The data used to update ForumComments.
     */
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyInput>
    /**
     * Filter which ForumComments to update
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ForumComment upsert
   */
  export type ForumCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the ForumComment to update in case it exists.
     */
    where: ForumCommentWhereUniqueInput
    /**
     * In case the ForumComment found by the `where` argument doesn't exist, create a new ForumComment with this data.
     */
    create: XOR<ForumCommentCreateInput, ForumCommentUncheckedCreateInput>
    /**
     * In case the ForumComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ForumCommentUpdateInput, ForumCommentUncheckedUpdateInput>
  }

  /**
   * ForumComment delete
   */
  export type ForumCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
    /**
     * Filter which ForumComment to delete.
     */
    where: ForumCommentWhereUniqueInput
  }

  /**
   * ForumComment deleteMany
   */
  export type ForumCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ForumComments to delete
     */
    where?: ForumCommentWhereInput
    /**
     * Limit how many ForumComments to delete.
     */
    limit?: number
  }

  /**
   * ForumComment without action
   */
  export type ForumCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ForumComment
     */
    select?: ForumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ForumComment
     */
    omit?: ForumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ForumCommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DuesPeriodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    amount: 'amount',
    startDate: 'startDate',
    endDate: 'endDate',
    isArchived: 'isArchived',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DuesPeriodScalarFieldEnum = (typeof DuesPeriodScalarFieldEnum)[keyof typeof DuesPeriodScalarFieldEnum]


  export const DuesPaymentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    duePeriodId: 'duePeriodId',
    status: 'status',
    proofImageUrl: 'proofImageUrl',
    proofImageCloudinaryId: 'proofImageCloudinaryId',
    paidAt: 'paidAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DuesPaymentScalarFieldEnum = (typeof DuesPaymentScalarFieldEnum)[keyof typeof DuesPaymentScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    authorId: 'authorId',
    status: 'status',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    dayOfWeek: 'dayOfWeek',
    periodOrder: 'periodOrder',
    periodLabel: 'periodLabel',
    subject: 'subject',
    teacher: 'teacher',
    room: 'room',
    isBreak: 'isBreak',
    updatedAt: 'updatedAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const PhotoGalleryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    eventDate: 'eventDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PhotoGalleryScalarFieldEnum = (typeof PhotoGalleryScalarFieldEnum)[keyof typeof PhotoGalleryScalarFieldEnum]


  export const PhotoScalarFieldEnum: {
    id: 'id',
    galleryId: 'galleryId',
    cloudinaryUrl: 'cloudinaryUrl',
    cloudinaryId: 'cloudinaryId',
    caption: 'caption',
    uploadedAt: 'uploadedAt'
  };

  export type PhotoScalarFieldEnum = (typeof PhotoScalarFieldEnum)[keyof typeof PhotoScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    tableName: 'tableName',
    recordId: 'recordId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    date: 'date',
    status: 'status',
    checkInTime: 'checkInTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const MaterialScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subjectName: 'subjectName',
    description: 'description',
    fileUrl: 'fileUrl',
    cloudinaryId: 'cloudinaryId',
    externalLink: 'externalLink',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MaterialScalarFieldEnum = (typeof MaterialScalarFieldEnum)[keyof typeof MaterialScalarFieldEnum]


  export const ForumPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForumPostScalarFieldEnum = (typeof ForumPostScalarFieldEnum)[keyof typeof ForumPostScalarFieldEnum]


  export const ForumCommentScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    content: 'content',
    createdById: 'createdById',
    isAnswer: 'isAnswer',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ForumCommentScalarFieldEnum = (typeof ForumCommentScalarFieldEnum)[keyof typeof ForumCommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    duesPayments?: DuesPaymentListRelationFilter
    announcements?: AnnouncementListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    attendances?: AttendanceListRelationFilter
    forumPosts?: ForumPostListRelationFilter
    forumComments?: ForumCommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    duesPayments?: DuesPaymentOrderByRelationAggregateInput
    announcements?: AnnouncementOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    attendances?: AttendanceOrderByRelationAggregateInput
    forumPosts?: ForumPostOrderByRelationAggregateInput
    forumComments?: ForumCommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    duesPayments?: DuesPaymentListRelationFilter
    announcements?: AnnouncementListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    attendances?: AttendanceListRelationFilter
    forumPosts?: ForumPostListRelationFilter
    forumComments?: ForumCommentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DuesPeriodWhereInput = {
    AND?: DuesPeriodWhereInput | DuesPeriodWhereInput[]
    OR?: DuesPeriodWhereInput[]
    NOT?: DuesPeriodWhereInput | DuesPeriodWhereInput[]
    id?: StringFilter<"DuesPeriod"> | string
    name?: StringFilter<"DuesPeriod"> | string
    amount?: IntFilter<"DuesPeriod"> | number
    startDate?: DateTimeFilter<"DuesPeriod"> | Date | string
    endDate?: DateTimeFilter<"DuesPeriod"> | Date | string
    isArchived?: BoolFilter<"DuesPeriod"> | boolean
    createdAt?: DateTimeFilter<"DuesPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"DuesPeriod"> | Date | string
    duesPayments?: DuesPaymentListRelationFilter
  }

  export type DuesPeriodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    duesPayments?: DuesPaymentOrderByRelationAggregateInput
  }

  export type DuesPeriodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DuesPeriodWhereInput | DuesPeriodWhereInput[]
    OR?: DuesPeriodWhereInput[]
    NOT?: DuesPeriodWhereInput | DuesPeriodWhereInput[]
    name?: StringFilter<"DuesPeriod"> | string
    amount?: IntFilter<"DuesPeriod"> | number
    startDate?: DateTimeFilter<"DuesPeriod"> | Date | string
    endDate?: DateTimeFilter<"DuesPeriod"> | Date | string
    isArchived?: BoolFilter<"DuesPeriod"> | boolean
    createdAt?: DateTimeFilter<"DuesPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"DuesPeriod"> | Date | string
    duesPayments?: DuesPaymentListRelationFilter
  }, "id">

  export type DuesPeriodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DuesPeriodCountOrderByAggregateInput
    _avg?: DuesPeriodAvgOrderByAggregateInput
    _max?: DuesPeriodMaxOrderByAggregateInput
    _min?: DuesPeriodMinOrderByAggregateInput
    _sum?: DuesPeriodSumOrderByAggregateInput
  }

  export type DuesPeriodScalarWhereWithAggregatesInput = {
    AND?: DuesPeriodScalarWhereWithAggregatesInput | DuesPeriodScalarWhereWithAggregatesInput[]
    OR?: DuesPeriodScalarWhereWithAggregatesInput[]
    NOT?: DuesPeriodScalarWhereWithAggregatesInput | DuesPeriodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DuesPeriod"> | string
    name?: StringWithAggregatesFilter<"DuesPeriod"> | string
    amount?: IntWithAggregatesFilter<"DuesPeriod"> | number
    startDate?: DateTimeWithAggregatesFilter<"DuesPeriod"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"DuesPeriod"> | Date | string
    isArchived?: BoolWithAggregatesFilter<"DuesPeriod"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DuesPeriod"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DuesPeriod"> | Date | string
  }

  export type DuesPaymentWhereInput = {
    AND?: DuesPaymentWhereInput | DuesPaymentWhereInput[]
    OR?: DuesPaymentWhereInput[]
    NOT?: DuesPaymentWhereInput | DuesPaymentWhereInput[]
    id?: StringFilter<"DuesPayment"> | string
    studentId?: UuidFilter<"DuesPayment"> | string
    duePeriodId?: StringFilter<"DuesPayment"> | string
    status?: StringFilter<"DuesPayment"> | string
    proofImageUrl?: StringNullableFilter<"DuesPayment"> | string | null
    proofImageCloudinaryId?: StringNullableFilter<"DuesPayment"> | string | null
    paidAt?: DateTimeNullableFilter<"DuesPayment"> | Date | string | null
    notes?: StringNullableFilter<"DuesPayment"> | string | null
    createdAt?: DateTimeFilter<"DuesPayment"> | Date | string
    updatedAt?: DateTimeFilter<"DuesPayment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    period?: XOR<DuesPeriodScalarRelationFilter, DuesPeriodWhereInput>
  }

  export type DuesPaymentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    duePeriodId?: SortOrder
    status?: SortOrder
    proofImageUrl?: SortOrderInput | SortOrder
    proofImageCloudinaryId?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: UserOrderByWithRelationInput
    period?: DuesPeriodOrderByWithRelationInput
  }

  export type DuesPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_duePeriodId?: DuesPaymentStudentIdDuePeriodIdCompoundUniqueInput
    AND?: DuesPaymentWhereInput | DuesPaymentWhereInput[]
    OR?: DuesPaymentWhereInput[]
    NOT?: DuesPaymentWhereInput | DuesPaymentWhereInput[]
    studentId?: UuidFilter<"DuesPayment"> | string
    duePeriodId?: StringFilter<"DuesPayment"> | string
    status?: StringFilter<"DuesPayment"> | string
    proofImageUrl?: StringNullableFilter<"DuesPayment"> | string | null
    proofImageCloudinaryId?: StringNullableFilter<"DuesPayment"> | string | null
    paidAt?: DateTimeNullableFilter<"DuesPayment"> | Date | string | null
    notes?: StringNullableFilter<"DuesPayment"> | string | null
    createdAt?: DateTimeFilter<"DuesPayment"> | Date | string
    updatedAt?: DateTimeFilter<"DuesPayment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    period?: XOR<DuesPeriodScalarRelationFilter, DuesPeriodWhereInput>
  }, "id" | "studentId_duePeriodId">

  export type DuesPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    duePeriodId?: SortOrder
    status?: SortOrder
    proofImageUrl?: SortOrderInput | SortOrder
    proofImageCloudinaryId?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DuesPaymentCountOrderByAggregateInput
    _max?: DuesPaymentMaxOrderByAggregateInput
    _min?: DuesPaymentMinOrderByAggregateInput
  }

  export type DuesPaymentScalarWhereWithAggregatesInput = {
    AND?: DuesPaymentScalarWhereWithAggregatesInput | DuesPaymentScalarWhereWithAggregatesInput[]
    OR?: DuesPaymentScalarWhereWithAggregatesInput[]
    NOT?: DuesPaymentScalarWhereWithAggregatesInput | DuesPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DuesPayment"> | string
    studentId?: UuidWithAggregatesFilter<"DuesPayment"> | string
    duePeriodId?: StringWithAggregatesFilter<"DuesPayment"> | string
    status?: StringWithAggregatesFilter<"DuesPayment"> | string
    proofImageUrl?: StringNullableWithAggregatesFilter<"DuesPayment"> | string | null
    proofImageCloudinaryId?: StringNullableWithAggregatesFilter<"DuesPayment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"DuesPayment"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"DuesPayment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DuesPayment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DuesPayment"> | Date | string
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    status?: StringFilter<"Announcement"> | string
    publishedAt?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    status?: StringFilter<"Announcement"> | string
    publishedAt?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Announcement"> | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    authorId?: UuidWithAggregatesFilter<"Announcement"> | string
    status?: StringWithAggregatesFilter<"Announcement"> | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Announcement"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    dayOfWeek?: IntFilter<"Schedule"> | number
    periodOrder?: IntFilter<"Schedule"> | number
    periodLabel?: StringFilter<"Schedule"> | string
    subject?: StringNullableFilter<"Schedule"> | string | null
    teacher?: StringNullableFilter<"Schedule"> | string | null
    room?: StringNullableFilter<"Schedule"> | string | null
    isBreak?: BoolFilter<"Schedule"> | boolean
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
    periodLabel?: SortOrder
    subject?: SortOrderInput | SortOrder
    teacher?: SortOrderInput | SortOrder
    room?: SortOrderInput | SortOrder
    isBreak?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dayOfWeek_periodOrder?: ScheduleDayOfWeekPeriodOrderCompoundUniqueInput
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    dayOfWeek?: IntFilter<"Schedule"> | number
    periodOrder?: IntFilter<"Schedule"> | number
    periodLabel?: StringFilter<"Schedule"> | string
    subject?: StringNullableFilter<"Schedule"> | string | null
    teacher?: StringNullableFilter<"Schedule"> | string | null
    room?: StringNullableFilter<"Schedule"> | string | null
    isBreak?: BoolFilter<"Schedule"> | boolean
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
  }, "id" | "dayOfWeek_periodOrder">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
    periodLabel?: SortOrder
    subject?: SortOrderInput | SortOrder
    teacher?: SortOrderInput | SortOrder
    room?: SortOrderInput | SortOrder
    isBreak?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _avg?: ScheduleAvgOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
    _sum?: ScheduleSumOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    dayOfWeek?: IntWithAggregatesFilter<"Schedule"> | number
    periodOrder?: IntWithAggregatesFilter<"Schedule"> | number
    periodLabel?: StringWithAggregatesFilter<"Schedule"> | string
    subject?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    teacher?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    room?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    isBreak?: BoolWithAggregatesFilter<"Schedule"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type PhotoGalleryWhereInput = {
    AND?: PhotoGalleryWhereInput | PhotoGalleryWhereInput[]
    OR?: PhotoGalleryWhereInput[]
    NOT?: PhotoGalleryWhereInput | PhotoGalleryWhereInput[]
    id?: StringFilter<"PhotoGallery"> | string
    title?: StringFilter<"PhotoGallery"> | string
    description?: StringNullableFilter<"PhotoGallery"> | string | null
    eventDate?: DateTimeFilter<"PhotoGallery"> | Date | string
    createdAt?: DateTimeFilter<"PhotoGallery"> | Date | string
    updatedAt?: DateTimeFilter<"PhotoGallery"> | Date | string
    photos?: PhotoListRelationFilter
  }

  export type PhotoGalleryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    photos?: PhotoOrderByRelationAggregateInput
  }

  export type PhotoGalleryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PhotoGalleryWhereInput | PhotoGalleryWhereInput[]
    OR?: PhotoGalleryWhereInput[]
    NOT?: PhotoGalleryWhereInput | PhotoGalleryWhereInput[]
    title?: StringFilter<"PhotoGallery"> | string
    description?: StringNullableFilter<"PhotoGallery"> | string | null
    eventDate?: DateTimeFilter<"PhotoGallery"> | Date | string
    createdAt?: DateTimeFilter<"PhotoGallery"> | Date | string
    updatedAt?: DateTimeFilter<"PhotoGallery"> | Date | string
    photos?: PhotoListRelationFilter
  }, "id">

  export type PhotoGalleryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PhotoGalleryCountOrderByAggregateInput
    _max?: PhotoGalleryMaxOrderByAggregateInput
    _min?: PhotoGalleryMinOrderByAggregateInput
  }

  export type PhotoGalleryScalarWhereWithAggregatesInput = {
    AND?: PhotoGalleryScalarWhereWithAggregatesInput | PhotoGalleryScalarWhereWithAggregatesInput[]
    OR?: PhotoGalleryScalarWhereWithAggregatesInput[]
    NOT?: PhotoGalleryScalarWhereWithAggregatesInput | PhotoGalleryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PhotoGallery"> | string
    title?: StringWithAggregatesFilter<"PhotoGallery"> | string
    description?: StringNullableWithAggregatesFilter<"PhotoGallery"> | string | null
    eventDate?: DateTimeWithAggregatesFilter<"PhotoGallery"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PhotoGallery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PhotoGallery"> | Date | string
  }

  export type PhotoWhereInput = {
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    id?: StringFilter<"Photo"> | string
    galleryId?: StringFilter<"Photo"> | string
    cloudinaryUrl?: StringFilter<"Photo"> | string
    cloudinaryId?: StringFilter<"Photo"> | string
    caption?: StringNullableFilter<"Photo"> | string | null
    uploadedAt?: DateTimeFilter<"Photo"> | Date | string
    gallery?: XOR<PhotoGalleryScalarRelationFilter, PhotoGalleryWhereInput>
  }

  export type PhotoOrderByWithRelationInput = {
    id?: SortOrder
    galleryId?: SortOrder
    cloudinaryUrl?: SortOrder
    cloudinaryId?: SortOrder
    caption?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    gallery?: PhotoGalleryOrderByWithRelationInput
  }

  export type PhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    galleryId?: StringFilter<"Photo"> | string
    cloudinaryUrl?: StringFilter<"Photo"> | string
    cloudinaryId?: StringFilter<"Photo"> | string
    caption?: StringNullableFilter<"Photo"> | string | null
    uploadedAt?: DateTimeFilter<"Photo"> | Date | string
    gallery?: XOR<PhotoGalleryScalarRelationFilter, PhotoGalleryWhereInput>
  }, "id">

  export type PhotoOrderByWithAggregationInput = {
    id?: SortOrder
    galleryId?: SortOrder
    cloudinaryUrl?: SortOrder
    cloudinaryId?: SortOrder
    caption?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    _count?: PhotoCountOrderByAggregateInput
    _max?: PhotoMaxOrderByAggregateInput
    _min?: PhotoMinOrderByAggregateInput
  }

  export type PhotoScalarWhereWithAggregatesInput = {
    AND?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    OR?: PhotoScalarWhereWithAggregatesInput[]
    NOT?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Photo"> | string
    galleryId?: StringWithAggregatesFilter<"Photo"> | string
    cloudinaryUrl?: StringWithAggregatesFilter<"Photo"> | string
    cloudinaryId?: StringWithAggregatesFilter<"Photo"> | string
    caption?: StringNullableWithAggregatesFilter<"Photo"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: UuidNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    tableName?: StringWithAggregatesFilter<"AuditLog"> | string
    recordId?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: StringFilter<"Attendance"> | string
    studentId?: UuidFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    checkInTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: UserOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_date?: AttendanceStudentIdDateCompoundUniqueInput
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    studentId?: UuidFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "studentId_date">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    checkInTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendance"> | string
    studentId?: UuidWithAggregatesFilter<"Attendance"> | string
    date?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    status?: StringWithAggregatesFilter<"Attendance"> | string
    checkInTime?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type MaterialWhereInput = {
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    id?: StringFilter<"Material"> | string
    title?: StringFilter<"Material"> | string
    subjectName?: StringFilter<"Material"> | string
    description?: StringNullableFilter<"Material"> | string | null
    fileUrl?: StringNullableFilter<"Material"> | string | null
    cloudinaryId?: StringNullableFilter<"Material"> | string | null
    externalLink?: StringNullableFilter<"Material"> | string | null
    createdAt?: DateTimeFilter<"Material"> | Date | string
    updatedAt?: DateTimeFilter<"Material"> | Date | string
  }

  export type MaterialOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subjectName?: SortOrder
    description?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    cloudinaryId?: SortOrderInput | SortOrder
    externalLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaterialWhereInput | MaterialWhereInput[]
    OR?: MaterialWhereInput[]
    NOT?: MaterialWhereInput | MaterialWhereInput[]
    title?: StringFilter<"Material"> | string
    subjectName?: StringFilter<"Material"> | string
    description?: StringNullableFilter<"Material"> | string | null
    fileUrl?: StringNullableFilter<"Material"> | string | null
    cloudinaryId?: StringNullableFilter<"Material"> | string | null
    externalLink?: StringNullableFilter<"Material"> | string | null
    createdAt?: DateTimeFilter<"Material"> | Date | string
    updatedAt?: DateTimeFilter<"Material"> | Date | string
  }, "id">

  export type MaterialOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subjectName?: SortOrder
    description?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    cloudinaryId?: SortOrderInput | SortOrder
    externalLink?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MaterialCountOrderByAggregateInput
    _max?: MaterialMaxOrderByAggregateInput
    _min?: MaterialMinOrderByAggregateInput
  }

  export type MaterialScalarWhereWithAggregatesInput = {
    AND?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    OR?: MaterialScalarWhereWithAggregatesInput[]
    NOT?: MaterialScalarWhereWithAggregatesInput | MaterialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Material"> | string
    title?: StringWithAggregatesFilter<"Material"> | string
    subjectName?: StringWithAggregatesFilter<"Material"> | string
    description?: StringNullableWithAggregatesFilter<"Material"> | string | null
    fileUrl?: StringNullableWithAggregatesFilter<"Material"> | string | null
    cloudinaryId?: StringNullableWithAggregatesFilter<"Material"> | string | null
    externalLink?: StringNullableWithAggregatesFilter<"Material"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Material"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Material"> | Date | string
  }

  export type ForumPostWhereInput = {
    AND?: ForumPostWhereInput | ForumPostWhereInput[]
    OR?: ForumPostWhereInput[]
    NOT?: ForumPostWhereInput | ForumPostWhereInput[]
    id?: StringFilter<"ForumPost"> | string
    title?: StringFilter<"ForumPost"> | string
    content?: StringFilter<"ForumPost"> | string
    createdById?: UuidFilter<"ForumPost"> | string
    createdAt?: DateTimeFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeFilter<"ForumPost"> | Date | string
    comments?: ForumCommentListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ForumPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    comments?: ForumCommentOrderByRelationAggregateInput
    author?: UserOrderByWithRelationInput
  }

  export type ForumPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ForumPostWhereInput | ForumPostWhereInput[]
    OR?: ForumPostWhereInput[]
    NOT?: ForumPostWhereInput | ForumPostWhereInput[]
    title?: StringFilter<"ForumPost"> | string
    content?: StringFilter<"ForumPost"> | string
    createdById?: UuidFilter<"ForumPost"> | string
    createdAt?: DateTimeFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeFilter<"ForumPost"> | Date | string
    comments?: ForumCommentListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ForumPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForumPostCountOrderByAggregateInput
    _max?: ForumPostMaxOrderByAggregateInput
    _min?: ForumPostMinOrderByAggregateInput
  }

  export type ForumPostScalarWhereWithAggregatesInput = {
    AND?: ForumPostScalarWhereWithAggregatesInput | ForumPostScalarWhereWithAggregatesInput[]
    OR?: ForumPostScalarWhereWithAggregatesInput[]
    NOT?: ForumPostScalarWhereWithAggregatesInput | ForumPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForumPost"> | string
    title?: StringWithAggregatesFilter<"ForumPost"> | string
    content?: StringWithAggregatesFilter<"ForumPost"> | string
    createdById?: UuidWithAggregatesFilter<"ForumPost"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ForumPost"> | Date | string
  }

  export type ForumCommentWhereInput = {
    AND?: ForumCommentWhereInput | ForumCommentWhereInput[]
    OR?: ForumCommentWhereInput[]
    NOT?: ForumCommentWhereInput | ForumCommentWhereInput[]
    id?: StringFilter<"ForumComment"> | string
    postId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    createdById?: UuidFilter<"ForumComment"> | string
    isAnswer?: BoolFilter<"ForumComment"> | boolean
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ForumCommentOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    isAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: ForumPostOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type ForumCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ForumCommentWhereInput | ForumCommentWhereInput[]
    OR?: ForumCommentWhereInput[]
    NOT?: ForumCommentWhereInput | ForumCommentWhereInput[]
    postId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    createdById?: UuidFilter<"ForumComment"> | string
    isAnswer?: BoolFilter<"ForumComment"> | boolean
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
    post?: XOR<ForumPostScalarRelationFilter, ForumPostWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ForumCommentOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    isAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ForumCommentCountOrderByAggregateInput
    _max?: ForumCommentMaxOrderByAggregateInput
    _min?: ForumCommentMinOrderByAggregateInput
  }

  export type ForumCommentScalarWhereWithAggregatesInput = {
    AND?: ForumCommentScalarWhereWithAggregatesInput | ForumCommentScalarWhereWithAggregatesInput[]
    OR?: ForumCommentScalarWhereWithAggregatesInput[]
    NOT?: ForumCommentScalarWhereWithAggregatesInput | ForumCommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ForumComment"> | string
    postId?: StringWithAggregatesFilter<"ForumComment"> | string
    content?: StringWithAggregatesFilter<"ForumComment"> | string
    createdById?: UuidWithAggregatesFilter<"ForumComment"> | string
    isAnswer?: BoolWithAggregatesFilter<"ForumComment"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ForumComment"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPeriodCreateInput = {
    id?: string
    name: string
    amount: number
    startDate: Date | string
    endDate: Date | string
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutPeriodInput
  }

  export type DuesPeriodUncheckedCreateInput = {
    id?: string
    name: string
    amount: number
    startDate: Date | string
    endDate: Date | string
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type DuesPeriodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutPeriodNestedInput
  }

  export type DuesPeriodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type DuesPeriodCreateManyInput = {
    id?: string
    name: string
    amount: number
    startDate: Date | string
    endDate: Date | string
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPeriodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPeriodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentCreateInput = {
    id?: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutDuesPaymentsInput
    period: DuesPeriodCreateNestedOneWithoutDuesPaymentsInput
  }

  export type DuesPaymentUncheckedCreateInput = {
    id?: string
    studentId: string
    duePeriodId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutDuesPaymentsNestedInput
    period?: DuesPeriodUpdateOneRequiredWithoutDuesPaymentsNestedInput
  }

  export type DuesPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    duePeriodId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentCreateManyInput = {
    id?: string
    studentId: string
    duePeriodId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    duePeriodId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateInput = {
    id?: string
    title: string
    content: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutAnnouncementsInput
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    authorId: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutAnnouncementsNestedInput
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    title: string
    content: string
    authorId: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    dayOfWeek: number
    periodOrder: number
    periodLabel: string
    subject?: string | null
    teacher?: string | null
    room?: string | null
    isBreak?: boolean
    updatedAt?: Date | string
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    dayOfWeek: number
    periodOrder: number
    periodLabel: string
    subject?: string | null
    teacher?: string | null
    room?: string | null
    isBreak?: boolean
    updatedAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    periodOrder?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    isBreak?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    periodOrder?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    isBreak?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    dayOfWeek: number
    periodOrder: number
    periodLabel: string
    subject?: string | null
    teacher?: string | null
    room?: string | null
    isBreak?: boolean
    updatedAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    periodOrder?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    isBreak?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    periodOrder?: IntFieldUpdateOperationsInput | number
    periodLabel?: StringFieldUpdateOperationsInput | string
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    teacher?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    isBreak?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoGalleryCreateInput = {
    id?: string
    title: string
    description?: string | null
    eventDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: PhotoCreateNestedManyWithoutGalleryInput
  }

  export type PhotoGalleryUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    eventDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: PhotoUncheckedCreateNestedManyWithoutGalleryInput
  }

  export type PhotoGalleryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: PhotoUpdateManyWithoutGalleryNestedInput
  }

  export type PhotoGalleryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: PhotoUncheckedUpdateManyWithoutGalleryNestedInput
  }

  export type PhotoGalleryCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    eventDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhotoGalleryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoGalleryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoCreateInput = {
    id?: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
    gallery: PhotoGalleryCreateNestedOneWithoutPhotosInput
  }

  export type PhotoUncheckedCreateInput = {
    id?: string
    galleryId: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
  }

  export type PhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gallery?: PhotoGalleryUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type PhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    galleryId?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoCreateManyInput = {
    id?: string
    galleryId: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
  }

  export type PhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    galleryId?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    id?: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutAttendancesInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: string
    studentId: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: string
    studentId: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCreateInput = {
    id?: string
    title: string
    subjectName: string
    description?: string | null
    fileUrl?: string | null
    cloudinaryId?: string | null
    externalLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialUncheckedCreateInput = {
    id?: string
    title: string
    subjectName: string
    description?: string | null
    fileUrl?: string | null
    cloudinaryId?: string | null
    externalLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialCreateManyInput = {
    id?: string
    title: string
    subjectName: string
    description?: string | null
    fileUrl?: string | null
    cloudinaryId?: string | null
    externalLink?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MaterialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaterialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumPostCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutForumPostsInput
  }

  export type ForumPostUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type ForumPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutForumPostsNestedInput
  }

  export type ForumPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type ForumPostCreateManyInput = {
    id?: string
    title: string
    content: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateInput = {
    id?: string
    content: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post: ForumPostCreateNestedOneWithoutCommentsInput
    author: UserCreateNestedOneWithoutForumCommentsInput
  }

  export type ForumCommentUncheckedCreateInput = {
    id?: string
    postId: string
    content: string
    createdById: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: ForumPostUpdateOneRequiredWithoutCommentsNestedInput
    author?: UserUpdateOneRequiredWithoutForumCommentsNestedInput
  }

  export type ForumCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateManyInput = {
    id?: string
    postId: string
    content: string
    createdById: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DuesPaymentListRelationFilter = {
    every?: DuesPaymentWhereInput
    some?: DuesPaymentWhereInput
    none?: DuesPaymentWhereInput
  }

  export type AnnouncementListRelationFilter = {
    every?: AnnouncementWhereInput
    some?: AnnouncementWhereInput
    none?: AnnouncementWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type ForumPostListRelationFilter = {
    every?: ForumPostWhereInput
    some?: ForumPostWhereInput
    none?: ForumPostWhereInput
  }

  export type ForumCommentListRelationFilter = {
    every?: ForumCommentWhereInput
    some?: ForumCommentWhereInput
    none?: ForumCommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DuesPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForumPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ForumCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DuesPeriodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPeriodAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DuesPeriodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPeriodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    amount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isArchived?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPeriodSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DuesPeriodScalarRelationFilter = {
    is?: DuesPeriodWhereInput
    isNot?: DuesPeriodWhereInput
  }

  export type DuesPaymentStudentIdDuePeriodIdCompoundUniqueInput = {
    studentId: string
    duePeriodId: string
  }

  export type DuesPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    duePeriodId?: SortOrder
    status?: SortOrder
    proofImageUrl?: SortOrder
    proofImageCloudinaryId?: SortOrder
    paidAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    duePeriodId?: SortOrder
    status?: SortOrder
    proofImageUrl?: SortOrder
    proofImageCloudinaryId?: SortOrder
    paidAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    duePeriodId?: SortOrder
    status?: SortOrder
    proofImageUrl?: SortOrder
    proofImageCloudinaryId?: SortOrder
    paidAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleDayOfWeekPeriodOrderCompoundUniqueInput = {
    dayOfWeek: number
    periodOrder: number
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
    periodLabel?: SortOrder
    subject?: SortOrder
    teacher?: SortOrder
    room?: SortOrder
    isBreak?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
    periodLabel?: SortOrder
    subject?: SortOrder
    teacher?: SortOrder
    room?: SortOrder
    isBreak?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
    periodLabel?: SortOrder
    subject?: SortOrder
    teacher?: SortOrder
    room?: SortOrder
    isBreak?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    periodOrder?: SortOrder
  }

  export type PhotoListRelationFilter = {
    every?: PhotoWhereInput
    some?: PhotoWhereInput
    none?: PhotoWhereInput
  }

  export type PhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhotoGalleryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoGalleryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoGalleryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    eventDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhotoGalleryScalarRelationFilter = {
    is?: PhotoGalleryWhereInput
    isNot?: PhotoGalleryWhereInput
  }

  export type PhotoCountOrderByAggregateInput = {
    id?: SortOrder
    galleryId?: SortOrder
    cloudinaryUrl?: SortOrder
    cloudinaryId?: SortOrder
    caption?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    galleryId?: SortOrder
    cloudinaryUrl?: SortOrder
    cloudinaryId?: SortOrder
    caption?: SortOrder
    uploadedAt?: SortOrder
  }

  export type PhotoMinOrderByAggregateInput = {
    id?: SortOrder
    galleryId?: SortOrder
    cloudinaryUrl?: SortOrder
    cloudinaryId?: SortOrder
    caption?: SortOrder
    uploadedAt?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type AttendanceStudentIdDateCompoundUniqueInput = {
    studentId: string
    date: Date | string
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    checkInTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    checkInTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    checkInTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subjectName?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    cloudinaryId?: SortOrder
    externalLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subjectName?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    cloudinaryId?: SortOrder
    externalLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MaterialMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subjectName?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    cloudinaryId?: SortOrder
    externalLink?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumPostScalarRelationFilter = {
    is?: ForumPostWhereInput
    isNot?: ForumPostWhereInput
  }

  export type ForumCommentCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    isAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    isAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ForumCommentMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdById?: SortOrder
    isAnswer?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DuesPaymentCreateNestedManyWithoutStudentInput = {
    create?: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput> | DuesPaymentCreateWithoutStudentInput[] | DuesPaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutStudentInput | DuesPaymentCreateOrConnectWithoutStudentInput[]
    createMany?: DuesPaymentCreateManyStudentInputEnvelope
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
  }

  export type AnnouncementCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AttendanceCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type ForumPostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput> | ForumPostCreateWithoutAuthorInput[] | ForumPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumPostCreateOrConnectWithoutAuthorInput | ForumPostCreateOrConnectWithoutAuthorInput[]
    createMany?: ForumPostCreateManyAuthorInputEnvelope
    connect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
  }

  export type ForumCommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput> | ForumCommentCreateWithoutAuthorInput[] | ForumCommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutAuthorInput | ForumCommentCreateOrConnectWithoutAuthorInput[]
    createMany?: ForumCommentCreateManyAuthorInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type DuesPaymentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput> | DuesPaymentCreateWithoutStudentInput[] | DuesPaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutStudentInput | DuesPaymentCreateOrConnectWithoutStudentInput[]
    createMany?: DuesPaymentCreateManyStudentInputEnvelope
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type ForumPostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput> | ForumPostCreateWithoutAuthorInput[] | ForumPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumPostCreateOrConnectWithoutAuthorInput | ForumPostCreateOrConnectWithoutAuthorInput[]
    createMany?: ForumPostCreateManyAuthorInputEnvelope
    connect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
  }

  export type ForumCommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput> | ForumCommentCreateWithoutAuthorInput[] | ForumCommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutAuthorInput | ForumCommentCreateOrConnectWithoutAuthorInput[]
    createMany?: ForumCommentCreateManyAuthorInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DuesPaymentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput> | DuesPaymentCreateWithoutStudentInput[] | DuesPaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutStudentInput | DuesPaymentCreateOrConnectWithoutStudentInput[]
    upsert?: DuesPaymentUpsertWithWhereUniqueWithoutStudentInput | DuesPaymentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: DuesPaymentCreateManyStudentInputEnvelope
    set?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    disconnect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    delete?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    update?: DuesPaymentUpdateWithWhereUniqueWithoutStudentInput | DuesPaymentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: DuesPaymentUpdateManyWithWhereWithoutStudentInput | DuesPaymentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
  }

  export type AnnouncementUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AttendanceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type ForumPostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput> | ForumPostCreateWithoutAuthorInput[] | ForumPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumPostCreateOrConnectWithoutAuthorInput | ForumPostCreateOrConnectWithoutAuthorInput[]
    upsert?: ForumPostUpsertWithWhereUniqueWithoutAuthorInput | ForumPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ForumPostCreateManyAuthorInputEnvelope
    set?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    disconnect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    delete?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    connect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    update?: ForumPostUpdateWithWhereUniqueWithoutAuthorInput | ForumPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ForumPostUpdateManyWithWhereWithoutAuthorInput | ForumPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ForumPostScalarWhereInput | ForumPostScalarWhereInput[]
  }

  export type ForumCommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput> | ForumCommentCreateWithoutAuthorInput[] | ForumCommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutAuthorInput | ForumCommentCreateOrConnectWithoutAuthorInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutAuthorInput | ForumCommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ForumCommentCreateManyAuthorInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutAuthorInput | ForumCommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutAuthorInput | ForumCommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput> | DuesPaymentCreateWithoutStudentInput[] | DuesPaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutStudentInput | DuesPaymentCreateOrConnectWithoutStudentInput[]
    upsert?: DuesPaymentUpsertWithWhereUniqueWithoutStudentInput | DuesPaymentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: DuesPaymentCreateManyStudentInputEnvelope
    set?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    disconnect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    delete?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    update?: DuesPaymentUpdateWithWhereUniqueWithoutStudentInput | DuesPaymentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: DuesPaymentUpdateManyWithWhereWithoutStudentInput | DuesPaymentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type ForumPostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput> | ForumPostCreateWithoutAuthorInput[] | ForumPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumPostCreateOrConnectWithoutAuthorInput | ForumPostCreateOrConnectWithoutAuthorInput[]
    upsert?: ForumPostUpsertWithWhereUniqueWithoutAuthorInput | ForumPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ForumPostCreateManyAuthorInputEnvelope
    set?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    disconnect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    delete?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    connect?: ForumPostWhereUniqueInput | ForumPostWhereUniqueInput[]
    update?: ForumPostUpdateWithWhereUniqueWithoutAuthorInput | ForumPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ForumPostUpdateManyWithWhereWithoutAuthorInput | ForumPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ForumPostScalarWhereInput | ForumPostScalarWhereInput[]
  }

  export type ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput> | ForumCommentCreateWithoutAuthorInput[] | ForumCommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutAuthorInput | ForumCommentCreateOrConnectWithoutAuthorInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutAuthorInput | ForumCommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ForumCommentCreateManyAuthorInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutAuthorInput | ForumCommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutAuthorInput | ForumCommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type DuesPaymentCreateNestedManyWithoutPeriodInput = {
    create?: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput> | DuesPaymentCreateWithoutPeriodInput[] | DuesPaymentUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutPeriodInput | DuesPaymentCreateOrConnectWithoutPeriodInput[]
    createMany?: DuesPaymentCreateManyPeriodInputEnvelope
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
  }

  export type DuesPaymentUncheckedCreateNestedManyWithoutPeriodInput = {
    create?: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput> | DuesPaymentCreateWithoutPeriodInput[] | DuesPaymentUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutPeriodInput | DuesPaymentCreateOrConnectWithoutPeriodInput[]
    createMany?: DuesPaymentCreateManyPeriodInputEnvelope
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DuesPaymentUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput> | DuesPaymentCreateWithoutPeriodInput[] | DuesPaymentUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutPeriodInput | DuesPaymentCreateOrConnectWithoutPeriodInput[]
    upsert?: DuesPaymentUpsertWithWhereUniqueWithoutPeriodInput | DuesPaymentUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: DuesPaymentCreateManyPeriodInputEnvelope
    set?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    disconnect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    delete?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    update?: DuesPaymentUpdateWithWhereUniqueWithoutPeriodInput | DuesPaymentUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: DuesPaymentUpdateManyWithWhereWithoutPeriodInput | DuesPaymentUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
  }

  export type DuesPaymentUncheckedUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput> | DuesPaymentCreateWithoutPeriodInput[] | DuesPaymentUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: DuesPaymentCreateOrConnectWithoutPeriodInput | DuesPaymentCreateOrConnectWithoutPeriodInput[]
    upsert?: DuesPaymentUpsertWithWhereUniqueWithoutPeriodInput | DuesPaymentUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: DuesPaymentCreateManyPeriodInputEnvelope
    set?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    disconnect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    delete?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    connect?: DuesPaymentWhereUniqueInput | DuesPaymentWhereUniqueInput[]
    update?: DuesPaymentUpdateWithWhereUniqueWithoutPeriodInput | DuesPaymentUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: DuesPaymentUpdateManyWithWhereWithoutPeriodInput | DuesPaymentUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDuesPaymentsInput = {
    create?: XOR<UserCreateWithoutDuesPaymentsInput, UserUncheckedCreateWithoutDuesPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDuesPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type DuesPeriodCreateNestedOneWithoutDuesPaymentsInput = {
    create?: XOR<DuesPeriodCreateWithoutDuesPaymentsInput, DuesPeriodUncheckedCreateWithoutDuesPaymentsInput>
    connectOrCreate?: DuesPeriodCreateOrConnectWithoutDuesPaymentsInput
    connect?: DuesPeriodWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDuesPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutDuesPaymentsInput, UserUncheckedCreateWithoutDuesPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDuesPaymentsInput
    upsert?: UserUpsertWithoutDuesPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDuesPaymentsInput, UserUpdateWithoutDuesPaymentsInput>, UserUncheckedUpdateWithoutDuesPaymentsInput>
  }

  export type DuesPeriodUpdateOneRequiredWithoutDuesPaymentsNestedInput = {
    create?: XOR<DuesPeriodCreateWithoutDuesPaymentsInput, DuesPeriodUncheckedCreateWithoutDuesPaymentsInput>
    connectOrCreate?: DuesPeriodCreateOrConnectWithoutDuesPaymentsInput
    upsert?: DuesPeriodUpsertWithoutDuesPaymentsInput
    connect?: DuesPeriodWhereUniqueInput
    update?: XOR<XOR<DuesPeriodUpdateToOneWithWhereWithoutDuesPaymentsInput, DuesPeriodUpdateWithoutDuesPaymentsInput>, DuesPeriodUncheckedUpdateWithoutDuesPaymentsInput>
  }

  export type UserCreateNestedOneWithoutAnnouncementsInput = {
    create?: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAnnouncementsNestedInput = {
    create?: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementsInput
    upsert?: UserUpsertWithoutAnnouncementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnnouncementsInput, UserUpdateWithoutAnnouncementsInput>, UserUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type PhotoCreateNestedManyWithoutGalleryInput = {
    create?: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput> | PhotoCreateWithoutGalleryInput[] | PhotoUncheckedCreateWithoutGalleryInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutGalleryInput | PhotoCreateOrConnectWithoutGalleryInput[]
    createMany?: PhotoCreateManyGalleryInputEnvelope
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
  }

  export type PhotoUncheckedCreateNestedManyWithoutGalleryInput = {
    create?: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput> | PhotoCreateWithoutGalleryInput[] | PhotoUncheckedCreateWithoutGalleryInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutGalleryInput | PhotoCreateOrConnectWithoutGalleryInput[]
    createMany?: PhotoCreateManyGalleryInputEnvelope
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
  }

  export type PhotoUpdateManyWithoutGalleryNestedInput = {
    create?: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput> | PhotoCreateWithoutGalleryInput[] | PhotoUncheckedCreateWithoutGalleryInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutGalleryInput | PhotoCreateOrConnectWithoutGalleryInput[]
    upsert?: PhotoUpsertWithWhereUniqueWithoutGalleryInput | PhotoUpsertWithWhereUniqueWithoutGalleryInput[]
    createMany?: PhotoCreateManyGalleryInputEnvelope
    set?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    disconnect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    delete?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    update?: PhotoUpdateWithWhereUniqueWithoutGalleryInput | PhotoUpdateWithWhereUniqueWithoutGalleryInput[]
    updateMany?: PhotoUpdateManyWithWhereWithoutGalleryInput | PhotoUpdateManyWithWhereWithoutGalleryInput[]
    deleteMany?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
  }

  export type PhotoUncheckedUpdateManyWithoutGalleryNestedInput = {
    create?: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput> | PhotoCreateWithoutGalleryInput[] | PhotoUncheckedCreateWithoutGalleryInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutGalleryInput | PhotoCreateOrConnectWithoutGalleryInput[]
    upsert?: PhotoUpsertWithWhereUniqueWithoutGalleryInput | PhotoUpsertWithWhereUniqueWithoutGalleryInput[]
    createMany?: PhotoCreateManyGalleryInputEnvelope
    set?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    disconnect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    delete?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    update?: PhotoUpdateWithWhereUniqueWithoutGalleryInput | PhotoUpdateWithWhereUniqueWithoutGalleryInput[]
    updateMany?: PhotoUpdateManyWithWhereWithoutGalleryInput | PhotoUpdateManyWithWhereWithoutGalleryInput[]
    deleteMany?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
  }

  export type PhotoGalleryCreateNestedOneWithoutPhotosInput = {
    create?: XOR<PhotoGalleryCreateWithoutPhotosInput, PhotoGalleryUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: PhotoGalleryCreateOrConnectWithoutPhotosInput
    connect?: PhotoGalleryWhereUniqueInput
  }

  export type PhotoGalleryUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<PhotoGalleryCreateWithoutPhotosInput, PhotoGalleryUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: PhotoGalleryCreateOrConnectWithoutPhotosInput
    upsert?: PhotoGalleryUpsertWithoutPhotosInput
    connect?: PhotoGalleryWhereUniqueInput
    update?: XOR<XOR<PhotoGalleryUpdateToOneWithWhereWithoutPhotosInput, PhotoGalleryUpdateWithoutPhotosInput>, PhotoGalleryUncheckedUpdateWithoutPhotosInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    upsert?: UserUpsertWithoutAttendancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAttendancesInput, UserUpdateWithoutAttendancesInput>, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type ForumCommentCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutForumPostsInput = {
    create?: XOR<UserCreateWithoutForumPostsInput, UserUncheckedCreateWithoutForumPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutForumPostsInput
    connect?: UserWhereUniqueInput
  }

  export type ForumCommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
  }

  export type ForumCommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutPostInput | ForumCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutPostInput | ForumCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutPostInput | ForumCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutForumPostsNestedInput = {
    create?: XOR<UserCreateWithoutForumPostsInput, UserUncheckedCreateWithoutForumPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutForumPostsInput
    upsert?: UserUpsertWithoutForumPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutForumPostsInput, UserUpdateWithoutForumPostsInput>, UserUncheckedUpdateWithoutForumPostsInput>
  }

  export type ForumCommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput> | ForumCommentCreateWithoutPostInput[] | ForumCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: ForumCommentCreateOrConnectWithoutPostInput | ForumCommentCreateOrConnectWithoutPostInput[]
    upsert?: ForumCommentUpsertWithWhereUniqueWithoutPostInput | ForumCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: ForumCommentCreateManyPostInputEnvelope
    set?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    disconnect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    delete?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    connect?: ForumCommentWhereUniqueInput | ForumCommentWhereUniqueInput[]
    update?: ForumCommentUpdateWithWhereUniqueWithoutPostInput | ForumCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: ForumCommentUpdateManyWithWhereWithoutPostInput | ForumCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
  }

  export type ForumPostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutCommentsInput
    connect?: ForumPostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutForumCommentsInput = {
    create?: XOR<UserCreateWithoutForumCommentsInput, UserUncheckedCreateWithoutForumCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutForumCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type ForumPostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ForumPostCreateOrConnectWithoutCommentsInput
    upsert?: ForumPostUpsertWithoutCommentsInput
    connect?: ForumPostWhereUniqueInput
    update?: XOR<XOR<ForumPostUpdateToOneWithWhereWithoutCommentsInput, ForumPostUpdateWithoutCommentsInput>, ForumPostUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutForumCommentsNestedInput = {
    create?: XOR<UserCreateWithoutForumCommentsInput, UserUncheckedCreateWithoutForumCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutForumCommentsInput
    upsert?: UserUpsertWithoutForumCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutForumCommentsInput, UserUpdateWithoutForumCommentsInput>, UserUncheckedUpdateWithoutForumCommentsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DuesPaymentCreateWithoutStudentInput = {
    id?: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    period: DuesPeriodCreateNestedOneWithoutDuesPaymentsInput
  }

  export type DuesPaymentUncheckedCreateWithoutStudentInput = {
    id?: string
    duePeriodId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentCreateOrConnectWithoutStudentInput = {
    where: DuesPaymentWhereUniqueInput
    create: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput>
  }

  export type DuesPaymentCreateManyStudentInputEnvelope = {
    data: DuesPaymentCreateManyStudentInput | DuesPaymentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementCreateOrConnectWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementCreateManyAuthorInputEnvelope = {
    data: AnnouncementCreateManyAuthorInput | AnnouncementCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceCreateWithoutStudentInput = {
    id?: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUncheckedCreateWithoutStudentInput = {
    id?: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceCreateManyStudentInputEnvelope = {
    data: AttendanceCreateManyStudentInput | AttendanceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ForumPostCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentCreateNestedManyWithoutPostInput
  }

  export type ForumPostUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ForumCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type ForumPostCreateOrConnectWithoutAuthorInput = {
    where: ForumPostWhereUniqueInput
    create: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput>
  }

  export type ForumPostCreateManyAuthorInputEnvelope = {
    data: ForumPostCreateManyAuthorInput | ForumPostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ForumCommentCreateWithoutAuthorInput = {
    id?: string
    content: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post: ForumPostCreateNestedOneWithoutCommentsInput
  }

  export type ForumCommentUncheckedCreateWithoutAuthorInput = {
    id?: string
    postId: string
    content: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentCreateOrConnectWithoutAuthorInput = {
    where: ForumCommentWhereUniqueInput
    create: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput>
  }

  export type ForumCommentCreateManyAuthorInputEnvelope = {
    data: ForumCommentCreateManyAuthorInput | ForumCommentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type DuesPaymentUpsertWithWhereUniqueWithoutStudentInput = {
    where: DuesPaymentWhereUniqueInput
    update: XOR<DuesPaymentUpdateWithoutStudentInput, DuesPaymentUncheckedUpdateWithoutStudentInput>
    create: XOR<DuesPaymentCreateWithoutStudentInput, DuesPaymentUncheckedCreateWithoutStudentInput>
  }

  export type DuesPaymentUpdateWithWhereUniqueWithoutStudentInput = {
    where: DuesPaymentWhereUniqueInput
    data: XOR<DuesPaymentUpdateWithoutStudentInput, DuesPaymentUncheckedUpdateWithoutStudentInput>
  }

  export type DuesPaymentUpdateManyWithWhereWithoutStudentInput = {
    where: DuesPaymentScalarWhereInput
    data: XOR<DuesPaymentUpdateManyMutationInput, DuesPaymentUncheckedUpdateManyWithoutStudentInput>
  }

  export type DuesPaymentScalarWhereInput = {
    AND?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
    OR?: DuesPaymentScalarWhereInput[]
    NOT?: DuesPaymentScalarWhereInput | DuesPaymentScalarWhereInput[]
    id?: StringFilter<"DuesPayment"> | string
    studentId?: UuidFilter<"DuesPayment"> | string
    duePeriodId?: StringFilter<"DuesPayment"> | string
    status?: StringFilter<"DuesPayment"> | string
    proofImageUrl?: StringNullableFilter<"DuesPayment"> | string | null
    proofImageCloudinaryId?: StringNullableFilter<"DuesPayment"> | string | null
    paidAt?: DateTimeNullableFilter<"DuesPayment"> | Date | string | null
    notes?: StringNullableFilter<"DuesPayment"> | string | null
    createdAt?: DateTimeFilter<"DuesPayment"> | Date | string
    updatedAt?: DateTimeFilter<"DuesPayment"> | Date | string
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAuthorInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AnnouncementScalarWhereInput = {
    AND?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    OR?: AnnouncementScalarWhereInput[]
    NOT?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    authorId?: UuidFilter<"Announcement"> | string
    status?: StringFilter<"Announcement"> | string
    publishedAt?: DateTimeNullableFilter<"Announcement"> | Date | string | null
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: UuidNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    tableName?: StringFilter<"AuditLog"> | string
    recordId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AttendanceUpsertWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutStudentInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutStudentInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: StringFilter<"Attendance"> | string
    studentId?: UuidFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    status?: StringFilter<"Attendance"> | string
    checkInTime?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type ForumPostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ForumPostWhereUniqueInput
    update: XOR<ForumPostUpdateWithoutAuthorInput, ForumPostUncheckedUpdateWithoutAuthorInput>
    create: XOR<ForumPostCreateWithoutAuthorInput, ForumPostUncheckedCreateWithoutAuthorInput>
  }

  export type ForumPostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ForumPostWhereUniqueInput
    data: XOR<ForumPostUpdateWithoutAuthorInput, ForumPostUncheckedUpdateWithoutAuthorInput>
  }

  export type ForumPostUpdateManyWithWhereWithoutAuthorInput = {
    where: ForumPostScalarWhereInput
    data: XOR<ForumPostUpdateManyMutationInput, ForumPostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ForumPostScalarWhereInput = {
    AND?: ForumPostScalarWhereInput | ForumPostScalarWhereInput[]
    OR?: ForumPostScalarWhereInput[]
    NOT?: ForumPostScalarWhereInput | ForumPostScalarWhereInput[]
    id?: StringFilter<"ForumPost"> | string
    title?: StringFilter<"ForumPost"> | string
    content?: StringFilter<"ForumPost"> | string
    createdById?: UuidFilter<"ForumPost"> | string
    createdAt?: DateTimeFilter<"ForumPost"> | Date | string
    updatedAt?: DateTimeFilter<"ForumPost"> | Date | string
  }

  export type ForumCommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ForumCommentWhereUniqueInput
    update: XOR<ForumCommentUpdateWithoutAuthorInput, ForumCommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<ForumCommentCreateWithoutAuthorInput, ForumCommentUncheckedCreateWithoutAuthorInput>
  }

  export type ForumCommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ForumCommentWhereUniqueInput
    data: XOR<ForumCommentUpdateWithoutAuthorInput, ForumCommentUncheckedUpdateWithoutAuthorInput>
  }

  export type ForumCommentUpdateManyWithWhereWithoutAuthorInput = {
    where: ForumCommentScalarWhereInput
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ForumCommentScalarWhereInput = {
    AND?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
    OR?: ForumCommentScalarWhereInput[]
    NOT?: ForumCommentScalarWhereInput | ForumCommentScalarWhereInput[]
    id?: StringFilter<"ForumComment"> | string
    postId?: StringFilter<"ForumComment"> | string
    content?: StringFilter<"ForumComment"> | string
    createdById?: UuidFilter<"ForumComment"> | string
    isAnswer?: BoolFilter<"ForumComment"> | boolean
    createdAt?: DateTimeFilter<"ForumComment"> | Date | string
    updatedAt?: DateTimeFilter<"ForumComment"> | Date | string
  }

  export type DuesPaymentCreateWithoutPeriodInput = {
    id?: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutDuesPaymentsInput
  }

  export type DuesPaymentUncheckedCreateWithoutPeriodInput = {
    id?: string
    studentId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentCreateOrConnectWithoutPeriodInput = {
    where: DuesPaymentWhereUniqueInput
    create: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput>
  }

  export type DuesPaymentCreateManyPeriodInputEnvelope = {
    data: DuesPaymentCreateManyPeriodInput | DuesPaymentCreateManyPeriodInput[]
    skipDuplicates?: boolean
  }

  export type DuesPaymentUpsertWithWhereUniqueWithoutPeriodInput = {
    where: DuesPaymentWhereUniqueInput
    update: XOR<DuesPaymentUpdateWithoutPeriodInput, DuesPaymentUncheckedUpdateWithoutPeriodInput>
    create: XOR<DuesPaymentCreateWithoutPeriodInput, DuesPaymentUncheckedCreateWithoutPeriodInput>
  }

  export type DuesPaymentUpdateWithWhereUniqueWithoutPeriodInput = {
    where: DuesPaymentWhereUniqueInput
    data: XOR<DuesPaymentUpdateWithoutPeriodInput, DuesPaymentUncheckedUpdateWithoutPeriodInput>
  }

  export type DuesPaymentUpdateManyWithWhereWithoutPeriodInput = {
    where: DuesPaymentScalarWhereInput
    data: XOR<DuesPaymentUpdateManyMutationInput, DuesPaymentUncheckedUpdateManyWithoutPeriodInput>
  }

  export type UserCreateWithoutDuesPaymentsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutDuesPaymentsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutDuesPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDuesPaymentsInput, UserUncheckedCreateWithoutDuesPaymentsInput>
  }

  export type DuesPeriodCreateWithoutDuesPaymentsInput = {
    id?: string
    name: string
    amount: number
    startDate: Date | string
    endDate: Date | string
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPeriodUncheckedCreateWithoutDuesPaymentsInput = {
    id?: string
    name: string
    amount: number
    startDate: Date | string
    endDate: Date | string
    isArchived?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPeriodCreateOrConnectWithoutDuesPaymentsInput = {
    where: DuesPeriodWhereUniqueInput
    create: XOR<DuesPeriodCreateWithoutDuesPaymentsInput, DuesPeriodUncheckedCreateWithoutDuesPaymentsInput>
  }

  export type UserUpsertWithoutDuesPaymentsInput = {
    update: XOR<UserUpdateWithoutDuesPaymentsInput, UserUncheckedUpdateWithoutDuesPaymentsInput>
    create: XOR<UserCreateWithoutDuesPaymentsInput, UserUncheckedCreateWithoutDuesPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDuesPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDuesPaymentsInput, UserUncheckedUpdateWithoutDuesPaymentsInput>
  }

  export type UserUpdateWithoutDuesPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutDuesPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type DuesPeriodUpsertWithoutDuesPaymentsInput = {
    update: XOR<DuesPeriodUpdateWithoutDuesPaymentsInput, DuesPeriodUncheckedUpdateWithoutDuesPaymentsInput>
    create: XOR<DuesPeriodCreateWithoutDuesPaymentsInput, DuesPeriodUncheckedCreateWithoutDuesPaymentsInput>
    where?: DuesPeriodWhereInput
  }

  export type DuesPeriodUpdateToOneWithWhereWithoutDuesPaymentsInput = {
    where?: DuesPeriodWhereInput
    data: XOR<DuesPeriodUpdateWithoutDuesPaymentsInput, DuesPeriodUncheckedUpdateWithoutDuesPaymentsInput>
  }

  export type DuesPeriodUpdateWithoutDuesPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPeriodUncheckedUpdateWithoutDuesPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAnnouncementsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAnnouncementsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAnnouncementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
  }

  export type UserUpsertWithoutAnnouncementsInput = {
    update: XOR<UserUpdateWithoutAnnouncementsInput, UserUncheckedUpdateWithoutAnnouncementsInput>
    create: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnnouncementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnnouncementsInput, UserUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type UserUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type PhotoCreateWithoutGalleryInput = {
    id?: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
  }

  export type PhotoUncheckedCreateWithoutGalleryInput = {
    id?: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
  }

  export type PhotoCreateOrConnectWithoutGalleryInput = {
    where: PhotoWhereUniqueInput
    create: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput>
  }

  export type PhotoCreateManyGalleryInputEnvelope = {
    data: PhotoCreateManyGalleryInput | PhotoCreateManyGalleryInput[]
    skipDuplicates?: boolean
  }

  export type PhotoUpsertWithWhereUniqueWithoutGalleryInput = {
    where: PhotoWhereUniqueInput
    update: XOR<PhotoUpdateWithoutGalleryInput, PhotoUncheckedUpdateWithoutGalleryInput>
    create: XOR<PhotoCreateWithoutGalleryInput, PhotoUncheckedCreateWithoutGalleryInput>
  }

  export type PhotoUpdateWithWhereUniqueWithoutGalleryInput = {
    where: PhotoWhereUniqueInput
    data: XOR<PhotoUpdateWithoutGalleryInput, PhotoUncheckedUpdateWithoutGalleryInput>
  }

  export type PhotoUpdateManyWithWhereWithoutGalleryInput = {
    where: PhotoScalarWhereInput
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyWithoutGalleryInput>
  }

  export type PhotoScalarWhereInput = {
    AND?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
    OR?: PhotoScalarWhereInput[]
    NOT?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
    id?: StringFilter<"Photo"> | string
    galleryId?: StringFilter<"Photo"> | string
    cloudinaryUrl?: StringFilter<"Photo"> | string
    cloudinaryId?: StringFilter<"Photo"> | string
    caption?: StringNullableFilter<"Photo"> | string | null
    uploadedAt?: DateTimeFilter<"Photo"> | Date | string
  }

  export type PhotoGalleryCreateWithoutPhotosInput = {
    id?: string
    title: string
    description?: string | null
    eventDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhotoGalleryUncheckedCreateWithoutPhotosInput = {
    id?: string
    title: string
    description?: string | null
    eventDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhotoGalleryCreateOrConnectWithoutPhotosInput = {
    where: PhotoGalleryWhereUniqueInput
    create: XOR<PhotoGalleryCreateWithoutPhotosInput, PhotoGalleryUncheckedCreateWithoutPhotosInput>
  }

  export type PhotoGalleryUpsertWithoutPhotosInput = {
    update: XOR<PhotoGalleryUpdateWithoutPhotosInput, PhotoGalleryUncheckedUpdateWithoutPhotosInput>
    create: XOR<PhotoGalleryCreateWithoutPhotosInput, PhotoGalleryUncheckedCreateWithoutPhotosInput>
    where?: PhotoGalleryWhereInput
  }

  export type PhotoGalleryUpdateToOneWithWhereWithoutPhotosInput = {
    where?: PhotoGalleryWhereInput
    data: XOR<PhotoGalleryUpdateWithoutPhotosInput, PhotoGalleryUncheckedUpdateWithoutPhotosInput>
  }

  export type PhotoGalleryUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoGalleryUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAuditLogsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateWithoutAttendancesInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAttendancesInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAttendancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
  }

  export type UserUpsertWithoutAttendancesInput = {
    update: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type UserUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ForumCommentCreateWithoutPostInput = {
    id?: string
    content: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutForumCommentsInput
  }

  export type ForumCommentUncheckedCreateWithoutPostInput = {
    id?: string
    content: string
    createdById: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentCreateOrConnectWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    create: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput>
  }

  export type ForumCommentCreateManyPostInputEnvelope = {
    data: ForumCommentCreateManyPostInput | ForumCommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutForumPostsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumComments?: ForumCommentCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutForumPostsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumComments?: ForumCommentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutForumPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutForumPostsInput, UserUncheckedCreateWithoutForumPostsInput>
  }

  export type ForumCommentUpsertWithWhereUniqueWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    update: XOR<ForumCommentUpdateWithoutPostInput, ForumCommentUncheckedUpdateWithoutPostInput>
    create: XOR<ForumCommentCreateWithoutPostInput, ForumCommentUncheckedCreateWithoutPostInput>
  }

  export type ForumCommentUpdateWithWhereUniqueWithoutPostInput = {
    where: ForumCommentWhereUniqueInput
    data: XOR<ForumCommentUpdateWithoutPostInput, ForumCommentUncheckedUpdateWithoutPostInput>
  }

  export type ForumCommentUpdateManyWithWhereWithoutPostInput = {
    where: ForumCommentScalarWhereInput
    data: XOR<ForumCommentUpdateManyMutationInput, ForumCommentUncheckedUpdateManyWithoutPostInput>
  }

  export type UserUpsertWithoutForumPostsInput = {
    update: XOR<UserUpdateWithoutForumPostsInput, UserUncheckedUpdateWithoutForumPostsInput>
    create: XOR<UserCreateWithoutForumPostsInput, UserUncheckedCreateWithoutForumPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutForumPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutForumPostsInput, UserUncheckedUpdateWithoutForumPostsInput>
  }

  export type UserUpdateWithoutForumPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumComments?: ForumCommentUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutForumPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumComments?: ForumCommentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ForumPostCreateWithoutCommentsInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutForumPostsInput
  }

  export type ForumPostUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    content: string
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumPostCreateOrConnectWithoutCommentsInput = {
    where: ForumPostWhereUniqueInput
    create: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutForumCommentsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutForumCommentsInput = {
    id: string
    email: string
    name: string
    role?: string
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    duesPayments?: DuesPaymentUncheckedCreateNestedManyWithoutStudentInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    forumPosts?: ForumPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutForumCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutForumCommentsInput, UserUncheckedCreateWithoutForumCommentsInput>
  }

  export type ForumPostUpsertWithoutCommentsInput = {
    update: XOR<ForumPostUpdateWithoutCommentsInput, ForumPostUncheckedUpdateWithoutCommentsInput>
    create: XOR<ForumPostCreateWithoutCommentsInput, ForumPostUncheckedCreateWithoutCommentsInput>
    where?: ForumPostWhereInput
  }

  export type ForumPostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ForumPostWhereInput
    data: XOR<ForumPostUpdateWithoutCommentsInput, ForumPostUncheckedUpdateWithoutCommentsInput>
  }

  export type ForumPostUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutForumPostsNestedInput
  }

  export type ForumPostUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutForumCommentsInput = {
    update: XOR<UserUpdateWithoutForumCommentsInput, UserUncheckedUpdateWithoutForumCommentsInput>
    create: XOR<UserCreateWithoutForumCommentsInput, UserUncheckedCreateWithoutForumCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutForumCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutForumCommentsInput, UserUncheckedUpdateWithoutForumCommentsInput>
  }

  export type UserUpdateWithoutForumCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutForumCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    duesPayments?: DuesPaymentUncheckedUpdateManyWithoutStudentNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    forumPosts?: ForumPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type DuesPaymentCreateManyStudentInput = {
    id?: string
    duePeriodId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    status?: string
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    tableName: string
    recordId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AttendanceCreateManyStudentInput = {
    id?: string
    date: Date | string
    status: string
    checkInTime?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumPostCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentCreateManyAuthorInput = {
    id?: string
    postId: string
    content: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: DuesPeriodUpdateOneRequiredWithoutDuesPaymentsNestedInput
  }

  export type DuesPaymentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    duePeriodId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    duePeriodId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    tableName?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    checkInTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumPostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUpdateManyWithoutPostNestedInput
  }

  export type ForumPostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ForumCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type ForumPostUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: ForumPostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type ForumCommentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentCreateManyPeriodInput = {
    id?: string
    studentId: string
    status?: string
    proofImageUrl?: string | null
    proofImageCloudinaryId?: string | null
    paidAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DuesPaymentUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutDuesPaymentsNestedInput
  }

  export type DuesPaymentUncheckedUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DuesPaymentUncheckedUpdateManyWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    proofImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    proofImageCloudinaryId?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoCreateManyGalleryInput = {
    id?: string
    cloudinaryUrl: string
    cloudinaryId: string
    caption?: string | null
    uploadedAt?: Date | string
  }

  export type PhotoUpdateWithoutGalleryInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateWithoutGalleryInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateManyWithoutGalleryInput = {
    id?: StringFieldUpdateOperationsInput | string
    cloudinaryUrl?: StringFieldUpdateOperationsInput | string
    cloudinaryId?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentCreateManyPostInput = {
    id?: string
    content: string
    createdById: string
    isAnswer?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ForumCommentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutForumCommentsNestedInput
  }

  export type ForumCommentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ForumCommentUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdById?: StringFieldUpdateOperationsInput | string
    isAnswer?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}