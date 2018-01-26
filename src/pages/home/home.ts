import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  state: string = 'chapters';
  chapters: any = [];
  lessons: any = [];
  constructor(public navCtrl: NavController, public db: DatabaseProvider, private sqlite: SQLite) {
    this.getChapters();
    this.getLessons();
  }

  getChapters(){
    this.db
        .table("chapters")
          .then(res => {
            this.chapters = [];
            console.log(res);
            for (var i = 0; i<res.rows.length; i++){
              this.chapters.push({
                id:res.rows.item(i).id,
                number:res.rows.item(i).number,
                title:res.rows.item(i).title,
                created_date:res.rows.item(i).created_date,
                modified_date:res.rows.item(i).modified_date
              })
            }
          }).catch(e => console.log(e));
  }
  getLessons(){
    this.db
        .table("lessons")
        .then(res => {
          this.lessons = [];
          console.log(res);
          for (var i = 0; i<res.rows.length; i++){
            this.lessons.push({
              id:res.rows.item(i).id,
              number:res.rows.item(i).number,
              title:res.rows.item(i).title,
              chapter:res.rows.item(i).chapter,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
          }
        }).catch(e => console.log((e)))
  }

    chapter(chapter_id: number) {
        this.db.executeSQL(`SELECT * FROM lessons WHERE chapter = ${chapter_id}`)
            .then(res => {
                this.state = 'lessons';
                this.lessons = [];
                for (var i = 0; i<res.rows.length; i++){
                    this.lessons.push({
                        id:res.rows.item(i).id,
                        number:res.rows.item(i).number,
                        title:res.rows.item(i).title,
                        chapter:res.rows.item(i).chapter,
                        created_date:res.rows.item(i).created_date,
                        modified_date:res.rows.item(i).modified_date
                    })
                }
            })
    }
}
