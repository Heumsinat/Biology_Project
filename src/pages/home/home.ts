import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
declare let window: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _config;
  data: any = [];
  constructor(public navCtrl: NavController, private sqlite: SQLite ) {
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
  ionViewDidLoad(){
    this.getData();
  }
  ionViewWillEnter(){
    this.getData();
  }
  getData(){
    this.sqlite.create(
      // name: 'biology.db',
      // location: 'default'
      this._config
    ).then((db: SQLiteObject) =>{
      db.executeSql('CREATE TABLE IF NOT EXISTS chapters(id INTEGER PRIMARY KEY , number INTEGER, title TEXT, create_date NUMERIC , modified_date NUMERIC)',{})
          .then(res => console.log('Executed SQL'))
          .catch(e => console.log(e));
      db.executeSql('SELECT * FROM chapters ORDER BY id DESC ',{})
          .then(res => {
            this.data = [];
            console.log(res);
            for (var i = 0; i<res.rows.length; i++){
              this.data.push({
                id:res.rows.item(i).id,
                number:res.rows.item(i).number,
                title:res.rows.item(i).title,
                created_date:res.rows.item(i).created_date,
                modified_date:res.rows.item(i).modified_date
              })
            }
          }).catch(e => console.log(e));
    })
  }

  private dbCopySuccess(suc) {
    console.log('dbCopySuccess', suc);
  }

  private dbCopyError(err) {
    console.log('dbCopyError',err);
  }

}
