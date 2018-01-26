import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

declare let window: any;
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private _config;
  constructor(private sqlite: SQLite) {
    this.init({ name: "biology.db", location: "default" });
  }
  /**
   * Prepare Database for Application
   */
  private init(config) {
    /**
     * Set config
     */
    this._config = config;
    /**
     * sqlDB
     */
    const { plugins } = window;
    let sqlDBLocation: number;
    switch (config.location) {
      case "Documents":
        sqlDBLocation = 0;
        break;
      case "Library":
        sqlDBLocation = 1;
        break;
      default:
        sqlDBLocation = 2;
        break;
    }
    plugins.sqlDB.copy("biology.db", 0, this.dbCopySuccess, this.dbCopyError);
  }
  /**
   * Select * from tableName
   * @param tableName {string}
   */
  public table(tableName: String) {
    return this.sqlite.create(this._config).then((db: SQLiteObject) => {
      console.log(db);
      return db.executeSql(`SELECT * FROM ${tableName}`, {});
    });
  }

  public executeSQL(string: string) {
    return this.sqlite.create(this._config).then((db: SQLiteObject) => {
      console.log(db);
      return db.executeSql(string, {});
    });
  }

  private dbCopySuccess(suc) {
    console.log(suc);
  }

  private dbCopyError(err) {
    console.log(err);
  }
}
