import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
/**
 * Generated class for the SectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-section',
  templateUrl: 'section.html',
})
export class SectionPage {
  sections: any = [];
  lessonID: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    this.lessonID = navParams.get('lessonID');
    this.db.executeSQL(`SELECT * FROM sections WHERE lesson = ${this.lessonID}`)
        .then(res => {
          this.sections = [];
          for (var i = 0; i<res.rows.length; i++){
            this.sections.push({
              id:res.rows.item(i).id,
              order:res.rows.item(i).order,
              lesson:res.rows.item(i).lesson,
              title:res.rows.item(i).title,
              content:res.rows.item(i).content,
              image1:res.rows.item(i).image1,
              image2:res.rows.item(i).image2,
              image3:res.rows.item(i).image3,
              image4:res.rows.item(i).image4,
              sound:res.rows.item(i).sound,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
            //break;
          }
        }).catch(e => console.log((e)))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SectionPage');
  }

  next_section(){
    // this.sections = [];
    // for (var i = 0; i<res.rows.length; i++){
    //   this.sections.push({
    //     id:res.rows.item(i).id,
    //     order:res.rows.item(i).order,
    //     lesson:res.rows.item(i).lesson,
    //     title:res.rows.item(i).title,
    //     content:res.rows.item(i).content,
    //     image1:res.rows.item(i).image1,
    //     image2:res.rows.item(i).image2,
    //     image3:res.rows.item(i).image3,
    //     image4:res.rows.item(i).image4,
    //     sound:res.rows.item(i).sound,
    //     created_date:res.rows.item(i).created_date,
    //     modified_date:res.rows.item(i).modified_date
    //   })
    // }
  }

}
